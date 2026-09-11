import {
  siApachekafka,
  siClickhouse,
  siCplusplus,
  siDocker,
  siExpress,
  siFigma,
  siFramer,
  siGithubactions,
  siGit,
  siGo,
  siGraphql,
  siHtml5,
  siJavascript,
  siJsonwebtokens,
  siLinux,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siPhp,
  siPostgresql,
  siPostman,
  siPrisma,
  siPython,
  siReact,
  siRedis,
  siShadcnui,
  siSupabase,
  siTailwindcss,
  siTurborepo,
  siTypescript,
  siVercel,
  siVitest,
} from "simple-icons";
import { Cloud, Code2, type LucideIcon } from "lucide-react";

/* ------------------------------------------------------------------ */
/* TechIcon — logo brand asli per teknologi (via simple-icons).        */
/* Map key harus sama persis dengan nama di config/skills.ts dan       */
/* config/projects.ts (field techStack). Yang nggak ada di map         */
/* (mis. WebSocket, CLI) tidak dirender icon, kecuali fallback=true.   */
/* ------------------------------------------------------------------ */

type IconSource = string | LucideIcon;

const TECH_ICONS: Record<string, IconSource> = {
  "Next.js": siNextdotjs.path,
  React: siReact.path,
  "Tailwind CSS": siTailwindcss.path,
  TypeScript: siTypescript.path,
  JavaScript: siJavascript.path,
  "HTML/CSS": siHtml5.path,
  "Node.js": siNodedotjs.path,
  PostgreSQL: siPostgresql.path,
  Postgres: siPostgresql.path,
  MySQL: siMysql.path,
  GraphQL: siGraphql.path,
  Redis: siRedis.path,
  Docker: siDocker.path,
  Git: siGit.path,
  Vitest: siVitest.path,
  Python: siPython.path,
  PHP: siPhp.path,
  "C++": siCplusplus.path,
  Go: siGo.path,
  "Express.js": siExpress.path,
  Prisma: siPrisma.path,
  "Shadcn UI": siShadcnui.path,
  "Framer Motion": siFramer.path,
  Linux: siLinux.path,
  Vercel: siVercel.path,
  Postman: siPostman.path,
  Figma: siFigma.path,
  Supabase: siSupabase.path,
  "GitHub Actions": siGithubactions.path,
  Kafka: siApachekafka.path,
  ClickHouse: siClickhouse.path,
  Turborepo: siTurborepo.path,
  JWT: siJsonwebtokens.path,
  AWS: Cloud, // icon AWS sudah dihapus dari simple-icons
};

function BrandIcon({ path, className }: { path: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d={path} />
    </svg>
  );
}

export function TechIcon({
  name,
  className,
  fallback = false,
}: {
  name: string;
  className?: string;
  fallback?: boolean;
}) {
  const source = TECH_ICONS[name];

  if (typeof source === "string") {
    return <BrandIcon path={source} className={className} />;
  }

  if (source) {
    const Lucide = source;
    return <Lucide className={className} />;
  }

  if (fallback) return <Code2 className={className} />;
  return null;
}