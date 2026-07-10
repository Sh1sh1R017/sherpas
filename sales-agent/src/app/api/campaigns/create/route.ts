export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from "@clerk/nextjs/server";

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

    const body = await req.json();
    const { name, filters, businessIds, emailBody } = body;

    if (!name || !businessIds || businessIds.length === 0) {
      return NextResponse.json({ error: 'Name and at least one lead are required' }, { status: 400 });
    }

    // 1. Create the Campaign
    const campaign = await prisma.campaign.create({
      data: {
        userId: dbUser.id,
        name,
        filters: JSON.stringify(filters || {}),
        status: 'Draft',
      }
    });

    // 2. Create Outreach drafts for each selected business
    const outreachesToCreate = businessIds.map((businessId: string) => ({
      businessId,
      campaignId: campaign.id,
      type: 'Email',
      content: emailBody || '',
      status: 'Draft',
    }));

    await prisma.outreach.createMany({
      data: outreachesToCreate
    });

    return NextResponse.json({ success: true, campaignId: campaign.id });
  } catch (error: any) {
    console.error('Error creating campaign:', error);
    return NextResponse.json({ error: error.message || 'Failed to create campaign' }, { status: 500 });
  }
}
