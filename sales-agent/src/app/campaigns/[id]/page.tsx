import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { CampaignDetailsClient } from "./CampaignDetailsClient";

export default async function CampaignDetailsPage({ params }: { params: { id: string } }) {
  const session = await auth();
  if (!session.userId) redirect("/sign-in");

  const dbUser = await prisma.user.findUnique({ where: { clerkId: session.userId } });
  if (!dbUser) redirect("/sign-in");

  // Fetch campaign
  const campaign = await prisma.campaign.findUnique({
    where: { id: params.id, userId: dbUser.id },
    include: {
      outreaches: {
        include: {
          business: true
        }
      }
    }
  });

  if (!campaign) {
    redirect("/campaigns");
  }

  return (
    <DashboardLayout>
      <CampaignDetailsClient campaign={campaign} />
    </DashboardLayout>
  );
}
