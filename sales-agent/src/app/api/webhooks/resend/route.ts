import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "dummy_key_for_build" });

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Basic Resend webhook structure for inbound emails
    // https://resend.com/docs/api-reference/webhooks/the-webhook-object
    // type: "email.received" or something similar if configured. 
    // Wait, Resend inbound email webhook actually sends an object containing `from`, `to`, `text`, `subject`.
    
    // Fallback parsing for different webhook formats just in case
    const fromAddress = body.from || body.data?.from;
    const textContent = body.text || body.data?.text || body.subject || "";

    if (!fromAddress) {
      return NextResponse.json({ error: 'Missing from address' }, { status: 400 });
    }

    // Extract email string if it comes as "Name <email@domain.com>"
    const emailMatch = fromAddress.match(/<(.+)>/);
    const senderEmail = emailMatch ? emailMatch[1].toLowerCase() : fromAddress.toLowerCase();

    // Find the business that this email belongs to
    const business = await prisma.business.findFirst({
      where: {
        OR: [
          { ownerEmail: senderEmail },
          { email: senderEmail }
        ]
      },
      include: {
        outreaches: {
          where: { type: 'Email', status: 'Sent' },
          orderBy: { createdAt: 'desc' },
          take: 1
        }
      }
    });

    if (!business) {
      console.log(`Webhook: Received email from ${senderEmail} but no matching business found.`);
      return NextResponse.json({ success: true, message: 'Ignored' });
    }

    const outreach = business.outreaches[0];

    // Determine if they want a meeting using AI
    let isMeetingBooked = false;
    
    if (textContent) {
      try {
        const prompt = `
          You are an AI analyzing an email reply from a sales prospect.
          Reply Text: "${textContent}"
          
          Does the prospect show explicit interest in a meeting, demo, or phone call?
          Return ONLY "YES" or "NO".
        `;
        const aiRes = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
        });
        
        if (aiRes.text?.includes("YES")) {
          isMeetingBooked = true;
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

    // Update the outreach status if one was sent
    if (outreach) {
      await prisma.outreach.update({
        where: { id: outreach.id },
        data: { status: 'Replied' }
      });
    }

    return NextResponse.json({ success: true, isMeetingBooked });

  } catch (error: any) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
