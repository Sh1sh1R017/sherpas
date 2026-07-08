"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, Loader2 } from "lucide-react";
import { useUser } from "@clerk/nextjs";

export function RewardButton() {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const handleWatchAd = () => {
    setIsLoading(true);
    
    // In a real implementation, you would trigger the Google Ad Manager Rewarded Web Tag here.
    // Documentation: https://developers.google.com/publisher-tag/guides/rewarded-web
    // Example: googletag.pubads().display('/1234567/rewarded_ad_unit', ...);
    
    // Simulate watching a 10 second ad
    console.log("Requesting Ad for user:", user?.id);
    
    setTimeout(() => {
      // Simulate ad completion - the GAM iframe would normally trigger a callback here,
      // and GAM's servers would hit our webhook.
      alert("Thanks for watching our sponsor! 3 AI Analyses have been added to your account.");
      setIsLoading(false);
    }, 10000);
  };

  return (
    <Button 
      onClick={handleWatchAd} 
      disabled={isLoading || !user}
      className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-sm transition-all flex items-center gap-2"
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Play className="h-4 w-4" />
      )}
      {isLoading ? "Watching Sponsor Message..." : "Watch 10s Ad for 3 Credits"}
    </Button>
  );
}
