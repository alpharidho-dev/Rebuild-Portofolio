import { projects as repoProjects } from "@/config/projects";
import type { Project } from "@/types/content";

/* ------------------------------------------------------------------ */
/* Data access layer untuk projects.                                  */
/*                                                                     */
/* Saat ini membaca dari config/ (repo). Kalau nanti pindah ke         */
/* Supabase, cukup ganti implementasi di bawah — pemanggil (komponen)  */
/* tidak berubah.                                                      */
/* ------------------------------------------------------------------ */

const bySortOrder = (a: Project, b: Project) => a.sortOrder - b.sortOrder;

export function getPublishedProjects(): Project[] {
  return repoProjects
    .filter((p) => p.status === "published")
    .sort(bySortOrder);
}

/** Kuota featured di homepage (PRD: hanya 3 terbaik). */
export function getFeaturedProjects(limit = 3): Project[] {
  return getPublishedProjects()
    .filter((p) => p.featured)
    .slice(0, limit);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getPublishedProjects().find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return getPublishedProjects().map((p) => p.slug);
}