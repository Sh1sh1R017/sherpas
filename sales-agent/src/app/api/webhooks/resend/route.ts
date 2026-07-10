import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { GoogleGenAI } from '@google/genai';
import { Resend } from 'resend';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "dummy_key_for_build" });
const resend = new Resend(process.env.RESEND_API_KEY || "dummy_key_for_build");

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const fromAddress = body.from || body.data?.from;
    const textContent = body.text || body.data?.text || body.subject || "";
    const subject = body.subject || body.data?.subject || "Re: Sherpas Consulting";

    if (!fromAddress) {
      return NextResponse.json({ error: 'Missing from address' }, { status: 400 });
    }

    const emailMatch = fromAddress.match(/<(.+)>/);
    const senderEmail = emailMatch ? emailMatch[1].toLowerCase() : fromAddress.toLowerCase();

    const business = await prisma.business.findFirst({
      where: {
        OR: [
          { ownerEmail: senderEmail },
          { email: senderEmail }
        ]
      },
      include: {
        outreaches: {
          where: { type: 'Email' },
          orderBy: { createdAt: 'desc' },
          take: 5
        }
      }
    });

    if (!business) {
      console.log(`Webhook: Received email from ${senderEmail} but no matching business found.`);
      return NextResponse.json({ success: true, message: 'Ignored' });
    }

    // Determine context
    const previousMessages = business.outreaches.map(o => `${o.status === "Sent" ? "You sent:" : "They replied:"} ${o.content}`).join("\n");

    let isMeetingBooked = false;
    let aiReply = "";
    
    if (textContent) {
      try {
        const prompt = `
          You are an expert sales representative for Sherpas Software (creators of the Sherpas AI Sales Agent platform).
          You are replying to an email from a prospect about our automated lead generation software.
          
          Prospect Name: ${business.ownerName || business.name}
          Company: ${business.name}
          Lead Score: ${business.leadScore} (${business.priority})
          
          Previous conversation context:
          ${previousMessages}
          
          The prospect just replied with:
          "${textContent}"
          
          Task 1: Does the prospect show explicit interest in a meeting, demo, or phone call? (We will mark the CRM status if so).
          Task 2: Write a professional, concise, and helpful email reply to the prospect. Keep it short (under 4 sentences). If they asked a question, answer it. If they want a meeting, offer a time or a calendar link. Frame the value prop around fully automated B2B sales and lead generation.
          
          Return your response in this EXACT JSON format:
          {
            "wantsMeeting": true or false,
            "replyText": "your email response here (plain text)"
          }
        `;
        
        const aiRes = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
        });
        
        // Basic JSON parsing from the AI response
        const jsonMatch = aiRes.text?.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          isMeetingBooked = parsed.wantsMeeting === true;
          aiReply = parsed.replyText || "";
        }
      } catch (e) {
        console.error("AI Analysis error on webhook:", e);
      }
    }

    // Update the business status
    await prisma.business.update({
      where: { id: business.id },
      data: {
        status: isMeetingBooked ? 'Meeting Booked' : 'Replied'
      }
    });

    // Mark previous outreach as Replied
    const latestOutreach = business.outreaches[0];
    if (latestOutreach && latestOutreach.status === "Sent") {
      await prisma.outreach.update({
        where: { id: latestOutreach.id },
        data: { status: 'Replied' }
      });
    }

    // Auto-Send the AI Reply (if generated)
    if (aiReply) {
      // NOTE: You can change this to simply save as "Draft" if you prefer to review replies manually.
      if (process.env.RESEND_API_KEY) {
        await resend.emails.send({
          from: 'Sherpas Consulting <onboarding@resend.dev>', // Replace with your domain
          to: senderEmail,
          subject: subject.startsWith("Re:") ? subject : `Re: ${subject}`,
          text: aiReply,
        });
      }

      await prisma.outreach.create({
        data: {
          businessId: business.id,
          type: "Email",
          content: aiReply,
          status: "Sent" // Or "Draft" if manual review
        }
      });
    }

    return NextResponse.json({ success: true, isMeetingBooked, replySent: !!aiReply });

  } catch (error: any) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
