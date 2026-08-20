"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  autoPlayTrigger: boolean;
};

export default function MusicPlayer({ src, autoPlayTrigger }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (autoPlayTrigger && audioRef.current) {
      audioRef.current
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    }
  }, [autoPlayTrigger]);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    }
  }

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="auto" />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Jeda musik" : "Putar musik"}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-paper/90 border border-gold/50 shadow-md backdrop-blur flex items-center justify-center hover:border-gold transition-colors"
      >
        <span
          className="flex items-center justify-center w-8 h-8 rounded-full border border-gold-pale"
          style={{
            animation: playing ? "spin 6s linear infinite" : "none",
          }}
        >
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4 text-gold-deep"
            fill="currentColor"
            aria-hidden="true"
          >
            {playing ? (
              <path d="M8 5h3v14H8zM13 5h3v14h-3z" />
            ) : (
              <path d="M8 5l11 7-11 7z" />
            )}
          </svg>
        </span>
      </button>
      <style jsx global>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
}
