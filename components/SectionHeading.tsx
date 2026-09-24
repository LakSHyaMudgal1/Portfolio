"use client";

import React from "react";
import { motion } from "framer-motion";

interface SectionHeadingProps {
  number?: string;
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  number,
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`mb-14 md:mb-20 ${
        align === "center" ? "text-center mx-auto max-w-3xl" : "max-w-3xl"
      }`}
    >
      {/* Eyebrow & Index Tag */}
      <div
        className={`flex items-center gap-3 text-[11px] font-mono tracking-[0.18em] uppercase mb-4 ${
          align === "center" ? "justify-center" : "justify-start"
        }`}
      >
        {number && (
          <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-slate-400 font-medium">
            {number}
          </span>
        )}
        <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
        <span className="text-slate-300 font-semibold">{eyebrow}</span>
      </div>

      {/* Main Title - Tight Editorial Tracking */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-white tracking-[-0.03em] leading-[1.08]">
        {title}
      </h2>

      {/* Narrative Subtitle */}
      {description && (
        <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed font-normal max-w-2xl">
          {description}
        </p>
      )}
    </motion.div>
  );
}
