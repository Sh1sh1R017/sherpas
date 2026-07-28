import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Sherpas Technology's core services: strategy, operations improvement, digital transformation, organizational design, due diligence, and change management.",
};

/* ── Services data ── */

const SERVICES = [
  {
    title: "High-Converting Landing Pages",
    description:
      "Direct-response landing page design and development built for max conversion rates. Includes instant live preview environments deployed on custom subdomains for client approval before launch.",
    features: [
      "Subdomain live demo preview environments",
      "Direct-response copywriting & CTA hierarchy",
      "Sub-second loading speed on Next.js & Vercel",
      "Mobile-first responsive UX & micro-interactions",
      "A/B testing & analytics integration",
    ],
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m-0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253" />
      </svg>
    ),
  },
  {
    title: "Shopify E-Commerce Stores",
    description:
      "Bespoke Shopify store design and technical execution. We build high-converting storefronts with custom Liquid/Hydrogen themes, speed optimization, and seamless app ecosystem integrations.",
    features: [
      "Custom Shopify theme development",
      "Checkout customization & upsell funnels",
      "Page speed & Core Web Vitals optimization",
      "Payment gateway & currency localization",
      "ERP, CRM & inventory sync setup",
    ],
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    ),
  },
  {
    title: "Dropshipping Turnkey Launches",
    description:
      "Complete end-to-end dropship store builds designed to launch products instantly with winning product page layouts, automated supplier fulfillment, and ad funnel connections.",
    features: [
      "Winning product page architecture",
      "Automated supplier API & order routing",
      "Trust badge & social proof integration",
      "High-AOV bundle & cross-sell flows",
      "Ad campaign tracking & pixel setup",
    ],
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM18.75 18.75a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM3.75 4.5h16.5m-1.5 0v10.5a1.5 1.5 0 01-1.5 1.5H6.75a1.5 1.5 0 01-1.5-1.5V4.5" />
      </svg>
    ),
  },
  {
    title: "Executive & Agency Portfolios",
    description:
      "Sleek, modern portfolio and personal branding websites for founders, executives, creators, and agencies looking to establish supreme market authority.",
    features: [
      "Bespoke interactive layout design",
      "Case study & portfolio showcases",
      "Integrated booking & inquiry funnels",
      "Custom domain & subdomain management",
      "SEO & social preview optimization",
    ],
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
  {
    title: "Ad Bundles (Meta, TikTok, Google)",
    description:
      "High-CTR ad creative packages including UGC style video hooks, static ad variations, ad copy frameworks, and landing page matching designed to scale ROAS.",
    features: [
      "High-converting video ad hooks & edits",
      "Static graphic ad variation suites",
      "Direct-response ad copy frameworks",
      "TikTok, Meta & Google format optimization",
      "Creative testing matrix & refresh packs",
    ],
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
      </svg>
    ),
  },
  {
    title: "Graphic Design & Brand Identity Kits",
    description:
      "Complete visual branding solutions from logo mark design and color typography guidelines to packaging, social media templates, and marketing collaterals.",
    features: [
      "Primary logo suites & sub-marks",
      "Visual brand guidelines & typography",
      "Packaging & product label design",
      "Social media banner & post templates",
      "Vector marketing collateral suites",
    ],
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l9.602-9.602a3.75 3.75 0 015.304 5.304l-9.602 9.602" />
      </svg>
    ),
  },
];

/* ── Page component ── */

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Our services"
        subtitle="Six practice areas, each led by consultants with deep industry experience and a track record of measurable client impact."
      />

      {/* Services grid */}
      <Section>
        <div className="grid gap-8 sm:grid-cols-2">
          {SERVICES.map((service) => (
            <article
              key={service.title}
              className="rounded-md border border-border p-6 sm:p-8 transition-shadow duration-150 hover:shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-secondary text-foreground">
                  {service.icon}
                </div>
                <h2 className="text-lg font-semibold">{service.title}</h2>
              </div>
              <p className="mt-4 text-sm text-muted leading-relaxed">
                {service.description}
              </p>
              <ul className="mt-4 space-y-1.5" role="list">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-muted"
                  >
                    <svg
                      className="h-4 w-4 mt-0.5 flex-shrink-0 text-foreground"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      {/* Pricing CTA */}
      <Section bg="muted" id="pricing-cta">
        <div className="text-center">
          <SectionHeading
            title="Engagement models"
            subtitle="We offer project-based, retainer, and embedded consulting arrangements. Pricing is scoped to the specific challenge — not billed by the hour."
            align="center"
          />
          <Button href="/contact" size="lg">
            Discuss your project
          </Button>
        </div>
      </Section>
    </>
  );
}
