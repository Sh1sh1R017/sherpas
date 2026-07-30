export type CountryCode = "US" | "AU" | "GB" | "CA" | "NP" | "DEFAULT";

export interface GeoData {
  countryCode: CountryCode;
  countryName: string;
  flag: string;
  currency: string;
  symbol: string;
  rate: number; // Multiplier relative to USD
  cities: string[];
  spelling: "US" | "UK";
  heroHeadline: string;
  heroSubheadline: string;
  trustMention: string;
  testimonialAuthor: string;
  testimonialCompany: string;
  testimonialQuote: string;
  caseStudyTitle: string;
  caseStudyMetrics: string;
}

export const GEO_DICTIONARY: Record<CountryCode, GeoData> = {
  US: {
    countryCode: "US",
    countryName: "United States",
    flag: "🇺🇸",
    currency: "USD",
    symbol: "$",
    rate: 1,
    cities: ["New York", "San Francisco", "Austin", "Chicago", "Miami"],
    spelling: "US",
    heroHeadline: "Custom AI Software & Automation For American Businesses",
    heroSubheadline:
      "We design, build, and deploy custom AI employees, automated workflows, and high-converting software that save US companies 40+ hours every week.",
    trustMention: "Trusted by 120+ US Enterprises & Growth Agencies",
    testimonialAuthor: "Marcus Vance",
    testimonialCompany: "Apex Logistics (Austin, TX)",
    testimonialQuote:
      "Sherpas built our AI dispatching system in 3 weeks. It reduced our manual operations by 70% and added $340k in annual savings.",
    caseStudyTitle: "US Healthcare & Logistics AI Automation",
    caseStudyMetrics: "$340K Saved / Year · 70% Reduced Manual Ops",
  },
  AU: {
    countryCode: "AU",
    countryName: "Australia",
    flag: "🇦🇺",
    currency: "AUD",
    symbol: "A$",
    rate: 1.52,
    cities: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"],
    spelling: "UK",
    heroHeadline: "Bespoke AI Software & Automation Built For Australian Businesses",
    heroSubheadline:
      "We partner with Australian SMEs and growth brands across Sydney, Melbourne, and Brisbane to build high-ROI business software and AI systems.",
    trustMention: "Partnered with 45+ Australian Businesses Daily",
    testimonialAuthor: "Lachlan Ross",
    testimonialCompany: "Pacific Digital Group (Sydney)",
    testimonialQuote:
      "The Sherpas team delivered a custom portal that automated our client onboarding. Exceptional speed and Australian market understanding.",
    caseStudyTitle: "Sydney E-Commerce & Logistics Platform",
    caseStudyMetrics: "A$520K Revenue Increase · 140 Hours Saved/Mo",
  },
  GB: {
    countryCode: "GB",
    countryName: "United Kingdom",
    flag: "🇬🇧",
    currency: "GBP",
    symbol: "£",
    rate: 0.78,
    cities: ["London", "Manchester", "Birmingham", "Edinburgh", "Bristol"],
    spelling: "UK",
    heroHeadline: "Enterprise AI Software & Systems Designed For UK SMEs",
    heroSubheadline:
      "Engineered for UK organisations seeking operational efficiency. We build bespoke software and AI automations that cut overheads and accelerate growth.",
    trustMention: "Serving 60+ UK Firms & High-Growth Scale-Ups",
    testimonialAuthor: "Edward Sterling",
    testimonialCompany: "Mayfair Advisory (London)",
    testimonialQuote:
      "Sherpas transformed our client reporting with bespoke AI agents. Our turnaround time dropped from days to minutes.",
    caseStudyTitle: "London Financial Services AI Reporting Portal",
    caseStudyMetrics: "£280K Overhead Saved · 90% Faster Turnaround",
  },
  CA: {
    countryCode: "CA",
    countryName: "Canada",
    flag: "🇨🇦",
    currency: "CAD",
    symbol: "C$",
    rate: 1.36,
    cities: ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa"],
    spelling: "US",
    heroHeadline: "Custom AI Software & Digital Products Built For Canadian Brands",
    heroSubheadline:
      "We help Canadian companies in Toronto, Vancouver, and Montreal build scalable custom software, automated lead engines, and web platforms.",
    trustMention: "Delivering Results for 35+ Canadian Companies",
    testimonialAuthor: "Sophie Tremblay",
    testimonialCompany: "Nordic Commerce (Toronto)",
    testimonialQuote:
      "Their conversion-focused approach doubled our online lead volume in less than 30 days. Incredible execution.",
    caseStudyTitle: "Toronto Multi-Store E-Commerce Engine",
    caseStudyMetrics: "C$410K Added Sales · 2.4x Conversion Rate",
  },
  NP: {
    countryCode: "NP",
    countryName: "Nepal",
    flag: "🇳🇵",
    currency: "NPR",
    symbol: "Rs.",
    rate: 134,
    cities: ["Kathmandu", "Pokhara", "Lalitpur"],
    spelling: "US",
    heroHeadline: "Turnkey MVP Development & Startup Software Packages",
    heroSubheadline:
      "Accelerate your startup with world-class MVP development, custom AI tools, and affordable software packages tailored for founders and tech teams.",
    trustMention: "Empowering Next-Gen Founders & Tech Teams",
    testimonialAuthor: "Aayush Shrestha",
    testimonialCompany: "KTM Tech Ventures (Kathmandu)",
    testimonialQuote:
      "Sherpas helped us launch our MVP in 14 days. Their speed and technical quality gave us a massive competitive advantage.",
    caseStudyTitle: "High-Speed SaaS MVP Launch",
    caseStudyMetrics: "14 Days to Market · 10k Active Users",
  },
  DEFAULT: {
    countryCode: "DEFAULT",
    countryName: "Global",
    flag: "🌐",
    currency: "USD",
    symbol: "$",
    rate: 1,
    cities: ["Global Remote", "International"],
    spelling: "US",
    heroHeadline: "Build Custom AI Software That Actually Saves Your Business Time",
    heroSubheadline:
      "From AI employees to enterprise web software—we design and build custom systems that increase revenue and eliminate repetitive manual work.",
    trustMention: "Trusted by 250+ High-Growth Companies Worldwide",
    testimonialAuthor: "David Chen",
    testimonialCompany: "Apex Global Software",
    testimonialQuote:
      "Sherpas delivered an enterprise-grade AI system that transformed our workflow. Highly recommended for any scaling business.",
    caseStudyTitle: "Enterprise AI Workflow & Automation System",
    caseStudyMetrics: "$450K Annual ROI · 85% Process Automation",
  },
};

export interface IndustryData {
  id: string;
  name: string;
  badge: string;
  headline: string;
  subheadline: string;
  features: string[];
  cta: string;
  caseStudy: string;
}

export const INDUSTRY_DICTIONARY: Record<string, IndustryData> = {
  healthcare: {
    id: "healthcare",
    name: "Healthcare & Medical",
    badge: "🏥 Healthcare & HIPAA-Compliant AI Software",
    headline: "Custom Medical AI & HIPAA-Compliant Health Tech",
    subheadline:
      "Automate patient intake, EHR data extraction, and appointment scheduling with secure, HIPAA-ready AI systems.",
    features: [
      "Patient Intake & Triage Automation",
      "EHR & EMR Data Extraction AI",
      "HIPAA-Compliant Cloud Infrastructure",
      "Telehealth & Portal Custom Software",
    ],
    cta: "Request Healthcare AI Proposal",
    caseStudy: "Patient Onboarding Reduced From 25 Mins to 90 Seconds",
  },
  construction: {
    id: "construction",
    name: "Construction & Engineering",
    badge: "🏗️ Construction ERP & Estimating Software",
    headline: "Construction Management & AI Bid Estimating Systems",
    subheadline:
      "Streamline project bidding, subcontractor management, and site reporting with custom web and mobile software.",
    features: [
      "Automated Blueprint & PDF Bid Estimating",
      "Subcontractor Scheduling & Timesheet Portal",
      "Real-Time Equipment & Asset Tracker",
      "Field-to-Office Mobile Apps",
    ],
    cta: "Schedule Construction Tech Demo",
    caseStudy: "Automated Blueprint Bidding Saved $180k per Estimator",
  },
  restaurant: {
    id: "restaurant",
    name: "Restaurants & Hospitality",
    badge: "🍔 Restaurant Ordering & AI Kitchen Dashboards",
    headline: "Smart Restaurant POS, AI Ordering & Kitchen Dashboards",
    subheadline:
      "Increase table turnover and online order revenue with AI reservation bots, POS integrations, and kitchen management systems.",
    features: [
      "Direct Zero-Commission Web Ordering",
      "AI Voice & WhatsApp Table Booking Bot",
      "Kitchen Display System (KDS) Integration",
      "Inventory & Waste Reduction Analytics",
    ],
    cta: "Explore Hospitality Software",
    caseStudy: "Added +38% Direct Online Orders Without Third-Party Fees",
  },
  "real-estate": {
    id: "real-estate",
    name: "Real Estate & Property",
    badge: "🏢 Real Estate Lead Automation & Property Portals",
    headline: "Real Estate CRM & AI Property Lead Automation",
    subheadline:
      "Capture, score, and nurture property buyers 24/7 with custom listing portals, AI qualification bots, and CRM automation.",
    features: [
      "24/7 Instant Buyer & Tenant Qualification AI",
      "Custom IDX / MLS Property Listing Portals",
      "Automated Virtual Tour Scheduling",
      "Brokerage CRM & Deal Stage Tracking",
    ],
    cta: "Book Real Estate Strategy Call",
    caseStudy: "Response Time Cut to 10 Seconds — 3.2x Lead Conversion",
  },
  ecommerce: {
    id: "ecommerce",
    name: "E-Commerce & Shopify",
    badge: "🛍️ High-Converting E-Commerce & Shopify Funnels",
    headline: "Custom Shopify Stores, Turnkey Dropship & Funnel Software",
    subheadline:
      "Maximize average order value (AOV) and conversion rates with bespoke Liquid/Hydrogen themes, cart upsells, and ad creative bundles.",
    features: [
      "Hydrogen Headless & Liquid Custom Themes",
      "Dynamic One-Click Cart Upsells & Bundles",
      "Automated Supplier & Order Fulfillment",
      "High-CTR Meta & TikTok Ad Creatives",
    ],
    cta: "Launch Your E-Commerce Store",
    caseStudy: "Scales Store Revenue to $1.2M with 3.8% Conversion Rate",
  },
};

/**
 * Detect country code from browser locale, timezone, or IP headers.
 */
export function detectGeo(): CountryCode {
  if (typeof window === "undefined") return "US";

  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    const lang = navigator.language || "";

    if (tz.includes("Australia") || tz.includes("Sydney") || tz.includes("Melbourne") || lang === "en-AU") {
      return "AU";
    }
    if (tz.includes("Europe/London") || lang === "en-GB") {
      return "GB";
    }
    if (tz.includes("Toronto") || tz.includes("Vancouver") || lang === "en-CA") {
      return "CA";
    }
    if (tz.includes("Kathmandu") || tz.includes("Asia/Kathmandu")) {
      return "NP";
    }
    if (tz.includes("America") || lang === "en-US") {
      return "US";
    }
  } catch (e) {
    console.error("Geo detection fallback", e);
  }

  return "US";
}

/**
 * Format currency according to detected country.
 */
export function formatCurrency(amountUSD: number, geo: GeoData): string {
  const converted = Math.round(amountUSD * geo.rate);
  return `${geo.symbol}${converted.toLocaleString()}`;
}
