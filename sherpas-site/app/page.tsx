import type { Metadata } from "next";
import { DynamicHero } from "@/components/DynamicHero";
import { AIEstimatorWidget } from "@/components/AIEstimatorWidget";
import { CaseStudiesSection } from "@/components/CaseStudiesSection";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/Button";
import { ProjectSlider } from "@/components/ProjectSlider";

export const metadata: Metadata = {
  title: "Sherpas Technology — Custom AI Software & High-Converting Digital Products",
  description:
    "We design and build custom AI software, internal tools, high-converting landing pages, and Shopify e-commerce funnels for businesses in US, Australia, UK, Canada & worldwide.",
  keywords: [
    "custom AI software",
    "business automation",
    "landing page agency",
    "shopify e-commerce development",
    "muzip youtube downloader",
  ],
};

const FEATURED_SERVICES = [
  {
    title: "Custom AI Software & Automations",
    description:
      "Deploy custom AI employees, automated lead qualification bots, and workflow engines that eliminate 40+ hours of repetitive manual work every week.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
  },
  {
    title: "High-Converting Landing Pages",
    description:
      "Direct-response landing page architecture engineered to maximize conversion rates, complete with real-time live preview environments on custom subdomains.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m-0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253" />
      </svg>
    ),
  },
  {
    title: "Shopify & Turnkey E-Commerce Stores",
    description:
      "Turnkey e-commerce setups with custom Liquid theme design, winning product page funnels, supplier fulfillment automation, and lightning-fast checkout.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    ),
  },
] as const;

export default function HomePage() {
  return (
    <>
      {/* Dynamic Geo-Personalized Hero */}
      <DynamicHero />

      {/* Interactive AI ROI & Investment Estimator */}
      <AIEstimatorWidget />

      {/* Featured Tool Banner: Muzip Downloader */}
      <Section bg="muted" className="py-12 border-y border-border/50">
        <div className="rounded-2xl bg-card border border-red-500/20 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm max-w-6xl mx-auto">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-500 text-xs font-semibold uppercase tracking-wider mb-4 border border-red-500/20">
              ⚡ Free Web Tool Demo — muzip.sherpas.software
            </div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-foreground">
              Muzip — YouTube Music Playlist Downloader
            </h2>
            <p className="mt-3 text-muted-foreground leading-relaxed text-sm sm:text-base">
              Convert and download full YouTube music playlists, audio tracks, and albums to high quality <strong>MP3 (320kbps)</strong> instantly without software installation.
            </p>
          </div>
          <div className="flex-shrink-0">
            <a
              href="http://muzip.sherpas.software/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm transition-all shadow-md"
            >
              Launch Muzip (muzip.sherpas.software)
              <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </Section>

      {/* Proven Problem ➔ Solution Case Studies */}
      <CaseStudiesSection />

      {/* Featured Core Services */}
      <Section id="featured-services">
        <SectionHeading
          title="Custom Software &amp; AI Practice Areas"
          subtitle="Engineered to deliver high return on investment and measurable operational speed."
        />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {FEATURED_SERVICES.map((service) => (
            <article
              key={service.title}
              className="rounded-2xl border border-border bg-card p-8 transition-shadow duration-150 hover:shadow-md"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                {service.icon}
              </div>
              <h3 className="mt-5 text-lg font-bold text-foreground">{service.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </Section>

      {/* Subdomain Live Demos Slider */}
      <Section id="projects" bg="muted">
        <ProjectSlider />
      </Section>

      {/* Primary High-Intent Meeting Booking Section */}
      <Section id="contact" className="py-20 bg-background border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
            🔒 Risk-Free Consultation
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl text-foreground">
            Let&apos;s Build Your Custom AI Software System
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Book a 30-minute strategy session with our lead engineers. We&apos;ll analyze your business workflows, estimate your cost savings, and provide a live prototype roadmap.
          </p>

          <div className="mt-10 p-8 rounded-2xl bg-card border border-border max-w-xl mx-auto text-left shadow-lg">
            <h3 className="text-lg font-bold text-foreground mb-4">
              Schedule Your Free 30-Min Strategy Call:
            </h3>
            <form onSubmit={(e) => { e.preventDefault(); alert("Call Requested! Our senior lead engineer will reach out within 2 hours."); }} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Your Name</label>
                <input required type="text" placeholder="John Doe" className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Work Email</label>
                <input required type="email" placeholder="john@company.com" className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">What would you like to build or automate?</label>
                <textarea rows={3} placeholder="e.g. AI lead qualification, internal ERP tool, custom landing page..." className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"></textarea>
              </div>
              <button type="submit" className="w-full py-4 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base transition-all shadow-md flex items-center justify-center gap-2">
                <span>Book Strategy Call Now</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </Section>
    </>
  );
}
