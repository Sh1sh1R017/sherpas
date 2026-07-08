import { Sidebar } from "./Sidebar";
import { MobileHeader } from "./MobileHeader";
import { MobileNav } from "./MobileNav";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-muted/20">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <MobileHeader />
      
      {/* pt-16 accounts for MobileHeader, pb-24 accounts for MobileNav */}
      <div className="pl-0 md:pl-64 pt-16 pb-24 md:pt-0 md:pb-0">
        <main className="p-4 md:p-8">
          {children}
        </main>
      </div>

      <MobileNav />
    </div>
  );
}
