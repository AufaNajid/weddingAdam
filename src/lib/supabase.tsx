import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const validUrl = url && URL.canParse(url) && /^https?:/.test(url);
export const isSupabaseConfigured = Boolean(validUrl && anonKey);
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url!, anonKey!, { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } })
  : null;

export type Attendance = "Hadir" | "Tidak Hadir" | "Masih Ragu";
export type GuestbookEntry = { id: string; created_at: string; name: string; message: string | null };
export const GUESTBOOK_TABLE = "guestbook";
