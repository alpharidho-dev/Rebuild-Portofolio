/* ------------------------------------------------------------------ */
/* Shared content types — used by config/, lib/data/ and components.  */
/* Komponen tidak pernah membaca config/ langsung, selalu lewat       */
/* lib/data/ supaya sumber data bisa di-swap (repo → Supabase)         */
/* tanpa menyentuh UI.                                                 */
/* ------------------------------------------------------------------ */

export interface SocialLink {
  label: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  handle: string;
  role: string;
  tagline: string;
  email: string;
  location: string;
  status: string;
  version: string;
  socials: SocialLink[];
}

export interface NavItem {
  label: string;
  href: string;
}

export type TechCategory = "skills" | "frameworks" | "tools";

export interface TechItem {
  name: string;
  code: string;
  note: string;
  category: TechCategory;
}

export type PublishStatus = "published" | "draft";

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  techStack: string[];
  coverUrl?: string;
  repoUrl?: string;
  liveUrl?: string;
  featured: boolean;
  sortOrder: number;
  status: PublishStatus;
}

export interface Certificate {
  slug: string;
  title: string;
  issuer: string;
  year: string;
  credentialUrl?: string;
  imageUrl?: string;
  featured: boolean;
  sortOrder: number;
  status: PublishStatus;
}