import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/ModeToggle";
import { 
  LayoutDashboard, 
  Users, 
  Search, 
  Mail, 
  MessageSquare, 
  Settings,
  BarChart,
  Target
} from "lucide-react";
export function Sidebar() {
  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/" },
    { icon: Search, label: "Discover", href: "/discover" },
    { icon: Target, label: "Leads", href: "/leads" },
    { icon: BarChart, label: "Reports", href: "/reports" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-background">
      <div className="flex h-full flex-col px-3 py-4">
        <Link href="https://sherpas.software" target="_blank" rel="noopener noreferrer" className="mb-8 px-3 block hover:opacity-80 transition-opacity">
          <h1 className="text-xl font-bold tracking-tight text-primary">Sherpas AI</h1>
          <p className="text-xs text-muted-foreground">Sales Agent Platform</p>
        </Link>
        
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-muted hover:text-primary"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto px-3 py-4 border-t border-border/40 space-y-4">

          <div className="space-y-2">
          <ModeToggle />
          <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-muted">
            <UserButton />
            <div className="flex flex-col">
              <span className="text-sm font-medium">My Account</span>
            </div>
          </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
