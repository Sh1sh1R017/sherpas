import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  /** Use a narrower max-width for text-heavy sections. */
  narrow?: boolean;
  as?: keyof HTMLElementTagNameMap;
}

/**
 * Centered content container with responsive horizontal padding.
 * Provides consistent max-width across all pages.
 */
export function Container({
  children,
  className = "",
  narrow = false,
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag
      className={`mx-auto w-full px-4 sm:px-6 lg:px-8 ${
        narrow ? "max-w-3xl" : "max-w-6xl"
      } ${className}`}
    >
      {children}
    </Tag>
  );
}
