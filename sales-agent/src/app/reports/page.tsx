import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ReportsClient } from "./ReportsClient";

export default async function ReportsPage() {
  const session = await auth();
  if (!session.userId) redirect("/sign-in");

  const dbUser = await prisma.user.findUnique({ where: { clerkId: session.userId } });

  // Fetch only analyzed businesses for this user and their outreach history
  const businesses = await prisma.business.findMany({
    where: dbUser ? { userId: dbUser.id, leadScore: { not: null } } : { id: "never_match" },
    include: { outreaches: true }
  });

  const totalAnalyzed = businesses.length;
  
  let avgScore = 0;
  let avgReadiness = 0;
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

  if (totalAnalyzed > 0) {
    let totalScore = 0;
    let totalReadiness = 0;

    businesses.forEach(b => {
      const score = b.leadScore || 0;
      const readiness = b.aiReadiness || 0;
      
      totalScore += score;
      totalReadiness += readiness;

      if (b.status === "Meeting Booked") totalMeetings += 1;

      if (b.priority === "Hot") priorityData[0].value += 1;
      else if (b.priority === "Warm") priorityData[1].value += 1;
      else if (b.priority === "Cold") priorityData[2].value += 1;

      if (score <= 30) scoreData[0].count += 1;
      else if (score <= 60) scoreData[1].count += 1;
      else if (score <= 80) scoreData[2].count += 1;
      else scoreData[3].count += 1;

      b.outreaches?.forEach((outreach) => {
        if (outreach.type === 'Email') {
          if (outreach.status === 'Sent' || outreach.status === 'Replied') totalSent += 1;
          if (outreach.status === 'Replied') totalReplied += 1;
        }
      });
    });

    avgScore = Math.round(totalScore / totalAnalyzed);
    avgReadiness = Math.round(totalReadiness / totalAnalyzed);
  }

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
