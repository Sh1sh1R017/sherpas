import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/Button";
import { ProjectSlider } from "@/components/ProjectSlider";

export const metadata: Metadata = {
  title: "Sherpas Technology — Strategic Business Advisory",
  description:
    "Sherpas Technology helps organizations navigate complex business challenges with expert strategy, operations consulting, and digital transformation services.",
};

/* ────────────────────────────────────────────────────
 * Inline data for the homepage — keeps the page self-contained
 * while avoiding imports from a separate data file.
 * ─────────────────────────────────────────────────── */

const FEATURED_SERVICES = [
  {
    title: "High-Converting Landing Pages",
    description:
      "Direct-response landing page architecture built for max conversion rates, complete with real-time live preview environments deployed on custom subdomains.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m-0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253" />
      </svg>
    ),
  },
  {
    title: "Shopify & Dropshipping Stores",
    description:
      "Turnkey e-commerce setups with custom theme design, winning product page funnels, supplier fulfillment integration, and lightning-fast checkout.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    ),
  },
  {
    title: "Ad Bundles & Graphic Design",
    description:
      "High-CTR Meta, TikTok & Google ad creatives, UGC hooks, logo brand suites, packaging design, and complete visual marketing asset packs.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l9.602-9.602a3.75 3.75 0 015.304 5.304l-9.602 9.602" />
      </svg>
    ),
  },
] as const;

const DIFFERENTIATORS = [
  {
    title: "Live Subdomain Previews",
    description:
      "Test and interact with your custom built landing pages and e-commerce stores on a live sub-domain before going live.",
  },
  {
    title: "Conversion-Engineered Architecture",
    description:
      "Every layout, CTA, and color choice is engineered to reduce cost-per-acquisition (CAC) and maximize conversion rates.",
  },
  {
    title: "Turnkey E-Commerce Launches",
    description:
      "From product page sourcing to custom payment gateways and automated dropship supplier links, we build ready-to-scale stores.",
  },
  {
    title: "Unified Ad & Brand Creative Bundles",
    description:
      "Cohesive ad creatives, video hooks, graphic assets, and landing pages designed to deliver a seamless customer journey.",
  },
];

/* ────────────────────────────────────────────────────
 * Page Component
 * ─────────────────────────────────────────────────── */

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <Hero />

      {/* Featured Services */}
      <Section bg="muted" id="featured-services">
        <SectionHeading
          title="What we do"
          subtitle="We focus on three core practice areas where we consistently deliver impact."
        />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED_SERVICES.map((service) => (
            <article
              key={service.title}
              className="rounded-md border border-border bg-card p-6 transition-shadow duration-150 hover:shadow-sm"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-secondary text-foreground">
                {service.icon}
              </div>
              <h3 className="mt-4 text-base font-semibold">{service.title}</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">
                {service.description}
              </p>
            </article>
          ))}
        </div>
        <div className="mt-10">
          <Button href="/services" variant="outline">
            View all services
          </Button>
        </div>
      </Section>

      {/* Projects Slider */}
      <Section id="projects">
        <ProjectSlider />
      </Section>

      {/* Why Choose Us */}
      <Section bg="muted" id="why-us">
        <SectionHeading
          title="Why work with us"
          subtitle="We've built our practice around principles that matter to the organisations we serve."
        />
        <div className="grid gap-y-8 gap-x-12 sm:grid-cols-2">
          {DIFFERENTIATORS.map((item, i) => (
            <div key={item.title} className="flex gap-4">
              <span className="flex-shrink-0 mt-1 text-xs font-semibold text-muted tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-base font-semibold">{item.title}</h3>
                <p className="mt-1.5 text-sm text-muted leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section id="cta">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Ready to move forward?
          </h2>
          <p className="mt-3 mx-auto max-w-xl text-muted leading-relaxed">
            Whether you&apos;re facing a specific challenge or exploring long-term
            strategy, we&apos;d like to hear from you.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Button href="/contact" size="lg">
              Start a conversation
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
