"use client";

import { useEffect, useState } from "react";
import { useGeo } from "@/context/GeoContext";

export function ExitIntentModal() {
  const { geo } = useGeo();
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    let triggered = false;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10 && !triggered) {
        const hasShown = sessionStorage.getItem("sherpas_exit_shown");
        if (!hasShown) {
          triggered = true;
          setIsOpen(true);
          sessionStorage.setItem("sherpas_exit_shown", "true");
        }
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, []);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setIsOpen(false);
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-2xl">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted transition-colors"
          aria-label="Close modal"
        >
          ✕
        </button>

        {!isSubmitted ? (
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-semibold uppercase tracking-wider mb-4 border border-amber-500/20">
              🎁 Wait! Before You Go ({geo.flag} {geo.countryName})
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-foreground mb-2">
              Get A Free AI Automation &amp; Website Audit Plan
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Our engineering team will analyze your business and send you a custom <strong>3-page AI &amp; Software Growth Blueprint</strong> detailing where you can automate tasks and increase conversion rates.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">
                  Work Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-2"
              >
                Send Me Free Audit Plan
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>
            <p className="text-[11px] text-center text-muted-foreground mt-3">
              🔒 We respect your privacy. No spam ever.
            </p>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              ✓
            </div>
            <h3 className="text-xl font-bold text-foreground">Audit Requested!</h3>
            <p className="text-sm text-muted-foreground mt-2">
              We received <strong>{email}</strong>. Our senior engineers will prepare your custom AI blueprint and email it within 24 hours.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
