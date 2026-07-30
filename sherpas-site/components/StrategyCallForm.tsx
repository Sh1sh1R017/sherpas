"use client";

import { useState } from "react";

export function StrategyCallForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="p-8 text-center rounded-xl bg-emerald-500/10 border border-emerald-500/20">
        <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto mb-3 text-2xl font-bold">
          ✓
        </div>
        <h4 className="text-xl font-bold text-foreground">Strategy Call Requested!</h4>
        <p className="text-sm text-muted-foreground mt-2">
          Thank you <strong>{name}</strong>. Our senior lead engineer will review your project details and reach out at <strong>{email}</strong> within 2 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-muted-foreground mb-1">Your Name</label>
        <input
          required
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John Doe"
          className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-foreground"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-muted-foreground mb-1">Work Email</label>
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="john@company.com"
          className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-foreground"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-muted-foreground mb-1">What would you like to build or automate?</label>
        <textarea
          rows={3}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="e.g. AI lead qualification, internal ERP tool, custom landing page..."
          className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-foreground"
        />
      </div>
      <button
        type="submit"
        className="w-full py-4 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base transition-all shadow-md flex items-center justify-center gap-2"
      >
        <span>Book Strategy Call Now</span>
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>
    </form>
  );
}
