"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function IntroLoader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // 750ms maximum duration
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 750);

    const handleDismiss = () => {
      setIsVisible(false);
    };

    window.addEventListener("keydown", handleDismiss, { once: true });
    window.addEventListener("click", handleDismiss, { once: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleDismiss);
      window.removeEventListener("click", handleDismiss);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[200] bg-[#050608] flex flex-col items-center justify-center cursor-pointer select-none"
        >
          {/* Subtle technical background grid */}
          <div className="absolute inset-0 engineering-grid opacity-20 pointer-events-none" />

          {/* Central Logo & Tech Drawing Line */}
          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/15 flex items-center justify-center font-mono font-bold text-base text-white shadow-lg">
                L
              </div>
              <span className="font-mono text-lg font-bold tracking-[0.25em] text-white">
                LAKSHYA
              </span>
            </motion.div>

            {/* Technical line drawing animation */}
            <div className="w-48 h-[1.5px] bg-white/[0.08] relative overflow-hidden rounded-full mb-3">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 0.65, ease: "easeInOut" }}
                className="w-full h-full bg-gradient-to-r from-transparent via-sky-400 to-transparent"
              />
            </div>

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.3 }}
              className="text-[10px] font-mono tracking-widest text-slate-400 uppercase"
            >
              INITIALIZING PORTFOLIO ENGINE
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
