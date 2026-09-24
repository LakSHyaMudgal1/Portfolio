"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, GitCompare } from "lucide-react";
import { PROJECT_COMPARISONS, ProjectComparisonItem } from "@/lib/data";
import { usePortfolio } from "@/context/PortfolioContext";
import { useScrollLock } from "@/hooks/useScrollLock";

export function ProjectCompareModal() {
  const { isCompareOpen, setIsCompareOpen } = usePortfolio();
  useScrollLock(isCompareOpen);
  const [projectAId, setProjectAId] = useState<string>("cargoxpress");
  const [projectBId, setProjectBId] = useState<string>("tabtrack");

  // Handle ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsCompareOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setIsCompareOpen]);

  if (!isCompareOpen) return null;

  const projectA = PROJECT_COMPARISONS[projectAId];
  const projectB = PROJECT_COMPARISONS[projectBId];

  const projectKeys = Object.keys(PROJECT_COMPARISONS);

  const COMPARISON_DIMENSIONS: { label: string; key: keyof ProjectComparisonItem }[] = [
    { label: "Domain & Core Problem", key: "domain" },
    { label: "Frontend & UI Layer", key: "frontend" },
    { label: "Backend API Layer", key: "backend" },
    { label: "Persistence & State Store", key: "persistence" },
    { label: "System Architecture", key: "architecture" },
    { label: "Security & Auth Protocol", key: "security" },
    { label: "Real-time Telemetry / Sync", key: "realtime" },
    { label: "Key Algorithmic Focus", key: "algorithms" },
    { label: "Documented Result / Metric", key: "documentedResult" },
  ];

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
        onClick={() => setIsCompareOpen(false)}
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
        aria-hidden="true"
      />

      {/* Comparison Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.2 }}
        data-lenis-prevent="true"
        className="relative w-full max-w-4xl max-h-[88dvh] overflow-y-auto overscroll-contain rounded-3xl bg-[#090b11] border border-white/15 p-6 sm:p-8 shadow-2xl z-10"
      >
        {/* Top hairline */}
        <div className="absolute top-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <GitCompare className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block font-semibold">
                SYSTEM COMPARISON TOOL
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Architectural Cross-Comparison
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsCompareOpen(false)}
            className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white transition-colors cursor-pointer border border-white/5"
            aria-label="Close comparison modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Project Selectors */}
        <div className="grid grid-cols-2 gap-4 pb-6 mb-6 border-b border-white/[0.06] font-mono text-xs">
          <div>
            <label className="text-[10px] uppercase tracking-widest text-slate-400 block mb-1.5 font-semibold">
              PROJECT 1
            </label>
            <select
              value={projectAId}
              onChange={(e) => setProjectAId(e.target.value)}
              className="w-full bg-[#0d101a] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-sky-400 cursor-pointer"
            >
              {projectKeys.map((k) => (
                <option key={k} value={k}>
                  {PROJECT_COMPARISONS[k].name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-widest text-slate-400 block mb-1.5 font-semibold">
              PROJECT 2
            </label>
            <select
              value={projectBId}
              onChange={(e) => setProjectBId(e.target.value)}
              className="w-full bg-[#0d101a] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-400 cursor-pointer"
            >
              {projectKeys.map((k) => (
                <option key={k} value={k}>
                  {PROJECT_COMPARISONS[k].name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Factual Comparison Rows */}
        <div className="space-y-3">
          {COMPARISON_DIMENSIONS.map((dim) => (
            <div
              key={dim.key}
              className="p-3.5 sm:p-4 rounded-2xl bg-[#0c0e15] border border-white/[0.05] hover:border-white/10 transition-colors"
            >
              <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 pb-2 mb-2 border-b border-white/[0.04] font-semibold">
                {dim.label}
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="text-slate-200 font-light pr-2 border-r border-white/5">
                  <span className="text-[10px] font-mono text-sky-400 block mb-0.5 sm:hidden">
                    {projectA.name}:
                  </span>
                  {projectA[dim.key]}
                </div>
                <div className="text-slate-200 font-light pl-1">
                  <span className="text-[10px] font-mono text-indigo-400 block mb-0.5 sm:hidden">
                    {projectB.name}:
                  </span>
                  {projectB[dim.key]}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-slate-400">
          <span>Objective factual architecture matrix</span>
          <button
            type="button"
            onClick={() => setIsCompareOpen(false)}
            className="btn-secondary-tactile px-4 py-2 rounded-xl text-slate-300 hover:text-white cursor-pointer"
          >
            Close Comparison
          </button>
        </div>
      </motion.div>
    </div>
  );
}
