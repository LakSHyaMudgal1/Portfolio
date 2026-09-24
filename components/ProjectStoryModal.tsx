"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { X, ArrowDown, Check } from "lucide-react";
import { PROJECT_STORIES } from "@/lib/data";
import { usePortfolio } from "@/context/PortfolioContext";
import { useScrollLock } from "@/hooks/useScrollLock";

export function ProjectStoryModal() {
  const { selectedStoryProject, setSelectedStoryProject } = usePortfolio();
  useScrollLock(!!selectedStoryProject);

  // Handle ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedStoryProject(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setSelectedStoryProject]);

  if (!selectedStoryProject) return null;

  const story = PROJECT_STORIES[selectedStoryProject];
  if (!story) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 overscroll-contain"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setSelectedStoryProject(null)}
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
        aria-hidden="true"
      />

      {/* Story Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25 }}
        data-lenis-prevent="true"
        className="relative w-full max-w-3xl max-h-[88dvh] overflow-y-auto overscroll-contain rounded-3xl bg-[#090b11] border border-white/15 p-6 sm:p-10 shadow-2xl z-10"
      >
        {/* Top hairline */}
        <div className="absolute top-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent pointer-events-none" />

        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-5 mb-8 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-semibold uppercase tracking-widest">
                SCROLL-DRIVEN CASE STUDY
              </span>
              <span className="text-xs font-mono text-slate-400">6 Stages</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {story.title}
            </h2>
            <p className="mt-1 text-sm text-slate-300 font-light">
              {story.subtitle}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setSelectedStoryProject(null)}
            className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white transition-colors cursor-pointer border border-white/5 shrink-0"
            aria-label="Close story mode"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 6-Step Narrative Scroll Progression */}
        <div className="space-y-6 relative">
          {story.steps.map((st, idx) => {
            const isLast = idx === story.steps.length - 1;
            return (
              <div key={st.step} className="space-y-4">
                <div className="p-5 sm:p-6 rounded-2xl bg-[#0c0f18] border border-white/[0.07] hover:border-white/15 transition-all">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.05]">
                    <div className="flex items-center gap-2.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-sky-500/10 border border-sky-500/25 text-sky-400 font-semibold">
                        STAGE {st.step}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400 font-medium">
                        {st.tag}
                      </span>
                    </div>

                    <span className="text-[10px] font-mono text-slate-500">
                      Phase {idx + 1}/6
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                    {st.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light mb-4">
                    {st.summary}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-white/[0.04]">
                    {st.bullets.map((b, bi) => (
                      <div key={bi} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300 font-light">
                        <div className="w-4 h-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 text-emerald-400" />
                        </div>
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {!isLast && (
                  <div className="flex justify-center py-1">
                    <ArrowDown className="w-4 h-4 text-slate-600 animate-pulse" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="mt-8 pt-5 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-slate-400">
          <span>End of Case Study</span>
          <button
            type="button"
            onClick={() => setSelectedStoryProject(null)}
            className="btn-primary-tactile px-4 py-2 rounded-xl text-white cursor-pointer"
          >
            Close Story
          </button>
        </div>
      </motion.div>
    </div>
  );
}
