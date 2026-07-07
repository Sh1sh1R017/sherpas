import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { prisma } from "@/lib/prisma";
import { LeadsTable } from "./LeadsTable";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function LeadsPage() {
  const session = await auth();
  if (!session.userId) redirect("/sign-in");

  const dbUser = await prisma.user.findUnique({ where: { clerkId: session.userId } });

  const businesses = await prisma.business.findMany({
    where: dbUser ? { userId: dbUser.id } : { id: "never_match" }, // If user not found, return empty
    include: { outreaches: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Leads Pipeline</h2>
          <p className="text-muted-foreground">Manage and analyze discovered businesses.</p>
        </div>

        <LeadsTable initialLeads={businesses} />
      </div>
    </DashboardLayout>
  );
}
