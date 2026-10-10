"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { invitation } from "../data/invitation";
import { ArrowIcon, HeartIcon } from "./Icons";
import { createGuestLink, createWhatsAppMessage, createWhatsAppUrl, getRecipientName, MAX_RECIPIENT_NAME_LENGTH } from "../lib/recipient";
import styles from "./InvitationSender.module.css";

const subscribe = () => () => {};
const getOrigin = () => window.location.origin;
const getServerOrigin = () => "";

export default function InvitationSender() {
  const origin = useSyncExternalStore(subscribe, getOrigin, getServerOrigin);
  const [website, setWebsite] = useState<string | null>(null);
  const [guest, setGuest] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const linkInput = useRef<HTMLInputElement>(null);
  const messageInput = useRef<HTMLTextAreaElement>(null);
  const siteUrl = website ?? origin;
  const name = getRecipientName(new URLSearchParams({ to: guest }));
  let link = "";
  let websiteError = "";
  if (siteUrl) {
    try {
      link = createGuestLink(siteUrl, name || "Nama Tamu");
    } catch (error) {
      websiteError = error instanceof Error ? error.message : "Periksa alamat website undangan.";
    }
  }
  const ready = Boolean(name && link && !websiteError);
  const message = createWhatsAppMessage(name || "Nama penerima", invitation.coupleShort, ready ? link : "[tautan undangan personal]");

  async function copy(kind: "link" | "message") {
    if (!ready) return;
    const value = kind === "link" ? link : message;
    try {
      await navigator.clipboard.writeText(value);
      setCopyStatus(kind === "link" ? "Tautan tersalin. Siap ditempel ke WhatsApp." : "Pesan tersalin, lengkap dengan spasi dan baris baru.");
    } catch {
      const field = kind === "link" ? linkInput.current : messageInput.current;
      field?.focus();
      field?.select();
      setCopyStatus("Penyalinan otomatis tidak tersedia. Teks sudah dipilih; gunakan Salin pada perangkat Anda.");
    }
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className="monogram" aria-label="Kembali ke undangan Adam dan Salma">A<span>&amp;</span>S</Link>
        <span className="eyebrow">A LITTLE NOTE, A LOT OF LOVE</span>
      </header>
      <div className={styles.intro}>
        <p className="eyebrow">BAGIKAN KEBAHAGIAAN</p>
        <h1>Satu nama,<br /><em>satu undangan.</em></h1>
        <p>Ketik nama dengan spasi biasa. Tautan personal dan pesan WhatsApp akan disiapkan untuk Anda.</p>
      </div>
      <div className={styles.layout}>
        <section className={styles.editor} aria-labelledby="sender-title">
          <h2 id="sender-title">Siapa yang ingin diundang?</h2>
          <div className={styles.field}>
            <label htmlFor="recipient-name"><span>01</span> Nama penerima</label>
            <input id="recipient-name" className="form-input" value={guest} onChange={(event) => { setGuest(event.target.value); setCopyStatus(""); }} maxLength={MAX_RECIPIENT_NAME_LENGTH} placeholder="Budi Santoso & Keluarga" autoComplete="off" aria-describedby="recipient-tip" />
            <p id="recipient-tip">Gunakan spasi biasa, tidak perlu mengetik %20 atau +.</p>
          </div>
          <div className={styles.field}>
            <label htmlFor="invitation-address"><span>02</span> Alamat website undangan</label>
            <input id="invitation-address" className="form-input" type="text" inputMode="url" autoCapitalize="none" autoCorrect="off" spellCheck={false} value={siteUrl} onChange={(event) => { setWebsite(event.target.value); setCopyStatus(""); }} placeholder="https://website-undangan-anda.com" aria-invalid={websiteError ? true : undefined} aria-describedby="website-tip" />
            <p id="website-tip" className={websiteError ? styles.warning : undefined}>{websiteError || "Gunakan domain yang sudah online. Alamat ini tetap sama untuk semua tamu."}</p>
          </div>
          <div className={styles.linkBox}>
            <label htmlFor="personal-link">TAUTAN PERSONAL</label>
            <input ref={linkInput} id="personal-link" readOnly value={ready ? link : ""} placeholder="Isi nama dan alamat website di atas" onFocus={(event) => event.target.select()} />
            <button type="button" onClick={() => copy("link")} disabled={!ready}>Salin tautan <ArrowIcon /></button>
          </div>
          <p className={styles.tip}>Spasi pada tautan otomatis menjadi <strong>+</strong>. Di undangan, nama tetap tampil dengan spasi normal.</p>
        </section>
        <section className={styles.preview} aria-labelledby="message-title">
          <div className={styles.previewHeading}><div><p className="eyebrow">SIAP DIKIRIM</p><h2 id="message-title">Sebuah pesan untukmu.</h2></div><HeartIcon /></div>
          <label className="sr-only" htmlFor="whatsapp-message">Pratinjau pesan WhatsApp</label>
          <textarea ref={messageInput} id="whatsapp-message" readOnly value={message} className={styles.message} onFocus={(event) => event.target.select()} />
          <div className={styles.actions}>
            {ready ? (
              <a className={styles.whatsapp} href={createWhatsAppUrl(message)} target="_blank" rel="noopener noreferrer">Buka WhatsApp <ArrowIcon /></a>
            ) : (
              <button type="button" className={styles.whatsapp} disabled>Buka WhatsApp <ArrowIcon /></button>
            )}
            <button type="button" className={styles.copy} onClick={() => copy("message")} disabled={!ready}>Salin pesan</button>
          </div>
          <p className={styles.status} role="status" aria-live="polite">{copyStatus || (ready ? "Pilih kontak dan tekan Kirim di WhatsApp. Pesan tidak dikirim otomatis." : "Isi nama dan alamat website online untuk mulai berbagi.")}</p>
        </section>
      </div>
      <footer className={styles.footer}>Dibuat dengan cinta · {invitation.coupleShort}<span>Nama yang diketik di sini tidak disimpan.</span></footer>
    </main>
  );
}
