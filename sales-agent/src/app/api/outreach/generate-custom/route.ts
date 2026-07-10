export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from "@clerk/nextjs/server";
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "dummy_key_for_build" });

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const dbUser = await prisma.user.findUnique({ where: { clerkId: session.userId } });
    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const { businessId, tone, goal, context } = await req.json();

    if (!businessId) {
      return NextResponse.json({ error: 'Business ID is required' }, { status: 400 });
    }

    const business = await prisma.business.findFirst({ 
      where: { id: businessId, userId: dbUser.id } 
    });

    if (!business) {
      return NextResponse.json({ error: 'Business not found or unauthorized' }, { status: 404 });
    }

    if (!business.summary) {
      return NextResponse.json({ error: 'Business has not been analyzed yet' }, { status: 400 });
    }

    const emailPrompt = `
      You are an expert SDR (Sales Development Representative) writing an email to a potential client.
      
      Business Details:
      Name: ${business.name}
      Summary: ${business.summary}
      Pain Points: ${business.painPoints}
      Opportunities: ${business.opportunities}
      Industry: ${business.industry || business.businessCategory || 'Unknown'}
      
      Instructions for this specific email:
      Tone: ${tone || 'Professional and polite'}
      Goal: ${goal || 'Introduce our product and book a meeting'}
      Additional Context/Instructions: ${context || 'None'}
      
      Requirements:
      - Write a compelling Subject line, followed by a blank line, and then the email body.
      - Keep it concise.
      - Start with a highly personalized opening sentence based on their specific pain points or opportunities.
      - ${business.ownerName ? `Address the email specifically to "${business.ownerName},".` : `Address them as "Hi team at ${business.name}," or "Hi there,".`}
      - Sign off as 'Sherpas Software Team'.
    `;

    const emailRes = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: emailPrompt,
    });

    const generatedText = emailRes.text?.trim() || "";

    // Parse subject and body (assuming first line is subject)
    const lines = generatedText.split('\n');
    let subject = lines[0].replace(/^Subject:\s*/i, '').trim();
    let content = lines.slice(1).join('\n').trim();

    return NextResponse.json({ subject, content });
  } catch (error: any) {
    console.error('Error generating custom email:', error);
    return NextResponse.json({ error: error.message || 'Failed to generate email' }, { status: 500 });
  }
}
