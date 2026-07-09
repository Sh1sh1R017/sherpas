import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth, currentUser } from '@clerk/nextjs/server';

export async function POST(req: Request) {
  try {
    const session = await auth();
    const user = await currentUser();
    if (!session.userId || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { outreachId, type } = await req.json();

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

    // Update status to sent. We also update the type if provided (e.g. to 'WhatsApp')
    const updated = await prisma.outreach.update({
      where: { id: outreachId },
      data: { 
        status: 'Sent',
        ...(type ? { type } : {})
      }
    });

    return NextResponse.json({ success: true, outreach: updated });

  } catch (error: any) {
    console.error('Mark Sent API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
