import { Container } from "./Container";
import { Button } from "./Button";

/**
 * Homepage hero section with headline, supporting copy, and CTAs.
 * Uses generous whitespace and restrained typography.
 */
export function Hero() {
  return (
    <section className="pt-28 pb-16 sm:pt-36 sm:pb-20 lg:pt-44 lg:pb-28">
      <Container>
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-muted tracking-wide uppercase mb-4">
            Strategic Business Advisory
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl leading-[1.1]">
            Navigate complexity.
            <br />
            Build with clarity.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted leading-relaxed">
            We partner with organizations to solve their most challenging
            problems — from operational strategy to digital transformation —
            with pragmatic, evidence-based solutions.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/services" size="lg">
              Our services
            </Button>
            <Button href="/contact" variant="outline" size="lg">
              Talk to us
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
