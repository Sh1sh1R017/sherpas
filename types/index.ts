/** Shared type definitions for the Sherpas site. */

export interface NavLink {
  label: string;
  href: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export interface ValueItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}
