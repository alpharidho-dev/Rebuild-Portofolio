-- =====================================================================
-- SUPABASE SETUP — portfolio CMS (PRD v2.1 §6-7)
-- ---------------------------------------------------------------------
-- Cara pakai:
--   1. Buka Supabase Dashboard → project lu → SQL Editor → New query
--   2. Paste SEMUA isi file ini → RUN (satu kali, idempotent)
--   3. Selesai — kode di repo otomatis baca data dari sini (ISR 1 jam),
--      kalau error/offline fallback ke config/ (seed di repo).
--
-- Catatan:
--   - RLS: anon hanya bisa SELECT. Insert/update/delete hanya lewat
--     dashboard/service role (jangan pernah taruh service key di repo).
--   - Bucket public 'portfolio': cover projects/[slug]/cover.png,
--     sertifikat certificates/[slug].png
-- =====================================================================

-- ---------------------------------------------------------------------
-- TABLES
-- ---------------------------------------------------------------------
create table if not exists public.projects (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  title       text not null,
  tagline     text not null default '',
  description text not null default '',
  tech_stack  text[] not null default '{}',
  cover_url   text,
  repo_url    text,
  live_url    text,
  featured    boolean not null default false,
  sort_order  integer not null default 0,
  status      text not null default 'draft'
              check (status in ('published', 'draft')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table if not exists public.certificates (
  id             uuid primary key default gen_random_uuid(),
  slug           text not null unique,
  title          text not null,
  issuer         text not null default '',
  year           text not null default '',
  credential_url text,
  image_url      text,
  featured       boolean not null default false,
  sort_order     integer not null default 0,
  status         text not null default 'draft'
                 check (status in ('published', 'draft')),
  created_at     timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- RLS — anon SELECT only
-- ---------------------------------------------------------------------
alter table public.projects enable row level security;
alter table public.certificates enable row level security;

drop policy if exists "public read projects" on public.projects;
create policy "public read projects"
  on public.projects for select using (true);

drop policy if exists "public read certificates" on public.certificates;
create policy "public read certificates"
  on public.certificates for select using (true);

-- ---------------------------------------------------------------------
-- STORAGE BUCKET (public read)
-- ---------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('portfolio', 'portfolio', true)
on conflict (id) do nothing;

drop policy if exists "public read portfolio" on storage.objects;
create policy "public read portfolio"
  on storage.objects for select
  using (bucket_id = 'portfolio');

-- ---------------------------------------------------------------------
-- SEED DATA (sama isinya dengan config/ di repo)
-- ---------------------------------------------------------------------
insert into public.projects (slug, title, tagline, description, tech_stack, repo_url, featured, sort_order, status) values
  (
    'cli-dashboard',
    'CLI Dashboard',
    'Terminal-native dashboard streaming CPU, memory and deploy metrics over websockets — renders entirely in the shell.',
    'A dashboard that lives where the work happens: the terminal. Instead of a browser tab you forget to check, metrics stream straight into a live TUI.\n\nBuilt on Ink (React for CLIs), it renders CPU, memory and deploy status as real-time panels. A WebSocket keeps the whole thing in sync, and every render stays under one frame — no canvas, no browser, just escape codes.',
    array['Node.js', 'Ink', 'WebSocket'],
    'https://github.com/alpharidho-dev',
    true, 1, 'published'
  ),
  (
    'realtime-collab-editor',
    'Realtime Collab Editor',
    'CRDT-based markdown editor with presence cursors and offline sync. Conflict-free merges across flaky connections.',
    'A markdown editor that treats offline as the normal case. Cursor presence, live comments and conflict-free merging backed by a CRDT — not a lock in sight.\n\nOn the frontend, Yjs keeps every client''s document converged even when edits arrive out of order. The backend persists snapshots to Postgres so a reload (or a week offline) costs nothing.',
    array['Next.js', 'Yjs', 'Postgres'],
    'https://github.com/alpharidho-dev',
    true, 2, 'published'
  ),
  (
    'edge-auth-gateway',
    'Edge Auth Gateway',
    'Zero-trust auth layer running at the edge: JWT verification, rate limiting and session revocation in <10ms.',
    'Authentication as a gateway, not a middleware afterthought. Every request is verified at the edge — JWT signature, session state and rate-limit budget — before it ever reaches your origin.\n\nRevocation is instant: a deny-list lives in a hot cache checked on every hop, so ''log out everywhere'' means exactly what it says. The whole check stays under 10ms in the worst case.',
    array['TypeScript', 'Edge', 'JWT'],
    'https://github.com/alpharidho-dev',
    true, 3, 'published'
  ),
  (
    'schema-migrator',
    'Schema Migrator',
    'Declarative database migration tool with dry-run diffs, lock-aware execution and automatic rollback plans.',
    'Migrations you can review before they run. Describe the target schema, and the tool diffs it against production — showing exactly what will change.\n\nExecutions are lock-aware (no two migrations race), and every step ships with a rollback plan generated from the diff. Dry-run is the default; going live is an explicit flag.',
    array['PostgreSQL', 'CLI', 'DX'],
    'https://github.com/alpharidho-dev',
    false, 4, 'published'
  ),
  (
    'telemetry-pipeline',
    'Telemetry Pipeline',
    'High-throughput event ingestion: 40k events/s through a Redis buffer into columnar storage with p99 dashboards.',
    'Events arrive faster than any single writer can keep up, so the pipeline absorbs the spike first. A Redis buffer decouples producers from storage, then batches flush into columnar storage.\n\nEvery stage reports its own p99, and the dashboards that ship with it are the same ones used to tune it — dogfooding by design.',
    array['Redis', 'Kafka', 'ClickHouse'],
    'https://github.com/alpharidho-dev',
    false, 5, 'published'
  ),
  (
    'monorepo-forge',
    'Monorepo Forge',
    'Opinionated Turborepo starter: strict TS, changesets, preview deploys and CI caching wired out of the box.',
    'Starting a monorepo should take minutes, not a weekend of config archaeology. This starter bakes in the boring parts: strict TypeScript everywhere, changesets for releases, preview deploys per branch and CI caches that actually hit.\n\nThe opinion is the point — you spend your energy on product code, not on wiring.',
    array['Turborepo', 'CI/CD', 'DX'],
    'https://github.com/alpharidho-dev',
    false, 6, 'published'
  )
on conflict (slug) do nothing;

insert into public.certificates (slug, title, issuer, year, credential_url, featured, sort_order, status) values
  ('dicoding-web-dasar',    'Belajar Dasar Pemrograman Web',               'Dicoding',     '2025', 'https://www.dicoding.com/',    true,  1, 'published'),
  ('fcc-responsive-web',    'Responsive Web Design',                        'freeCodeCamp', '2025', 'https://www.freecodecamp.org/', true,  2, 'published'),
  ('dicoding-javascript',   'Dasar JavaScript',                             'Dicoding',     '2025', 'https://www.dicoding.com/',    true,  3, 'published'),
  ('fcc-js-algorithms',     'JavaScript Algorithms & Data Structures',      'freeCodeCamp', '2024', 'https://www.freecodecamp.org/', true,  4, 'published'),
  ('dicoding-fe-expert',    'Front-End Web Developer Expert',               'Dicoding',     '2024', 'https://www.dicoding.com/',    true,  5, 'published'),
  ('bnsp-rpl',              'Junior Web Developer (BNSP)',                  'BNSP',         '2024', 'https://bnsp.go.id/',           false, 6, 'published')
on conflict (slug) do nothing;

-- =====================================================================
-- SOP nambah project (dashboard Supabase):
--   1. Upload cover ke Storage → bucket 'portfolio' → projects/[slug]/cover.png
--   2. Insert row di table projects: slug kebab-case, title, tagline,
--      description, tech_stack, repo_url, featured (max 3 utk home), sort_order
--   3. status 'published' paling terakhir → tayang <= 1 jam (ISR 3600)
-- =====================================================================