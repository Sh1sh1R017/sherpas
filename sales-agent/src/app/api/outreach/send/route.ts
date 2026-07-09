export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth, currentUser } from '@clerk/nextjs/server';
import { Resend } from 'resend';
import { google } from 'googleapis';

const resend = new Resend(process.env.RESEND_API_KEY || "dummy_key_for_build");

export async function POST(req: Request) {
  try {
    const session = await auth();
    const user = await currentUser();
    if (!session.userId || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const userEmail = user.emailAddresses[0]?.emailAddress;

    const { outreachId } = await req.json();

    if (!outreachId) {
      return NextResponse.json({ error: 'Outreach ID is required' }, { status: 400 });
    }

    const outreach = await prisma.outreach.findUnique({ 
      where: { id: outreachId },
      include: { business: { include: { user: true } } }
    });

    if (!outreach || !outreach.business.user) {
      return NextResponse.json({ error: 'Outreach not found' }, { status: 404 });
    }
    
    if (outreach.business.user.clerkId !== session.userId) {
      return NextResponse.json({ error: 'Unauthorized Access' }, { status: 403 });
    }
    
    const dbUser = outreach.business.user;

    if (outreach.status === 'Sent') {
      return NextResponse.json({ error: 'Already sent' }, { status: 400 });
    }

    if (outreach.type === 'Email') {
      const toEmail = outreach.business.ownerEmail || outreach.business.email;
      if (!toEmail) {
        return NextResponse.json({ error: 'This lead has no email address on file.' }, { status: 400 });
      }
      const emailSubject = `Quick question about ${outreach.business.name}`;

      if (dbUser.googleRefreshToken) {
        // Send via User's Personal Gmail Account
        const oauth2Client = new google.auth.OAuth2(
          process.env.GOOGLE_CLIENT_ID,
          process.env.GOOGLE_CLIENT_SECRET
        );
        oauth2Client.setCredentials({ refresh_token: dbUser.googleRefreshToken });

        const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
        
        const rawMessage = [
          `To: ${toEmail}`,
          `Subject: ${emailSubject}`,
          `Content-Type: text/plain; charset="UTF-8"`,
          '',
          outreach.content
        ].join('\n');

        const encodedMessage = Buffer.from(rawMessage)
          .toString('base64')
          .replace(/\+/g, '-')
          .replace(/\//g, '_')
          .replace(/=+$/, '');

        const sendRes = await gmail.users.messages.send({
          userId: 'me',
          requestBody: {
            raw: encodedMessage,
          },
        });
        
        // Save threadId for follow-ups
        if (sendRes.data.threadId) {
          await prisma.outreach.update({
            where: { id: outreachId },
            data: { threadId: sendRes.data.threadId }
          });
        }
      } else {
        // Fallback to Resend
        const resendKey = dbUser.resendKey || process.env.RESEND_API_KEY;
        if (!resendKey) {
          throw new Error("Resend API Key is missing. Please configure it in Settings.");
        }
        const resendClient = new Resend(resendKey);

        const { data, error } = await resendClient.emails.send({
          from: 'Sherpas Sales Team <onboarding@resend.dev>', // You should change this to your verified Resend domain
          to: toEmail, 
          subject: emailSubject,
          text: outreach.content,
        });

        if (error) {
          throw new Error(error.message);
        }
      }
    } else if (outreach.type === 'WhatsApp') {
      const waToken = dbUser.whatsappToken || process.env.WHATSAPP_ACCESS_TOKEN;
      const waPhoneId = dbUser.whatsappPhoneId || process.env.WHATSAPP_PHONE_NUMBER_ID;
      
      const leadPhone = outreach.business.phone;

      if (!waToken || !waPhoneId) {
        throw new Error("Missing WhatsApp configuration. Please configure it in Settings.");
      }
      
      if (!leadPhone) {
        throw new Error("This lead does not have a phone number on file.");
      }

      // Format the phone number to remove any non-numeric characters for WhatsApp API
      const formattedPhone = leadPhone.replace(/\D/g, '');

      // Send to the actual scraped lead
      const payload = {
        messaging_product: "whatsapp",
        to: formattedPhone,
        type: "text",
        text: {
          body: outreach.content
        }
      };

      const waRes = await fetch(`https://graph.facebook.com/v20.0/${waPhoneId}/messages`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${waToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!waRes.ok) {
        const errorData = await waRes.json();
        console.error("WhatsApp API Error:", errorData);
        throw new Error(errorData?.error?.message || "Failed to send WhatsApp message");
      }
    }

    // Update status
    const updated = await prisma.outreach.update({
      where: { id: outreachId },
      data: { status: 'Sent' }
    });

    // Automated Drip Campaign: Schedule Step 2 Follow-up
    if (outreach.step === 1 && outreach.type === 'Email') {
      const followUpDate = new Date();
      followUpDate.setDate(followUpDate.getDate() + 3); // 3 days later

      // Generate a simple follow-up template based on the personalized intro or business
      const followUpContent = `Hi again,\n\nJust floating this to the top of your inbox. Did you have a chance to read my previous email?\n\nBest,\nSherpas Software Team`;

      await prisma.outreach.create({
        data: {
          businessId: outreach.businessId,
          type: 'Email',
          content: followUpContent,
          status: 'Scheduled',
          step: 2,
          scheduledFor: followUpDate,
          threadId: updated.threadId, // carry over the thread ID if it exists
        }
      });
    }

    return NextResponse.json({ success: true, outreach: updated });

  } catch (error: any) {
    console.error('Send API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

