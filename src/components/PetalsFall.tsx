"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

type Props = {
  count?: number;
  active?: boolean;
};

function Petal({ delay, left, duration, size }: { delay: number; left: number; duration: number; size: number }) {
  return (
    <motion.svg
      viewBox="0 0 20 20"
      width={size}
      height={size}
      className="absolute top-0"
      style={{ left: `${left}%`, color: "var(--sage)" }}
      initial={{ y: -40, x: 0, opacity: 0, rotate: 0 }}
      animate={{
        y: "110vh",
        x: [0, 18, -14, 10, 0],
        opacity: [0, 0.9, 0.9, 0.9, 0],
        rotate: 360,
      }}
      transition={{
        delay,
        duration,
        repeat: Infinity,
        ease: "linear",
      }}
      aria-hidden="true"
    >
      <path
        d="M10 1c5 3 8 8 8 12a8 8 0 0 1-16 0c0-4 3-9 8-12z"
        fill="currentColor"
        opacity="0.55"
      />
    </motion.svg>
  );
}

export default function PetalsFall({ count = 10, active = true }: Props) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 6,
        duration: 9 + Math.random() * 6,
        size: 10 + Math.random() * 10,
      })),
    [count]
  );

  if (!active) return null;

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-40" aria-hidden="true">
      {petals.map((p) => (
        <Petal key={p.id} delay={p.delay} left={p.left} duration={p.duration} size={p.size} />
      ))}
    </div>
  );
}
