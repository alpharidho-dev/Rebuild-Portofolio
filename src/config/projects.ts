import type { Project } from "@/types/content";

/**
 * Projects — seed data di repo. Nanti bisa di-swap ke Supabase tanpa
 * mengubah komponen (akses lewat lib/data/projects.ts).
 * featured: hanya 3 terbaik (kuota homepage).
 */
export const projects: Project[] = [
  {
    slug: "cli-dashboard",
    title: "CLI Dashboard",
    tagline:
      "Terminal-native dashboard streaming CPU, memory and deploy metrics over websockets — renders entirely in the shell.",
    description:
      "A dashboard that lives where the work happens: the terminal. Instead of a browser tab you forget to check, metrics stream straight into a live TUI.\n\nBuilt on Ink (React for CLIs), it renders CPU, memory and deploy status as real-time panels. A WebSocket keeps the whole thing in sync, and every render stays under one frame — no canvas, no browser, just escape codes.",
    techStack: ["Node.js", "Ink", "WebSocket"],
    repoUrl: "https://github.com/alpharidho-dev",
    featured: true,
    sortOrder: 1,
    status: "published",
  },
  {
    slug: "realtime-collab-editor",
    title: "Realtime Collab Editor",
    tagline:
      "CRDT-based markdown editor with presence cursors and offline sync. Conflict-free merges across flaky connections.",
    description:
      "A markdown editor that treats offline as the normal case. Cursor presence, live comments and conflict-free merging backed by a CRDT — not a lock in sight.\n\nOn the frontend, Yjs keeps every client's document converged even when edits arrive out of order. The backend persists snapshots to Postgres so a reload (or a week offline) costs nothing.",
    techStack: ["Next.js", "Yjs", "Postgres"],
    repoUrl: "https://github.com/alpharidho-dev",
    featured: true,
    sortOrder: 2,
    status: "published",
  },
  {
    slug: "edge-auth-gateway",
    title: "Edge Auth Gateway",
    tagline:
      "Zero-trust auth layer running at the edge: JWT verification, rate limiting and session revocation in <10ms.",
    description:
      "Authentication as a gateway, not a middleware afterthought. Every request is verified at the edge — JWT signature, session state and rate-limit budget — before it ever reaches your origin.\n\nRevocation is instant: a deny-list lives in a hot cache checked on every hop, so 'log out everywhere' means exactly what it says. The whole check stays under 10ms in the worst case.",
    techStack: ["TypeScript", "Edge", "JWT"],
    repoUrl: "https://github.com/alpharidho-dev",
    featured: true,
    sortOrder: 3,
    status: "published",
  },
  {
    slug: "schema-migrator",
    title: "Schema Migrator",
    tagline:
      "Declarative database migration tool with dry-run diffs, lock-aware execution and automatic rollback plans.",
    description:
      "Migrations you can review before they run. Describe the target schema, and the tool diffs it against production — showing exactly what will change.\n\nExecutions are lock-aware (no two migrations race), and every step ships with a rollback plan generated from the diff. Dry-run is the default; going live is an explicit flag.",
    techStack: ["PostgreSQL", "CLI", "DX"],
    repoUrl: "https://github.com/alpharidho-dev",
    featured: false,
    sortOrder: 4,
    status: "published",
  },
  {
    slug: "telemetry-pipeline",
    title: "Telemetry Pipeline",
    tagline:
      "High-throughput event ingestion: 40k events/s through a Redis buffer into columnar storage with p99 dashboards.",
    description:
      "Events arrive faster than any single writer can keep up, so the pipeline absorbs the spike first. A Redis buffer decouples producers from storage, then batches flush into columnar storage.\n\nEvery stage reports its own p99, and the dashboards that ship with it are the same ones used to tune it — dogfooding by design.",
    techStack: ["Redis", "Kafka", "ClickHouse"],
    repoUrl: "https://github.com/alpharidho-dev",
    featured: false,
    sortOrder: 5,
    status: "published",
  },
  {
    slug: "monorepo-forge",
    title: "Monorepo Forge",
    tagline:
      "Opinionated Turborepo starter: strict TS, changesets, preview deploys and CI caching wired out of the box.",
    description:
      "Starting a monorepo should take minutes, not a weekend of config archaeology. This starter bakes in the boring parts: strict TypeScript everywhere, changesets for releases, preview deploys per branch and CI caches that actually hit.\n\nThe opinion is the point — you spend your energy on product code, not on wiring.",
    techStack: ["Turborepo", "CI/CD", "DX"],
    repoUrl: "https://github.com/alpharidho-dev",
    featured: false,
    sortOrder: 6,
    status: "published",
  },
];