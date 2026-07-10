"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Rocket, Target, Play, Pause, CheckCircle2, MoreHorizontal, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function CampaignsClient({ initialCampaigns, businesses }: { initialCampaigns: any[], businesses: any[] }) {
  const router = useRouter();
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [isCreating, setIsCreating] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const [newCampaignName, setNewCampaignName] = useState("");
  const [newCampaignEmail, setNewCampaignEmail] = useState("");
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);

  const handleCreateCampaign = async () => {
    if (!newCampaignName) return toast.error("Campaign name is required");
    if (selectedLeads.length === 0) return toast.error("Select at least one lead");

    setIsCreating(true);
    try {
      const res = await fetch("/api/campaigns/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newCampaignName,
          businessIds: selectedLeads,
          emailBody: newCampaignEmail
        })
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Campaign created successfully!");
        setIsDialogOpen(false);
        router.refresh(); // Will trigger a refetch of campaigns
      } else {
        toast.error(data.error || "Failed to create campaign");
      }
    } catch (e) {
      toast.error("An error occurred");
    } finally {
      setIsCreating(false);
    }
  };

  const toggleLeadSelection = (id: string) => {
    if (selectedLeads.includes(id)) {
      setSelectedLeads(selectedLeads.filter(l => l !== id));
    } else {
      setSelectedLeads([...selectedLeads, id]);
    }
  };

  if (campaigns.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
        <div className="h-20 w-20 bg-primary/5 rounded-full flex items-center justify-center mb-6">
          <Rocket className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="text-3xl font-heading font-bold tracking-tight mb-3">No campaigns running</h1>
        <p className="text-lg text-muted-foreground max-w-md mb-8">
          Group your leads into campaigns to send targeted email sequences and track reply rates on autopilot.
        </p>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8">
            Launch your first campaign
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Campaign</DialogTitle>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="grid gap-2">
                <Label>Campaign Name</Label>
                <Input value={newCampaignName} onChange={e => setNewCampaignName(e.target.value)} placeholder="e.g. Q3 NYC Restaurants" />
              </div>
              <div className="grid gap-2">
                <Label>Target Leads ({selectedLeads.length} selected)</Label>
                <div className="border border-border rounded-md max-h-48 overflow-y-auto p-2 space-y-1">
                  {businesses.length === 0 ? (
                    <p className="text-sm text-muted-foreground p-2">No leads available. Go to Discover to find leads first.</p>
                  ) : (
                    businesses.map((b) => (
                      <div key={b.id} className="flex items-center gap-2 p-2 hover:bg-muted/50 rounded cursor-pointer" onClick={() => toggleLeadSelection(b.id)}>
                        <input type="checkbox" checked={selectedLeads.includes(b.id)} readOnly className="rounded border-border bg-background" />
                        <span className="text-sm font-medium">{b.name}</span>
                        {b.leadScore && <Badge variant="outline" className="ml-auto text-xs">{b.leadScore}/100</Badge>}
                      </div>
                    ))
                  )}
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Email Sequence Draft (Optional)</Label>
                <Textarea 
                  className="min-h-[150px]"
                  placeholder="You can write a draft sequence here, or generate them per-lead later..."
                  value={newCampaignEmail}
                  onChange={e => setNewCampaignEmail(e.target.value)}
                />
              </div>
              <Button onClick={handleCreateCampaign} disabled={isCreating || selectedLeads.length === 0}>
                {isCreating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Launch Campaign
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold tracking-tight">Campaigns</h1>
          <p className="text-muted-foreground mt-1">Manage your automated outreach sequences.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2">
            <Rocket className="h-4 w-4" />
            New Campaign
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Campaign</DialogTitle>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="grid gap-2">
                <Label>Campaign Name</Label>
                <Input value={newCampaignName} onChange={e => setNewCampaignName(e.target.value)} placeholder="e.g. Q3 NYC Restaurants" />
              </div>
              <div className="grid gap-2">
                <Label>Target Leads ({selectedLeads.length} selected)</Label>
                <div className="border border-border rounded-md max-h-48 overflow-y-auto p-2 space-y-1">
                  {businesses.length === 0 ? (
                    <p className="text-sm text-muted-foreground p-2">No leads available.</p>
                  ) : (
                    businesses.map((b) => (
                      <div key={b.id} className="flex items-center gap-2 p-2 hover:bg-muted/50 rounded cursor-pointer" onClick={() => toggleLeadSelection(b.id)}>
                        <input type="checkbox" checked={selectedLeads.includes(b.id)} readOnly className="rounded border-border bg-background" />
                        <span className="text-sm font-medium">{b.name}</span>
                        {b.leadScore && <Badge variant="outline" className="ml-auto text-xs">{b.leadScore}/100</Badge>}
                      </div>
                    ))
                  )}
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Email Sequence Draft (Optional)</Label>
                <Textarea 
                  className="min-h-[150px]"
                  placeholder="You can write a draft sequence here, or generate them per-lead later..."
                  value={newCampaignEmail}
                  onChange={e => setNewCampaignEmail(e.target.value)}
                />
              </div>
              <Button onClick={handleCreateCampaign} disabled={isCreating || selectedLeads.length === 0}>
                {isCreating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Launch Campaign
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-border/40 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border/40 hover:bg-transparent">
                <TableHead>Campaign</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">Leads</TableHead>
                <TableHead className="text-center">Sent</TableHead>
                <TableHead className="text-center">Reply Rate</TableHead>
                <TableHead className="text-right">Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.map((campaign) => {
                const totalLeads = campaign.outreaches?.length || 0;
                const sentEmails = campaign.outreaches?.filter((o: any) => o.status === "Sent" || o.status === "Replied").length || 0;
                const replies = campaign.outreaches?.filter((o: any) => o.status === "Replied").length || 0;
                const replyRate = sentEmails > 0 ? Math.round((replies / sentEmails) * 100) : 0;
                
                return (
                  <TableRow key={campaign.id} className="border-border/40 cursor-pointer hover:bg-muted/30" onClick={() => router.push(`/campaigns/${campaign.id}`)}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-primary" />
                        {campaign.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      {campaign.status === "Draft" ? (
                        <Badge variant="outline" className="bg-muted text-muted-foreground">Draft</Badge>
                      ) : campaign.status === "Active" ? (
                        <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                          <Play className="h-3 w-3 mr-1" /> Active
                        </Badge>
                      ) : (
                        <Badge variant="outline">{campaign.status}</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-center text-muted-foreground">{totalLeads}</TableCell>
                    <TableCell className="text-center text-muted-foreground">{sentEmails}</TableCell>
                    <TableCell className="text-center">
                      {replyRate > 0 ? (
                        <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">{replyRate}%</Badge>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground text-sm">
                      {new Date(campaign.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
