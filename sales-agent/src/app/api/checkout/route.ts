export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  try {
    const session = await auth();
    const user = await currentUser();
    
    if (!session.userId || !user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    let dbUser = await prisma.user.findUnique({
      where: { clerkId: session.userId }
    });

    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          clerkId: session.userId,
          email: user.emailAddresses[0]?.emailAddress || `user_${session.userId}@example.com`,
          credits: 5
        }
      });
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/leads?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/pricing?canceled=true`,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: dbUser.email,
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      metadata: {
        userId: dbUser.id,
      },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("[STRIPE_CHECKOUT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

