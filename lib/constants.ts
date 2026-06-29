import type { NavLink } from "@/types";

/** Primary navigation links used in Navbar and Footer. */
export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

/** Company details used across the site. */
export const COMPANY = {
  name: "Sherpas Technology",
  tagline: "Strategic Business Advisory",
  email: "info@sherpaztech.com",
  phone: "+977 9804279020",
  whatsapp: "https://wa.me/9779804279020",
  address: {
    street: "Biratnagar",
    city: "Biratnagar",
    state: "Province No. 1",
    zip: "",
    country: "Nepal",
  },
  hours: {
    weekdays: "Sunday – Friday: 9:00 AM – 6:00 PM",
    weekends: "Saturday: Closed",
  },
  social: {
    linkedin: "https://linkedin.com/company/sherpas",
    twitter: "https://twitter.com/sherpas",
    whatsapp: "https://wa.me/9779804279020",
  },
} as const;
