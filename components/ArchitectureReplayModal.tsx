"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  X, 
  Layers,
  Sparkles
} from "lucide-react";
import { ARCHITECTURE_REPLAYS } from "@/lib/data";
import { usePortfolio } from "@/context/PortfolioContext";
import { useScrollLock } from "@/hooks/useScrollLock";

export function ArchitectureReplayModal() {
  const { selectedReplayProject, setSelectedReplayProject } = usePortfolio();
  useScrollLock(!!selectedReplayProject);

  // Handle ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedReplayProject(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setSelectedReplayProject]);

  if (!selectedReplayProject) return null;

  return (
    <ArchitectureReplayModalInner
      key={selectedReplayProject}
      projectId={selectedReplayProject}
      onClose={() => setSelectedReplayProject(null)}
    />
  );
}

function ArchitectureReplayModalInner({
  projectId,
  onClose,
}: {
  projectId: string;
  onClose: () => void;
}) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const replayData = ARCHITECTURE_REPLAYS[projectId];
  const totalSteps = replayData ? replayData.steps.length : 0;

  // Auto-play timer
  useEffect(() => {
    if (!replayData || !isPlaying) return;

    const timer = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev >= totalSteps - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 2200);

    return () => clearInterval(timer);
  }, [isPlaying, replayData, totalSteps]);

  if (!replayData) return null;

  const currentStep = replayData.steps[currentStepIndex];

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
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
        aria-hidden="true"
      />

      {/* Replay Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.2 }}
        data-lenis-prevent="true"
        className="relative w-full max-w-3xl max-h-[88dvh] overflow-y-auto overscroll-contain rounded-3xl bg-[#090b11] border border-white/15 p-6 sm:p-8 shadow-2xl z-10"
      >
        {/* Top hairline accent */}
        <div className="absolute top-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-sky-400/40 to-transparent pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block font-semibold">
                SYSTEM ARCHITECTURE REPLAY
              </span>
              <h3 className="text-xl font-bold text-white tracking-tight">
                {replayData.title}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white transition-colors cursor-pointer border border-white/5"
            aria-label="Close architecture replay"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Topology Stages */}
        <div className="space-y-6">
          {/* Progress Timeline Nodes */}
          <div className="grid grid-cols-5 sm:grid-cols-6 gap-1.5 sm:gap-2 text-center text-xs font-mono">
            {replayData.steps.map((st, idx) => {
              const isPast = idx < currentStepIndex;
              const isCurrent = idx === currentStepIndex;
              return (
                <button
                  key={st.stepNumber}
                  type="button"
                  onClick={() => {
                    setCurrentStepIndex(idx);
                    setIsPlaying(false);
                  }}
                  className={`p-2 rounded-xl border transition-all cursor-pointer text-left sm:text-center ${
                    isCurrent
                      ? "bg-sky-500/20 border-sky-400/60 text-white shadow-[0_0_12px_rgba(56,189,248,0.2)]"
                      : isPast
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                      : "bg-white/[0.02] border-white/[0.05] text-slate-500"
                  }`}
                >
                  <span className="text-[9px] block text-slate-400">STEP 0{st.stepNumber}</span>
                  <span className="text-[11px] font-semibold truncate block">{st.source}</span>
                </button>
              );
            })}
          </div>

          {/* Active Flow Animation Canvas */}
          <div className="p-6 rounded-2xl bg-[#06070a] border border-white/[0.08] relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-white/[0.06] text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
                <span className="text-white font-medium">Trace Packet in Transit:</span>
                <span className="text-sky-300 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
                  {currentStep.protocol}
                </span>
              </div>

              <span className="text-slate-400">
                Stage {currentStepIndex + 1} of {totalSteps}
              </span>
            </div>

            {/* Visual Pipeline Vector */}
            <div className="py-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 font-mono">
              {/* Source Node */}
              <div className="p-4 rounded-xl bg-[#0d101a] border border-sky-500/30 text-center min-w-[140px] shadow-lg">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest block">ORIGIN</span>
                <span className="text-sm font-bold text-white block mt-1">{currentStep.source}</span>
              </div>

              {/* Transit Packet */}
              <div className="flex flex-col items-center justify-center space-y-1">
                <motion.div
                  key={currentStepIndex}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/40 text-[11px] text-sky-300 font-semibold flex items-center gap-1.5 shadow-[0_0_15px_rgba(56,189,248,0.3)]"
                >
                  <Sparkles className="w-3 h-3 text-sky-400" />
                  <span>{currentStep.label}</span>
                </motion.div>
                <div className="w-24 sm:w-36 h-[2px] bg-gradient-to-r from-sky-400 to-indigo-400 rounded-full" />
              </div>

              {/* Target Node */}
              <div className="p-4 rounded-xl bg-[#0d101a] border border-indigo-500/30 text-center min-w-[140px] shadow-lg">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest block">DESTINATION</span>
                <span className="text-sm font-bold text-indigo-200 block mt-1">{currentStep.target}</span>
              </div>
            </div>

            {/* Step Description Box */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              <span className="text-sky-400 font-mono font-medium mr-1.5">Action:</span>
              {currentStep.description}
            </div>
          </div>

          {/* Playback Controls */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-4 py-2 rounded-xl text-xs font-mono bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 border border-sky-500/30 flex items-center gap-2 transition-colors cursor-pointer"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlaying ? "Pause Trace" : "Resume Trace"}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setCurrentStepIndex(0);
                  setIsPlaying(true);
                }}
                className="px-3.5 py-2 rounded-xl text-xs font-mono bg-white/[0.03] hover:bg-white/[0.08] text-slate-300 border border-white/10 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Replay from Start</span>
              </button>
            </div>

            <div className="text-[11px] font-mono text-slate-500 hidden sm:block">
              Auto-advancing request lifecycle
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
