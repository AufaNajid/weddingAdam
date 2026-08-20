"use client";

import { useEffect, useRef, useState } from "react";

export default function MusicPlayer({ src, autoPlayTrigger }: { src: string; autoPlayTrigger: boolean }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (autoPlayTrigger) {
      const audio = audioRef.current;
      if (audio) { audio.volume = 0.45; void audio.play().catch(() => { /* The manual button stays available if autoplay is blocked. */ }); }
    }
  }, [autoPlayTrigger]);

  async function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    setError(false);
    if (!audio.paused) { audio.pause(); return; }
    try { audio.volume = 0.45; await audio.play(); }
    catch { setError(true); }
  }

  return <>
    <audio ref={audioRef} src={src} loop preload="none" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => { setPlaying(false); setError(true); }} />
    {error && <p role="status" className="music-error">Musik belum dapat diputar. Ketuk tombol untuk mencoba lagi.</p>}
    <button type="button" className="music-control" data-playing={playing} onClick={toggle} aria-label={playing ? "Jeda musik" : "Putar musik"} aria-pressed={playing}><span className="music-bars" aria-hidden="true"><i /><i /><i /><i /></span><span>{playing ? "MUSIK ON" : "MUSIK OFF"}</span></button>
  </>;
}
