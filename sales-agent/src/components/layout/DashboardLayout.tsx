import { Sidebar } from "./Sidebar";
import { MobileHeader } from "./MobileHeader";
import { MobileNav } from "./MobileNav";
import { AdSenseAd } from "@/components/AdSenseAd";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-muted/20">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <MobileHeader />
      
      {/* pt-16 accounts for MobileHeader, pb-24 accounts for MobileNav */}
      <div className="pl-0 md:pl-64 pt-16 pb-24 md:pt-0 md:pb-0 flex flex-col min-h-screen">
        <main className="p-4 md:p-8 flex-1">
          {children}
        </main>
        
        {/* Global Footer Banner Ad */}
        <div className="px-4 md:px-8 pb-4">
          <AdSenseAd 
            client="ca-pub-6935968314275395" 
            slot="1234567890" // User needs to update this with their actual slot ID
            format="horizontal"
          />
        </div>
      </div>

      <MobileNav />
    </div>
  );
}
