"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface StatItemProps {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  subtitle?: string;
}

export function StatItem({ label, value, suffix = "", prefix = "", subtitle }: StatItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 1500; // ms
    const startTime = performance.now();

    const updateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(easeProgress * value);

      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setCount(value);
      }
    };

    requestAnimationFrame(updateCount);
  }, [isInView, value]);

  return (
    <div
      ref={ref}
      className="relative p-6 sm:p-7 rounded-2xl bg-[#090b10] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_12px_28px_-8px_rgba(0,0,0,0.6)] hover:border-white/18 transition-all duration-300 group overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-sky-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold tracking-tight text-white mb-2 flex items-baseline">
        <span>{prefix}</span>
        <span>{count.toLocaleString()}</span>
        <span className="text-sky-400 font-sans ml-1 text-2xl sm:text-3xl font-semibold">{suffix}</span>
      </div>
      <div className="text-xs sm:text-[13px] font-semibold tracking-wider text-slate-300 uppercase font-mono">
        {label}
      </div>
      {subtitle && (
        <div className="mt-1 text-[11px] font-mono text-slate-500">
          {subtitle}
        </div>
      )}
    </div>
  );
}
