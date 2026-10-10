"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import FloralPhoto from "./FloralPhoto";
import { ArrowIcon, HeartIcon } from "./Icons";
import { invitation } from "../data/invitation";
import RecipientGreeting from "./RecipientGreeting";

type Props = {
  opening: boolean;
  onOpen: () => void;
  onEntered: () => void;
};

/** Separate invitation cover; only the paper layers move, never the source artwork. */
export default function FrontPage({ opening, onOpen, onEntered }: Props) {
  const reducedMotion = useReducedMotion();
  const panelTransition = {
    duration: reducedMotion ? 0 : 1.05,
    delay: reducedMotion ? 0 : 0.15,
    ease: [0.65, 0, 0.25, 1] as const,
  };

  return (
    <motion.main
      className="front-page"
      aria-labelledby="front-title"
      aria-busy={opening}
      data-opening={opening}
      initial={false}
      animate={{ opacity: opening ? 0 : 1 }}
      transition={{ duration: reducedMotion ? 0 : 0.2, delay: opening && !reducedMotion ? 1.05 : 0 }}
      onAnimationComplete={() => { if (opening) onEntered(); }}
    >
      <motion.div
        className="front-panel front-panel-left"
        aria-hidden="true"
        initial={false}
        animate={{ x: opening && !reducedMotion ? "-102%" : "0%", rotateY: opening && !reducedMotion ? -12 : 0 }}
        transition={panelTransition}
      >
        <FloralPhoto variant="sunflower-1" className="front-flower front-flower-top" />
        <FloralPhoto variant="bouquet-1" className="front-flower front-flower-bottom" />
      </motion.div>
      <motion.div
        className="front-panel front-panel-right"
        aria-hidden="true"
        initial={false}
        animate={{ x: opening && !reducedMotion ? "102%" : "0%", rotateY: opening && !reducedMotion ? 12 : 0 }}
        transition={panelTransition}
      >
        <FloralPhoto variant="sunflower-1" className="front-flower front-flower-top" flip />
        <FloralPhoto variant="bouquet-2" className="front-flower front-flower-bottom" flip />
      </motion.div>

      <div className="front-page-scroll">
        <motion.div
          className="front-page-content"
          initial={false}
          animate={{ opacity: opening ? 0 : 1, y: opening && !reducedMotion ? -20 : 0, scale: opening && !reducedMotion ? 0.97 : 1 }}
          transition={{ duration: reducedMotion ? 0 : 0.3 }}
        >
          <p className="eyebrow front-kicker">A LETTER FOR YOU</p>
          <div className="front-portrait">
            <Image src="/artwork/adam.png" alt="Ilustrasi asli Adam" width={2000} height={2000} sizes="360px" loading="eager" draggable={false} className="character-layer character-adam" />
            <Image src="/artwork/salma.png" alt="Ilustrasi asli Salma" width={2000} height={2000} sizes="360px" loading="eager" draggable={false} className="character-layer character-salma" />
          </div>
          <p className="eyebrow front-wedding-label">THE WEDDING OF</p>
          <h1 id="front-title">{invitation.coupleShort}</h1>
          <p className="front-date">{invitation.dateDisplay}<span aria-hidden="true"> · </span>KUDUS</p>
          <div className="front-dedication">
            <HeartIcon />
            <RecipientGreeting />
          </div>
          <button
  type="button"
  className="button button-primary front-open"
  disabled={opening}
  onClick={onOpen}
  aria-controls="invitation-content"
  suppressHydrationWarning
>
  <span>{opening ? "Membuka undangan…" : "Buka undangan"}</span><ArrowIcon />
</button>
          <p className="front-hint">A little story, a lifetime of us.</p>
          <noscript><p>Aktifkan JavaScript untuk membuka undangan interaktif ini.</p></noscript>
        </motion.div>
      </div>
    </motion.main>
  );
}
