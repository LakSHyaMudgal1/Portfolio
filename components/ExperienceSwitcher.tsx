"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Briefcase, Cpu, ChevronDown, Check } from "lucide-react";
import { usePortfolio, type PortfolioMode } from "@/context/PortfolioContext";

interface ModeOption {
  id: PortfolioMode;
  symbol: string;
  name: string;
  badge: string;
  description: string;
  shortcut: string;
  icon: React.ElementType;
  accentColor: string;
  borderActive: string;
  bgActive: string;
}

const MODE_OPTIONS: ModeOption[] = [
  {
    id: "explore",
    symbol: "✦",
    name: "Explore",
    badge: "Interactive",
    description: "Discover the portfolio with editorial case studies, architecture visualizers & micro-interactions.",
    shortcut: "E",
    icon: Sparkles,
    accentColor: "text-sky-400",
    borderActive: "border-sky-400/40",
    bgActive: "bg-sky-500/10",
  },
  {
    id: "recruiter",
    symbol: "◈",
    name: "Recruiter",
    badge: "Executive",
    description: "Fast professional overview, verified metrics, 1-role timeline, compact project cards & instant resume.",
    shortcut: "R",
    icon: Briefcase,
    accentColor: "text-amber-400",
    borderActive: "border-amber-400/40",
    bgActive: "bg-amber-500/10",
  },
  {
    id: "engineering",
    symbol: "⚙",
    name: "Engineering",
    badge: "Deep Dive",
    description: "Unveil component topologies, live request lifecycle data flows, algorithms, and system trade-offs.",
    shortcut: "X",
    icon: Cpu,
    accentColor: "text-cyan-400",
    borderActive: "border-cyan-400/40",
    bgActive: "bg-cyan-500/10",
  },
];

export function ExperienceSwitcher() {
  const { mode, changeModeWithTransition } = usePortfolio();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeOption = MODE_OPTIONS.find((opt) => opt.id === mode) || MODE_OPTIONS[0];

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
      
      // Mode shortcuts when not in input
      const activeEl = document.activeElement;
      const isInput =
        activeEl &&
        (activeEl.tagName === "INPUT" ||
          activeEl.tagName === "TEXTAREA" ||
          activeEl.tagName === "SELECT" ||
          (activeEl as HTMLElement).isContentEditable);

      if (!isInput && !e.metaKey && !e.ctrlKey && !e.altKey) {
        if (e.key.toLowerCase() === "e") {
          changeModeWithTransition("explore");
        } else if (e.key.toLowerCase() === "r") {
          // If R is pressed alone, we can switch to recruiter or keep resume
          // In context, R opens resume, let's keep that or allow switching mode
        } else if (e.key.toLowerCase() === "x") {
          changeModeWithTransition("engineering");
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [changeModeWithTransition]);

  const handleSelect = (selectedMode: PortfolioMode) => {
    changeModeWithTransition(selectedMode);
    setIsOpen(false);
  };

  const ActiveIcon = activeOption.icon;

  return (
    <div ref={containerRef} className="relative inline-block text-left">
      {/* Closed State Button: [ ✦ Explore ⌄ ] */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`group relative flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-300 cursor-pointer border shadow-sm backdrop-blur-md ${
          mode === "explore"
            ? "bg-white/[0.04] hover:bg-white/[0.08] border-white/[0.12] text-slate-200 hover:text-white hover:border-sky-400/40 hover:shadow-[0_0_15px_rgba(56,189,248,0.12)]"
            : mode === "recruiter"
            ? "bg-amber-500/[0.08] hover:bg-amber-500/[0.14] border-amber-500/30 text-amber-200 hover:border-amber-400/60 hover:shadow-[0_0_15px_rgba(245,158,11,0.15)]"
            : "bg-cyan-500/[0.08] hover:bg-cyan-500/[0.14] border-cyan-500/30 text-cyan-200 hover:border-cyan-400/60 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)]"
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
        title="Experience Switcher (Explore, Recruiter, Engineering)"
      >
        {/* Subtle sliding highlight background */}
        <span className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

        {/* Icon with morph motion */}
        <span className={`${activeOption.accentColor} transition-transform duration-300 group-hover:scale-110 flex items-center`}>
          <ActiveIcon className="w-3.5 h-3.5" />
        </span>

        {/* Text Label */}
        <span className="font-semibold tracking-wide flex items-center gap-1.5">
          <span>{activeOption.name}</span>
          <span className="text-[10px] uppercase text-slate-400 font-normal hidden sm:inline">
            Mode
          </span>
        </span>

        {/* Animated Chevron Indicator */}
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-white" : "group-hover:text-slate-200"
          }`}
        />
      </button>

      {/* Floating Glass Command Surface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 mt-2.5 w-[320px] sm:w-[350px] p-2 rounded-2xl bg-[#080b12]/96 backdrop-blur-2xl border border-white/[0.12] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85),0_0_30px_rgba(56,189,248,0.06)] z-50 overflow-hidden"
          >
            {/* Ambient subtle backdrop glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Header row */}
            <div className="px-3 py-2 border-b border-white/[0.06] flex items-center justify-between text-[10px] font-mono tracking-widest uppercase text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_6px_rgba(56,189,248,0.8)]" />
                <span>EXPERIENCE VIEWPORT</span>
              </span>
              <span className="text-slate-400">ESC TO CLOSE</span>
            </div>

            {/* List of 3 Modes */}
            <div className="py-1.5 space-y-1 relative z-10">
              {MODE_OPTIONS.map((opt) => {
                const isCurrent = opt.id === mode;
                const Icon = opt.icon;

                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelect(opt.id)}
                    className={`w-full text-left p-3 rounded-xl transition-all duration-200 relative group flex items-start gap-3 cursor-pointer ${
                      isCurrent
                        ? `${opt.bgActive} border ${opt.borderActive} shadow-sm`
                        : "hover:bg-white/[0.04] border border-transparent"
                    }`}
                  >
                    {/* Icon container */}
                    <div
                      className={`p-2 rounded-lg shrink-0 mt-0.5 transition-colors ${
                        isCurrent
                          ? `${opt.accentColor} bg-white/[0.06]`
                          : "text-slate-400 bg-white/[0.03] group-hover:text-slate-200 group-hover:bg-white/[0.06]"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-xs font-mono font-semibold tracking-wide ${
                              isCurrent ? opt.accentColor : "text-white group-hover:text-sky-300"
                            }`}
                          >
                            {opt.symbol} {opt.name.toUpperCase()}
                          </span>
                          <span
                            className={`px-1.5 py-0.2 rounded text-[9px] font-mono ${
                              isCurrent
                                ? "bg-white/10 text-white font-medium"
                                : "bg-white/[0.04] text-slate-400"
                            }`}
                          >
                            {opt.badge}
                          </span>
                        </div>

                        {/* Right side: shortcut or checkmark */}
                        <div className="flex items-center gap-1.5">
                          {isCurrent ? (
                            <Check className={`w-3.5 h-3.5 ${opt.accentColor}`} />
                          ) : (
                            <kbd className="px-1.5 py-0.5 rounded bg-white/[0.05] border border-white/[0.08] text-[9px] font-mono text-slate-400 group-hover:text-slate-300">
                              {opt.shortcut}
                            </kbd>
                          )}
                        </div>
                      </div>

                      <p className="text-[11px] font-sans text-slate-400 leading-snug line-clamp-2">
                        {opt.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Footer tip */}
            <div className="px-3 py-2 border-t border-white/[0.05] flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span>Switch modes anytime</span>
              <span>Ctrl+K Palette</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
