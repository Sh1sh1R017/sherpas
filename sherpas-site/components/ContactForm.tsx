"use client";

import { useState, type FormEvent } from "react";
import { Button } from "./Button";

interface FormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

const initialData: FormData = {
  name: "",
  email: "",
  company: "",
  message: "",
};

/**
 * Contact form with client-side validation and submission state.
 * In production, the handleSubmit would call a server action or API route.
 */
export function ContactForm() {
  const [data, setData] = useState<FormData>(initialData);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  function handleChange(field: keyof FormData, value: string) {
    setData((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");

    // Simulate network request — replace with a real API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setStatus("sent");
      setData(initialData);
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-md border border-border bg-secondary/50 p-6 text-center">
        <p className="font-medium">Thank you for reaching out.</p>
        <p className="mt-1 text-sm text-muted">
          We&apos;ll get back to you within one business day.
        </p>
        <button
          type="button"
          className="mt-4 text-sm font-medium underline underline-offset-4 hover:text-muted transition-colors"
          onClick={() => setStatus("idle")}
        >
          Send another message
        </button>
      </div>
    );
  }

  const inputStyles =
    "block w-full rounded-md border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:ring-1 focus:ring-ring transition-colors";
  const labelStyles = "block text-sm font-medium mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className={labelStyles}>
          Full name <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={data.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className={inputStyles}
          placeholder="Jane Smith"
          autoComplete="name"
        />
      </div>

      <div>
        <label htmlFor="email" className={labelStyles}>
          Work email <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={data.email}
          onChange={(e) => handleChange("email", e.target.value)}
          className={inputStyles}
          placeholder="jane@company.com"
          autoComplete="email"
        />
      </div>

      <div>
        <label htmlFor="company" className={labelStyles}>
          Company
        </label>
        <input
          id="company"
          name="company"
          type="text"
          value={data.company}
          onChange={(e) => handleChange("company", e.target.value)}
          className={inputStyles}
          placeholder="Acme Inc."
          autoComplete="organization"
        />
      </div>

      <div>
        <label htmlFor="message" className={labelStyles}>
          How can we help? <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={data.message}
          onChange={(e) => handleChange("message", e.target.value)}
          className={`${inputStyles} resize-y`}
          placeholder="Tell us about your project or challenge…"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600" role="alert">
          Something went wrong. Please try again.
        </p>
      )}

      <Button type="submit" size="lg" className="w-full sm:w-auto">
        {status === "sending" ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
