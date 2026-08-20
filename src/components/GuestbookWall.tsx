"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase, isSupabaseConfigured, GUESTBOOK_TABLE, GuestbookEntry } from "../lib/supabase";
import FloralOrnament from "./FloralOrnament";

const attendanceStyle: Record<string, string> = {
  Hadir: "bg-forest/10 text-forest border-forest/25",
  "Tidak Hadir": "bg-ink-soft/10 text-ink-soft border-ink-soft/25",
  "Masih Ragu": "bg-gold/10 text-gold-deep border-gold/25",
};

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const min = Math.floor(diff / 60000);
  if (min < 1) return "baru saja";
  if (min < 60) return `${min} menit lalu`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} jam lalu`;
  const day = Math.floor(hr / 24);
  return `${day} hari lalu`;
}

export default function GuestbookWall({ refreshKey }: { refreshKey?: number }) {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    let active = true;

    async function load() {
      const { data } = await supabase!
        .from(GUESTBOOK_TABLE)
        .select("*")
        .order("created_at", { ascending: false })
        .limit(60);
      if (active && data) setEntries(data as GuestbookEntry[]);
      setLoading(false);
    }
    load();

    const channel = supabase
      .channel("guestbook-changes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: GUESTBOOK_TABLE },
        (payload) => {
          setEntries((prev) => [payload.new as GuestbookEntry, ...prev]);
        }
      )
      .subscribe();

    return () => {
      active = false;
      supabase!.removeChannel(channel);
    };
  }, [refreshKey]);

  if (!isSupabaseConfigured) {
    return (
      <div className="max-w-md mx-auto mt-10 text-center text-xs text-ink-soft/70 border border-dashed border-gold-pale rounded-2xl py-6 px-4">
        Buku tamu publik belum aktif. Hubungkan Supabase (lihat
        GUESTBOOK-SETUP.md) supaya ucapan tamu bisa tampil di sini untuk semua
        orang.
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto mt-14">
      <div className="divider-flourish mb-8">
        <span className="text-xs tracking-wide-xl uppercase text-ink-soft">
          Ucapan &amp; Doa dari Tamu
        </span>
      </div>

      {/* single framed box — fixed height, everything scrolls inside */}
      <div className="rounded-2xl border border-gold-pale/60 bg-paper-soft/50 shadow-sm overflow-hidden">
        {loading ? (
          <p className="text-center text-sm text-ink-soft py-10">Memuat ucapan...</p>
        ) : entries.length === 0 ? (
          <div className="text-center py-10">
            <FloralOrnament variant="sprig" className="w-7 mx-auto mb-3 opacity-70" />
            <p className="text-sm text-ink-soft">
              Jadilah yang pertama mengirim ucapan dan doa!
            </p>
          </div>
        ) : (
          <div className="max-h-[360px] overflow-y-auto divide-y divide-gold-pale/40 px-5 sm:px-6">
            <AnimatePresence initial={false}>
              {entries.map((entry) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="py-4 text-left"
                >
                  <div className="flex items-center justify-between gap-3 mb-1">
                    <span className="font-medium text-ink text-sm">{entry.name}</span>
                    <span
                      className={`shrink-0 text-[0.65rem] px-2 py-0.5 rounded-full border ${
                        attendanceStyle[entry.attendance] ?? ""
                      }`}
                    >
                      {entry.attendance}
                    </span>
                  </div>
                  {entry.message && (
                    <p className="text-sm text-ink-soft leading-relaxed">{entry.message}</p>
                  )}
                  <p className="text-[0.65rem] text-ink-soft/50 mt-1.5">
                    {timeAgo(entry.created_at)}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
      {entries.length > 0 && (
        <p className="text-center text-[0.65rem] text-ink-soft/50 mt-3">
          {entries.length} ucapan &middot; gulir untuk lihat lainnya
        </p>
      )}
    </div>
  );
}
