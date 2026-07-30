"use client";

import { useGeo } from "@/context/GeoContext";
import { CountryCode, GEO_DICTIONARY } from "@/lib/geo";

export function DynamicHero() {
  const { geo, countryCode, setCountryCode, industry, isReturningVisitor } = useGeo();

  return (
    <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 overflow-hidden bg-background">
      {/* Background Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Country & Industry Geo Personalization Selector Pill */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider border border-emerald-500/20 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>
              {industry
                ? industry.badge
                : `${geo.flag} Personalized for ${geo.countryName} Businesses`}
            </span>
          </div>

          {/* Quick Country Switcher Pill */}
          <div className="inline-flex items-center gap-1.5 p-1 rounded-lg bg-muted/60 border border-border text-xs">
            <span className="text-muted-foreground px-2">Location:</span>
            {(["US", "AU", "GB", "CA", "NP"] as CountryCode[]).map((code) => (
              <button
                key={code}
                onClick={() => setCountryCode(code)}
                className={`px-2.5 py-1 rounded-md transition-all font-medium ${
                  countryCode === code
                    ? "bg-background text-foreground shadow-sm font-bold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {GEO_DICTIONARY[code].flag} {code}
              </button>
            ))}
          </div>
        </div>

        {/* Returning Visitor Greeting */}
        {isReturningVisitor && (
          <div className="mb-6 p-4 rounded-xl bg-primary/5 border border-primary/20 flex items-center justify-between gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-xl">👋</span>
              <span>
                <strong>Welcome back!</strong> Still planning your custom AI or website software project? Let&apos;s map out your roadmap today.
              </span>
            </div>
            <a
              href="#contact"
              className="px-3.5 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-opacity flex-shrink-0"
            >
              Book Priority Call
            </a>
          </div>
        )}

        {/* Main Value Proposition Headline */}
        <div className="max-w-4xl">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.08] mb-6">
            {industry ? (
              industry.headline
            ) : (
              <>
                Build Custom AI Software That
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500">
                  Saves Your Business 40+ Hours/Week.
                </span>
              </>
            )}
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-8">
            {industry ? (
              industry.subheadline
            ) : (
              geo.heroSubheadline
            )}
          </p>

          {/* High-Intent CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <a
              href="#estimator"
              className="px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base transition-all shadow-lg hover:shadow-emerald-500/25 flex items-center gap-2"
            >
              <span>{industry ? industry.cta : "Book Free Strategy Session"}</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            <a
              href="#projects"
              className="px-8 py-4 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-semibold text-base transition-all border border-border flex items-center gap-2"
            >
              <span>See Live Subdomain Demos</span>
            </a>
          </div>

          {/* Instant Trust & Conversion Elements */}
          <div className="pt-8 border-t border-border/60 grid grid-cols-2 sm:grid-cols-4 gap-6 text-sm">
            <div>
              <div className="flex items-center text-amber-500 gap-1 text-base mb-1">
                ★★★★★ <span className="text-foreground font-bold text-xs">5.0 / 5.0</span>
              </div>
              <p className="text-muted-foreground text-xs">{geo.trustMention}</p>
            </div>
            <div>
              <p className="font-bold text-foreground text-base">$2M+ Saved</p>
              <p className="text-muted-foreground text-xs">For Clients Globally</p>
            </div>
            <div>
              <p className="font-bold text-foreground text-base">&lt; 15 Mins Response</p>
              <p className="text-muted-foreground text-xs">Average Support Time</p>
            </div>
            <div>
              <p className="font-bold text-foreground text-base">Live Subdomain Demos</p>
              <p className="text-muted-foreground text-xs">Test Before You Buy</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
