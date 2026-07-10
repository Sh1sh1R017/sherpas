export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { currentUser } from "@clerk/nextjs/server";
import { auth } from "@clerk/nextjs/server";

async function scrapeEmailFromWebsite(url: string): Promise<string | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 sec timeout
    
    const response = await fetch(url, { 
      signal: controller.signal, 
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } 
    });
    clearTimeout(timeoutId);
    
    if (!response.ok) return null;
    const html = await response.text();
    
    const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,})/gi;
    const matches = html.match(emailRegex);
    
    if (matches) {
      const validEmails = matches.filter(e => {
        const lower = e.toLowerCase();
        return !lower.endsWith('.png') && 
               !lower.endsWith('.jpg') && 
               !lower.endsWith('.webp') &&
               !lower.endsWith('.svg') &&
               !lower.endsWith('.gif') &&
               !lower.endsWith('.js') &&
               !lower.endsWith('.css') &&
               !lower.includes('sentry') && 
               !lower.includes('wix') &&
               !lower.includes('example.com') &&
               !lower.includes('intl-segmenter') &&
               !lower.includes('core-js');
      });
      if (validEmails.length > 0) {
        return validEmails[0].toLowerCase();
      }
    }
    return null;
  } catch (error) {
    return null;
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let dbUser = await prisma.user.findUnique({ where: { clerkId: session.userId } });
    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: { clerkId: session.userId, email: `user_${session.userId}@example.com` }
      });
    }

    // Enforce Freemium limit: max 5 leads
    const clerkUser = await currentUser();
    const email = clerkUser?.emailAddresses[0]?.emailAddress;
    const isAdmin = email === 'gautamshishir78@gmail.com';

    if (dbUser.subscriptionStatus !== 'active' && !isAdmin) {
      const currentLeadsCount = await prisma.business.count({
        where: { userId: dbUser.id }
      });
      if (currentLeadsCount >= 5) {
        return NextResponse.json({ error: 'You have reached your free limit of 5 leads. Please upgrade to Pro.', code: 'PAYWALL' }, { status: 402 });
      }
    }

    const { lat, lng, radius, keyword } = await req.json();

    if (!lat || !lng || !radius || !keyword) {
      return NextResponse.json({ error: 'Map coordinates, radius, and keyword are required' }, { status: 400 });
    }

    const query = keyword;
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: 'Google Places API key is missing' }, { status: 500 });
    }

    const response = await fetch('https://places.googleapis.com/v1/places:searchText', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.nationalPhoneNumber,places.websiteUri,places.rating,places.userRatingCount,places.primaryTypeDisplayName,places.location'
      },
      body: JSON.stringify({
        textQuery: query,
        languageCode: 'en',
        locationBias: {
          circle: {
            center: { latitude: lat, longitude: lng },
            radius: radius
          }
        }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Google Places API Error:', errText);
      return NextResponse.json({ error: 'Failed to fetch places from Google API' }, { status: 500 });
    }

    const data = await response.json();
    const places = data.places || [];

    // Save to Database
    const savedBusinesses = [];
    
    for (const place of places) {
      const name = place.displayName?.text;
      if (!name) continue;

      // PRIORITY IS EMAILS: Skip if no website
      if (!place.websiteUri) continue;

      // Ensure we don't exceed the limit in the loop for free users
      if (dbUser.subscriptionStatus !== 'active' && !isAdmin) {
         const currentTotal = await prisma.business.count({ where: { userId: dbUser.id } });
         if (currentTotal >= 5) break;
      }

      // Check if exists for this user
      const existing = await prisma.business.findFirst({
        where: { name, address: place.formattedAddress, userId: dbUser.id }
      });

      if (!existing) {
        // PRIORITY IS EMAILS: Try to scrape email, if none found, skip.
        const emailFound = await scrapeEmailFromWebsite(place.websiteUri);
        if (!emailFound) continue;

        const newBusiness = await prisma.business.create({
          data: {
            userId: dbUser.id,
            name,
            email: emailFound,
            website: place.websiteUri,
            phone: place.nationalPhoneNumber || null,
            address: place.formattedAddress || null,
            city: "Map Area",
            industry: keyword,
            googleRating: place.rating || null,
            reviewCount: place.userRatingCount || null,
            businessCategory: place.primaryTypeDisplayName?.text || null,
            status: "New",
            priority: "Cold"
          }
        });
        savedBusinesses.push(newBusiness);
      }
    }

    return NextResponse.json({ 
      success: true, 
      found: places.length, 
      saved: savedBusinesses.length,
      places: savedBusinesses 
    });

  } catch (error: any) {
    console.error('Discover API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
