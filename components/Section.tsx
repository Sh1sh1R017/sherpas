import type { ReactNode } from "react";
import { Container } from "./Container";

interface SectionProps {
  children: ReactNode;
  className?: string;
  /** Background color variant. */
  bg?: "default" | "muted";
  id?: string;
  narrow?: boolean;
}

/**
 * Page section wrapper with consistent vertical spacing
 * and optional muted background.
 */
export function Section({
  children,
  className = "",
  bg = "default",
  id,
  narrow = false,
}: SectionProps) {
  const bgStyles = bg === "muted" ? "bg-secondary" : "";

  return (
    <section
      id={id}
      className={`py-16 sm:py-20 lg:py-24 ${bgStyles} ${className}`}
    >
      <Container narrow={narrow}>{children}</Container>
    </section>
  );
}
