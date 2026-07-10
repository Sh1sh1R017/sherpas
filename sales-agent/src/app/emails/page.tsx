import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { EmailGeneratorClient } from "./EmailGeneratorClient";

export default async function EmailsPage() {
  const session = await auth();
  if (!session.userId) redirect("/sign-in");

  const dbUser = await prisma.user.findUnique({ where: { clerkId: session.userId } });
  
  const whereClause = dbUser ? { OR: [{ userId: dbUser.id }, { userId: null }] } : { id: "never_match" };

  const businesses = await prisma.business.findMany({
    where: { ...whereClause, summary: { not: null } },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <DashboardLayout>
      <EmailGeneratorClient businesses={businesses} />
    </DashboardLayout>
  );
}
