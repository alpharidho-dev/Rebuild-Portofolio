import { certificates as repoCertificates } from "@/config/certificates";
import { getSupabase } from "@/lib/supabase/client";
import type { Certificate } from "@/types/content";

/* ------------------------------------------------------------------ */
/* Data access layer untuk certificates — sama polanya dengan          */
/* lib/data/projects.ts: Supabase dulu, fallback config/ kalau error.  */
/* ------------------------------------------------------------------ */

const bySortOrder = (a: Certificate, b: Certificate) =>
  a.sortOrder - b.sortOrder;

function repoPublished(): Certificate[] {
  return repoCertificates
    .filter((c) => c.status === "published")
    .sort(bySortOrder);
}

function rowToCertificate(row: Record<string, unknown>): Certificate {
  return {
    slug: String(row.slug ?? ""),
    title: String(row.title ?? ""),
    issuer: String(row.issuer ?? ""),
    year: String(row.year ?? ""),
    credentialUrl: row.credential_url ? String(row.credential_url) : undefined,
    imageUrl: row.image_url ? String(row.image_url) : undefined,
    featured: Boolean(row.featured),
    sortOrder: Number(row.sort_order ?? 0),
    status: row.status === "draft" ? "draft" : "published",
  };
}

export async function getPublishedCertificates(): Promise<Certificate[]> {
  const supabase = getSupabase();
  if (!supabase) return repoPublished();

  try {
    const { data, error } = await supabase
      .from("certificates")
      .select("*")
      .eq("status", "published")
      .order("sort_order");

    if (error) throw new Error(error.message);

    const rows = (data ?? []) as unknown as Record<string, unknown>[];
    if (rows.length === 0) return repoPublished(); // tabel kosong → seed repo
    return rows.map(rowToCertificate);
  } catch {
    return repoPublished(); // Supabase down / error → seed repo
  }
}

/** Featured = 4-6 untuk marquee/homepage. */
export async function getFeaturedCertificates(
  limit = 6,
): Promise<Certificate[]> {
  return (await getPublishedCertificates())
    .filter((c) => c.featured)
    .slice(0, limit);
}