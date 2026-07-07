import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth, currentUser } from '@clerk/nextjs/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const dbUser = await prisma.user.findUnique({ where: { clerkId: session.userId } });
    
    const clerkUser = await currentUser();
    const email = clerkUser?.emailAddresses[0]?.emailAddress;
    const isAdmin = email === 'gautamshishir78@gmail.com';

    // Enforce Freemium limit: max 1 draft across all businesses
    if (!isAdmin && (!dbUser || dbUser.subscriptionStatus !== 'active')) {
      const userBusinesses = await prisma.business.findMany({
        where: { userId: dbUser?.id },
        select: { id: true }
      });
      const businessIds = userBusinesses.map(b => b.id);
      
      const currentDraftsCount = await prisma.outreach.count({
        where: { businessId: { in: businessIds } }
      });

      if (currentDraftsCount >= 1) {
        return NextResponse.json({ error: 'You have reached your free limit of 1 email draft. Please upgrade to Pro.', code: 'PAYWALL' }, { status: 402 });
      }
    }

    const { businessId } = await req.json();

    if (!businessId) {
      return NextResponse.json({ error: 'Business ID is required' }, { status: 400 });
    }

    const business = await prisma.business.findFirst({ 
      where: { id: businessId, userId: dbUser?.id } 
    });

    if (!business) {
      return NextResponse.json({ error: 'Business not found or unauthorized' }, { status: 404 });
    }

    if (!business.summary) {
      return NextResponse.json({ error: 'Business has not been analyzed yet' }, { status: 400 });
    }

    // Generate Email
    const emailPrompt = `
      You are an expert SDR (Sales Development Representative) using the 'Sherpas AI Sales Agent' tool to send this message.
      Write a highly personalized cold email to the owner of this business.
      
      Business Name: ${business.name}
      Summary: ${business.summary}
      Pain Points: ${business.painPoints}
      Opportunities: ${business.opportunities}
      
      Requirements:
      - The email MUST be extremely concise (exactly 3 to 4 short lines maximum).
      - Make it highly personalized based on their specific pain points or summary.
      - Explicitly mention that you are reaching out using the "Sherpas AI Sales Agent" tool to discover and contact them.
      - End with a low-friction call to action.
      - Do NOT use ANY placeholders like [Your Name] or [Owner Name]. ${business.ownerName ? `Address the email specifically to the Owner/CEO by their name: "${business.ownerName},". If you want to mention their role, they are the founder/CEO.` : `Address them as "Hi team at ${business.name}," or just "Hi there,".`} Sign off as 'Sherpas Software Team'.
    `;

    const emailRes = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: emailPrompt,
    });

    const emailContent = emailRes.text;

    if (!emailContent) {
      throw new Error("Failed to generate outreach content");
    }

    // Delete existing drafts for this business to allow regeneration
    await prisma.outreach.deleteMany({
      where: { businessId, type: 'Email', status: 'Draft' }
    });

    // Save Outreach draft to DB
    await prisma.outreach.create({
      data: {
        businessId,
        type: 'Email',
        content: emailContent,
        status: 'Draft',
      }
    });

    return NextResponse.json({ success: true, email: emailContent });

  } catch (error: any) {
    console.error('Outreach Generation Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
