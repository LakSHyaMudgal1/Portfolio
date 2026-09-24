"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolio } from "@/context/PortfolioContext";
import { Sparkles, Briefcase, Cpu } from "lucide-react";

export function ModeTransitionOverlay() {
  const { isTransitioningMode, mode } = usePortfolio();

  const getModeInfo = () => {
    switch (mode) {
      case "recruiter":
        return {
          title: "RECRUITER MODE ENGAGED",
          subtitle: "Loading high-density metrics, experience timeline & verified credentials...",
          icon: Briefcase,
          accent: "text-amber-400",
          beamColor: "via-amber-400/20",
          border: "border-amber-400/30",
          glow: "rgba(245, 158, 11, 0.2)",
        };
      case "engineering":
        return {
          title: "ENGINEERING MODE ENGAGED",
          subtitle: "Unveiling subsystem topologies, request flows & architectural trade-offs...",
          icon: Cpu,
          accent: "text-cyan-400",
          beamColor: "via-cyan-400/20",
          border: "border-cyan-400/30",
          glow: "rgba(6, 182, 212, 0.2)",
        };
      default:
        return {
          title: "EXPLORE MODE ENGAGED",
          subtitle: "Restoring interactive editorial case studies & micro-interactions...",
          icon: Sparkles,
          accent: "text-sky-400",
          beamColor: "via-sky-400/20",
          border: "border-sky-400/30",
          glow: "rgba(56, 189, 248, 0.2)",
        };
    }
  };

  const info = getModeInfo();
  const Icon = info.icon;

  return (
    <AnimatePresence>
      {isTransitioningMode && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[120] pointer-events-none flex items-center justify-center overflow-hidden"
        >
          {/* Subtle defocus backdrop */}
          <div className="absolute inset-0 bg-[#050608]/40 backdrop-blur-[2px]" />

          {/* Cinematic traveling sweep beam */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent ${info.beamColor} to-transparent pointer-events-none`}
          />

          {/* Thin horizontal laser scanline */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: [0, 1, 1, 0] }}
            transition={{ duration: 0.6, times: [0, 0.2, 0.8, 1] }}
            className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/20 origin-center"
          />

          {/* Central Technical HUD Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`relative px-6 py-4 rounded-2xl bg-[#090c14]/95 border ${info.border} shadow-[0_0_50px_${info.glow}] backdrop-blur-xl flex items-center gap-4 max-w-md mx-4`}
          >
            <div className={`p-2.5 rounded-xl bg-white/[0.05] ${info.accent}`}>
              <Icon className="w-5 h-5 animate-pulse" />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
                <span className={`text-xs font-mono font-bold tracking-widest uppercase ${info.accent}`}>
                  {info.title}
                </span>
              </div>
              <p className="text-[11px] font-mono text-slate-400">
                {info.subtitle}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
