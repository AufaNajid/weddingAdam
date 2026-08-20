"use client";

import { useEffect, useState } from "react";
import { supabase, GUESTBOOK_TABLE, type GuestbookEntry } from "../lib/supabase";

export default function GuestbookWall() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(supabase ? "loading" : "error");

  useEffect(() => {
    const client = supabase;
    if (!client) return;
    const controller = new AbortController();
    let active = true;
    const timeout = setTimeout(() => controller.abort(), 12000);
    async function load() {
      try {
        const { data, error } = await client!.from(GUESTBOOK_TABLE).select("id,created_at,name,message").not("message", "is", null).order("created_at", { ascending: false }).limit(60).abortSignal(controller.signal);
        if (error) throw error;
        if (active) { setEntries((data ?? []) as GuestbookEntry[]); setStatus("ready"); }
      } catch { if (active) setStatus("error"); }
      finally { clearTimeout(timeout); }
    }
    void load();
    return () => { active = false; clearTimeout(timeout); controller.abort(); };
  }, []);

  return <section className="guestbook" aria-labelledby="guestbook-title"><div className="guestbook-title"><h3 id="guestbook-title">Words of love.</h3><span>{entries.length > 0 ? `${entries.length} ucapan & doa` : "UCAPAN & DOA"}</span></div>
    {status === "loading" ? <p className="guestbook-notice" role="status">Memuat ucapan…</p> : status === "error" ? <p className="guestbook-notice" role="status">Ucapan belum dapat ditampilkan saat ini. Silakan coba lagi nanti.</p> : entries.length === 0 ? <p className="guestbook-notice">Jadilah yang pertama meninggalkan ucapan dan doa untuk kami.</p> : <div className="guestbook-entries">{entries.map((entry) => <article key={entry.id} className="guestbook-entry"><h4>{entry.name}</h4><p>{entry.message}</p><time dateTime={entry.created_at}>{new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Jakarta" }).format(new Date(entry.created_at))}</time></article>)}</div>}
  </section>;
}
