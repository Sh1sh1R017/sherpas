"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, BrainCircuit, Send, Mail, Download, Trash2, MessageCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { buttonVariants } from "@/components/ui/button";

export function LeadsTable({ initialLeads }: { initialLeads: any[] }) {
  const [leads, setLeads] = useState(initialLeads);
  const [analyzingId, setAnalyzingId] = useState<string | null>(null);
  const [generatingDraftId, setGeneratingDraftId] = useState<string | null>(null);
  const [isSending, setIsSending] = useState<string | null>(null);
  
  const handleAnalyze = async (id: string) => {
    setAnalyzingId(id);
    try {
      const res = await fetch("/api/enrich", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ businessId: id }),
      });
      const data = await res.json();
      
      if (res.status === 402) {
        window.location.href = "/pricing";
        return;
      }

      if (res.ok && data.business) {
        setLeads(leads.map(l => l.id === id ? data.business : l));
        window.location.reload(); // Reload to fetch fresh DB relationships if needed, or update state manually. A reload is safer for related outreaches right now.
      }
    } catch (err) {
      console.error(err);
    } finally {
      setAnalyzingId(null);
    }
  };

  const handleGenerateDraft = async (id: string) => {
    setGeneratingDraftId(id);
    try {
      const res = await fetch("/api/outreach/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ businessId: id }),
      });
      if (res.ok) {
        window.location.reload(); // Reload to show the new draft
      } else {
        const errorData = await res.json();
        alert(errorData.error || "Failed to generate draft");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to generate draft");
    } finally {
      setGeneratingDraftId(null);
    }
  };

  const handleSend = async (outreachId: string) => {
    setIsSending(outreachId);
    try {
      const res = await fetch("/api/outreach/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ outreachId }),
      });
      
      if (res.ok) {
        window.location.reload(); // Reload to update status badge
      } else {
        const err = await res.json();
        alert(err.error || "Failed to send");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to send");
    } finally {
      setIsSending(null);
    }
  };

  const handleSendWhatsApp = async (outreachId: string, phone: string | null, content: string) => {
    if (!phone) {
      alert("No phone number available for this lead.");
      return;
    }
    const formattedPhone = phone.replace(/\D/g, '');
    const url = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(content)}`;
    
    setIsSending(outreachId);
    try {
      const res = await fetch("/api/outreach/mark-sent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ outreachId, type: 'WhatsApp' }),
      });
      
      if (res.ok) {
        window.open(url, '_blank');
        window.location.reload();
      } else {
        const err = await res.json();
        alert(err.error || "Failed to mark as sent");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to send");
    } finally {
      setIsSending(null);
    }
  };

  const handleMarkReplied = async (businessId: string) => {
    try {
      const res = await fetch("/api/outreach/reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ businessId }),
      });
      if (res.ok) {
        window.location.reload();
      } else {
        alert("Failed to mark as replied");
      }
    } catch (err) {
      console.error(err);
      alert("Error marking as replied");
    }
  };

  const handleExportCSV = () => {
    if (leads.length === 0) return;
    
    const headers = ["Business Name", "Email", "Phone", "Website", "Industry", "Owner Name", "Owner LinkedIn", "Owner Email", "AI Score", "Priority"];
    
    const csvRows = leads.map(lead => [
      `"${(lead.name || '').replace(/"/g, '""')}"`,
      `"${(lead.email || '').replace(/"/g, '""')}"`,
      `"${(lead.phone || '').replace(/"/g, '""')}"`,
      `"${(lead.website || '').replace(/"/g, '""')}"`,
      `"${(lead.industry || '').replace(/"/g, '""')}"`,
      `"${(lead.ownerName || '').replace(/"/g, '""')}"`,
      `"${(lead.ownerLinkedIn || '').replace(/"/g, '""')}"`,
      `"${(lead.ownerEmail || '').replace(/"/g, '""')}"`,
      `"${lead.leadScore || ''}"`,
      `"${lead.priority || ''}"`
    ]);

    const csvString = [
      headers.join(","),
      ...csvRows.map(row => row.join(","))
    ].join("\n");

    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "leads_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDeleteAll = async () => {
    if (!confirm("Are you sure you want to permanently delete ALL leads and drafts? This cannot be undone.")) return;
    
    try {
      const res = await fetch("/api/leads/delete-all", { method: "DELETE" });
      if (res.ok) {
        window.location.reload();
      } else {
        alert("Failed to delete leads");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete leads");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end gap-2">
        <Button variant="outline" size="sm" onClick={handleExportCSV} disabled={leads.length === 0}>
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
        <Button variant="destructive" size="sm" onClick={handleDeleteAll} disabled={leads.length === 0}>
          <Trash2 className="mr-2 h-4 w-4" />
          Delete All
        </Button>
      </div>
      <Card>
        <div className="rounded-md border overflow-x-auto pb-4">
        <Table className="min-w-[800px]">
          <TableHeader>
            <TableRow>
              <TableHead>Business</TableHead>
              <TableHead>Contact Info</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead>AI Score</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                  No leads found. Go to Discover to find some!
                </TableCell>
              </TableRow>
            )}
            {leads.map((lead) => {
              // Find the latest Email outreach draft if it exists
              const emailDraft = lead.outreaches?.find((o: any) => o.type === 'Email');

              return (
              <TableRow key={lead.id}>
                <TableCell className="max-w-[200px]">
                  <div className="font-medium truncate" title={lead.name}>{lead.name}</div>
                  {lead.website ? (
                    <a href={lead.website} target="_blank" rel="noreferrer" className="text-xs text-blue-500 hover:underline truncate block" title={lead.website}>
                      {lead.website}
                    </a>
                  ) : (
                    <div className="text-xs text-muted-foreground truncate">No website</div>
                  )}
                </TableCell>
                <TableCell className="max-w-[200px]">
                  <div className="text-sm truncate" title={lead.ownerEmail || lead.email || ''}>{lead.ownerEmail || lead.email || 'No email'}</div>
                  <div className="text-xs text-muted-foreground truncate" title={lead.phone || ''}>{lead.phone || 'No phone'}</div>
                </TableCell>
                <TableCell><Badge variant="outline">{lead.industry}</Badge></TableCell>
                <TableCell>
                  {lead.leadScore !== null ? (
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-16 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary" 
                          style={{ width: `${lead.leadScore}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold">{lead.leadScore}</span>
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground">Unscored</span>
                  )}
                </TableCell>
                <TableCell>
                  {lead.priority === 'Super Hot' && <Badge className="bg-purple-600 animate-pulse text-white hover:bg-purple-700">Super Hot 🔥</Badge>}
                  {lead.priority === 'Hot' && <Badge className="bg-red-500 hover:bg-red-600">Hot</Badge>}
                  {lead.priority === 'Warm' && <Badge className="bg-orange-500 hover:bg-orange-600">Warm</Badge>}
                  {lead.priority === 'Cold' && <Badge variant="secondary">Cold</Badge>}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2 flex-wrap">
                    
                    {/* Always visible analyze button */}
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleAnalyze(lead.id)}
                      disabled={analyzingId === lead.id}
                      title={lead.leadScore ? "Re-analyze" : "Analyze"}
                    >
                      {analyzingId === lead.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <BrainCircuit className="h-4 w-4" />}
                      {!lead.leadScore && <span className="ml-2">Analyze</span>}
                    </Button>

                    {lead.leadScore ? (
                      <>
                        <Button 
                          variant="secondary" 
                          size="sm"
                          className="relative overflow-hidden"
                          disabled={generatingDraftId === lead.id}
                          onClick={() => handleGenerateDraft(lead.id)}
                        >
                          <div 
                            className="absolute left-0 top-0 bottom-0 bg-green-500/30 transition-all duration-[5000ms] ease-out" 
                            style={{ width: generatingDraftId === lead.id ? '95%' : '0%' }} 
                          />
                          <span className="relative z-10 flex items-center">
                            {generatingDraftId === lead.id ? <Loader2 className="h-4 w-4 animate-spin mr-2 text-green-700" /> : null}
                            {generatingDraftId === lead.id ? 'Writing Draft...' : (emailDraft ? 'Regenerate Draft' : 'Make Draft')}
                          </span>
                        </Button>

                        {emailDraft && (
                          <Dialog>
                            <DialogTrigger className={buttonVariants({ variant: "default", size: "sm" })}>
                                <Mail className="mr-2 h-4 w-4" />
                                {emailDraft.status === 'Sent' ? 'View Sent' : 'Review Draft'}
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>{lead.name} - Email Draft</DialogTitle>
                              </DialogHeader>
                              <div className="mt-4">
                                <div className="bg-muted p-4 rounded-md text-sm whitespace-pre-wrap max-h-96 overflow-y-auto">
                                  {emailDraft.content}
                                </div>
                                <div className="mt-4 flex justify-end gap-2">
                                  {emailDraft.status === 'Sent' && lead.status !== 'Replied' && (
                                    <Button 
                                      variant="outline" 
                                      onClick={() => handleMarkReplied(lead.id)}
                                    >
                                      Mark as Replied
                                    </Button>
                                  )}
                                  {lead.phone && (
                                    <Button
                                      variant="secondary"
                                      disabled={emailDraft.status === 'Sent' || isSending === emailDraft.id}
                                      onClick={() => handleSendWhatsApp(emailDraft.id, lead.phone, emailDraft.content)}
                                    >
                                      {isSending === emailDraft.id ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <MessageCircle className="mr-2 h-4 w-4" />}
                                      WhatsApp
                                    </Button>
                                  )}
                                  <Button 
                                    variant="default" 
                                    disabled={emailDraft.status === 'Sent' || isSending === emailDraft.id}
                                    onClick={() => handleSend(emailDraft.id)}
                                  >
                                    {isSending === emailDraft.id ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                                    {emailDraft.status === 'Sent' ? 'Already Sent' : 'Send Email'}
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        )}
                      </>
                    ) : null}

                  </div>
                </TableCell>
              </TableRow>
            )})}
          </TableBody>
        </Table>
        </div>
      </Card>
    </div>
  );
}
