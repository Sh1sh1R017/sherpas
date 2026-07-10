import { Sidebar } from "./Sidebar";
import { MobileHeader } from "./MobileHeader";
import { MobileNav } from "./MobileNav";
import { Search, Bell, HelpCircle } from "lucide-react";
import { Input } from "@/components/ui/input";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-muted/20 flex">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <MobileHeader />
      
      <div className="pl-0 md:pl-64 flex flex-col flex-1 min-h-screen">
        {/* Top Navigation Bar */}
        <header className="hidden md:flex h-16 items-center justify-between px-8 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-30">
          <div className="flex-1 flex items-center gap-4">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search leads, campaigns, or actions..."
                className="w-full bg-muted/50 pl-9 border-none focus-visible:ring-1 shadow-none"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4 ml-auto">
            <button className="text-muted-foreground hover:text-foreground transition-colors relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-accent border-2 border-background" />
            </button>
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              <HelpCircle className="h-5 w-5" />
            </button>
          </div>
        </header>

        {/* pt-16 on mobile accounts for MobileHeader, pb-24 accounts for MobileNav */}
        <main className="p-4 md:p-8 flex-1 pt-20 pb-24 md:pt-8 md:pb-8">
          {children}
        </main>
      </div>

      <MobileNav />
    </div>
  );
}
