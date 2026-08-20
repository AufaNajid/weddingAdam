"use client";

import { FormEvent, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase, isSupabaseConfigured, GUESTBOOK_TABLE } from "../lib/supabase";
import FloralOrnament from "./FloralOrnament";

type Attendance = "Hadir" | "Tidak Hadir" | "Masih Ragu";

const ATTENDANCE_OPTIONS: Attendance[] = ["Hadir", "Tidak Hadir", "Masih Ragu"];

export default function RSVPForm({ onSubmitted }: { onSubmitted?: () => void }) {
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState<Attendance>("Hadir");
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setError("Mohon isi nama Anda terlebih dahulu.");
      return;
    }
    setError("");
    setSubmitting(true);

    if (supabase) {
      const { error: insertError } = await supabase.from(GUESTBOOK_TABLE).insert({
        name: name.trim(),
        attendance,
        guests: attendance === "Hadir" ? guests : null,
        message: message.trim() || null,
      });
      if (insertError) {
        setError("Gagal mengirim, coba lagi sebentar lagi.");
        setSubmitting(false);
        return;
      }
    }

    setSubmitting(false);
    setSubmitted(true);
    onSubmitted?.();
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12 px-8 border border-gold-pale/60 rounded-2xl bg-paper-soft/50 shadow-sm max-w-md mx-auto"
      >
        <FloralOrnament variant="sprig" className="w-8 mx-auto mb-4 opacity-80" />
        <p className="font-[family-name:var(--font-display)] text-2xl text-ink mb-2">
          Terima kasih, {name.split(" ")[0]}
        </p>
        <p className="text-sm text-ink-soft leading-relaxed">
          {attendance === "Hadir"
            ? "Konfirmasi kehadiran Anda telah kami terima. Kami tunggu kehadirannya."
            : attendance === "Tidak Hadir"
            ? "Terima kasih atas konfirmasinya. Doa restu Anda sangat berarti bagi kami."
            : "Terima kasih telah mengabari kami. Kami tunggu kabar selanjutnya."}
        </p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto rounded-2xl border border-gold-pale/50 bg-paper/70 shadow-sm px-6 sm:px-9 py-9 space-y-7"
    >
      <div>
        <label className="block text-[0.68rem] tracking-wide-xl uppercase text-ink-soft mb-2.5">
          Nama
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nama lengkap Anda"
          className="w-full bg-paper-soft/60 border border-gold-pale/40 rounded-xl px-4 py-3 text-ink placeholder:text-ink-soft/45 focus:outline-none focus:border-gold focus:bg-paper transition-colors"
        />
      </div>

      <div>
        <label className="block text-[0.68rem] tracking-wide-xl uppercase text-ink-soft mb-2.5">
          Konfirmasi Kehadiran
        </label>
        <div className="relative flex bg-paper-soft/60 border border-gold-pale/40 rounded-xl p-1">
          {ATTENDANCE_OPTIONS.map((opt) => (
            <button
              type="button"
              key={opt}
              onClick={() => setAttendance(opt)}
              className="relative flex-1 px-2 py-2 text-xs sm:text-sm rounded-lg z-10 transition-colors"
            >
              {attendance === opt && (
                <motion.span
                  layoutId="attendance-pill"
                  className="absolute inset-0 bg-gold-deep rounded-lg -z-10"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className={attendance === opt ? "text-white" : "text-ink-soft"}>
                {opt}
              </span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence initial={false}>
        {attendance === "Hadir" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <label className="block text-[0.68rem] tracking-wide-xl uppercase text-ink-soft mb-2.5">
              Jumlah Tamu
            </label>
            <div className="inline-flex items-center gap-4 bg-paper-soft/60 border border-gold-pale/40 rounded-xl px-3 py-2">
              <button
                type="button"
                onClick={() => setGuests((g) => Math.max(1, g - 1))}
                className="w-7 h-7 rounded-full border border-gold-pale/60 text-gold-deep hover:bg-gold hover:text-white hover:border-gold transition-colors flex items-center justify-center text-sm"
                aria-label="Kurangi tamu"
              >
                −
              </button>
              <span className="w-4 text-center text-ink tabular-nums">{guests}</span>
              <button
                type="button"
                onClick={() => setGuests((g) => Math.min(5, g + 1))}
                className="w-7 h-7 rounded-full border border-gold-pale/60 text-gold-deep hover:bg-gold hover:text-white hover:border-gold transition-colors flex items-center justify-center text-sm"
                aria-label="Tambah tamu"
              >
                +
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div>
        <label className="block text-[0.68rem] tracking-wide-xl uppercase text-ink-soft mb-2.5">
          Ucapan &amp; Doa
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          placeholder="Tulis ucapan dan doa terbaik Anda..."
          className="w-full bg-paper-soft/60 border border-gold-pale/40 rounded-xl px-4 py-3 text-ink placeholder:text-ink-soft/45 focus:outline-none focus:border-gold focus:bg-paper transition-colors resize-none"
        />
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-sm text-rose-700"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      {!isSupabaseConfigured && (
        <p className="text-xs text-ink-soft/70">
          Catatan: buku tamu publik belum aktif, ucapan hanya tersimpan di perangkat ini.
        </p>
      )}

      <motion.button
        type="submit"
        disabled={submitting}
        whileHover={{ scale: submitting ? 1 : 1.015 }}
        whileTap={{ scale: submitting ? 1 : 0.985 }}
        className="w-full py-3.5 mt-1 bg-gold-deep hover:bg-gold disabled:opacity-60 text-white text-sm tracking-wide-xl uppercase transition-colors rounded-xl shadow-sm"
      >
        {submitting ? "Mengirim..." : "Kirim Konfirmasi"}
      </motion.button>
    </form>
  );
}
