"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { X, Keyboard } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";
import { useScrollLock } from "@/hooks/useScrollLock";

const SHORTCUTS = [
  { key: "Ctrl + K / ⌘K", desc: "Open global command palette with fuzzy search" },
  { key: "?", desc: "Open this keyboard shortcuts reference" },
  { key: "~ / `", desc: "Open developer terminal console (easter egg)" },
  { key: "1", desc: "Jump to About & Education" },
  { key: "2", desc: "Jump to Production Experience" },
  { key: "3", desc: "Jump to Selected Projects" },
  { key: "4", desc: "Jump to Engineering Stack" },
  { key: "5", desc: "Jump to Honors & Achievements" },
  { key: "6", desc: "Jump to Contact Form" },
  { key: "G", desc: "Open GitHub Profile (external)" },
  { key: "L", desc: "Open LinkedIn Profile (external)" },
  { key: "C", desc: "Open LeetCode Profile (external)" },
  { key: "R", desc: "Open Interactive Resume Drawer" },
  { key: "Esc", desc: "Close any active modal or drawer" },
];

export function KeyboardShortcutsModal() {
  const { isShortcutsOpen, setIsShortcutsOpen } = usePortfolio();
  useScrollLock(isShortcutsOpen);

  // Handle ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsShortcutsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setIsShortcutsOpen]);

  if (!isShortcutsOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[125] flex items-center justify-center p-4 sm:p-6 overscroll-contain"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsShortcutsOpen(false)}
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
        aria-hidden="true"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.2 }}
        data-lenis-prevent="true"
        className="relative w-full max-w-lg max-h-[85dvh] overflow-y-auto overscroll-contain rounded-3xl bg-[#090b11] border border-white/15 p-6 sm:p-8 shadow-2xl z-10"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
              <Keyboard className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block font-semibold">
                KEYBOARD-FIRST NAVIGATION
              </span>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Global Keyboard Shortcuts
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsShortcutsOpen(false)}
            className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white transition-colors cursor-pointer border border-white/5"
            aria-label="Close shortcuts modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Shortcuts List */}
        <div className="space-y-2 max-h-[55vh] overflow-y-auto no-scrollbar font-mono text-xs">
          {SHORTCUTS.map((s) => (
            <div
              key={s.key}
              className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-between gap-3"
            >
              <span className="text-slate-300 font-light font-sans text-xs">{s.desc}</span>
              <kbd className="px-2 py-0.5 rounded-md bg-white/10 border border-white/15 text-sky-300 font-bold shrink-0">
                {s.key}
              </kbd>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-5 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-500">
          <span>Shortcuts disabled while typing in text inputs</span>
          <button
            type="button"
            onClick={() => setIsShortcutsOpen(false)}
            className="text-sky-400 hover:text-white cursor-pointer"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
}
