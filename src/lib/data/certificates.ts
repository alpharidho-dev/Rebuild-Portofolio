import { certificates as repoCertificates } from "@/config/certificates";
import type { Certificate } from "@/types/content";

/* ------------------------------------------------------------------ */
/* Data access layer untuk certificates — sama polanya dengan          */
/* lib/data/projects.ts. Swap ke Supabase nanti cukup di sini.         */
/* ------------------------------------------------------------------ */

const bySortOrder = (a: Certificate, b: Certificate) =>
  a.sortOrder - b.sortOrder;

export function getPublishedCertificates(): Certificate[] {
  return repoCertificates
    .filter((c) => c.status === "published")
    .sort(bySortOrder);
}

/** Featured = 4-6 untuk marquee homepage. */
export function getFeaturedCertificates(limit = 6): Certificate[] {
  return getPublishedCertificates()
    .filter((c) => c.featured)
    .slice(0, limit);
}