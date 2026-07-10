export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from "@clerk/nextjs/server";
import * as cheerio from 'cheerio';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "dummy_key_for_build" });

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get or create user in our DB
    let user = await prisma.user.findUnique({ where: { clerkId: session.userId } });
    if (!user) {
      // Create user with default 5 credits
      user = await prisma.user.create({
        data: {
          clerkId: session.userId,
          email: `user_${session.userId}@example.com`,
        }
      });
    }

    if (user.credits <= 0) {
      return NextResponse.json({ error: 'Insufficient credits. Please upgrade your plan.' }, { status: 403 });
    }

    const { businessId } = await req.json();

    if (!businessId) {
      return NextResponse.json({ error: 'Business ID is required' }, { status: 400 });
    }

    const business = await prisma.business.findFirst({ 
      where: { id: businessId, userId: user.id } 
    });

    if (!business) {
      return NextResponse.json({ error: 'Business not found or unauthorized' }, { status: 404 });
    }

    let websiteText = "No website found.";

    if (business.website) {
      try {
        const urlObj = new URL(business.website);
        if (urlObj.protocol !== 'http:' && urlObj.protocol !== 'https:') {
          throw new Error('Invalid URL protocol');
        }
        if (urlObj.hostname === 'localhost' || urlObj.hostname === '127.0.0.1' || urlObj.hostname.startsWith('192.168.') || urlObj.hostname.startsWith('10.')) {
          throw new Error('Localhost/Internal IP scraping is forbidden');
        }

        // Scrape basic website content securely
        const response = await fetch(business.website, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Accept': 'text/html'
          },
          signal: AbortSignal.timeout(10000)
        });
        
        if (response.ok) {
          const html = await response.text();
          const $ = cheerio.load(html);
          
          // Remove scripts, styles, etc.
          $('script, style, noscript, iframe, img, svg').remove();
          
          // Explicitly extract footer and contact links
          const footerText = $('footer, .footer, #footer, [class*="footer"]').text().replace(/\s+/g, ' ').trim();
          
          const rawText = $('body').text();
          
          // Very aggressive email extraction via regex across the entire body
          const emailRegex = /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g;
          const foundEmails = Array.from(new Set(rawText.match(emailRegex) || []));
          
          const mailtoLinks = $('a[href^="mailto:"]').map((_, el) => $(el).attr('href')).get().join(' ');
          const telLinks = $('a[href^="tel:"]').map((_, el) => $(el).attr('href')).get().join(' ');
          
          const bodyText = rawText.replace(/\s+/g, ' ').trim();
          
          websiteText = `Aggressively Extracted Emails: ${foundEmails.join(', ')}\nFooter: ${footerText}\nEmail Links: ${mailtoLinks}\nPhone Links: ${telLinks}\n\nBody: ${bodyText}`.substring(0, 15000);
        }
      } catch (e: any) {
        console.error("Scraping error:", e.message);
        websiteText = "Website exists but could not be scraped due to security/timeout.";
      }
    }

    // Use Gemini for Analysis
    const prompt = `
      You are an expert AI sales agent for Sherpas Software. 
      Sherpas Software sells: Custom Software, AI Automation, Web Apps, AI Chatbots, CRM Systems.
      
      Analyze the following business data and website content. 
      Output ONLY a valid JSON object matching the requested schema. Do NOT include markdown code blocks.
      
      Business Info:
      Name: ${business.name}
      Industry: ${business.industry}
      Category: ${business.businessCategory}
      Rating: ${business.googleRating} (${business.reviewCount} reviews)
      Website: ${business.website}
      
      Website Scraped Text:
      ${websiteText}
      
      Requested JSON Schema:
      {
        "summary": "Brief 2-3 sentence summary of what the business does.",
        "painPoints": "Identify 2-3 likely pain points (e.g., missing booking system, outdated text).",
        "opportunities": "Identify 2-3 technology opportunities where Sherpas Software can help.",
        "leadScore": Number from 0-100 (CRITICAL INSTRUCTION: If the business has NO website or NO online presence, you MUST score them 100, as they are desperate for our software services. Otherwise, award higher scores based on evidence of marketing budget),
        "aiReadiness": Number from 0-100,
        "priority": "Super Hot", "Hot", "Warm", or "Cold" (CRITICAL INSTRUCTION: If they have NO website, you MUST categorize them strictly as "Super Hot"),
        "ownerName": "Extract any name that appears to be the CEO, Founder, or Owner. Return null if none found.",
        "ownerEmail": "Extract any public email address found (e.g. info@..., contact@..., or a personal email). Return null if none found.",
        "scrapedPhone": "Extract any public phone/contact number found on the page. Return null if none found.",
        "scrapedAddress": "Extract any physical address/location found on the page. Return null if none found.",
        "ownerLinkedIn": "Extract any LinkedIn URL found on the page. Return null if none found."
      }
    `;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            temperature: 0.2
        }
    });

    const aiText = response.text;
    if (!aiText) throw new Error("AI returned empty response");
    
    const analysis = JSON.parse(aiText);

    // Save back to database
    const updatedBusiness = await prisma.business.update({
      where: { id: businessId },
      data: {
        summary: analysis.summary,
        painPoints: Array.isArray(analysis.painPoints) ? analysis.painPoints.join('\n') : analysis.painPoints,
        opportunities: Array.isArray(analysis.opportunities) ? analysis.opportunities.join('\n') : analysis.opportunities,
        leadScore: analysis.leadScore,
        aiReadiness: analysis.aiReadiness,
        priority: analysis.priority,
        ownerName: analysis.ownerName,
        ownerEmail: analysis.ownerEmail,
        ownerLinkedIn: analysis.ownerLinkedIn,
        phone: analysis.scrapedPhone || business.phone,
        address: analysis.scrapedAddress || business.address,
      }
    });

    // Deduct credit
    await prisma.user.update({
      where: { id: user.id },
      data: { credits: { decrement: 1 } }
    });

    return NextResponse.json({ success: true, business: updatedBusiness });

  } catch (error: any) {
    console.error('Analyze API Error:', error);
    
    let errorMessage = error.message || 'Internal Server Error';
    if (errorMessage.toLowerCase().includes('429') || errorMessage.toLowerCase().includes('quota') || errorMessage.toLowerCase().includes('rate limit') || errorMessage.toLowerCase().includes('exhausted')) {
      errorMessage = "The AI service is currently experiencing high load. Please wait a moment and try again.";
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
