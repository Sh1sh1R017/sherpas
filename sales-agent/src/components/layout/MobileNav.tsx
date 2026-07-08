"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Search, 
  Target, 
  BarChart, 
  Settings 
} from "lucide-react";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const pathname = usePathname();

  const navItems = [
    { icon: LayoutDashboard, label: "Home", href: "/" },
    { icon: Search, label: "Discover", href: "/discover" },
    { icon: Target, label: "Leads", href: "/leads" },
    { icon: BarChart, label: "Reports", href: "/reports" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex h-20 items-center justify-around border-t bg-background px-2 pb-safe md:hidden">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center gap-1 rounded-lg px-3 py-2 text-xs font-medium transition-colors",
              isActive ? "text-primary" : "text-muted-foreground hover:text-primary"
            )}
          >
            <item.icon className={cn("h-5 w-5", isActive && "fill-primary/20")} />
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
