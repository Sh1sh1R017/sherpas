import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Mail, PhoneCall, TrendingUp } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const session = await auth();
  if (!session.userId) redirect("/sign-in");

  const dbUser = await prisma.user.findUnique({ where: { clerkId: session.userId } });

  // Get leads for this user OR public inbound leads (userId = null)
  const whereClause = dbUser ? { OR: [{ userId: dbUser.id }, { userId: null }] } : { id: "never_match" };

  const totalLeads = await prisma.business.count({ where: whereClause });
  
  const emailsSent = await prisma.outreach.count({
    where: {
      type: "Email",
      status: { in: ["Sent", "Replied"] },
      business: whereClause
    }
  });

  const meetingsBooked = await prisma.business.count({
    where: {
      ...whereClause,
      status: "Meeting Booked"
    }
  });

  const aggregations = await prisma.business.aggregate({
    where: whereClause,
    _avg: {
      leadScore: true,
    }
  });

  const avgLeadScore = aggregations._avg.leadScore ? Math.round(aggregations._avg.leadScore) : 0;

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Welcome to Sherpas AI Sales Agent Platform.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalLeads}</div>
              <p className="text-xs text-muted-foreground">Inbound & Discovered</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Emails Sent</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{emailsSent}</div>
              <p className="text-xs text-muted-foreground">Automated & Manual</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Meetings Booked</CardTitle>
              <PhoneCall className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{meetingsBooked}</div>
              <p className="text-xs text-muted-foreground">AI detected interest</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Lead Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgLeadScore} / 100</div>
              <p className="text-xs text-muted-foreground">Across all leads</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
