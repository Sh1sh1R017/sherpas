"use client";

import { useGeo } from "@/context/GeoContext";

export function CaseStudiesSection() {
  const { geo } = useGeo();

  const CASES = [
    {
      title: "Logistics & Dispatching AI Platform",
      client: `Apex Freight (${geo.cities[0] || "Austin, TX"})`,
      problem: "Manual fleet dispatching required 6 full-time staff spending 30+ hours/week on phones and spreadsheet logs.",
      solution: "Built a custom AI dispatch bot that reads SMS/Email load requests, matches available drivers in real-time, and generates automated routing.",
      tech: ["Next.js 16", "OpenAI GPT-4o", "TailwindCSS", "Twilio API", "PostgreSQL"],
      result: `${geo.symbol}340,000 / Year Saved · 70% Manual Time Reduction`,
      testimonial: `"Sherpas built our AI dispatching system in 3 weeks. It reduced our manual operations by 70% and added $340k in annual savings."`,
      author: geo.testimonialAuthor,
      demoLink: "https://demo.sherpas.software",
      subdomain: "demo.sherpas.software",
    },
    {
      title: "Custom Shopify Liquid Store & Funnel",
      client: `Nordic Commerce (${geo.cities[1] || "Toronto"})`,
      problem: "Standard Shopify theme had slow page load times (3.8s LCP) and a low 1.2% checkout conversion rate.",
      solution: "Redesigned custom Liquid theme with instant slide-out cart upsells, high-converting product landing pages, and optimized asset bundling.",
      tech: ["Shopify Liquid", "Hydrogen Headless", "TailwindCSS", "Meta Ad Pixels"],
      result: "2.4x Higher Conversion Rate · +38% Increase in Average Order Value (AOV)",
      testimonial: `"Their conversion-focused approach doubled our online lead volume in less than 30 days. Incredible execution."`,
      author: "Sophie Tremblay",
      demoLink: "https://shopify.sherpas.software",
      subdomain: "shopify.sherpas.software",
    },
    {
      title: "Real Estate AI Lead Qualification Bot",
      client: `Mayfair Property Group (${geo.cities[2] || "London"})`,
      problem: "Valuable weekend property leads were cold by Monday morning due to 48-hour response delays.",
      solution: "Engineered an AI real estate assistant that qualifies buyers via WhatsApp & SMS within 10 seconds and auto-books viewing appointments.",
      tech: ["Next.js", "OpenAI Assistant API", "WhatsApp Business API", "Calendar Sync"],
      result: "Response Time Cut to 10 Seconds · 3.2x Appointment Booking Rate",
      testimonial: `"Our turnaround time dropped from days to minutes. Sherpas transformed our client acquisition."`,
      author: "Edward Sterling",
      demoLink: "https://portfolio.sherpas.software",
      subdomain: "portfolio.sherpas.software",
    },
  ];

  return (
    <section id="case-studies" className="py-20 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            🏆 Real Results &amp; Proven Case Studies
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
            Problem ➔ Solution ➔ Measurable Result
          </h2>
          <p className="text-muted-foreground mt-2 text-sm sm:text-base">
            How we help businesses in {geo.countryName} and globally eliminate manual work and scale revenue.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {CASES.map((cs, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-border bg-card p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex justify-between items-start gap-2 mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    {cs.client}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 text-[10px] font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Verified ROI
                  </span>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-4">{cs.title}</h3>

                {/* Problem & Solution Breakdown */}
                <div className="space-y-3 text-xs sm:text-sm text-muted-foreground mb-6">
                  <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/10">
                    <strong className="text-red-500 block mb-1">Problem:</strong>
                    {cs.problem}
                  </div>
                  <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                    <strong className="text-emerald-500 block mb-1">Solution:</strong>
                    {cs.solution}
                  </div>
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {cs.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground text-[11px] font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Result Highlight Box */}
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 mb-6">
                  <p className="text-xs text-muted-foreground font-medium">Measurable Business Impact:</p>
                  <p className="text-base font-extrabold text-foreground mt-0.5">{cs.result}</p>
                </div>

                {/* Testimonial Quote */}
                <blockquote className="text-xs italic text-muted-foreground border-l-2 border-emerald-500 pl-3 mb-6">
                  {cs.testimonial}
                  <footer className="text-[11px] font-bold text-foreground not-italic mt-1">
                    — {cs.author}
                  </footer>
                </blockquote>
              </div>

              {/* Subdomain Live Demo CTA */}
              <div className="pt-4 border-t border-border">
                <p className="text-[11px] font-mono text-muted-foreground mb-1 truncate">{cs.subdomain}</p>
                <a
                  href={cs.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs font-bold text-foreground hover:text-emerald-500 transition-colors"
                >
                  Test Live Subdomain Demo
                  <svg className="ml-1.5 w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
