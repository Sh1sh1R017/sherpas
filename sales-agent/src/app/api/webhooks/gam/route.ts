import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    
    // Google Ad Manager sends parameters like:
    // ?ad_network=...&user_id=...&reward_amount=...&reward_item=...&transaction_id=...&signature=...
    const userId = searchParams.get('user_id');
    const rewardAmount = parseInt(searchParams.get('reward_amount') || '3', 10);
    const transactionId = searchParams.get('transaction_id');
    const signature = searchParams.get('signature');

    if (!userId || !transactionId) {
      return new NextResponse('Missing required parameters', { status: 400 });
    }

    // TODO: Verify Google Ad Manager HMAC signature here
    // const secret = process.env.GAM_WEBHOOK_SECRET;
    // (Verification logic omitted until secret is provisioned)

    // Check if we already processed this exact transaction (replay attack prevention)
    const existingTx = await prisma.rewardTransaction.findUnique({
      where: { transactionId }
    });

    if (existingTx) {
      // Return 200 so GAM knows we received it, even though it's a duplicate
      return new NextResponse('Already processed', { status: 200 });
    }

    // Wrap in a transaction to ensure atomic updates
    await prisma.$transaction(async (tx) => {
      // Log the transaction
      await tx.rewardTransaction.create({
        data: {
          userId,
          transactionId,
          creditsAdded: rewardAmount,
          provider: 'GoogleAdManager',
          rewardType: 'Video'
        }
      });

      // Give the user their credits
      await tx.user.update({
        where: { clerkId: userId }, // Assuming we pass clerkId as the user_id in the GAM tag
        data: {
          credits: {
            increment: rewardAmount
          }
        }
      });
    });

    console.log(`Successfully credited ${rewardAmount} AI analyses to ${userId} from GAM.`);
    
    // GAM requires a 200 OK text response
    return new NextResponse('OK', { status: 200 });

  } catch (error: any) {
    console.error('GAM Webhook Error:', error);
    // If it's a duplicate transaction error from a race condition, it's fine
    if (error.code === 'P2002') {
      return new NextResponse('Duplicate transaction', { status: 200 });
    }
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
