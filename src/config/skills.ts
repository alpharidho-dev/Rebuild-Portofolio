import type { TechItem } from "@/types/content";

/**
 * Tech stack, dikelompokkan per kategori. Diambil dari stack yang
 * sudah ada di Sections.tsx + kategori dari SkillsGrid.
 */
export const skills: TechItem[] = [
  // language & core
  { name: "TypeScript", code: "TS", note: "language", category: "skills" },
  { name: "JavaScript", code: "JS", note: "language", category: "skills" },
  { name: "HTML/CSS", code: "HC", note: "markup", category: "skills" },
  { name: "Node.js", code: "NO", note: "runtime", category: "skills" },
  { name: "PostgreSQL", code: "PG", note: "database", category: "skills" },
  { name: "MySQL", code: "MY", note: "database", category: "skills" },

  // frameworks & ui
  { name: "Next.js", code: "NX", note: "framework", category: "frameworks" },
  { name: "React", code: "RE", note: "ui", category: "frameworks" },
  { name: "Tailwind CSS", code: "TW", note: "styling", category: "frameworks" },
  { name: "GraphQL", code: "GQ", note: "api", category: "frameworks" },
  { name: "Redis", code: "RD", note: "cache", category: "frameworks" },

  // tools & infra
  { name: "Docker", code: "DK", note: "containers", category: "tools" },
  { name: "Git", code: "GT", note: "vcs", category: "tools" },
  { name: "Vitest", code: "VT", note: "testing", category: "tools" },
  { name: "AWS", code: "AW", note: "cloud", category: "tools" },
];