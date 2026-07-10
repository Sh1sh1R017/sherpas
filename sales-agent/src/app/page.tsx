import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  Mail, 
  PhoneCall, 
  TrendingUp,
  Sparkles,
  Search,
  ArrowRight,
  Zap,
  Briefcase,
  DollarSign,
  MessageSquare
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export const dynamic = 'force-dynamic';

function getScoreColor(score: number | null) {
  if (!score) return "bg-muted text-muted-foreground";
  if (score >= 80) return "bg-green-500/10 text-green-500 border-green-500/20";
  if (score >= 50) return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
  return "bg-red-500/10 text-red-500 border-red-500/20";
}

// Generate some mock sparkline data that looks realistic
const generateSparkline = (base: number, trend: 'up' | 'down' | 'flat') => {
  return Array.from({ length: 7 }, (_, i) => {
    const variance = (Math.random() * 0.4) - 0.2; // -20% to +20%
    const trendFactor = trend === 'up' ? 1 + (i * 0.1) : trend === 'down' ? 1 - (i * 0.1) : 1;
    return Math.max(0, Math.floor(base * trendFactor * (1 + variance)));
  });
};

export default async function Home() {
  const session = await auth();
  if (!session.userId) redirect("/sign-in");

  const dbUser = await prisma.user.findUnique({ where: { clerkId: session.userId } });

  const whereClause = dbUser ? { OR: [{ userId: dbUser.id }, { userId: null }] } : { id: "never_match" };

  const totalLeads = await prisma.business.count({ where: whereClause });
  
  const emailsSent = await prisma.outreach.count({
    where: {
      type: "Email",
      status: { in: ["Sent", "Replied"] },
      business: whereClause
    }
  });

  const replies = await prisma.outreach.count({
    where: {
      type: "Email",
      status: "Replied",
      business: whereClause
    }
  });

  const replyRate = emailsSent > 0 ? Math.round((replies / emailsSent) * 100) : 0;

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

  const recentLeads = await prisma.business.findMany({
    where: whereClause,
    orderBy: { createdAt: "desc" },
    take: 5,
    include: { outreaches: true }
  });

  // Mock Activity Feed based on recent leads
  const activities = recentLeads.map((lead, i) => {
    const types: ("discover" | "email_generated" | "email_opened" | "reply" | "meeting")[] = [
      "discover", "email_generated", "email_opened", "reply", "meeting"
    ];
    return {
      id: lead.id,
      type: types[i % types.length],
      title: `AI ${types[i % types.length] === 'discover' ? 'discovered' : 'processed'} lead`,
      timestamp: i === 0 ? "Just now" : `${i * 12} mins ago`,
      company: lead.companyName
    };
  });

  if (totalLeads === 0) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
          <div className="h-24 w-24 bg-primary/5 rounded-full flex items-center justify-center mb-8 relative">
            <div className="absolute inset-0 rounded-full border border-primary/10 animate-ping opacity-20" />
            <Sparkles className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-4xl font-heading font-bold tracking-tight mb-4 text-foreground">
            Let's find your first customers.
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg mb-10">
            Use AI to discover qualified companies in your niche and automatically generate highly personalized outreach campaigns.
          </p>
          <Link href="/discover">
            <Button size="lg" className="rounded-full px-8 h-12 text-base shadow-lg hover:shadow-primary/20 transition-all hover:-translate-y-0.5 group">
              <Search className="mr-2 h-5 w-5 group-hover:text-accent transition-colors" />
              Discover Leads
            </Button>
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-10 max-w-[1600px] mx-auto">
        
        {/* Dashboard Hero */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-2 pb-4">
          <div>
            <h1 className="text-4xl font-heading font-bold tracking-tight text-foreground mb-2">
              Good afternoon.
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Your AI has discovered <strong className="text-foreground font-semibold">{totalLeads}</strong> new companies and booked <strong className="text-foreground font-semibold">{meetingsBooked}</strong> meetings this week.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/campaigns">
              <Button variant="outline" className="rounded-full shadow-sm">
                Launch Campaign
              </Button>
            </Link>
            <Link href="/discover">
              <Button className="rounded-full shadow-md hover:shadow-lg transition-all bg-primary text-primary-foreground">
                Discover Leads
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* KPI Cards (12-column grid) */}
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <MetricCard
            title="New Leads"
            value={totalLeads}
            icon={<Users className="h-4 w-4" />}
            trend={12}
            data={generateSparkline(totalLeads || 10, 'up')}
            trendLabel="vs last week"
          />
          <MetricCard
            title="Emails Sent"
            value={emailsSent}
            icon={<Mail className="h-4 w-4" />}
            trend={-4}
            data={generateSparkline(emailsSent || 20, 'down')}
            trendLabel="vs last week"
            isGoodTrendUp={true}
          />
          <MetricCard
            title="Reply Rate"
            value={`${replyRate}%`}
            icon={<MessageSquare className="h-4 w-4" />}
            trend={2.4}
            data={generateSparkline(replyRate || 5, 'up')}
            trendLabel="vs last week"
          />
          <MetricCard
            title="Meetings Booked"
            value={meetingsBooked}
            icon={<PhoneCall className="h-4 w-4" />}
            trend={25}
            data={generateSparkline(meetingsBooked || 2, 'up')}
            trendLabel="vs last week"
          />
          <MetricCard
            title="Pipeline Value"
            value={`$${(meetingsBooked * 2500).toLocaleString()}`}
            icon={<DollarSign className="h-4 w-4" />}
            trend={15}
            data={generateSparkline(meetingsBooked * 2500 || 5000, 'up')}
            trendLabel="vs last week"
          />
          <MetricCard
            title="AI Lead Quality"
            value={`${avgLeadScore}/100`}
            icon={<Zap className="h-4 w-4" />}
            trend={5}
            data={generateSparkline(avgLeadScore || 50, 'up')}
            trendLabel="vs last week"
          />
        </div>

        {/* Main Content Area (Two Columns) */}
        <div className="grid gap-6 lg:grid-cols-12">
          
          {/* Left Column (70% on lg) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <Card className="border-border/40 shadow-sm overflow-hidden bg-card/50 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between border-b border-border/20 pb-4">
                <div>
                  <CardTitle className="text-lg">Recent Leads</CardTitle>
                  <CardDescription>Latest prospects discovered by AI.</CardDescription>
                </div>
                <Link href="/leads">
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                    View All
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-muted/30 text-xs uppercase text-muted-foreground font-semibold border-b border-border/20">
                      <tr>
                        <th className="px-6 py-4 rounded-tl-lg">Company</th>
                        <th className="px-6 py-4">Industry</th>
                        <th className="px-6 py-4">AI Score</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right rounded-tr-lg">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/20">
                      {recentLeads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-muted/20 transition-colors group">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-9 w-9 rounded-md border border-border/50">
                                <AvatarImage src={`https://avatar.vercel.sh/${lead.companyName || 'Unknown'}`} />
                                <AvatarFallback className="rounded-md">{(lead.companyName || 'Unknown').substring(0, 2).toUpperCase()}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium text-foreground">{lead.companyName || 'Unknown Company'}</div>
                                <div className="text-xs text-muted-foreground">{lead.website || 'No website'}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">
                            {lead.niche}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge variant="outline" className={`font-semibold px-2 py-0.5 ${getScoreColor(lead.leadScore)}`}>
                              {lead.leadScore || 0}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                              <span className={`h-1.5 w-1.5 rounded-full ${lead.status === 'Meeting Booked' ? 'bg-green-500' : 'bg-blue-500'}`} />
                              {lead.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8">
                              <ArrowRight className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Placeholder for Charts */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-border/40 shadow-sm bg-card/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Email Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48 flex items-center justify-center text-muted-foreground text-sm border border-dashed border-border/60 rounded-lg bg-muted/10">
                    [Email Chart Placeholder]
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border/40 shadow-sm bg-card/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Pipeline Funnel</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48 flex items-center justify-center text-muted-foreground text-sm border border-dashed border-border/60 rounded-lg bg-muted/10">
                    [Funnel Chart Placeholder]
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Column (30% on lg) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* AI Insights Card */}
            <Card className="border-border/40 shadow-sm bg-card/50 backdrop-blur-sm overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <Zap className="h-24 w-24" />
              </div>
              <CardHeader className="pb-3 border-b border-border/20">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-accent" />
                  AI Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                <div className="p-3 rounded-lg bg-muted/30 border border-border/40 hover:bg-muted/50 transition-colors">
                  <p className="text-sm font-medium leading-tight mb-1">Healthcare companies in Sydney have a <span className="text-accent">31% higher reply rate</span> this week.</p>
                  <p className="text-xs text-muted-foreground">Action: Generate tailored campaign.</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/30 border border-border/40 hover:bg-muted/50 transition-colors">
                  <p className="text-sm font-medium leading-tight mb-1">Follow up with <span className="text-accent">14 warm leads</span>.</p>
                  <p className="text-xs text-muted-foreground">Action: AI has drafted follow-up emails.</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/30 border border-border/40 hover:bg-muted/50 transition-colors">
                  <p className="text-sm font-medium leading-tight mb-1">Construction businesses are converting best.</p>
                  <p className="text-xs text-muted-foreground">Action: Shift discovery targeting.</p>
                </div>
              </CardContent>
            </Card>



          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
