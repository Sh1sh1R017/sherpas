export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const reqUrl = new URL(req.url);
    const appUrl = `${reqUrl.protocol}//${reqUrl.host}`;
    const searchParams = reqUrl.searchParams;
    const code = searchParams.get('code');
    const state = searchParams.get('state'); // This contains the clerkId

    if (!code || !state) {
      return NextResponse.redirect(`${appUrl}/settings?error=missing_code_or_state`);
    }

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      `${appUrl}/api/auth/google/callback`
    );

    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Get the user's email address from Google
    const oauth2 = google.oauth2({
      auth: oauth2Client,
      version: 'v2',
    });
    
    const userInfo = await oauth2.userinfo.get();
    const googleEmail = userInfo.data.email;

    // Save tokens in database
    await prisma.user.update({
      where: { clerkId: state },
      data: {
        googleRefreshToken: tokens.refresh_token || undefined, // If no refresh token is returned, don't overwrite with null
        googleEmail: googleEmail,
      }
    });

    return NextResponse.redirect(`${appUrl}/settings?success=gmail_connected`);
  } catch (error) {
    console.error('Error handling Google OAuth callback:', error);
    // Best effort fallback for error redirect since we might not have appUrl if the try block failed early
    const errorUrl = new URL(req.url);
    return NextResponse.redirect(`${errorUrl.protocol}//${errorUrl.host}/settings?error=oauth_failed`);
  }
}
