import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/Section";
import { ContactForm } from "@/components/ContactForm";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Sherpas Technology. Reach us by phone, email, WhatsApp, or the contact form below.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact us"
        subtitle="Have a project in mind or a question about how we work? We'd welcome the conversation."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Form */}
          <div className="lg:col-span-3">
            <h2 className="text-xl font-semibold">Send us a message</h2>
            <p className="mt-1 text-sm text-muted mb-6">
              Fill out the form and we&apos;ll respond within one business day.
            </p>
            <ContactForm />
          </div>

          {/* Contact details sidebar */}
          <aside className="lg:col-span-2" aria-label="Contact information">
            <div className="space-y-8">
              {/* Address */}
              <div>
                <h3 className="text-sm font-semibold tracking-wide uppercase">
                  Office
                </h3>
                <address className="mt-2 text-sm text-muted not-italic leading-relaxed">
                  {COMPANY.address.city}
                  <br />
                  {COMPANY.address.country}
                </address>
              </div>

              {/* Email & Phone */}
              <div>
                <h3 className="text-sm font-semibold tracking-wide uppercase">
                  Reach us directly
                </h3>
                <div className="mt-2 space-y-1 text-sm">
                  <p>
                    <a
                      href={`mailto:${COMPANY.email}`}
                      className="text-muted hover:text-foreground transition-colors"
                    >
                      {COMPANY.email}
                    </a>
                  </p>
                  <p>
                    <a
                      href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
                      className="text-muted hover:text-foreground transition-colors"
                    >
                      {COMPANY.phone}
                    </a>
                  </p>
                  <p>
                    <a
                      href={COMPANY.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted hover:text-foreground transition-colors inline-flex items-center gap-1.5"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      WhatsApp
                    </a>
                  </p>
                </div>
              </div>

              {/* Business hours */}
              <div>
                <h3 className="text-sm font-semibold tracking-wide uppercase">
                  Business hours
                </h3>
                <div className="mt-2 space-y-1 text-sm text-muted">
                  <p>{COMPANY.hours.weekdays}</p>
                  <p>{COMPANY.hours.weekends}</p>
                </div>
              </div>

              {/* Map placeholder */}
              <div>
                <h3 className="text-sm font-semibold tracking-wide uppercase">
                  Location
                </h3>
                <div
                  className="mt-2 aspect-[4/3] w-full rounded-md border border-border bg-secondary flex items-center justify-center"
                  role="img"
                  aria-label="Map showing office location in Biratnagar, Nepal"
                >
                  <div className="text-center text-sm text-muted">
                    <svg
                      className="mx-auto mb-2 h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>
                    <p>Biratnagar</p>
                    <p>Nepal</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
