export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from "@/lib/auth";

export async function DELETE(req: Request) {
  try {
    const session = await auth();
    if (!session.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({ where: { clerkId: session.userId } });
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Prisma doesn't cascade delete implicitly unless defined in schema.
    // So we first delete all outreaches belonging to this user's businesses
    const userBusinesses = await prisma.business.findMany({
      where: { userId: user.id },
      select: { id: true }
    });
    
    const businessIds = userBusinesses.map(b => b.id);

    if (businessIds.length > 0) {
      await prisma.outreach.deleteMany({
        where: { businessId: { in: businessIds } }
      });

      // Then delete all businesses
      await prisma.business.deleteMany({
        where: { userId: user.id }
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Delete All Leads Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

