"use client";

import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { SectionHeading } from "./SectionHeading";

const PROJECTS = [
  {
    title: "Muzip — YouTube Music Playlist Downloader",
    category: "Web App & Downloader",
    description: "Fast online YouTube music playlist downloader to convert & download full YouTube music playlists to high quality MP3 320kbps.",
    link: "http://muzip.sherpas.software/",
    subdomain: "muzip.sherpas.software",
    color: "bg-red-500/10 border-red-500/20",
  },
  {
    title: "High-Converting Landing Pages",
    category: "Subdomain Live Demo",
    description: "Ultra-fast direct-response landing pages deployed on live custom subdomains for instant client preview.",
    link: "https://demo.sherpas.software",
    subdomain: "demo.sherpas.software",
    color: "bg-emerald-500/10 border-emerald-500/20",
  },
  {
    title: "Shopify E-Commerce Store",
    category: "Shopify & E-Commerce",
    description: "Custom Shopify theme design, conversion-optimized checkout, and performance speed tuning.",
    link: "https://shopify.sherpas.software",
    subdomain: "shopify.sherpas.software",
    color: "bg-blue-500/10 border-blue-500/20",
  },
  {
    title: "Turnkey Dropship Launchpad",
    category: "Dropship Setup",
    description: "High-converting product page layouts, supplier fulfillment automation, and funnel architecture.",
    link: "https://dropship.sherpas.software",
    subdomain: "dropship.sherpas.software",
    color: "bg-purple-500/10 border-purple-500/20",
  },
  {
    title: "Executive & Agency Portfolios",
    category: "Custom Portfolios",
    description: "Sleek, interactive personal branding and portfolio websites designed to command market authority.",
    link: "https://portfolio.sherpas.software",
    subdomain: "portfolio.sherpas.software",
    color: "bg-amber-500/10 border-amber-500/20",
  },
  {
    title: "Meta & TikTok Ad Bundles",
    category: "Ad Creatives & Copy",
    description: "High-CTR video ad hooks, graphic ad variants, and copy frameworks designed to maximize ROAS.",
    link: "https://ads.sherpas.software",
    subdomain: "ads.sherpas.software",
    color: "bg-rose-500/10 border-rose-500/20",
  },
  {
    title: "Graphic Design & Brand Kits",
    category: "Graphic Design",
    description: "Complete logo suites, packaging design, marketing collaterals, and high-impact social media assets.",
    link: "https://design.sherpas.software",
    subdomain: "design.sherpas.software",
    color: "bg-indigo-500/10 border-indigo-500/20",
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
          title="Major Products & Live Subdomain Demos"
          subtitle="Explore our flagship landing pages, Shopify setups, dropship stores, ad bundles, and design packages in real-time."
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
              className="flex-[0_0_85vw] sm:flex-[0_0_360px] pl-6"
            >
              <div
                className={`h-full rounded-xl border p-6 flex flex-col justify-between select-none ${project.color}`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {project.category}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-medium border border-emerald-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      Subdomain Demo
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-border/50">
                  <p className="text-[11px] font-mono text-muted-foreground mb-2 truncate">
                    {project.subdomain}
                  </p>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-semibold text-foreground hover:text-emerald-500 transition-colors"
                    draggable={false}
                  >
                    Launch Live Subdomain Demo
                    <svg className="ml-1.5 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
