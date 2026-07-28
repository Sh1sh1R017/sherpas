import { Container } from "./Container";
import { Button } from "./Button";

/**
 * Homepage hero section with headline, supporting copy, and CTAs.
 */
export function Hero() {
  return (
    <section className="pt-28 pb-16 sm:pt-36 sm:pb-20 lg:pt-44 lg:pb-28">
      <Container>
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-xs font-semibold uppercase tracking-wider text-foreground mb-6 border border-border">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Live Subdomain Demos Included
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl leading-[1.1]">
            High-converting landing pages
            <br />
            <span className="text-muted-foreground font-normal">&amp; digital products.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted leading-relaxed">
            We build high-converting landing pages with live subdomain demos, bespoke Shopify &amp; dropshipping stores, executive portfolios, high-CTR ad creative bundles, and full graphic design identity kits.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#projects" size="lg">
              Explore Live Demos
            </Button>
            <Button href="/services" variant="outline" size="lg">
              View All Services
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
