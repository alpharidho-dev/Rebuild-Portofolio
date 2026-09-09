# PRD — PERSONAL PORTOFOLIO v1

Versi: 2.1 (konsolidasi final)
Status: LOCKED
Owner: [nama lu]
PM: Qwen
Catatan: Dokumen ini single source of truth. Perubahan = entry baru di Decision Log + review PM.

## 1. Vision & Goals

Portofolio yang terasa seperti product, bukan template ("portfolio as product").
Visitor menilai kompetensi dalam 30 detik, mengingat setelah menutup tab,
dan punya jalan mulus untuk menghubungi.

Success metrics:
- Lighthouse >= 90 semua kategori, LCP < 2.5s di 4G
- 30-second test: visitor paham siapa dan keahlian inti
- Konversi terukur: klik copy-email / contact CTA
- Ops metric: nambah project/sertifikat = 0 deploy, <= 5 menit via dashboard Supabase

## 2. Users & Jobs

| Persona | Job-to-be-done |
|---|---|
| Recruiter / hiring manager | Scan cepat, bukti kompetensi, kontak |
| Tech lead / engineer peer | Kedalaman case study, kualitas repo, taste |
| Calon klien | Validasi (sertifikat, live stats), kontak |
| Sesama dev | Live stats dan lab, reason to remember |

## 3. Scope

IN v1:
- 3 route: `/`, `/live`, `/karya` + `/karya/[slug]`
- 7 section Beranda (S1-S7)
- Supabase headless CMS: table projects + certificates + Storage bucket
- Responsive 3 breakpoint (mobile-first)
- SEO/OG, analytics ringan
- Content ops manual via dashboard Supabase

OUT v1 (backlog v2):
blog/writing, guestbook, custom admin UI (trigger-based), command palette,
i18n, resume generator, stats history chart, on-demand revalidate webhook,
testimonials, uses/now page, Railway cron jobs.

## 4. IA & Navigation

Layout regions — desktop (>= 1024px):
- Region A: Sidebar, fixed kiri full-height. Isi: global nav (3 route) + cockpit
  (status dot "open for work", local time WIB live, socials, version/copyright)
- Region B: Sub-nav, sticky di atas main column. Isi: anchor section route aktif
- Region C: Main content, section bertumpuk S1-S7

Tablet (768-1024px):
- Sidebar collapse jadi icon rail ~64px, label via tooltip
- Sub-nav sama seperti desktop

Mobile (< 768px):
- Sidebar diganti bottom tab bar 3 item
- Sub-nav diganti chip horizontal, muncul hanya setelah scroll lewat hero
- Info cockpit pindah jadi badge di Hero

Global nav (sidebar):
1. Beranda -> `/`
2. Live Experience -> `/live` (sublabel: "real-time stats")
3. Karya -> `/karya`

Sub-nav Beranda: About, Stack, Karya Terpilih, Sertifikat, Connect
Perilaku sub-nav:
- Sticky + backdrop-blur
- Smooth scroll ke anchor, section wajib punya id + scroll-mt-24
- Scroll-spy via useActiveSection + bottom-of-page fix (section terakhir jujur)
- Render hanya jika jumlah section >= 3

## 5. Page & Section Spec

Route `/` (Beranda):
- S1 Hero + CV download (CTA: Lihat Karya, Download CV; bg BinaryRain)
- S2 About (story, foto, quick facts)
- S3 Tech Stack (SkillsGrid grouped)
- S4 Karya Terpilih (3 project featured + link semua karya)
- S5 Sertifikat (marquee 4-6 featured, pause on hover, link credential)
- S6 Let's Connect (copy email, socials, booking placeholder)
- S7 Footer (colophon, copyright)

Route `/live`:
- GitHub stats card, Monkeytype stats card, StatTile
- Cached fetch, skeleton loading, error = card graceful hide

Route `/karya`:
- Grid semua project published, urut sort_order

Route `/karya/[slug]`:
- Case study: markdown story, tech badges, repo/live link
- Metadata + OG per project
- status draft = 404

## 6. Data & Infrastructure

Repo = CMS data struktural:
- config/site.ts, config/navigation.ts, config/skills.ts, content/about.ts

Supabase = headless CMS data hidup:
- Table projects, certificates + bucket Storage
- Server components only (SEO), tidak ada client-fetch untuk konten
- revalidate 3600 (ISR); Supabase down = Vercel saji cache lama

Data access layer:
- lib/data/projects.ts, lib/data/certificates.ts, types/content.ts
- Komponen tidak mengetahui sumber data

Keamanan:
- RLS: anon SELECT only; insert/update hanya service role/dashboard
- Service role key tidak pernah masuk repo atau kode client
- Bucket public-read; next/image remotePatterns domain Supabase

Hosting:
- Vercel (ISR, CDN, OG). Railway = opsi v2. MySQL = tidak pernah.

## 7. Content Ops (manual via dashboard)

Guardrail DB (dipasang saat T2):
- status default 'draft' + check constraint ('published','draft')
- slug unique not null; title not null; sort_order default 0
- Bucket per folder: projects/[slug]/cover.png, certificates/[slug].png

SOP nambah project (+/- 3 menit):
1. Upload cover ke bucket, folder projects/[slug]/, copy public URL
2. Insert row: slug kebab-case, title, tagline, cover_url, tech_stack, repo_url, live_url
3. featured true hanya untuk 3 terbaik (kuota home)
4. sort_order = urutan di /karya
5. Flip status published paling terakhir; tayang <= 1 jam

SOP sertifikat: alur sama; featured = 4-6 untuk marquee home.

Pitfall checklist:
slug kembar, cover_url masih path lokal, featured kelebihan kuota, status ketinggalan draft.

Runbook: docs/content-ops.md (bagian dari DoD T2). Tidak ada custom admin UI di v1.

## 8. Non-Functional Requirements

- SEO: metadata per route, OG image, sitemap, robots, JSON-LD Person
- A11y: nav landmarks, aria-current, focus visible, kontras AA,
  prefers-reduced-motion (marquee jadi grid statis, BinaryRain off)
- Resilience: error boundary per section, 404 custom, graceful hide saat fetch gagal
- Perf: next/image semua asset, font self-host

## 9. Design Direction

Brand: "portfolio as product". Dark, app-like cockpit, editorial section numbering
(01-06), marquee dan BinaryRain sebagai signature motion, copy EN.
Sidebar harus earn its space sebagai cockpit, bukan 3 link melayang.

## 10. Risk Register

| Risiko | Mitigasi | Tiket |
|---|---|---|
| Chrome mobile sesak | bottom bar + chip conditional | T9 |
| Scroll-spy bohong di section akhir | bottom-of-page fix | T8 |
| Supabase outage | ISR stale cache + seed fallback | T3, T20 |
| Key leak | RLS read-only anon, service role offline | T2 |
| Human error input manual | guardrail DB + runbook | T2 |
| Scope creep | backlog v2, no ticket no work | rules |

## 11. Decision Log

- D1: Nav = sidebar cockpit + sub-nav contextual (reversible via data-driven config)
- D2: 3 route; About = section, bukan route
- D3: Beranda = 7 section (S1-S7)
- D4: Arsitektur data-driven; nambah konten bukan ubah komponen
- D5: Responsive mobile-first, 3 breakpoint
- D6: Defaults: /live v1 stats only; marquee sertifikat; copy EN; CV PDF statis; sub-nav >= 3; scroll-spy bottom-fix
- D7: (direvisi D9) v1 zero-DB sampai data menuntut
- D8: Hosting Vercel; Railway v2; MySQL never
- D9: Supabase headless CMS (projects, certificates, bucket); RLS SELECT-only; ISR 3600; skills/config tetap di repo
- D10: Konten manual via dashboard Supabase; nol admin UI custom v1; guardrail DB + runbook
- D11: Git workflow Conventional Commits, push per commit, branch per tiket

## 12. Task Breakdown

Global Definition of Done (semua tiket):
- Commit Conventional Commits + pushed
- tsc --noEmit dan lint clean
- Nol secret ter-commit
- UI dites di 390 / 768 / 1280
- Lapor PM sebelum lanjut tiket berikutnya

Sprint 1 — Fondasi & Shell:
- T1 Config branding & nav (S, dep -): site.ts + navigation.ts + types. Done: nol hardcode branding/nav
- T2 Supabase setup (M, dep -): table, RLS, bucket, guardrail D10, seed, docs/content-ops.md. Done: anon read OK, anon insert ditolak
- T3 Data access layer (M, dep T2): lib/data/*, types/content.ts, env, remotePatterns, fallback. Done: network mati bukan crash
- T4 SectionShell primitive (S, dep -): prop id, index, heading, scroll-mt-24
- T5 Shell layout responsive (M, dep T1): 3 breakpoint
- T6 Sidebar global nav (S, dep T1,T5): active route, icon rail tablet
- T7 Sidebar cockpit (S, dep T6): status, jam WIB live, socials, version
- T8 SectionNav sub-nav (M, dep T1,T5): sticky blur, scroll-spy + bottom-fix, hide jika < 3 section
- T9 Mobile nav behavior (M, dep T6,T8): bottom tab bar + chip setelah hero
- T10 HeroSection + CV (M, dep T1,T4): CTA ganda, BinaryRain reduced-motion safe

Sprint 2 — Core Content:
- T11 AboutSection (S, dep T4)
- T12 StackSection / SkillsGrid (S, dep T4)
- T13 /karya index (M, dep T3,T4): grid published, sort_order
- T14 /karya/[slug] case study (L, dep T13): markdown, OG per project, draft = 404
- T15 SelectedWorksSection (S, dep T13): 3 featured + link semua karya

Sprint 3 — Validasi & Diferensiator:
- T16 CertificatesSection (M, dep T3,T4): marquee pause-hover, credential link, reduced-motion fallback
- T17 /live stats (M, dep T4): GitHub + Monkeytype cards, skeleton, graceful error
- T18 ConnectSection + Footer (S, dep T4): copy-email feedback, socials, colophon

Sprint 4 — Polish, SEO, Ops:
- T19 SEO & OG global (M, dep T14)
- T20 Resilience pass (M, dep semua section): error boundary, 404, tes Supabase mati
- T21 A11y & perf pass (M, dep semua): Lighthouse >= 90 x4
- T22 Analytics + content production (S, dep T19): seed final, hapus placeholder

## 13. Engineering Conventions

Conventional Commits: type(scope): deskripsi
Types: feat, fix, refactor, style, perf, docs, chore, ci, test
Scope satu kata: nav, projects, hero, data, config, ops

Contoh:
- feat(config): add site branding and navigation config
- chore(supabase): init tables, RLS policies, and storage bucket
- feat(nav): add sticky sub-nav with scroll-spy and bottom fix
- fix(nav): prevent scroll-spy lying on last section
- docs(prd): add consolidated PRD v2.1

Aturan git:
1. Satu commit = satu logical change
2. Push setelah setiap commit sukses, jangan tumpuk
3. Pre-push: tsc --noEmit clean, lint clean, cek tidak ada .env/key
4. Branch: feat/[ticket]-[slug] + PR self-merge, body = catatan keputusan
5. Dilarang: message WIP, update, fix bug
6. .gitignore: .env*, node_modules, .next, .DS_Store, *.log

## 14. Rules of Working

1. Satu tiket per waktu, urut dependensi
2. Lapor PM tiap tiket selesai, review sebelum lanjut
3. Tidak ada service/fitur baru tanpa tiket + trade-off eksplisit
4. Setelah T2: konten project/sertifikat wajib lewat dashboard, bukan kode
5. Pusing = horison terlalu lebar, kembali ke tiket aktif
6. Keputusan dokumen ini tidak dibuka ulang kecuali ada data baru
7. Semua deliverable untuk repo dikirim sebagai raw Markdown satu code block, tanpa ASCII art