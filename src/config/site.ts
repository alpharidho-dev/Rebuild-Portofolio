import type { SiteConfig } from "@/types/content";

/**
 * Branding & identitas global. Satu-satunya tempat nama/email/sosial
 * didefinisikan — komponen lain tinggal import.
 */
export const siteConfig: SiteConfig = {
  name: "Alpharidho",
  handle: "Dev_Root",
  role: "High School Developer",
  tagline: "full-stack web · React · Next.js · TypeScript",
  email: "hello@alpharidho.dev",
  location: "Jakarta, ID (UTC+7)",
  status: "open for work",
  version: "v0.1.0",
  socials: [
    { label: "GitHub", href: "https://github.com/alpharidho-dev" },
    { label: "Instagram", href: "https://www.instagram.com/alpharidhooo/" },
  ],
};