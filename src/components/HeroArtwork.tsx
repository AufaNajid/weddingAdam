"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import type { PointerEvent } from "react";
import FloralPhoto from "./FloralPhoto";
import { HeartIcon } from "./Icons";

/** Original artwork stays untouched; depth and motion are presentation-only. */
export default function HeroArtwork() {
  const reducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(x, { stiffness: 100, damping: 24 });
  const rotateY = useSpring(y, { stiffness: 100, damping: 24 });

  function move(event: PointerEvent<HTMLDivElement>) {
    if (reducedMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(((event.clientY - rect.top) / rect.height - 0.5) * -7);
    y.set(((event.clientX - rect.left) / rect.width - 0.5) * 7);
  }

  return (
    <div className="hero-artwork" onPointerMove={move} onPointerLeave={() => { x.set(0); y.set(0); }}>
      <div className="artwork-orbit" aria-hidden="true" />
      <motion.div className="artwork-perspective" style={reducedMotion ? undefined : { rotateX, rotateY }}>
        <div className="artwork-float">
          <div className="keepsake-paper paper-back" aria-hidden="true" />
          <div className="keepsake-paper paper-letter" aria-hidden="true"><span>Our forever begins here.</span></div>
          <div className="keepsake-photo">
            <div className="keepsake-scene">
              <span className="scene-light" aria-hidden="true" />
              <Image src="/artwork/adam.png" alt="Ilustrasi asli Adam dengan setelan krem" width={2000} height={2000} sizes="(max-width: 700px) 115vw, 700px" preload draggable={false} className="character-layer character-adam" />
              <Image src="/artwork/salma.png" alt="Ilustrasi asli Salma dengan hijab putih dan buket bunga" width={2000} height={2000} sizes="(max-width: 700px) 115vw, 700px" preload draggable={false} className="character-layer character-salma" />
            </div>
            <div className="keepsake-signature"><HeartIcon /><span className="handwritten">Adam & Salma</span><span>29.11.26</span></div>
          </div>
          <svg className="keepsake-ribbon" viewBox="0 0 240 160" fill="none" aria-hidden="true">
            <path d="M118 62C73 47 15 69 27 37S87 8 118 62Zm0 0C139 12 205 11 204 40S150 70 118 62Zm0 0C86 105 73 85 53 129M118 62c28 52 54 22 69 75" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <FloralPhoto variant="bouquet-1" className="keepsake-flowers" />
          <div className="keepsake-envelope" aria-hidden="true"><span className="envelope-fold" /><span className="wax-heart">♥</span></div>
        </div>
      </motion.div>
      <div className="date-seal" aria-label="Save the date, 29 November 2026"><span>SAVE THE DATE</span><strong>29<span>11</span></strong><span>— 2026 —</span></div>
      <span className="artwork-caption handwritten">a love worth keeping.</span>
    </div>
  );
}
