"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FloralOrnament from "./FloralOrnament";

type Props = {
  photos: string[];
};

// The second photo is a wide, close-up composition. Its focal point sits left
// of center, so a centered portrait crop hides the bride in the gallery tile.
const PHOTO_POSITIONS: Record<number, string> = {
  1: "25% center",
};

function PlaceholderTile() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-paper-soft border border-dashed border-silver/70">
      <FloralOrnament variant="sprig" className="w-6 opacity-60" />
      <span className="text-[0.6rem] tracking-wide-xl uppercase text-ink-soft/70 text-center px-2">
        Foto Pre-Wedding
      </span>
    </div>
  );
}

export default function PhotoGallery({ photos }: Props) {
  const [failed, setFailed] = useState<Set<number>>(new Set());
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function markFailed(i: number) {
    setFailed((prev) => {
      const next = new Set(prev);
      next.add(i);
      return next;
    });
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        {photos.map((src, i) => (
          <motion.button
            key={src}
            type="button"
            layoutId={`gallery-photo-${i}`}
            onClick={() => !failed.has(i) && setOpenIndex(i)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className={`relative aspect-[3/4] overflow-hidden rounded-sm shadow-sm ${
              failed.has(i) ? "cursor-default" : "cursor-zoom-in"
            }`}
          >
            {!failed.has(i) ? (
              <img
                src={src}
                alt={`Foto pre-wedding ${i + 1}`}
                onError={() => markFailed(i)}
                className="w-full h-full object-cover"
                style={{ objectPosition: PHOTO_POSITIONS[i] }}
                loading="lazy"
              />
            ) : (
              <PlaceholderTile />
            )}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {openIndex !== null && !failed.has(openIndex) && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm px-6 py-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenIndex(null)}
          >
            <motion.img
              layoutId={`gallery-photo-${openIndex}`}
              src={photos[openIndex]}
              alt={`Foto pre-wedding ${openIndex + 1} diperbesar`}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85vh] max-w-full rounded-sm shadow-2xl object-contain"
            />
            <button
              type="button"
              onClick={() => setOpenIndex(null)}
              aria-label="Tutup"
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xl"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
