"use client";

import { motion, AnimatePresence } from "framer-motion";
import FloralOrnament from "./FloralOrnament";
import { invitation } from "../data/invitation";

type Props = {
  guestName?: string;
  open: boolean;
  onOpen: () => void;
};

export default function CoverScreen({ guestName, open, onOpen }: Props) {
  return (
    <AnimatePresence>
      {!open && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Left panel */}
          <motion.div
            className="absolute inset-y-0 left-0 w-1/2 bg-paper flex items-center justify-start"
            initial={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
          >
            <FloralOrnament
              variant="corner"
              className="absolute bottom-0 left-0 w-40 sm:w-56 opacity-90"
            />
            <FloralOrnament
              variant="corner"
              flip
              className="absolute top-0 left-0 w-32 sm:w-44 opacity-70 rotate-180"
            />
          </motion.div>

          {/* Right panel */}
          <motion.div
            className="absolute inset-y-0 right-0 w-1/2 bg-paper flex items-center justify-end"
            initial={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
          >
            <FloralOrnament
              variant="corner"
              flip
              className="absolute bottom-0 right-0 w-40 sm:w-56 opacity-90"
            />
            <FloralOrnament
              variant="corner"
              className="absolute top-0 right-0 w-32 sm:w-44 opacity-70 rotate-180"
            />
          </motion.div>

          {/* Center content */}
          <motion.div
            className="relative z-10 h-full flex flex-col items-center justify-center px-8 text-center"
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.6 }}
          >
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-[0.7rem] tracking-wide-xl uppercase text-ink-soft mb-6"
            >
              The Wedding of
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.9 }}
              className="font-[family-name:var(--font-script)] text-5xl sm:text-6xl text-sage-deep leading-tight"
            >
              {invitation.coupleShort}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="mt-6 divider-flourish"
            >
              <span className="text-xs tracking-wide-xl uppercase text-ink-soft">
                14 . 11 . 2026
              </span>
            </motion.div>

            {guestName && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.8 }}
                className="mt-8 text-sm text-ink-soft"
              >
                Kepada Yth. Bapak/Ibu/Saudara/i
                <br />
                <span className="font-medium text-ink">{guestName}</span>
              </motion.p>
            )}

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.8 }}
              onClick={onOpen}
              whileTap={{ scale: 0.96 }}
              className="mt-10 group inline-flex items-center gap-3 px-8 py-3 border border-sage/60 rounded-full text-sm tracking-wide-xl uppercase text-sage-deep hover:bg-sage hover:text-white transition-colors"
            >
              <motion.span
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              >
                Buka Undangan
              </motion.span>
            </motion.button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
