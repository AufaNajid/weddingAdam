"use client";

import { type FormEvent, useState } from "react";
import { supabase, type Attendance, GUESTBOOK_TABLE } from "../lib/supabase";
import { ArrowIcon, HeartIcon } from "./Icons";

const OPTIONS: Attendance[] = ["Hadir", "Tidak Hadir", "Masih Ragu"];

export default function RSVPForm({ onSubmitted }: { onSubmitted?: () => void }) {
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState<Attendance>("Hadir");
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    setError("");
    if (name.trim().length < 2) { setError("Mohon isi nama lengkap Anda (minimal 2 karakter)."); return; }
    if (!supabase) { setError("Konfirmasi online belum tersedia. Silakan hubungi mempelai untuk mengonfirmasi kehadiran."); return; }
    setSubmitting(true);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);
    try {
      const { error: insertError } = await supabase.from(GUESTBOOK_TABLE).insert({
        name: name.trim(), attendance, guests: attendance === "Hadir" ? guests : null, message: message.trim() || null,
      }).abortSignal(controller.signal);
      if (insertError) throw insertError;
      setSubmitted(true);
      onSubmitted?.();
    } catch {
      setError("Konfirmasi belum terkirim. Periksa koneksi Anda dan coba lagi. Isian Anda tetap tersimpan di formulir ini.");
    } finally {
      clearTimeout(timeout);
      setSubmitting(false);
    }
  }

  if (submitted) return <div className="rsvp-form form-success" role="status"><HeartIcon /><h3>Terima kasih, {name.trim().split(" ")[0]}!</h3><p>{attendance === "Hadir" ? "Konfirmasi Anda telah tersimpan. Sampai bertemu di hari bahagia kami!" : attendance === "Tidak Hadir" ? "Terima kasih atas konfirmasinya. Doa restu Anda sangat berarti bagi kami." : "Terima kasih telah mengabari kami. Silakan hubungi mempelai saat sudah dapat memastikan kehadiran."}</p></div>;

  return <form className="rsvp-form" onSubmit={handleSubmit} aria-label="Konfirmasi kehadiran" aria-busy={submitting}>
    <div className="form-field"><label className="form-label" htmlFor="guest-name">Nama lengkap <span aria-hidden="true">*</span></label><input id="guest-name" name="name" className="form-input" autoComplete="name" placeholder="Nama lengkap Anda" value={name} onChange={(e) => setName(e.target.value)} required minLength={2} maxLength={100} disabled={submitting} /></div>
    <fieldset className="form-field" disabled={submitting}><legend className="form-label">Apakah Anda akan hadir?</legend><div className="attendance-options">{OPTIONS.map((option) => <label key={option} className="attendance-option"><input className="sr-only" type="radio" name="attendance" value={option} checked={attendance === option} onChange={() => setAttendance(option)} />{option}</label>)}</div></fieldset>
    {attendance === "Hadir" && <div className="form-field"><span id="guest-count-label" className="form-label">Jumlah tamu</span><div className="guest-stepper" role="group" aria-labelledby="guest-count-label"><button type="button" aria-label="Kurangi tamu" disabled={submitting || guests <= 1} onClick={() => setGuests((n) => Math.max(1, n - 1))}>−</button><output aria-live="polite" aria-label="Jumlah tamu">{guests}</output><button type="button" aria-label="Tambah tamu" disabled={submitting || guests >= 5} onClick={() => setGuests((n) => Math.min(5, n + 1))}>+</button></div></div>}
    <div className="form-field"><label htmlFor="guest-message" className="form-label">Ucapan & doa <span className="normal-case tracking-normal">(opsional)</span></label><textarea id="guest-message" name="message" className="form-input" placeholder="Sepatah cinta untuk perjalanan kami…" value={message} onChange={(e) => setMessage(e.target.value)} rows={3} maxLength={1000} disabled={submitting} aria-describedby="message-privacy" /></div>
    <p id="message-privacy" className="form-privacy">Nama dan ucapan Anda akan ditampilkan di buku tamu.</p>
    {error && <p role="alert" className="form-error">{error}</p>}
    <button type="submit" className="button button-primary" disabled={submitting}>{submitting ? "Mengirim…" : "Kirim konfirmasi"}<ArrowIcon /></button>
  </form>;
}
