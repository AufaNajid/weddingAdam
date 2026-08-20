"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export default function Reveal({ children, delay = 0, y = 18, className = "" }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  const reducedMotion = useReducedMotion();
  return <motion.div initial={false} whileInView={reducedMotion ? undefined : { y: [y, 0] }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>{children}</motion.div>;
}
