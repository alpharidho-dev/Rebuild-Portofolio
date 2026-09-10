import type { TechItem } from "@/types/content";

/**
 * Tech stack, dikelompokkan per kategori — 3 baris marquee:
 * baris 1 skills, baris 2 frameworks, baris 3 tools.
 */
export const skills: TechItem[] = [
  // language & core
  { name: "TypeScript", code: "TS", note: "language", category: "skills" },
  { name: "JavaScript", code: "JS", note: "language", category: "skills" },
  { name: "HTML/CSS", code: "HC", note: "markup", category: "skills" },
  { name: "Node.js", code: "NO", note: "runtime", category: "skills" },
  { name: "Python", code: "PY", note: "language", category: "skills" },
  { name: "PHP", code: "PH", note: "language", category: "skills" },
  { name: "C++", code: "CP", note: "language", category: "skills" },
  { name: "Go", code: "GO", note: "language", category: "skills" },
  { name: "PostgreSQL", code: "PG", note: "database", category: "skills" },
  { name: "MySQL", code: "MY", note: "database", category: "skills" },

  // frameworks & ui
  { name: "Next.js", code: "NX", note: "framework", category: "frameworks" },
  { name: "React", code: "RE", note: "ui", category: "frameworks" },
  { name: "Tailwind CSS", code: "TW", note: "styling", category: "frameworks" },
  { name: "Express.js", code: "EX", note: "backend", category: "frameworks" },
  { name: "Prisma", code: "PR", note: "orm", category: "frameworks" },
  { name: "GraphQL", code: "GQ", note: "api", category: "frameworks" },
  { name: "Redis", code: "RD", note: "cache", category: "frameworks" },
  { name: "Shadcn UI", code: "SH", note: "components", category: "frameworks" },
  { name: "Framer Motion", code: "FM", note: "animation", category: "frameworks" },

  // tools & infra
  { name: "Docker", code: "DK", note: "containers", category: "tools" },
  { name: "Git", code: "GT", note: "vcs", category: "tools" },
  { name: "Vitest", code: "VT", note: "testing", category: "tools" },
  { name: "AWS", code: "AW", note: "cloud", category: "tools" },
  { name: "Linux", code: "LN", note: "os", category: "tools" },
  { name: "Vercel", code: "VC", note: "hosting", category: "tools" },
  { name: "Postman", code: "PM", note: "api", category: "tools" },
  { name: "Figma", code: "FG", note: "design", category: "tools" },
  { name: "Supabase", code: "SB", note: "backend", category: "tools" },
  { name: "GitHub Actions", code: "GA", note: "ci/cd", category: "tools" },
];