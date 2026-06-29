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
    title: "Corporate Strategy",
    description:
      "Defining where to compete and how to win. We help leadership teams assess market position, evaluate growth options, and build strategic plans that are grounded in financial reality and organisational capability.",
    features: [
      "Market and competitive analysis",
      "Growth strategy and market entry",
      "Portfolio rationalisation",
      "Strategic planning facilitation",
      "Scenario modelling",
    ],
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
      </svg>
    ),
  },
  {
    title: "Operations Improvement",
    description:
      "Making organisations run better. We diagnose process inefficiencies, redesign workflows, and implement operating model changes that reduce cost and improve quality without sacrificing speed.",
    features: [
      "Process mapping and redesign",
      "Supply chain optimisation",
      "Operating model design",
      "Cost reduction programmes",
      "Performance management systems",
    ],
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
      </svg>
    ),
  },
  {
    title: "Digital Transformation",
    description:
      "Technology investments that actually deliver value. We guide platform selection, architecture decisions, and implementation planning so that digital initiatives connect directly to business outcomes.",
    features: [
      "Technology strategy and roadmaps",
      "Platform selection and vendor evaluation",
      "Data strategy and governance",
      "Cloud migration planning",
      "Digital capability building",
    ],
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
  {
    title: "Organisational Design",
    description:
      "Structure that enables strategy. We help companies redesign their organisational architecture — reporting lines, governance, roles, and decision rights — to support the direction they want to go.",
    features: [
      "Org structure redesign",
      "Role definition and capability mapping",
      "Governance framework design",
      "Talent strategy alignment",
      "Workforce planning",
    ],
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
  {
    title: "Transaction Advisory",
    description:
      "Informed decisions in high-stakes transactions. We support private equity firms and corporate acquirers with commercial due diligence, integration planning, and post-merger value creation.",
    features: [
      "Commercial due diligence",
      "Integration planning",
      "Synergy identification",
      "Post-merger integration support",
      "Carve-out planning",
    ],
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    ),
  },
  {
    title: "Change Management",
    description:
      "Making change stick. We design and implement change programmes that address the human side of transformation — communication, training, stakeholder alignment, and sustained adoption.",
    features: [
      "Change readiness assessment",
      "Stakeholder engagement strategy",
      "Communication planning",
      "Training programme design",
      "Adoption measurement",
    ],
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
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
