import { createClient, SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(url && anonKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url as string, anonKey as string)
  : null;

export type GuestbookEntry = {
  id: string;
  created_at: string;
  name: string;
  attendance: "Hadir" | "Tidak Hadir" | "Masih Ragu";
  message: string | null;
};

export const GUESTBOOK_TABLE = "guestbook";
