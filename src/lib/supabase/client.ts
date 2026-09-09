import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/* ------------------------------------------------------------------ */
/* Supabase client — server-side only (dipakai di lib/data/*).         */
/*                                                                     */
/* Env (di .env.local, sudah ada):                                    */
/*  - SUPABASE_URL          : https://xxx.supabase.co                  */
/*  - SUPABASE_PUBLIC_KEY   : publishable key (sb_publishable_...)     */
/*                                                                     */
/* Kalau env belum diisi, getSupabase() balikin null → data layer      */
/* fallback ke config/ (seed repo).                                    */
/* ------------------------------------------------------------------ */

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_PUBLIC_KEY;

let cached: SupabaseClient | null | undefined;

export function getSupabase(): SupabaseClient | null {
  if (!url || !key) return null;
  if (cached === undefined) {
    cached = createClient(url, key);
  }
  return cached;
}