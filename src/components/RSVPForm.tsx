"use client";

import { type FormEvent, useEffect, useRef, useState } from "react";
import { supabase, type Attendance, GUESTBOOK_TABLE } from "../lib/supabase";
import { ArrowIcon, HeartIcon } from "./Icons";

const OPTIONS: { value: Attendance; hint: string }[] = [
  { value: "Hadir", hint: "Sampai bertemu" },
  { value: "Tidak Hadir", hint: "Titip doa" },
  { value: "Masih Ragu", hint: "Belum pasti" },
];

export default function RSVPForm({ onSubmitted }: { onSubmitted?: () => void }) {
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState<Attendance>("Hadir");
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [nameError, setNameError] = useState("");
  const nameInput = useRef<HTMLInputElement>(null);
  const successHeading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (submitted) successHeading.current?.focus();
  }, [submitted]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    setError("");
    setNameError("");
    if (name.trim().length < 2) {
      setNameError("Mohon isi nama lengkap Anda, minimal 2 karakter.");
      nameInput.current?.focus();
      return;
    }
    if (!supabase) {
      setError("Konfirmasi online belum tersedia. Silakan hubungi mempelai untuk mengonfirmasi kehadiran.");
      return;
    }
    setSubmitting(true);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);
    try {
      const { error: insertError } = await supabase.from(GUESTBOOK_TABLE).insert({
        name: name.trim(),
        attendance,
        guests: attendance === "Hadir" ? guests : null,
        message: message.trim() || null,
      }).abortSignal(controller.signal);
      if (insertError) throw insertError;
      setSubmitted(true);
      onSubmitted?.();
    } catch {
      setError("Periksa koneksi Anda dan coba lagi. Nama, pilihan kehadiran, dan ucapan Anda tetap ada di formulir ini.");
    } finally {
      clearTimeout(timeout);
      setSubmitting(false);
    }
  }

  if (submitted) return (
    <div className="rsvp-form form-success" role="status">
      <div className="rsvp-seal"><HeartIcon /></div>
      <p className="eyebrow">WITH LOVE, ADAM & SALMA</p>
      <h3 ref={successHeading} tabIndex={-1}>Terima kasih,<br /><em>{name.trim().split(" ")[0]}!</em></h3>
      <p>{attendance === "Hadir" ? "Konfirmasi Anda telah tersimpan. Sampai bertemu di hari bahagia kami!" : attendance === "Tidak Hadir" ? "Terima kasih atas konfirmasinya. Doa restu Anda sangat berarti bagi kami." : "Terima kasih telah mengabari kami. Silakan hubungi mempelai saat sudah dapat memastikan kehadiran."}</p>
      <dl className="rsvp-summary">
        <div><dt>Kehadiran</dt><dd>{attendance}</dd></div>
        {attendance === "Hadir" && <div><dt>Jumlah tamu</dt><dd>{guests} orang</dd></div>}
      </dl>
      <a className="text-link" href="/adam-salma-wedding.ics" download>Simpan tanggal <ArrowIcon /></a>
    </div>
  );

  return (
    <form className="rsvp-form" onSubmit={handleSubmit} aria-label="Konfirmasi kehadiran" aria-busy={submitting}>
      <div className="rsvp-form-heading">
        <div><p className="eyebrow">A SEAT FOR YOU</p><h3>Konfirmasi kehadiran</h3></div>
        <span className="rsvp-form-mark" aria-hidden="true"><HeartIcon /></span>
      </div>
      <p className="rsvp-form-intro">Isi nama, pilih kehadiran, dan tinggalkan doa untuk kami.</p>

      <div className="form-field">
        <label className="form-label" htmlFor="guest-name"><span className="field-number" aria-hidden="true">01</span> Nama lengkap <span className="field-required" aria-hidden="true">*</span></label>
        <input ref={nameInput} id="guest-name" name="name" className="form-input" autoComplete="name" placeholder="Nama Anda sesuai undangan" value={name} onChange={(e) => { setName(e.target.value); setNameError(""); }} required minLength={2} maxLength={100} disabled={submitting} aria-invalid={nameError ? true : undefined} aria-describedby={nameError ? "guest-name-error" : undefined} />
        {nameError && <p id="guest-name-error" className="field-error" role="alert">{nameError}</p>}
      </div>

      <fieldset className="form-field" disabled={submitting}>
        <legend className="form-label"><span className="field-number" aria-hidden="true">02</span> Apakah Anda akan hadir?</legend>
        <div className="attendance-options">{OPTIONS.map((option) => (
          <label key={option.value} className="attendance-option">
            <input className="sr-only" type="radio" name="attendance" value={option.value} aria-label={option.value} checked={attendance === option.value} onChange={() => setAttendance(option.value)} />
            <span className="attendance-indicator" aria-hidden="true" />
            <strong>{option.value}</strong><span className="attendance-hint">{option.hint}</span>
          </label>
        ))}</div>
      </fieldset>

      {attendance === "Hadir" ? (
        <div className="guest-count-row">
          <div><span id="guest-count-label" className="guest-count-title">Jumlah tamu</span><p>Termasuk Anda · maksimal 5 orang</p></div>
          <div className="guest-stepper" role="group" aria-labelledby="guest-count-label">
            <button type="button" aria-label="Kurangi tamu" disabled={submitting || guests <= 1} onClick={() => setGuests((n) => Math.max(1, n - 1))}>−</button>
            <output aria-live="polite" aria-label="Jumlah tamu">{guests}</output>
            <button type="button" aria-label="Tambah tamu" disabled={submitting || guests >= 5} onClick={() => setGuests((n) => Math.min(5, n + 1))}>+</button>
          </div>
        </div>
      ) : (
        <p className="attendance-note">{attendance === "Tidak Hadir" ? "Tak mengapa, doa baik Anda tetap menjadi bagian dari hari kami." : "Silakan kabari mempelai saat Anda sudah dapat memastikan kehadiran."}</p>
      )}

      <div className="form-field message-field">
        <label htmlFor="guest-message" className="form-label"><span className="field-number" aria-hidden="true">03</span> Ucapan & doa <span className="field-optional">(opsional)</span></label>
        <textarea id="guest-message" name="message" className="form-input" placeholder="Tuliskan doa atau pesan hangat untuk kami…" value={message} onChange={(e) => setMessage(e.target.value)} rows={3} maxLength={1000} disabled={submitting} aria-describedby="message-privacy" />
        <div className="message-meta"><p id="message-privacy">Nama dan ucapan Anda akan tampil di buku tamu.</p><span aria-hidden="true">{message.length}/1000</span></div>
      </div>

      {error && <div role="alert" className="form-error"><strong>Konfirmasi belum terkirim</strong><p>{error}</p></div>}
      <button type="submit" className="button button-primary rsvp-submit" disabled={submitting}>
        <span>{submitting ? "Mengirim konfirmasi…" : "Kirim konfirmasi"}</span>
        {submitting ? <span className="submit-spinner" aria-hidden="true" /> : <ArrowIcon />}
      </button>
      <p className="rsvp-form-footer">Terima kasih telah menjadi bagian dari cerita kami.</p>
    </form>
  );
}
