"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// Positions are tied to the file, so rearranging the gallery preserves its crop.
const PHOTO_POSITIONS: Record<string, string> = { "/gallery/photo2.jpeg": "25% center", "/gallery/photo3.jpeg": "26% center", "/gallery/photo4.jpeg": "63% center" };

function PhotoLightbox({ photos, initialIndex, onClose }: { photos: string[]; initialIndex: number; onClose: () => void }) {
  const [index, setIndex] = useState(initialIndex);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const focused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
      focused?.focus({ preventScroll: true });
    };
  }, []);

  const move = (step: number) => setIndex((current) => (current + step + photos.length) % photos.length);

  return <dialog ref={dialogRef} className="photo-dialog" aria-label="Galeri foto Adam dan Salma" onCancel={(event) => { event.preventDefault(); onClose(); }} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }} onKeyDown={(event) => {
    if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
    if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
  }}>
    <button type="button" className="lightbox-close" onClick={onClose} aria-label="Tutup galeri" autoFocus>×</button>
    <div className="lightbox-image"><Image key={photos[index]} src={photos[index]} alt={`Foto pre-wedding Adam dan Salma ${index + 1}`} fill sizes="100vw" loading="eager" /></div>
    <p className="lightbox-count" aria-live="polite">{index + 1} / {photos.length}</p>
    <button type="button" className="lightbox-nav lightbox-prev" onClick={() => move(-1)} aria-label="Foto sebelumnya">‹</button>
    <button type="button" className="lightbox-nav lightbox-next" onClick={() => move(1)} aria-label="Foto berikutnya">›</button>
  </dialog>;
}

export default function PhotoGallery({ photos }: { photos: string[] }) {
  const [failed, setFailed] = useState<Set<string>>(new Set());
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const availablePhotos = photos.filter((src) => !failed.has(src));

  return <>
    <div className="gallery-grid">{photos.map((src, i) => <button key={src} type="button" className="gallery-tile" disabled={failed.has(src)} aria-label={`Perbesar foto pre-wedding ${i + 1}`} onClick={() => setOpenIndex(availablePhotos.indexOf(src))}>
      {failed.has(src) ? <span className="text-sm text-ink-soft">Foto belum tersedia</span> : <Image src={src} alt={`Foto pre-wedding Adam dan Salma ${i + 1}`} fill sizes="(max-width: 700px) 50vw, 33vw" style={{ objectPosition: PHOTO_POSITIONS[src] ?? "center" }} onError={() => setFailed((prev) => new Set(prev).add(src))} />}
      <span className="gallery-number" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
    </button>)}</div>
    {openIndex !== null && availablePhotos.length > 0 && <PhotoLightbox photos={availablePhotos} initialIndex={Math.min(openIndex, availablePhotos.length - 1)} onClose={() => setOpenIndex(null)} />}
  </>;
}
