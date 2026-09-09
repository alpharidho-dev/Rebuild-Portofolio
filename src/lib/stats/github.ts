/* ------------------------------------------------------------------ */
/* GitHub stats fetcher — server-side only.                            */
/*                                                                     */
/* Env (opsional):                                                     */
/*  - GITHUB_USERNAME : username yang ditampilkan (default             */
/*    alpharidho-dev, sesuai link navbar).                             */
/*  - GITHUB_TOKEN    : PAT read-only. Kalau diisi, kalender           */
/*    kontribusi 1 tahun penuh diambil via GraphQL; kalau tidak,       */
/*    fallback ke public events (~90 hari).                            */
/* ------------------------------------------------------------------ */

const GH = "https://api.github.com";
const USERNAME = process.env.GITHUB_USERNAME || "alpharidho-dev";
const TOKEN = process.env.GITHUB_TOKEN || undefined;

export interface Repo {
  name: string;
  stars: number;
  language: string | null;
  url: string;
  description: string | null;
}

export interface GithubData {
  source: "live" | "demo";
  username: string;
  name: string;
  avatarUrl: string;
  joinedYear: string;
  followers: number;
  publicRepos: number;
  totalStars: number;
  contributionsYear: number;
  contributionsLabel: string;
  activity: { label: string; count: number }[]; // 12 minggu terakhir
  languages: { name: string; percent: number }[];
  topRepos: Repo[];
}

const DEMO: GithubData = {
  source: "demo",
  username: "alpharidho-dev",
  name: "Alpharidho",
  avatarUrl: "",
  joinedYear: "2023",
  followers: 87,
  publicRepos: 24,
  totalStars: 312,
  contributionsYear: 1204,
  contributionsLabel: "contributions · 1y",
  activity: [14, 22, 9, 30, 18, 26, 12, 34, 21, 28, 16, 38].map(
    (count, i) => ({ label: `w${i + 1}`, count }),
  ),
  languages: [
    { name: "TypeScript", percent: 46 },
    { name: "CSS", percent: 22 },
    { name: "Shell", percent: 14 },
    { name: "Other", percent: 18 },
  ],
  topRepos: [
    {
      name: "portofolio",
      stars: 96,
      language: "TypeScript",
      url: "https://github.com/alpharidho-dev",
      description: "monochrome portfolio — binary rain included",
    },
    {
      name: "binary-rain.css",
      stars: 84,
      language: "CSS",
      url: "https://github.com/alpharidho-dev",
      description: "deterministic matrix backdrop, zero JS",
    },
    {
      name: "latency-probe",
      stars: 61,
      language: "Shell",
      url: "https://github.com/alpharidho-dev",
      description: "p50/p99 histograms straight in the terminal",
    },
  ],
};

function headers(): Record<string, string> {
  return {
    Accept: "application/vnd.github+json",
    "User-Agent": "portofolio-stats",
    ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
  };
}

async function getJson(path: string, signal: AbortSignal): Promise<any> {
  const res = await fetch(`${GH}${path}`, { headers: headers(), signal });
  if (!res.ok) throw new Error(`github ${res.status}`);
  return res.json();
}

/** 12 bucket minggu (mulai Senin), label "d/m". */
function weekBuckets(n = 12) {
  const startOfWeek = (d: Date) => {
    const x = new Date(d);
    const day = (x.getDay() + 6) % 7;
    x.setDate(x.getDate() - day);
    x.setHours(0, 0, 0, 0);
    return x;
  };
  const first = startOfWeek(new Date());
  first.setDate(first.getDate() - (n - 1) * 7);
  return Array.from({ length: n }, (_, i) => {
    const s = new Date(first);
    s.setDate(s.getDate() + i * 7);
    return { label: `${s.getDate()}/${s.getMonth() + 1}`, start: s.getTime(), count: 0 };
  });
}

const WEEK_MS = 7 * 24 * 3600 * 1000;

export async function getGithubStats(): Promise<GithubData> {
  try {
    const signal = AbortSignal.timeout(6000);
    const [profile, repos] = await Promise.all([
      getJson(`/users/${USERNAME}`, signal),
      getJson(`/users/${USERNAME}/repos?per_page=100&sort=pushed`, signal),
    ]);

    const repoList: Repo[] = (Array.isArray(repos) ? repos : []).map((r: any) => ({
      name: r.name ?? "",
      stars: r.stargazers_count ?? 0,
      language: r.language ?? null,
      url: r.html_url ?? "#",
      description: r.description ?? null,
    }));
    const totalStars = repoList.reduce((s, r) => s + r.stars, 0);

    // bahasa: jumlah repo per bahasa utama, top 4 + Other
    const counts = new Map<string, number>();
    for (const r of repoList) {
      if (!r.language) continue;
      counts.set(r.language, (counts.get(r.language) ?? 0) + 1);
    }
    const counted = [...counts.values()].reduce((a, b) => a + b, 0);
    const langs = [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([name, c]) => ({
        name,
        percent: Math.round((c / Math.max(counted, 1)) * 100),
      }));
    const covered = langs.reduce((a, l) => a + l.percent, 0);
    if (counted > 0 && covered < 100) langs.push({ name: "Other", percent: 100 - covered });

    // aktivitas: GraphQL calendar kalau ada token, kalau tidak public events
    const buckets = weekBuckets();
    let activity: { label: string; count: number }[] = buckets;
    let contributionsYear = 0;
    let contributionsLabel = "public events · 90d";

    if (TOKEN) {
      try {
        const q = `{ user(login: "${USERNAME}") { contributionsCollection { contributionCalendar { totalContributions weeks { contributionDays { date contributionCount } } } } } }`;
        const r = await fetch(`${GH}/graphql`, {
          method: "POST",
          headers: { ...headers(), "Content-Type": "application/json" },
          body: JSON.stringify({ query: q }),
          signal,
        });
        const cal = (await r.json())?.data?.user?.contributionsCollection
          ?.contributionCalendar;
        if (cal) {
          contributionsYear = cal.totalContributions ?? 0;
          contributionsLabel = "contributions · 1y";
          activity = (cal.weeks as any[]).slice(-12).map((w) => {
            const firstDate: string | undefined = w.contributionDays?.[0]?.date;
            const d = firstDate ? new Date(firstDate) : new Date();
            return {
              label: `${d.getDate()}/${d.getMonth() + 1}`,
              count: (w.contributionDays as any[]).reduce(
                (s, day) => s + (day.contributionCount ?? 0),
                0,
              ),
            };
          });
        }
      } catch {
        // fallback ke events di bawah
      }
    }

    if (contributionsLabel !== "contributions · 1y") {
      const events: any[] = await getJson(
        `/users/${USERNAME}/events/public?per_page=100`,
        signal,
      ).catch(() => []);
      const first = buckets[0]?.start ?? Date.now();
      for (const ev of events) {
        const idx = Math.floor((new Date(ev.created_at).getTime() - first) / WEEK_MS);
        if (idx >= 0 && idx < activity.length) activity[idx].count += 1;
      }
      contributionsYear = events.length;
    }

    return {
      source: "live",
      username: profile.login ?? USERNAME,
      name: profile.name ?? profile.login ?? USERNAME,
      avatarUrl: profile.avatar_url ?? "",
      joinedYear: String(new Date(profile.created_at ?? Date.now()).getFullYear()),
      followers: profile.followers ?? 0,
      publicRepos: profile.public_repos ?? 0,
      totalStars,
      contributionsYear,
      contributionsLabel,
      activity,
      languages: langs,
      topRepos: [...repoList].sort((a, b) => b.stars - a.stars).slice(0, 3),
    };
  } catch {
    return DEMO;
  }
}
