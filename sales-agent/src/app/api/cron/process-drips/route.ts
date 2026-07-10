export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { google } from 'googleapis';

export async function GET(req: Request) {
  try {
    // Basic security: require a CRON_SECRET token (can configure in Vercel)
    const authHeader = req.headers.get('authorization');
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      // In development, you might not have CRON_SECRET set, so allow it for testing if absent
      if (process.env.NODE_ENV === 'production') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    const now = new Date();

    // Find all scheduled outreaches that are due
    const pendingOutreaches = await prisma.outreach.findMany({
      where: {
        status: 'Scheduled',
        scheduledFor: {
          lte: now,
        },
        type: 'Email'
      },
      include: {
        business: {
          include: {
            user: true
          }
        }
      }
    });

    const results = [];

    for (const outreach of pendingOutreaches) {
      const business = outreach.business;
      const user = business.user;
      
      // If user manually marked business as 'Replied', cancel the drip
      if (business.status === 'Replied') {
        await prisma.outreach.update({
          where: { id: outreach.id },
          data: { status: 'Cancelled' }
        });
        results.push({ id: outreach.id, status: 'Cancelled - Lead already replied' });
        continue;
      }

      if (!user?.googleRefreshToken) {
        // Can't send threaded follow-ups easily without Gmail API, fail for now
        await prisma.outreach.update({
          where: { id: outreach.id },
          data: { status: 'Failed' }
        });
        results.push({ id: outreach.id, status: 'Failed - No Google OAuth token' });
        continue;
      }

      const toEmail = business.ownerEmail || business.email;
      if (!toEmail) {
        await prisma.outreach.update({
          where: { id: outreach.id },
          data: { status: 'Failed', content: 'No email on file' }
        });
        results.push({ id: outreach.id, status: 'Failed - No email on file' });
        continue;
      }

      const emailSubject = `Re: Quick question about ${business.name}`;

      const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET
      );
      oauth2Client.setCredentials({ refresh_token: user.googleRefreshToken });

      const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
      
      // If we have a threadId, we need to pass In-Reply-To and References headers
      // Actually, Gmail API handles threading if you pass threadId in the requestBody AND the Subject matches
      // but it's safer to pass the threadId directly.
      const rawMessage = [
        `To: ${toEmail}`,
        `Subject: ${emailSubject}`,
        `Content-Type: text/plain; charset="UTF-8"`,
        `MIME-Version: 1.0`,
        '',
        outreach.content
      ].join('\r\n');

      const encodedMessage = Buffer.from(rawMessage)
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');

      try {
        const sendOptions: any = {
          userId: 'me',
          requestBody: {
            raw: encodedMessage,
          },
        };

        if (outreach.threadId) {
          sendOptions.requestBody.threadId = outreach.threadId;
        }

        await gmail.users.messages.send(sendOptions);

        await prisma.outreach.update({
          where: { id: outreach.id },
          data: { status: 'Sent' }
        });
        
        results.push({ id: outreach.id, status: 'Sent' });

      } catch (err: any) {
        console.error(`Failed to send follow-up ${outreach.id}:`, err);
        results.push({ id: outreach.id, status: 'Failed', error: err.message });
      }
    }

    return NextResponse.json({ success: true, processed: results.length, results });

  } catch (error: any) {
    console.error('Process Drips Cron Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
