import { createClient } from "@supabase/supabase-js";

// Publishable values — safe in the client bundle by design; RLS does the guarding.
// Env vars override for future environments.
const url =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://issfvpyewzlnxxdqrzqc.supabase.co";
const key =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  "sb_publishable_FW_-6qH-Q0X71AxlAidEfQ_vR9z6sd8";

export const supabase = createClient(url, key, {
  auth: { persistSession: false },
});
