"use client";

import { useState } from "react";
import { useGeo } from "@/context/GeoContext";
import { formatCurrency } from "@/lib/geo";

export function AIEstimatorWidget() {
  const { geo } = useGeo();
  const [projectType, setProjectType] = useState<string>("automation");
  const [teamSize, setTeamSize] = useState<number>(10);
  const [monthlyHoursLost, setMonthlyHoursLost] = useState<number>(60);
  const [isCalculated, setIsCalculated] = useState<boolean>(true);

  // ROI Calculations
  const hourlyRateUSD = 45; // Average hourly labor cost
  const annualLossUSD = monthlyHoursLost * 12 * hourlyRateUSD * (teamSize / 5);
  const estimatedSavingsUSD = Math.round(annualLossUSD * 0.75);

  let basePriceUSD = 2500;
  if (projectType === "ai-agent") basePriceUSD = 4500;
  if (projectType === "full-saas") basePriceUSD = 9500;
  if (projectType === "ecommerce") basePriceUSD = 3500;

  return (
    <section id="estimator" className="py-16 bg-muted/30 border-y border-border/60">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-3">
            🤖 Interactive AI ROI &amp; Investment Estimator
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
            Estimate Your Software ROI &amp; Timeline in 10 Seconds
          </h2>
          <p className="text-muted-foreground mt-2 text-sm sm:text-base">
            Select your requirements to see how much manual labor hours your team can save and your estimated project investment.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
          
          {/* Inputs Column */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                1. What are you looking to build?
              </label>
              <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
                {[
                  { id: "automation", name: "Internal AI Automation", desc: "Automate manual workflows & data" },
                  { id: "ai-agent", name: "Custom AI Agent / Bot", desc: "24/7 Support & Lead qualification" },
                  { id: "ecommerce", name: "Shopify / E-Commerce", desc: "High-converting store & funnel" },
                  { id: "full-saas", name: "Custom Web App / SaaS", desc: "Full-stack software platform" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setProjectType(item.id);
                      setIsCalculated(true);
                    }}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      projectType === item.id
                        ? "border-emerald-500 bg-emerald-500/10 font-medium shadow-sm"
                        : "border-border hover:border-muted-foreground/40 bg-background"
                    }`}
                  >
                    <p className="font-bold text-foreground">{item.name}</p>
                    <p className="text-muted-foreground text-[11px] mt-0.5">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2 text-sm">
                <label className="font-semibold text-foreground">2. Team Size:</label>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{teamSize} People</span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={teamSize}
                onChange={(e) => setTeamSize(parseInt(e.target.value, 10))}
                className="w-full accent-emerald-500 h-2 bg-muted rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2 text-sm">
                <label className="font-semibold text-foreground">3. Manual Hours Lost / Month per Person:</label>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{monthlyHoursLost} Hours</span>
              </div>
              <input
                type="range"
                min="10"
                max="160"
                step="10"
                value={monthlyHoursLost}
                onChange={(e) => setMonthlyHoursLost(parseInt(e.target.value, 10))}
                className="w-full accent-emerald-500 h-2 bg-muted rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Instant Estimate Calculation Output Column */}
          <div className="lg:col-span-5 bg-muted/40 border border-border/80 rounded-xl p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-4">
                Estimated Impact &amp; Investment ({geo.countryName})
              </h3>

              <div className="space-y-4 mb-6">
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Estimated Annual Cost Savings:</p>
                  <p className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
                    {formatCurrency(estimatedSavingsUSD, geo)} / year
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-1">
                    Based on saving ~{Math.round(monthlyHoursLost * 0.75 * (teamSize / 5))} hours/mo
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-card border border-border">
                    <p className="text-muted-foreground">Estimated Build Price:</p>
                    <p className="text-base font-bold text-foreground mt-0.5">
                      Starting at {formatCurrency(basePriceUSD, geo)}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-card border border-border">
                    <p className="text-muted-foreground">Est. Timeline:</p>
                    <p className="text-base font-bold text-foreground mt-0.5">14 – 21 Days</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <a
                href={`#contact`}
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Lock In This Investment &amp; Book Call</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
              <p className="text-[11px] text-center text-muted-foreground mt-2">
                🔒 100% Free 30-min strategy call · No obligation
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
