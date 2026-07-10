import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { currentUser } from "@clerk/nextjs/server";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const session = await auth();
    const user = await currentUser();
    if (!session.userId || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { businessId } = await req.json();

    if (!businessId) {
      return NextResponse.json({ error: 'Business ID is required' }, { status: 400 });
    }

    const business = await prisma.business.findUnique({ 
      where: { id: businessId },
      include: { user: true }
    });

    if (!business || !business.user) {
      return NextResponse.json({ error: 'Business not found' }, { status: 404 });
    }
    
    if (business.user.clerkId !== session.userId) {
      return NextResponse.json({ error: 'Unauthorized Access' }, { status: 403 });
    }

    // Update business status
    await prisma.business.update({
      where: { id: businessId },
      data: { status: 'Replied' }
    });

    // Cancel any pending scheduled outreaches
    await prisma.outreach.updateMany({
      where: { 
        businessId: businessId,
        status: 'Scheduled'
      },
      data: { status: 'Cancelled' }
    });

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error('Reply API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
