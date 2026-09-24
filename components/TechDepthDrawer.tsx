"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { X, Check, ArrowUpRight } from "lucide-react";
import { TECH_DETAILS } from "@/lib/data";
import { usePortfolio } from "@/context/PortfolioContext";
import { useScrollLock } from "@/hooks/useScrollLock";

export function TechDepthDrawer() {
  const { selectedTechDrawer, setSelectedTechDrawer } = usePortfolio();
  useScrollLock(!!selectedTechDrawer);

  // Handle ESC
  useEffect(() => {
    if (!selectedTechDrawer) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedTechDrawer(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedTechDrawer, setSelectedTechDrawer]);

  if (!selectedTechDrawer) return null;

  // Lookup in TECH_DETAILS or build fallback
  const tech = TECH_DETAILS[selectedTechDrawer] || {
    id: selectedTechDrawer.toLowerCase().replace(/[^a-z0-9]/g, ""),
    name: selectedTechDrawer,
    category: "Full-Stack Technology" as const,
    role: `Core technology utilized across Lakshya's software projects for resilient development.`,
    projects: [
      { name: "Selected Engineering Work", id: "projects", context: "Applied across production architectures & algorithmic implementations" },
    ],
    keyPatterns: [
      "Modular system abstractions",
      "Production-ready deployment & clean code practices",
      "Strict data modeling and optimized execution",
    ],
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[130] flex justify-end"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setSelectedTechDrawer(null)}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        aria-hidden="true"
      />

      {/* Right Drawer Panel */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        data-lenis-prevent="true"
        className="relative w-full max-w-md h-[100dvh] bg-[#0a0d14] border-l border-white/10 shadow-2xl z-10 flex flex-col justify-between overflow-hidden"
      >
        {/* Header (Sticky Top) */}
        <div className="p-6 sm:p-8 pb-4 border-b border-white/[0.08] shrink-0 bg-[#0a0d14]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono text-sky-400 bg-sky-500/10 px-2.5 py-0.5 rounded border border-sky-500/20 font-semibold uppercase tracking-widest">
                {tech.category}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-2">
                {tech.name}
              </h3>
            </div>

            <button
              type="button"
              onClick={() => setSelectedTechDrawer(null)}
              className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white transition-colors cursor-pointer border border-white/5"
              aria-label="Close tech drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div data-lenis-prevent="true" className="flex-1 overflow-y-auto overscroll-contain p-6 sm:p-8 space-y-6">
          {/* Role & Purpose */}
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-2 font-semibold">
              ROLE IN LAKSHYA&apos;S STACK
            </span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              {tech.role}
            </p>
          </div>

          {/* Where It&apos;s Used (Projects) */}
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-3 font-semibold">
              PORTFOLIO PROJECTS USING {tech.name.toUpperCase()}
            </span>
            <div className="space-y-2.5">
              {tech.projects.map((p, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/15 transition-all"
                >
                  <div className="flex items-center justify-between text-xs font-mono mb-1">
                    <span className="text-white font-semibold">{p.name}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedTechDrawer(null);
                        document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="text-[10px] text-sky-400 hover:text-sky-300 flex items-center gap-1 cursor-pointer"
                    >
                      <span>View Project</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-400 font-light">
                    {p.context}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Architectural Patterns */}
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-3 font-semibold">
              ARCHITECTURAL IMPLEMENTATION PATTERNS
            </span>
            <div className="space-y-2">
              {tech.keyPatterns.map((pat, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 font-light">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 text-emerald-400" />
                  </div>
                  <span>{pat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky Footer */}
        <div className="p-6 sm:p-8 pt-4 border-t border-white/[0.08] shrink-0 bg-[#0a0d14] flex items-center justify-between text-xs font-mono">
          <span className="text-slate-500">Knowledge Graph Node</span>
          <button
            type="button"
            onClick={() => setSelectedTechDrawer(null)}
            className="btn-secondary-tactile px-4 py-2 rounded-xl text-slate-300 hover:text-white cursor-pointer"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
}
