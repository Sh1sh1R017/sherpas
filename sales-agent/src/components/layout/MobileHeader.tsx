import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/ModeToggle";

export function MobileHeader() {
  return (
    <div className="fixed top-0 left-0 right-0 z-40 flex h-16 items-center justify-between border-b bg-background px-4 md:hidden">
      <a href="https://sherpas.software" className="flex items-center gap-2" target="_blank" rel="noopener noreferrer">
        <h1 className="text-xl font-bold tracking-tight text-primary">Sherpas AI</h1>
      </a>
      <div className="flex items-center gap-3">
        <ModeToggle />
        <UserButton />
      </div>
    </div>
  );
}
