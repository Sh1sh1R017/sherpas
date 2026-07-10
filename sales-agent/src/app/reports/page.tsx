import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ReportsClient } from "./ReportsClient";

export default async function ReportsPage() {
  const session = await auth();
  if (!session.userId) redirect("/sign-in");

  const dbUser = await prisma.user.findUnique({ where: { clerkId: session.userId } });

  const whereClause = dbUser ? { OR: [{ userId: dbUser.id }, { userId: null }] } : { id: "never_match" };

  // Fetch all businesses matching user to sync with Dashboard counts
  const businesses = await prisma.business.findMany({
    where: whereClause,
    include: { outreaches: true }
  });

  const totalAnalyzed = businesses.length;

  if (totalAnalyzed === 0) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
          <div className="h-20 w-20 bg-primary/5 rounded-full flex items-center justify-center mb-6">
            <svg className="h-10 w-10 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h1 className="text-3xl font-heading font-bold tracking-tight mb-3">No leads analyzed yet</h1>
          <p className="text-lg text-muted-foreground max-w-md mb-8">
            Head over to the Discover page to find and analyze your first leads before viewing reports.
          </p>
          <a href="/discover" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
            Discover Leads
          </a>
        </div>
      </DashboardLayout>
    );
  }

  let totalScore = 0;
  let totalReadiness = 0;
  let scoredCount = 0;
  
  let priorityData = [
    { name: "Hot", value: 0 },
    { name: "Warm", value: 0 },
    { name: "Cold", value: 0 },
  ];
  let scoreData = [
    { range: "0-30", count: 0 },
    { range: "31-60", count: 0 },
    { range: "61-80", count: 0 },
    { range: "81-100", count: 0 },
  ];

  let totalSent = 0;
  let totalReplied = 0;
  let totalMeetings = 0;

  businesses.forEach(b => {
    // Only average scores that actually exist
    if (b.leadScore !== null) {
      totalScore += b.leadScore;
      scoredCount += 1;
      
      if (b.leadScore <= 30) scoreData[0].count += 1;
      else if (b.leadScore <= 60) scoreData[1].count += 1;
      else if (b.leadScore <= 80) scoreData[2].count += 1;
      else scoreData[3].count += 1;
    }

    if (b.aiReadiness !== null) {
      totalReadiness += b.aiReadiness;
    }

    if (b.status === "Meeting Booked") totalMeetings += 1;

    // We can map priority or deduce it if it's missing (assume Cold if missing for charts)
    // Wait, prisma Business model doesn't have a `priority` field? 
    // Let's deduce priority from leadScore if it doesn't exist.
    const priority = (b as any).priority || (b.leadScore && b.leadScore > 75 ? "Hot" : b.leadScore && b.leadScore > 40 ? "Warm" : "Cold");
    
    if (priority === "Hot") priorityData[0].value += 1;
    else if (priority === "Warm") priorityData[1].value += 1;
    else priorityData[2].value += 1;

    b.outreaches?.forEach((outreach) => {
      if (outreach.type === 'Email') {
        if (outreach.status === 'Sent' || outreach.status === 'Replied') totalSent += 1;
        if (outreach.status === 'Replied') totalReplied += 1;
      }
    });
  });

  const avgScore = scoredCount > 0 ? Math.round(totalScore / scoredCount) : 0;
  const avgReadiness = scoredCount > 0 ? Math.round(totalReadiness / scoredCount) : 0;

  // Filter out priorities with 0 to make pie chart look cleaner
  priorityData = priorityData.filter(p => p.value > 0);

  const reportData = {
    totalAnalyzed,
    avgScore,
    avgReadiness,
    priorityData,
    scoreData,
    totalSent,
    totalReplied,
    totalMeetings
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Reports & Insights</h2>
          <p className="text-muted-foreground">Aggregated data from your AI lead analysis.</p>
        </div>
        
        <ReportsClient data={reportData} />
      </div>
    </DashboardLayout>
  );
}
