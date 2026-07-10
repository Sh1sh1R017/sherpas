"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Send, Users, Activity, MessageCircle, Mail } from "lucide-react";
import Link from "next/link";

export function CampaignDetailsClient({ campaign }: { campaign: any }) {
  const totalLeads = campaign.outreaches?.length || 0;
  const sentEmails = campaign.outreaches?.filter((o: any) => o.status === "Sent" || o.status === "Replied").length || 0;
  const replies = campaign.outreaches?.filter((o: any) => o.status === "Replied").length || 0;
  const replyRate = sentEmails > 0 ? Math.round((replies / sentEmails) * 100) : 0;

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/campaigns">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-heading font-bold tracking-tight">{campaign.name}</h1>
          <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
            <span>Created {new Date(campaign.createdAt).toLocaleDateString()}</span>
            <span>•</span>
            <Badge variant="outline" className={campaign.status === "Active" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : ""}>
              {campaign.status}
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border/40 bg-card/50 shadow-sm backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Targeted Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLeads}</div>
          </CardContent>
        </Card>
        <Card className="border-border/40 bg-card/50 shadow-sm backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Emails Sent</CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sentEmails}</div>
          </CardContent>
        </Card>
        <Card className="border-border/40 bg-card/50 shadow-sm backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Replies</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{replies}</div>
          </CardContent>
        </Card>
        <Card className="border-border/40 bg-card/50 shadow-sm backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reply Rate</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{replyRate}%</div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/40 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border/40 bg-muted/20">
          <h3 className="font-semibold text-lg">Lead Status</h3>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border/40 hover:bg-transparent">
                <TableHead>Company</TableHead>
                <TableHead>Industry</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaign.outreaches?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No leads in this campaign.
                  </TableCell>
                </TableRow>
              ) : (
                campaign.outreaches?.map((outreach: any) => (
                  <TableRow key={outreach.id} className="border-border/40 hover:bg-muted/30">
                    <TableCell className="font-medium">{outreach.business?.name}</TableCell>
                    <TableCell className="text-muted-foreground">{outreach.business?.industry || outreach.business?.businessCategory || "-"}</TableCell>
                    <TableCell>
                      {outreach.business?.leadScore ? (
                        <Badge variant="outline">{outreach.business.leadScore}/100</Badge>
                      ) : "-"}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={
                        outreach.status === "Sent" ? "bg-blue-500/10 text-blue-500 border-blue-500/20" :
                        outreach.status === "Replied" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                        "bg-muted text-muted-foreground"
                      }>
                        {outreach.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Link href={`/leads`}>
                        <Button variant="ghost" size="sm">View Lead</Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
