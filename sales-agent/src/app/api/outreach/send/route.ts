import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth, currentUser } from '@clerk/nextjs/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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
      const resendKey = dbUser.resendKey || process.env.RESEND_API_KEY;
      if (!resendKey) {
        throw new Error("Resend API Key is missing. Please configure it in Settings.");
      }
      const resendClient = new Resend(resendKey);

      // Send Email via Resend
      const { data, error } = await resendClient.emails.send({
        from: 'Sherpas Sales Team <onboarding@resend.dev>', // You should change this to your verified Resend domain
        to: outreach.business.email || userEmail || 'test@example.com', 
        subject: `Quick question about ${outreach.business.name}`,
        text: outreach.content,
      });

      if (error) {
        throw new Error(error.message);
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

    return NextResponse.json({ success: true, outreach: updated });

  } catch (error: any) {
    console.error('Send API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
