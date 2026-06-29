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
    title: "Strategy & Planning",
    description:
      "We work alongside leadership teams to define clear strategic direction, assess competitive positioning, and build actionable roadmaps that drive measurable outcomes.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
      </svg>
    ),
  },
  {
    title: "Operations Improvement",
    description:
      "We diagnose bottlenecks, redesign processes, and implement systems that reduce cost, improve throughput, and create lasting operational discipline.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
      </svg>
    ),
  },
  {
    title: "Digital Transformation",
    description:
      "We guide technology adoption — from platform selection to change management — ensuring investments translate into genuine business capability.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
] as const;

const DIFFERENTIATORS = [
  {
    title: "Evidence over opinion",
    description:
      "Every recommendation is grounded in data and validated against real-world constraints. We don't prescribe frameworks — we solve problems.",
  },
  {
    title: "Execution built in",
    description:
      "Strategy without execution is just a slide deck. We stay embedded with your teams to make sure plans actually get implemented.",
  },
  {
    title: "Industry depth",
    description:
      "Our consultants bring decades of experience in financial services, healthcare, technology, and manufacturing.",
  },
  {
    title: "Measurable impact",
    description:
      "We define success metrics upfront and hold ourselves accountable to them. If we can't measure it, we don't recommend it.",
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
