"use client";

import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { SectionHeading } from "./SectionHeading";

const PROJECTS = [
  {
    title: "FinTech Dashboard",
    category: "Web Application",
    description: "A real-time analytics dashboard for a leading financial institution.",
    link: "#",
    color: "bg-blue-500/10 border-blue-500/20",
  },
  {
    title: "HealthCore Portal",
    category: "Digital Transformation",
    description: "Patient management portal reducing administrative overhead by 40%.",
    link: "#",
    color: "bg-emerald-500/10 border-emerald-500/20",
  },
  {
    title: "Supply Chain Tracker",
    category: "Operations Improvement",
    description: "End-to-end visibility platform for global logistics tracking.",
    link: "#",
    color: "bg-orange-500/10 border-orange-500/20",
  },
  {
    title: "AI Sales Agent",
    category: "AI Automation",
    description: "An autonomous agent that discovers leads, scrapes websites, and drafts personalized outreach.",
    link: "https://sales.sherpas.software", // Replace with the actual Vercel URL if different
    color: "bg-purple-500/10 border-purple-500/20",
  },
];

export function ProjectSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    dragFree: true,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="w-full">
      <div className="flex items-end justify-between mb-10">
        <SectionHeading
          title="Recent Projects & Demos"
          subtitle="Explore some of our recent work. Swipe to view more."
        />
        <div className="hidden sm:flex items-center gap-2 pb-10">
          <button
            onClick={scrollPrev}
            className="p-2 rounded-full border border-border hover:bg-secondary transition-colors"
            aria-label="Previous project"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={scrollNext}
            className="p-2 rounded-full border border-border hover:bg-secondary transition-colors"
            aria-label="Next project"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-6">
          {[...PROJECTS, ...PROJECTS].map((project, idx) => (
            <div
              key={idx}
              className="flex-[0_0_85vw] sm:flex-[0_0_350px] pl-6"
            >
              <div
                className={`h-full rounded-xl border p-6 flex flex-col justify-between select-none ${project.color}`}
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                    {project.category}
                  </p>
                  <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </div>
                <div className="mt-8">
                  <a
                    href={project.link}
                    className="inline-flex items-center text-sm font-medium hover:opacity-80 transition-opacity"
                    draggable={false}
                  >
                    View Live Demo
                    <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
