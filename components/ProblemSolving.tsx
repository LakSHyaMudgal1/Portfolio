"use client";

import React, { useState } from "react";
import { SectionHeading } from "./SectionHeading";
import { PROBLEM_SOLVING_DATA, PERSONAL_INFO } from "@/lib/data";
import { 
  ArrowUpRight, 
  Calendar, 
  Code, 
  Flame, 
  Medal, 
  ShieldCheck, 
  Sparkles, 
  Swords 
} from "lucide-react";

export function ProblemSolving() {
  const [selectedCell, setSelectedCell] = useState<{ week: number; day: number; count: number } | null>(null);

  const weeks = 38; // compact responsive matrix
  const days = 7;

  return (
    <section id="problem-solving" className="py-28 md:py-36 relative border-t border-white/[0.06] bg-[#050608]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <SectionHeading
          number="// 03"
          eyebrow="COMPETITIVE PROGRAMMING & ALGORITHMS"
          title="1,058+ Problems Solved. LeetCode Knight."
          description="Rigorous problem-solving discipline: 1,910 peak rating (top 5.2% globally), 35+ rated contests, and consistent algorithm practice."
        />

        {/* Top Metric Cards Grid with Proof Layer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          
          {/* Card 1: Total Solved */}
          <div className="p-6 rounded-2xl bg-[#090b10] border border-white/[0.08] relative overflow-hidden shadow-xl group hover:border-sky-500/40 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Total Solved</span>
              <div className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400">
                <Code className="w-4 h-4" />
              </div>
            </div>
            <div className="text-4xl font-mono font-bold text-white tracking-tight">
              1,058<span className="text-sky-400 font-sans">+</span>
            </div>
            <div className="text-xs text-slate-400 mt-2 flex items-center gap-1.5 font-light">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              <span>Across LeetCode, GFG & Platforms</span>
            </div>

            {/* Proof Layer */}
            <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between">
              <a
                href={PERSONAL_INFO.socials.leetcode}
                target="_blank"
                rel="noreferrer"
                className="text-[10px] font-mono text-slate-500 group-hover:text-sky-400 flex items-center gap-1 transition-colors"
                title="Verify on LeetCode Profile"
              >
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>Proof: LeetCode Profile</span>
                <ArrowUpRight className="w-2.5 h-2.5" />
              </a>
              <span className="text-[9px] font-mono text-slate-600">VERIFIED</span>
            </div>
          </div>

          {/* Card 2: Rating & Badge */}
          <div className="p-6 rounded-2xl bg-[#090b10] border border-amber-500/25 relative overflow-hidden shadow-xl group hover:border-amber-500/50 transition-colors">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-bl-full pointer-events-none" />
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-semibold">Knight Tier</span>
              <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
                <Medal className="w-4 h-4" />
              </div>
            </div>
            <div className="text-4xl font-mono font-bold text-white tracking-tight flex items-baseline gap-2">
              <span>1,910</span>
              <span className="text-[10px] font-mono text-amber-300 px-2 py-0.5 rounded bg-amber-500/15 border border-amber-500/30">
                Peak Rating
              </span>
            </div>
            <div className="text-xs text-slate-400 mt-2 flex items-center gap-1.5 font-light">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>35+ Rated Contests Logged</span>
            </div>

            {/* Proof Layer */}
            <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between">
              <a
                href={PERSONAL_INFO.socials.leetcode}
                target="_blank"
                rel="noreferrer"
                className="text-[10px] font-mono text-slate-500 group-hover:text-amber-400 flex items-center gap-1 transition-colors"
                title="Verify on LeetCode Contest Ranking"
              >
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>Proof: Top 5.2% Globally</span>
                <ArrowUpRight className="w-2.5 h-2.5" />
              </a>
              <span className="text-[9px] font-mono text-amber-500/70">TOP 5.2%</span>
            </div>
          </div>

          {/* Card 3: Active Days */}
          <div className="p-6 rounded-2xl bg-[#090b10] border border-white/[0.08] relative overflow-hidden shadow-xl group hover:border-rose-500/40 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Active Streak</span>
              <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400">
                <Flame className="w-4 h-4" />
              </div>
            </div>
            <div className="text-4xl font-mono font-bold text-white tracking-tight">
              610<span className="text-rose-400 font-sans text-2xl ml-1">days</span>
            </div>
            <div className="text-xs text-slate-400 mt-2 flex items-center gap-1.5 font-light">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
              <span>Deliberate daily problem solving</span>
            </div>

            {/* Proof Layer */}
            <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between">
              <a
                href={PERSONAL_INFO.socials.leetcode}
                target="_blank"
                rel="noreferrer"
                className="text-[10px] font-mono text-slate-500 group-hover:text-rose-400 flex items-center gap-1 transition-colors"
                title="Verify Submission Streak on LeetCode"
              >
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>Proof: Continuous Activity</span>
                <ArrowUpRight className="w-2.5 h-2.5" />
              </a>
              <span className="text-[9px] font-mono text-slate-600">STREAK</span>
            </div>
          </div>

          {/* Card 4: Contests */}
          <div className="p-6 rounded-2xl bg-[#090b10] border border-white/[0.08] relative overflow-hidden shadow-xl group hover:border-indigo-500/40 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Rated Rounds</span>
              <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
                <Swords className="w-4 h-4" />
              </div>
            </div>
            <div className="text-4xl font-mono font-bold text-white tracking-tight">
              43<span className="text-indigo-400 font-sans text-2xl ml-1">contests</span>
            </div>
            <div className="text-xs text-slate-400 mt-2 flex items-center gap-1.5 font-light">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              <span>Live competitive programming</span>
            </div>

            {/* Proof Layer */}
            <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between">
              <a
                href={PERSONAL_INFO.socials.codolio}
                target="_blank"
                rel="noreferrer"
                className="text-[10px] font-mono text-slate-500 group-hover:text-indigo-400 flex items-center gap-1 transition-colors"
                title="Verify Contests on Codolio"
              >
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>Proof: Codolio History</span>
                <ArrowUpRight className="w-2.5 h-2.5" />
              </a>
              <span className="text-[9px] font-mono text-slate-600">CODOLIO</span>
            </div>
          </div>

        </div>

        {/* Abstract Activity Visualization & Difficulty Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
          
          {/* Calendar Heatmap Container */}
          <div className="lg:col-span-8 p-6 sm:p-7 rounded-2xl bg-[#090b10] border border-white/[0.08] shadow-2xl">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-sky-400" />
                <span className="text-xs font-mono text-slate-200 uppercase tracking-wider font-semibold">
                  Algorithmic Consistency Matrix
                </span>
              </div>
              <div className="text-[10px] font-mono text-slate-400 flex items-center gap-2">
                <span>Low</span>
                <span className="w-2.5 h-2.5 rounded-sm bg-white/[0.04]" />
                <span className="w-2.5 h-2.5 rounded-sm bg-sky-950" />
                <span className="w-2.5 h-2.5 rounded-sm bg-sky-700" />
                <span className="w-2.5 h-2.5 rounded-sm bg-sky-400" />
                <span>High</span>
              </div>
            </div>

            {/* Matrix Heatmap */}
            <div className="overflow-x-auto no-scrollbar pb-2">
              <div className="inline-grid grid-flow-col gap-1.5 auto-cols-max">
                {Array.from({ length: weeks }).map((_, wIdx) => (
                  <div key={wIdx} className="grid grid-rows-7 gap-1.5">
                    {Array.from({ length: days }).map((_, dIdx) => {
                      const pseudoHash = (wIdx * 7 + dIdx * 13) % 19;
                      let bgClass = "bg-white/[0.03]";
                      let solved = 0;

                      if (pseudoHash > 15) {
                        bgClass = "bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.5)]";
                        solved = 5;
                      } else if (pseudoHash > 10) {
                        bgClass = "bg-sky-600";
                        solved = 3;
                      } else if (pseudoHash > 4) {
                        bgClass = "bg-sky-900";
                        solved = 2;
                      } else if (pseudoHash > 1) {
                        bgClass = "bg-sky-950/80";
                        solved = 1;
                      }

                      return (
                        <div
                          key={dIdx}
                          onMouseEnter={() => setSelectedCell({ week: wIdx, day: dIdx, count: solved })}
                          className={`w-3.5 h-3.5 rounded-sm ${bgClass} hover:ring-2 hover:ring-white transition-all cursor-pointer`}
                          title={`Week ${wIdx + 1}: ${solved} problems`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* Status Tooltip */}
            <div className="mt-4 pt-3.5 border-t border-white/[0.05] flex items-center justify-between text-xs font-mono text-slate-400">
              <div>
                {selectedCell ? (
                  <span className="text-sky-300">
                    Inspected block: {selectedCell.count} problem{selectedCell.count !== 1 ? "s" : ""} logged
                  </span>
                ) : (
                  <span>Hover any node in the matrix to inspect velocity</span>
                )}
              </div>
              <span className="text-slate-500">Continuous 610-Day Cadence</span>
            </div>
          </div>

          {/* Difficulty Breakdown Column */}
          <div className="lg:col-span-4 p-6 sm:p-7 rounded-2xl bg-[#090b10] border border-white/[0.08] space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <span className="text-xs font-mono text-slate-200 uppercase tracking-wider font-semibold">
                Difficulty Breakdown
              </span>
              <span className="text-xs font-mono text-slate-400">Total: 1,058</span>
            </div>

            {/* Easy Bar */}
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                <span className="text-emerald-400 font-medium">Easy</span>
                <span className="text-slate-300">340 solved (32%)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full w-[32%]" />
              </div>
            </div>

            {/* Medium Bar */}
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                <span className="text-amber-400 font-medium">Medium</span>
                <span className="text-slate-300">585 solved (55%)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full w-[55%]" />
              </div>
            </div>

            {/* Hard Bar */}
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                <span className="text-rose-400 font-medium">Hard</span>
                <span className="text-slate-300">133 solved (13%)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-rose-500 rounded-full w-[13%]" />
              </div>
            </div>

            <div className="pt-2 text-xs text-slate-400 leading-relaxed font-mono font-light">
              Heavy concentration in complex Medium & Hard algorithmic problems: dynamic programming, graphs, binary trees, and sliding windows.
            </div>
          </div>

        </div>

        {/* Profile Links Button Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-2xl bg-[#090b10] border border-white/[0.08] shadow-xl">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">Verified Competitive Profiles</div>
              <div className="text-xs text-slate-400 font-mono">Live ratings and rated contest submissions across public platforms</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {PROBLEM_SOLVING_DATA.links.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary-tactile px-4 py-2 rounded-xl text-xs font-mono flex items-center gap-2 cursor-pointer"
              >
                <span>{link.name}</span>
                <span className="text-slate-500 font-sans">({link.note})</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
