"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Loader2, LogOut } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

export default function PricingPage() {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to start checkout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col items-center justify-center py-12 px-4 text-center relative">
      <div className="absolute top-4 right-4 flex items-center gap-4">
        <UserButton afterSignOutUrl="/sign-in" />
      </div>

      <div className="max-w-3xl w-full flex flex-col items-center">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">
          You've reached your free limit!
        </h1>
        <p className="text-xl text-muted-foreground mb-12 max-w-2xl">
          Upgrade to the Pro plan to unlock unlimited AI-powered lead generation, infinite analyses, and endless email drafts.
        </p>

        <div className="relative rounded-2xl border border-primary/20 bg-card p-8 shadow-xl max-w-md w-full">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 rounded-full bg-primary px-3 py-1 text-sm font-semibold text-primary-foreground">
            Most Popular
          </div>
          
          <div className="mb-8">
            <h3 className="text-2xl font-bold">Sherpas Lead Agent</h3>
            <div className="mt-4 flex items-baseline justify-center text-5xl font-extrabold">
              $9
              <span className="ml-1 text-xl font-medium text-muted-foreground">/mo</span>
            </div>
          </div>

          <ul className="mb-8 space-y-4 text-left">
            <li className="flex items-center">
              <Check className="h-5 w-5 text-primary mr-2" />
              <span>Unlimited AI Lead Discovery</span>
            </li>
            <li className="flex items-center">
              <Check className="h-5 w-5 text-primary mr-2" />
              <span>Unlimited Website Analysis</span>
            </li>
            <li className="flex items-center">
              <Check className="h-5 w-5 text-primary mr-2" />
              <span>Unlimited Outreach Drafts</span>
            </li>
            <li className="flex items-center">
              <Check className="h-5 w-5 text-primary mr-2" />
              <span>Priority Support</span>
            </li>
          </ul>

          <Button 
            className="w-full text-lg h-12" 
            size="lg"
            onClick={handleSubscribe}
            disabled={loading}
          >
            {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
            {loading ? "Processing..." : "Upgrade to Pro"}
          </Button>
        </div>
      </div>
    </div>
  );
}
