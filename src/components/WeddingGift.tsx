"use client";

import { useState } from "react";
import type { BankAccount } from "../data/invitation";
import { HeartIcon } from "./Icons";
import Reveal from "./Reveal";

export default function WeddingGift({ accounts }: { accounts: BankAccount[] }) {
  const [copyStatus, setCopyStatus] = useState<{ index: number; message: string } | null>(null);
  const [copying, setCopying] = useState<number | null>(null);
  const completeAccounts = accounts.filter((account) => account.bankName.trim() && account.accountHolder.trim() && account.accountNumber.trim());

  if (completeAccounts.length === 0) return null;

  async function copyAccount(account: BankAccount, index: number) {
    setCopying(index);
    try {
      await navigator.clipboard.writeText(account.accountNumber);
      setCopyStatus({ index, message: "Nomor rekening berhasil disalin." });
    } catch {
      setCopyStatus({ index, message: "Belum dapat menyalin otomatis. Silakan pilih dan salin nomor rekening di atas." });
    } finally {
      setCopying(null);
    }
  }

  return (
    <section id="hadiah" className="wedding-gift section-space" aria-labelledby="gift-title">
      <div className="section-shell">
        <Reveal className="section-heading centered"><HeartIcon className="gift-heart" /><p className="eyebrow">A LITTLE TOKEN OF LOVE</p><h2 id="gift-title">Wedding gift.</h2><p>Kehadiran dan doa restu Anda adalah hadiah terindah.<br />Jika ingin berbagi tanda kasih, berikut rekening mempelai.</p></Reveal>
        <div className="gift-accounts">{completeAccounts.map((account, index) => (
          <Reveal key={`${account.bankName}-${account.accountNumber}`} className="gift-account">
            <div className="gift-account-heading"><p>{account.bankName}</p><HeartIcon /></div>
            <p className="gift-account-label">NOMOR REKENING</p>
            <p className="gift-account-number">{account.accountNumber}</p>
            <p className="gift-account-holder">a.n. {account.accountHolder}</p>
            <button type="button" className="button gift-copy" onClick={() => void copyAccount(account, index)} disabled={copying !== null} aria-label={`Salin nomor rekening ${account.bankName} atas nama ${account.accountHolder}`}>{copying === index ? "Menyalin…" : "Salin nomor rekening"}<span aria-hidden="true">⧉</span></button>
            <p className="gift-copy-status" role="status">{copyStatus?.index === index ? copyStatus.message : ""}</p>
          </Reveal>
        ))}</div>
      </div>
    </section>
  );
}
