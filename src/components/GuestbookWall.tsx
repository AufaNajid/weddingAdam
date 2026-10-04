"use client";

import { useEffect, useState } from "react";
import { supabase, GUESTBOOK_TABLE, type GuestbookEntry } from "../lib/supabase";

type Props = {
  /** Naikkan nilainya (mis. setelah RSVP terkirim) untuk mengambil ulang data. */
  refreshKey?: number;
};

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  }).format(new Date(iso));

export default function GuestbookWall({ refreshKey = 0 }: Props) {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    supabase ? "loading" : "error"
  );

  useEffect(() => {
    const client = supabase;
    if (!client) return;

    const controller = new AbortController();
    let active = true;
    const timeout = setTimeout(() => controller.abort(), 12000);

    async function load() {
      try {
        const { data, error } = await client!
          .from(GUESTBOOK_TABLE)
          .select("id,created_at,name,message")
          .not("message", "is", null)
          .order("created_at", { ascending: false })
          .limit(60)
          .abortSignal(controller.signal);

        if (error) throw error;
        if (active) {
          setEntries((data ?? []) as GuestbookEntry[]);
          setStatus("ready");
        }
      } catch {
        if (active) setStatus("error");
      } finally {
        clearTimeout(timeout);
      }
    }

    void load();

    return () => {
      active = false;
      clearTimeout(timeout);
      controller.abort();
    };
  }, [refreshKey]);

  return (
    <section className="guestbook" aria-labelledby="guestbook-title">
      <div className="guestbook-title">
        <h3 id="guestbook-title">Words of love.</h3>
        <span>
          {entries.length > 0 ? `${entries.length} ucapan & doa` : "UCAPAN & DOA"}
        </span>
      </div>

      {status === "loading" ? (
        <p className="guestbook-notice" role="status">
          Memuat ucapan…
        </p>
      ) : status === "error" ? (
        <p className="guestbook-notice" role="status">
          Ucapan belum dapat ditampilkan saat ini. Silakan coba lagi nanti.
        </p>
      ) : entries.length === 0 ? (
        <p className="guestbook-notice">
          Jadilah yang pertama meninggalkan ucapan dan doa untuk kami.
        </p>
      ) : (
        <div className="guestbook-entries">
          {entries.map((entry) => (
            <article key={entry.id} className="guestbook-entry">
              <h4>{entry.name}</h4>
              <p>{entry.message}</p>
              <time dateTime={entry.created_at}>{formatDate(entry.created_at)}</time>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}