"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "@/components/ModeToggle";
import { 
  LayoutDashboard, 
  Search, 
  Target, 
  Mail, 
  Settings,
  BarChart,
  Megaphone,
  Briefcase
} from "lucide-react";
import { UserButton } from "@clerk/nextjs";

export function Sidebar() {
  const pathname = usePathname();

  const navGroups = [
    {
      label: "Dashboard",
      items: [
        { icon: LayoutDashboard, label: "Home", href: "/" },
      ]
    },
    {
      label: "Lead Generation",
      items: [
        { icon: Search, label: "Discover", href: "/discover" },
        { icon: Target, label: "Leads", href: "/leads" },
      ]
    },
    {
      label: "Outreach",
      items: [
        { icon: Megaphone, label: "Campaigns", href: "/campaigns" },
        { icon: Mail, label: "Email Generator", href: "/emails" },
      ]
    },
    {
      label: "Analytics",
      items: [
        { icon: BarChart, label: "Reports", href: "/reports" },
      ]
    },
    {
      label: "Settings",
      items: [
        { icon: Settings, label: "Settings", href: "/settings" },
      ]
    }
  ];

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-background flex flex-col">
      
      {/* Workspace Switcher Stub */}
      <div className="h-16 flex items-center px-4 border-b border-border/40">
        <div className="flex items-center gap-3 w-full hover:bg-muted/50 p-2 rounded-lg cursor-pointer transition-colors">
          <div className="h-8 w-8 rounded-md bg-accent/10 flex items-center justify-center text-accent">
            <Briefcase className="h-4 w-4" />
          </div>
          <div className="flex flex-col flex-1 overflow-hidden">
            <span className="text-sm font-semibold truncate">Sherpas AI</span>
            <span className="text-xs text-muted-foreground truncate">Free Plan</span>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {navGroups.map((group) => (
          <div key={group.label}>
            <h3 className="mb-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {group.label}
            </h3>
            <nav className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all relative ${
                      isActive 
                        ? "bg-accent/10 text-accent" 
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-accent rounded-r-full" />
                    )}
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      <div className="mt-auto px-3 py-4 border-t border-border/40 space-y-4">
        <div className="flex items-center justify-between px-3">
          <span className="text-sm font-medium text-muted-foreground">Theme</span>
          <ModeToggle />
        </div>
        
        <div className="px-3 py-2">
          <UserButton 
            showName 
            appearance={{ 
              elements: { 
                userButtonBox: "flex-row-reverse w-full justify-between",
                userButtonOuterIdentifier: "text-foreground font-medium text-sm",
                rootBox: "w-full"
              } 
            }} 
          />
        </div>
      </div>
    </aside>
  );
}
