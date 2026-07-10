"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Rocket } from "lucide-react";

export default function DemoRequestForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State
  const [leadVolume, setLeadVolume] = useState([1000]);
  const [urgency, setUrgency] = useState("1-3 Months");
  const [salesTeamSize, setSalesTeamSize] = useState("2-5 Reps");
  
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      company: formData.get("company"),
      budget: leadVolume[0], // map to backend field
      timeline: urgency, // map to backend field
      companySize: salesTeamSize, // map to backend field
      message: formData.get("challenge"),
    };

    try {
      const response = await fetch("/api/lead-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("Error submitting form.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
        <Card className="w-full max-w-lg text-center py-12">
          <Rocket className="mx-auto h-16 w-16 text-primary mb-6" />
          <CardTitle className="text-3xl mb-2">Demo Requested!</CardTitle>
          <CardDescription className="text-lg">
            Thanks for your interest in Sherpas AI Sales Agent. We'll be in touch shortly to show you how to put your outbound sales on autopilot.
          </CardDescription>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <Card className="w-full max-w-2xl shadow-lg border-primary/10">
        <CardHeader className="text-center space-y-2 pb-8">
          <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <Bot className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight">Automate Your Outbound Sales</CardTitle>
          <CardDescription className="text-base">
            See how Sherpas AI can discover leads, score them, and send hyper-personalized emails on autopilot. Request a live demo today.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input id="name" name="name" required placeholder="Jane Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Work Email *</Label>
                <Input id="email" name="email" type="email" required placeholder="jane@company.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company Name</Label>
                <Input id="company" name="company" placeholder="Acme Corp" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" name="phone" type="tel" placeholder="+1 (555) 000-0000" />
              </div>
            </div>

            <div className="space-y-4">
              <Label>Target Lead Volume (Monthly): {leadVolume[0].toLocaleString()} leads</Label>
              <div className="pt-4 px-2">
                <Slider 
                  value={leadVolume} 
                  onValueChange={(val) => setLeadVolume(val as number[])} 
                  max={20000} 
                  step={500} 
                  className="w-full"
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0</span>
                <span>10k</span>
                <span>20k+</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>When do you want to deploy AI?</Label>
                <Select value={urgency} onValueChange={(val) => val && setUrgency(val)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select timeline" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Immediate">Immediate</SelectItem>
                    <SelectItem value="1-3 Months">1-3 Months</SelectItem>
                    <SelectItem value="3-6 Months">3-6 Months</SelectItem>
                    <SelectItem value="Just Exploring">Just Exploring</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Current Sales Team Size</Label>
                <Select value={salesTeamSize} onValueChange={(val) => val && setSalesTeamSize(val)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Just Me">Just Me</SelectItem>
                    <SelectItem value="2-5 Reps">2-5 Reps</SelectItem>
                    <SelectItem value="6-15 Reps">6-15 Reps</SelectItem>
                    <SelectItem value="16-50 Reps">16-50 Reps</SelectItem>
                    <SelectItem value="50+ Reps">50+ Reps</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="challenge">What is your biggest sales challenge?</Label>
              <Textarea 
                id="challenge" 
                name="challenge" 
                placeholder="e.g., We spend too much time manually scraping leads and not enough time closing..."
                className="min-h-[100px]"
              />
            </div>

            <Button type="submit" className="w-full h-12 text-lg" disabled={isSubmitting}>
              {isSubmitting ? "Requesting..." : "Request Live Demo"}
              {!isSubmitting && <Rocket className="ml-2 h-5 w-5" />}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
