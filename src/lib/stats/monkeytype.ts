/* ------------------------------------------------------------------ */
/* MonkeyType stats fetcher — server-side only.                        */
/*                                                                     */
/* Env: APIMONKEYTYPER (Ape Key dari monkeytype.com → settings →       */
/* ape keys → generate & enable). Saat ini masih dummy; ganti sendiri  */
/* di .env.local. Selama key dummy / fetch gagal, halaman menampilkan  */
/* DEMO data supaya desain tetap kelihatan.                            */
/* ------------------------------------------------------------------ */

const BASE = "https://api.monkeytype.com";
const APE_KEY = process.env.APIMONKEYTYPER || "ape_key_dummy_ganti_sendiri";

export interface PbEntry {
  wpm: number;
  raw: number;
  acc: number;
  consistency: number;
}

export interface RecentTest {
  wpm: number;
  acc: number;
  mode2: string;
  ts: number;
}

export interface MonkeytypeData {
  source: "live" | "demo";
  best: { t15: PbEntry | null; t30: PbEntry | null; t60: PbEntry | null };
  avgAcc: number | null;
  timeTypingHours: number;
  completedTests: number;
  recent: RecentTest[];
}

const DEMO: MonkeytypeData = {
  source: "demo",
  best: {
    t15: { wpm: 82, raw: 89, acc: 97.1, consistency: 91 },
    t30: { wpm: 76, raw: 82, acc: 96.6, consistency: 89 },
    t60: { wpm: 71, raw: 76, acc: 96.2, consistency: 87 },
  },
  avgAcc: 96.4,
  timeTypingHours: 47.5,
  completedTests: 1284,
  recent: [62, 65, 61, 68, 70, 66, 72, 74, 69, 71].map((wpm, i) => ({
    wpm,
    acc: 95 + ((i * 7) % 5),
    mode2: "30",
    ts: i,
  })),
};

/* Tipe minimal response API MonkeyType. */
interface MtStatsRaw {
  data?: { timeTyping?: number; completedTests?: number };
}

interface MtPbsRaw {
  data?: { time?: Record<string, unknown> };
}

interface MtResultsRaw {
  data?: unknown;
}

interface MtPbRaw {
  wpm?: unknown;
  raw?: unknown;
  acc?: unknown;
  consistency?: unknown;
}

interface MtResultRaw {
  wpm?: unknown;
  acc?: unknown;
  mode2?: unknown;
  timestamp?: unknown;
}

async function getJson<T>(path: string, signal: AbortSignal): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { Authorization: `ApeKey ${APE_KEY}` },
    signal,
  });
  if (!res.ok) throw new Error(`monkeytype ${res.status}`);
  return res.json();
}

/** Ambil entry dengan wpm tertinggi dari array personal bests. */
function bestOf(list: unknown): PbEntry | null {
  if (!Array.isArray(list) || list.length === 0) return null;
  let best: PbEntry | null = null;
  for (const raw of list) {
    const e = raw as MtPbRaw;
    if (typeof e.wpm !== "number") continue;
    if (!best || e.wpm > best.wpm) {
      best = {
        wpm: e.wpm,
        raw: typeof e.raw === "number" ? e.raw : 0,
        acc: typeof e.acc === "number" ? e.acc : 0,
        consistency: typeof e.consistency === "number" ? e.consistency : 0,
      };
    }
  }
  return best;
}

export async function getMonkeytypeStats(): Promise<MonkeytypeData> {
  try {
    const signal = AbortSignal.timeout(6000);
    const [stats, pbs, results] = await Promise.all([
      getJson<MtStatsRaw>("/users/stats", signal).catch(() => null),
      getJson<MtPbsRaw>("/users/personalBests?mode=time", signal).catch(() => null),
      getJson<MtResultsRaw>("/results?limit=10", signal).catch(() => null),
    ]);
    if (!stats && !pbs && !results) return DEMO;

    // shape response: data = { "15": [...], "30": [...], "60": [...] }
    const time = (pbs?.data?.time ?? pbs?.data ?? {}) as Record<
      string,
      unknown
    >;
    const recentRaw: unknown[] = Array.isArray(results?.data)
      ? (results.data as unknown[])
      : [];
    const recent: RecentTest[] = recentRaw
      .map((raw) => {
        const r = raw as MtResultRaw;
        return {
          wpm: typeof r.wpm === "number" ? r.wpm : 0,
          acc: typeof r.acc === "number" ? r.acc : 0,
          mode2: String(r.mode2 ?? ""),
          ts: typeof r.timestamp === "number" ? r.timestamp : 0,
        };
      })
      .reverse(); // urut kronologis buat chart

    const best = {
      t15: bestOf(time["15"]),
      t30: bestOf(time["30"]),
      t60: bestOf(time["60"]),
    };

    // API stats nggak punya field acc — rata-rata dari recent tests / bests
    const accPool = [
      ...recent.map((r) => r.acc),
      ...[best.t15, best.t30, best.t60].filter(Boolean).map((b) => b!.acc),
    ].filter((n) => n > 0);
    const avgAcc = accPool.length
      ? Math.round((accPool.reduce((a, b) => a + b, 0) / accPool.length) * 10) / 10
      : null;

    return {
      source: "live",
      best,
      avgAcc,
      timeTypingHours:
        Math.round(((stats?.data?.timeTyping ?? 0) / 3600) * 10) / 10,
      completedTests: stats?.data?.completedTests ?? 0,
      recent,
    };
  } catch {
    return DEMO;
  }
}
