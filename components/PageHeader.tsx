import { Container } from "./Container";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

/**
 * Consistent page header used at the top of inner pages.
 * Provides the page title and an optional subtitle.
 */
export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="border-b border-border bg-secondary/50 pt-32 pb-12 sm:pb-16">
      <Container>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-lg text-muted leading-relaxed">
            {subtitle}
          </p>
        )}
      </Container>
    </div>
  );
}
