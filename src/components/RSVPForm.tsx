"use client";

import { FormEvent, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Attendance = "Hadir" | "Tidak Hadir" | "Masih Ragu";

export default function RSVPForm() {
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState<Attendance>("Hadir");
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setError("Mohon isi nama Anda terlebih dahulu.");
      return;
    }
    setError("");
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-10 px-6 border border-silver/60 rounded-sm bg-paper-soft"
      >
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
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-5">
      <div>
        <label className="block text-[0.7rem] tracking-wide-xl uppercase text-ink-soft mb-2">
          Nama
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nama lengkap Anda"
          className="w-full bg-transparent border-b border-silver/70 py-2 text-ink placeholder:text-ink-soft/50 focus:outline-none focus:border-sage transition-colors"
        />
      </div>

      <div>
        <label className="block text-[0.7rem] tracking-wide-xl uppercase text-ink-soft mb-2">
          Konfirmasi Kehadiran
        </label>
        <div className="flex flex-wrap gap-2">
          {(["Hadir", "Tidak Hadir", "Masih Ragu"] as Attendance[]).map((opt) => (
            <button
              type="button"
              key={opt}
              onClick={() => setAttendance(opt)}
              className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
                attendance === opt
                  ? "bg-sage text-white border-sage"
                  : "border-silver/70 text-ink-soft hover:border-sage"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {attendance === "Hadir" && (
        <div>
          <label className="block text-[0.7rem] tracking-wide-xl uppercase text-ink-soft mb-2">
            Jumlah Tamu
          </label>
          <input
            type="number"
            min={1}
            max={5}
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-24 bg-transparent border-b border-silver/70 py-2 text-ink focus:outline-none focus:border-sage transition-colors"
          />
        </div>
      )}

      <div>
        <label className="block text-[0.7rem] tracking-wide-xl uppercase text-ink-soft mb-2">
          Ucapan &amp; Doa
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          placeholder="Tulis ucapan dan doa terbaik Anda..."
          className="w-full bg-transparent border-b border-silver/70 py-2 text-ink placeholder:text-ink-soft/50 focus:outline-none focus:border-sage transition-colors resize-none"
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

      <button
        type="submit"
        className="w-full py-3 mt-2 bg-sage-deep hover:bg-sage text-white text-sm tracking-wide-xl uppercase transition-colors rounded-sm"
      >
        Kirim Konfirmasi
      </button>
    </form>
  );
}
