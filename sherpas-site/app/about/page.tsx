import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Sherpas Technology — our story, mission, values, and the team behind our work.",
};

/* ── Page data ── */

const VALUES = [
  {
    title: "Rigour",
    description:
      "We bring analytical discipline to every engagement. Our recommendations are grounded in evidence, stress-tested against real constraints, and designed to withstand scrutiny.",
  },
  {
    title: "Candour",
    description:
      "We tell clients what they need to hear, not what they want to hear. Honest counsel — even when it's uncomfortable — is the foundation of lasting trust.",
  },
  {
    title: "Partnership",
    description:
      "We don't hand off reports and disappear. We embed with your teams, share accountability for results, and treat your challenges as our own.",
  },
  {
    title: "Pragmatism",
    description:
      "Elegant theory means nothing without practical execution. Every strategy we develop includes a clear path to implementation within your actual operating context.",
  },
];

const TIMELINE = [
  {
    year: "2012",
    title: "Founded",
    description:
      "Three former management consultants launched Sherpas with a single belief: advisory work should be measured by outcomes, not by hours billed.",
  },
  {
    year: "2015",
    title: "Operations practice launched",
    description:
      "Growing demand from manufacturing and logistics clients led us to build a dedicated operations improvement practice.",
  },
  {
    year: "2018",
    title: "Digital transformation",
    description:
      "We expanded into technology strategy, helping clients navigate cloud migration, data infrastructure, and enterprise platform decisions.",
  },
  {
    year: "2021",
    title: "100th client engagement",
    description:
      "A milestone that reinforced our commitment to quality over volume. We've deliberately kept our client roster selective.",
  },
  {
    year: "2024",
    title: "West Coast expansion",
    description:
      "Opened our San Francisco office to better serve the technology and healthcare sectors on the Pacific Coast.",
  },
];

const TEAM = [
  {
    name: "Margaret Chen",
    role: "Managing Partner",
    bio: "20 years in strategy consulting. Former McKinsey engagement manager. Specializes in financial services and corporate transformation.",
  },
  {
    name: "David Okafor",
    role: "Partner, Operations",
    bio: "Supply chain and manufacturing expert. Previously VP of Operations at a Fortune 500 industrial firm. Leads our operational improvement practice.",
  },
  {
    name: "Sarah Lindberg",
    role: "Partner, Digital",
    bio: "Technology strategist with a background in software engineering. Bridges the gap between business objectives and technical implementation.",
  },
  {
    name: "James Moreno",
    role: "Principal Consultant",
    bio: "Healthcare industry specialist. Former hospital administrator who brings operational perspective to advisory engagements in the health sector.",
  },
];

/* ── Page component ── */

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About us"
        subtitle="We're a focused advisory firm that helps organizations solve hard problems with clear thinking and committed execution."
      />

      {/* Company Story */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Our story
            </h2>
            <div className="mt-4 space-y-4 text-muted leading-relaxed">
              <p>
                Sherpas was founded in 2012 by three consultants who had spent
                their careers at large advisory firms and grown frustrated with
                the model: oversized teams, generic frameworks, and
                recommendations that rarely survived contact with reality.
              </p>
              <p>
                We set out to build a different kind of firm — one that
                prioritizes depth over breadth, evidence over opinion, and
                outcomes over deliverables. Today we work with mid-market and
                enterprise organizations across financial services, healthcare,
                technology, and manufacturing.
              </p>
              <p>
                We keep our team lean by design. Every client works directly
                with senior practitioners who have the experience and authority
                to drive decisions, not junior analysts learning on the job.
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Our mission
            </h2>
            <div className="mt-4 space-y-4 text-muted leading-relaxed">
              <p>
                To help organizations make better decisions, execute more
                effectively, and build capabilities that outlast any single
                engagement.
              </p>
              <p>
                We measure our success not by the volume of work we produce, but
                by the tangible impact our clients achieve after we leave. Our
                goal is to make ourselves unnecessary — to transfer knowledge
                and build capacity so our clients are stronger independent of
                us.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Values */}
      <Section bg="muted" id="values">
        <SectionHeading
          title="What we stand for"
          subtitle="Four principles guide every engagement, every recommendation, and every hire."
        />
        <div className="grid gap-8 sm:grid-cols-2">
          {VALUES.map((value) => (
            <div key={value.title} className="rounded-md border border-border bg-card p-6">
              <h3 className="text-base font-semibold">{value.title}</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Team */}
      <Section id="team">
        <SectionHeading
          title="Leadership"
          subtitle="Senior practitioners who bring real operating experience to every engagement."
        />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((member) => (
            <div key={member.name}>
              <div className="aspect-[4/5] w-full rounded-md bg-secondary" />
              <h3 className="mt-4 text-base font-semibold">{member.name}</h3>
              <p className="text-sm text-muted">{member.role}</p>
              <p className="mt-2 text-sm text-muted leading-relaxed">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Timeline */}
      <Section bg="muted" id="timeline">
        <SectionHeading title="Our journey" />
        <div className="space-y-0">
          {TIMELINE.map((event, i) => (
            <div
              key={event.year}
              className={`relative flex gap-6 sm:gap-10 pb-10 ${
                i < TIMELINE.length - 1
                  ? "border-l border-border ml-3 pl-6 sm:ml-4 sm:pl-10"
                  : "ml-3 pl-6 sm:ml-4 sm:pl-10"
              }`}
            >
              <span className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full bg-foreground" />
              <div>
                <span className="text-xs font-semibold text-muted tabular-nums tracking-wide">
                  {event.year}
                </span>
                <h3 className="mt-0.5 text-base font-semibold">
                  {event.title}
                </h3>
                <p className="mt-1 text-sm text-muted leading-relaxed max-w-lg">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
