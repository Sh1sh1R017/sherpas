import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { CampaignsClient } from "./CampaignsClient";

export default async function CampaignsPage() {
  const session = await auth();
  if (!session.userId) redirect("/sign-in");

  const dbUser = await prisma.user.findUnique({ where: { clerkId: session.userId } });
  
  // Use same whereClause approach as Reports
  const whereClause = dbUser ? { OR: [{ userId: dbUser.id }, { userId: null }] } : { id: "never_match" };

  // Fetch campaigns
  const campaigns = await prisma.campaign.findMany({
    where: dbUser ? { userId: dbUser.id } : { id: "never_match" },
    include: {
      outreaches: true
    },
    orderBy: { createdAt: 'desc' }
  });

  // Fetch leads for the "New Campaign" target selector
  const businesses = await prisma.business.findMany({
    where: whereClause,
    orderBy: { createdAt: 'desc' }
  });

  return (
    <DashboardLayout>
      <CampaignsClient initialCampaigns={campaigns} businesses={businesses} />
    </DashboardLayout>
  );
}
