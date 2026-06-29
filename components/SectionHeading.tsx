interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

/**
 * Reusable heading block for page sections.
 * Keeps typography consistent across the site.
 */
export function SectionHeading({
  title,
  subtitle,
  align = "left",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center" : "text-left";

  return (
    <div className={`mb-10 sm:mb-12 ${alignment}`}>
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-3 text-muted leading-relaxed ${
            align === "center" ? "mx-auto max-w-2xl" : "max-w-xl"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
