"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Wand2, Send, Save, RefreshCw, AlertCircle, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function EmailGeneratorClient({ businesses }: { businesses: any[] }) {
  const router = useRouter();
  const [selectedLeadId, setSelectedLeadId] = useState<string>("");
  const [tone, setTone] = useState("Professional and concise");
  const [goal, setGoal] = useState("Book a 10-minute intro call");
  const [context, setContext] = useState("");
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [draftSubject, setDraftSubject] = useState("");
  const [draftContent, setDraftContent] = useState("");
  const [isSending, setIsSending] = useState(false);

  const selectedLead = businesses.find(b => b.id === selectedLeadId);

  const handleGenerate = async () => {
    if (!selectedLeadId) return toast.error("Please select a lead first");

    setIsGenerating(true);
    try {
      const res = await fetch("/api/outreach/generate-custom", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessId: selectedLeadId,
          tone,
          goal,
          context
        })
      });

      const data = await res.json();
      if (res.ok) {
        setDraftSubject(data.subject);
        setDraftContent(data.content);
        toast.success("Draft generated!");
      } else {
        toast.error(data.error || "Failed to generate draft");
      }
    } catch (e) {
      toast.error("An error occurred");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSend = async () => {
    if (!selectedLeadId || !draftContent) return;

    setIsSending(true);
    try {
      const res = await fetch("/api/outreach/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          businessId: selectedLeadId, 
          emailBody: draftContent,
          subject: draftSubject
        }),
      });

      if (res.ok) {
        toast.success("Email sent successfully!");
        router.refresh();
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to send email");
      }
    } catch (err) {
      toast.error("An error occurred");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-heading font-bold tracking-tight">Email Generator</h1>
        <p className="text-muted-foreground mt-1">Craft hyper-personalized emails leveraging AI and your lead data.</p>
      </div>

      <div className="grid lg:grid-cols-[1fr_400px] gap-6 items-start">
        <div className="space-y-6">
          <Card className="border-border/40 shadow-sm">
            <CardHeader>
              <CardTitle>Generation Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label>Select Target Lead</Label>
                <Select value={selectedLeadId} onValueChange={val => val && setSelectedLeadId(val)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a lead that has been analyzed..." />
                  </SelectTrigger>
                  <SelectContent>
                    {businesses.length === 0 && <SelectItem value="none" disabled>No analyzed leads found</SelectItem>}
                    {businesses.map(b => (
                      <SelectItem key={b.id} value={b.id}>
                        {b.name} {b.leadScore ? `(Score: ${b.leadScore})` : ''}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Tone</Label>
                  <Select value={tone} onValueChange={val => val && setTone(val)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Professional and concise">Professional & Concise</SelectItem>
                      <SelectItem value="Casual and friendly">Casual & Friendly</SelectItem>
                      <SelectItem value="Direct and urgent">Direct & Urgent</SelectItem>
                      <SelectItem value="Consultative and helpful">Consultative</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Goal</Label>
                  <Select value={goal} onValueChange={val => val && setGoal(val)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Book a 10-minute intro call">Book a meeting</SelectItem>
                      <SelectItem value="Introduce our product/service">Intro Product</SelectItem>
                      <SelectItem value="Ask for the right person to contact">Find Right Contact</SelectItem>
                      <SelectItem value="Follow-up on previous outreach">Follow-up</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-2">
                <Label>Custom Context / Instructions (Optional)</Label>
                <Textarea 
                  placeholder="E.g., Mention our new summer discount, or reference their recent LinkedIn post..."
                  value={context}
                  onChange={e => setContext(e.target.value)}
                  className="h-20"
                />
              </div>

              <Button onClick={handleGenerate} disabled={isGenerating || !selectedLeadId} className="w-full">
                {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                Generate Draft
              </Button>
            </CardContent>
          </Card>

          {draftContent && (
            <Card className="border-border/40 shadow-sm border-primary/20">
              <CardHeader className="pb-3 border-b border-border/40 bg-muted/20">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    AI Generated Draft
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={handleGenerate} disabled={isGenerating}>
                      <RefreshCw className="h-3 w-3 mr-2" /> Regenerate
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                <div className="grid gap-2">
                  <Label>Subject Line</Label>
                  <Input value={draftSubject} onChange={e => setDraftSubject(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label>Email Body</Label>
                  <Textarea 
                    value={draftContent} 
                    onChange={e => setDraftContent(e.target.value)}
                    className="min-h-[250px] font-mono text-sm leading-relaxed"
                  />
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <Button variant="outline"><Save className="mr-2 h-4 w-4" /> Save as Draft</Button>
                  <Button onClick={handleSend} disabled={isSending}>
                    {isSending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                    Send Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Transparency Panel */}
        <div className="sticky top-6 space-y-6">
          {selectedLead ? (
            <Card className="border-border/40 shadow-sm bg-muted/10">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-primary" />
                  AI Context Injection
                </CardTitle>
                <CardDescription>Data used to personalize this email</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div>
                  <span className="font-semibold text-foreground block mb-1">Company Info</span>
                  <p className="text-muted-foreground">{selectedLead.name} ({selectedLead.industry || selectedLead.businessCategory || 'Unknown'})</p>
                </div>
                {selectedLead.leadScore && (
                  <div>
                    <span className="font-semibold text-foreground block mb-1">Lead Score</span>
                    <Badge variant="outline" className={selectedLead.leadScore > 70 ? "text-emerald-500 border-emerald-500/30" : ""}>
                      {selectedLead.leadScore}/100
                    </Badge>
                  </div>
                )}
                <div>
                  <span className="font-semibold text-foreground block mb-1">Detected Pain Points</span>
                  <p className="text-muted-foreground line-clamp-3">{selectedLead.painPoints || "None detected yet"}</p>
                </div>
                <div>
                  <span className="font-semibold text-foreground block mb-1">Detected Opportunities</span>
                  <p className="text-muted-foreground line-clamp-3">{selectedLead.opportunities || "None detected yet"}</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-border/40 border-dashed bg-transparent shadow-none">
              <CardContent className="pt-6 text-center text-muted-foreground flex flex-col items-center justify-center min-h-[200px]">
                <Wand2 className="h-8 w-8 mb-3 opacity-20" />
                <p className="text-sm">Select a lead to see what data the AI will use to write the email.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
