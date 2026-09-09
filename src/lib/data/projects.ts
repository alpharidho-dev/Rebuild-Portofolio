import { projects as repoProjects } from "@/config/projects";
import { getSupabase } from "@/lib/supabase/client";
import type { Project } from "@/types/content";

/* ------------------------------------------------------------------ */
/* Data access layer untuk projects.                                  */
/*                                                                     */
/* Urutan sumber data:                                                  */
/*   1. Supabase (tabel projects, RLS anon SELECT)                     */
/*   2. Kalau env kosong / error / tabel kosong → fallback ke config/  */
/*      (seed di repo) — site tetap tampil, tidak pernah crash.         */
/* Pemanggil (komponen) tidak tahu sumber data.                        */
/* ------------------------------------------------------------------ */

const bySortOrder = (a: Project, b: Project) => a.sortOrder - b.sortOrder;

function repoPublished(): Project[] {
  return repoProjects.filter((p) => p.status === "published").sort(bySortOrder);
}

function rowToProject(row: Record<string, unknown>): Project {
  return {
    slug: String(row.slug ?? ""),
    title: String(row.title ?? ""),
    tagline: String(row.tagline ?? ""),
    description: String(row.description ?? ""),
    techStack: Array.isArray(row.tech_stack)
      ? (row.tech_stack as string[])
      : [],
    coverUrl: row.cover_url ? String(row.cover_url) : undefined,
    repoUrl: row.repo_url ? String(row.repo_url) : undefined,
    liveUrl: row.live_url ? String(row.live_url) : undefined,
    featured: Boolean(row.featured),
    sortOrder: Number(row.sort_order ?? 0),
    status: row.status === "draft" ? "draft" : "published",
  };
}

export async function getPublishedProjects(): Promise<Project[]> {
  const supabase = getSupabase();
  if (!supabase) return repoPublished();

  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("status", "published")
      .order("sort_order");

    if (error) throw new Error(error.message);

    const rows = (data ?? []) as unknown as Record<string, unknown>[];
    if (rows.length === 0) return repoPublished(); // tabel kosong → seed repo
    return rows.map(rowToProject);
  } catch {
    return repoPublished(); // Supabase down / error → seed repo
  }
}

/** Kuota featured di homepage (PRD: hanya 3 terbaik). */
export async function getFeaturedProjects(limit = 3): Promise<Project[]> {
  return (await getPublishedProjects())
    .filter((p) => p.featured)
    .slice(0, limit);
}

export async function getProjectBySlug(
  slug: string,
): Promise<Project | undefined> {
  return (await getPublishedProjects()).find((p) => p.slug === slug);
}

export async function getAllProjectSlugs(): Promise<string[]> {
  return (await getPublishedProjects()).map((p) => p.slug);
}