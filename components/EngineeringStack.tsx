"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { SKILL_CATEGORIES, TECH_DETAILS } from "@/lib/data";
import { 
  Code2, 
  Server, 
  Smartphone, 
  Cloud, 
  Binary, 
  Sparkles, 
  Layers, 
  ArrowRight
} from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  LANGUAGES: Code2,
  BACKEND: Server,
  "FRONTEND & MOBILE": Smartphone,
  "CLOUD & TOOLS": Cloud,
  "COMPUTER SCIENCE": Binary,
};

export function EngineeringStack() {
  const { setSelectedTechDrawer } = usePortfolio();
  const [selectedIdx, setSelectedIdx] = useState(1); // Default to BACKEND
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const activeCategory = SKILL_CATEGORIES[selectedIdx];
  const Icon = CATEGORY_ICONS[activeCategory.name] || Layers;

  // Active tech lookup from TECH_DETAILS
  const techDetail = hoveredTech ? TECH_DETAILS[hoveredTech] : null;

  return (
    <section id="skills" className="py-28 md:py-36 relative border-t border-white/[0.06] bg-[#050608]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <SectionHeading
          number="// 06"
          eyebrow="TECHNICAL ARCHITECTURE & TOOLING"
          title="Core Engineering Stack."
          description="A categorized breakdown of technologies, frameworks, and engineering foundations I deploy in software products."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Category Navigation Tabs */}
          <div className="lg:col-span-4 flex flex-col gap-2.5">
            {SKILL_CATEGORIES.map((cat, idx) => {
              const CatIcon = CATEGORY_ICONS[cat.name] || Layers;
              const isSelected = selectedIdx === idx;

              return (
                <button
                  key={cat.name}
                  onClick={() => setSelectedIdx(idx)}
                  className={`p-4 rounded-xl border text-left transition-all duration-200 flex items-center justify-between group cursor-pointer ${
                    isSelected
                      ? "bg-[#090b10] border-sky-400/50 shadow-lg shadow-sky-500/5"
                      : "bg-[#090b10]/60 border-white/[0.06] hover:bg-[#0c0f16] hover:border-white/15"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`p-2 rounded-lg border transition-colors ${
                        isSelected
                          ? "bg-sky-500/20 border-sky-400/40 text-sky-400"
                          : "bg-white/[0.03] border-white/[0.06] text-slate-400 group-hover:text-slate-200"
                      }`}
                    >
                      <CatIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <div
                        className={`text-sm font-semibold tracking-tight transition-colors ${
                          isSelected ? "text-white" : "text-slate-300 group-hover:text-white"
                        }`}
                      >
                        {cat.name}
                      </div>
                      <div className="text-[11px] font-mono text-slate-500">
                        {cat.skills.length} core competencies
                      </div>
                    </div>
                  </div>

                  <ArrowRight
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isSelected
                        ? "text-sky-400 translate-x-1"
                        : "text-slate-600 group-hover:text-slate-400"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Central Interactive Visual Engineering Interface */}
          <div className="lg:col-span-8">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#090b10] border border-white/[0.08] relative overflow-hidden shadow-2xl">
              
              {/* Category Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      {activeCategory.name}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">
                      {activeCategory.description}
                    </p>
                  </div>
                </div>

                <div className="px-3 py-1 rounded-md bg-white/[0.03] border border-white/[0.08] text-[11px] font-mono text-slate-400 w-fit">
                  Cluster Mode: Active
                </div>
              </div>

              {/* Skills Interactive Grid */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-8"
                >
                  {activeCategory.skills.map((skill) => (
                    <button
                      key={skill.name}
                      type="button"
                      onMouseEnter={() => setHoveredTech(skill.name)}
                      onMouseLeave={() => setHoveredTech(null)}
                      onClick={() => setSelectedTechDrawer(skill.name)}
                      className={`p-3.5 rounded-xl border transition-all group relative overflow-hidden text-left cursor-pointer w-full ${
                        hoveredTech === skill.name
                          ? "bg-[#121828] border-sky-400/80 shadow-[0_0_20px_rgba(56,189,248,0.2)]"
                          : "bg-[#0d1017] border-white/[0.06] hover:border-sky-400/50 hover:bg-[#111622]"
                      }`}
                      title={`Inspect ${skill.name} technical depth`}
                    >
                      <div className="absolute top-0 right-0 w-12 h-12 bg-sky-500/5 rounded-bl-full pointer-events-none group-hover:bg-sky-500/10 transition-colors" />
                      <div className="flex items-center justify-between mb-2">
                        <span className={`w-1.5 h-1.5 rounded-full transition-transform ${hoveredTech === skill.name ? "bg-sky-300 scale-150" : "bg-sky-400/80 group-hover:scale-125"}`} />
                        {skill.level && (
                          <span className="text-[10px] font-mono text-slate-400 px-1.5 py-0.5 rounded bg-white/[0.04]">
                            {skill.level}
                          </span>
                        )}
                      </div>
                      <div className={`text-sm font-semibold tracking-tight transition-colors ${hoveredTech === skill.name ? "text-sky-300 font-bold" : "text-white group-hover:text-sky-300"}`}>
                        {skill.name}
                      </div>
                    </button>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Interactive Ecosystem Inspection Panel */}
              <div className="mb-6 p-4 rounded-xl bg-[#07090f] border border-white/[0.08] transition-all">
                {techDetail ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
                        <span className="text-xs font-mono font-bold text-white uppercase">{techDetail.name}</span>
                        <span className="text-[10px] font-mono text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">{techDetail.category}</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500">Click to open depth drawer</span>
                    </div>

                    <p className="text-xs text-slate-300 font-light leading-relaxed">
                      {techDetail.role}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-mono">
                      <span className="text-slate-500 text-[10px] uppercase">DEPLOYED IN:</span>
                      {techDetail.projects.map((p) => (
                        <span key={p.name} className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[10px]">
                          {p.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                      <span>Hover over any technology badge to inspect connected architectural subsystems &amp; projects.</span>
                    </div>
                    <span className="text-slate-600 hidden sm:inline">Interactive Knowledge Graph</span>
                  </div>
                )}
              </div>

              {/* System Architecture Connectivity Diagram */}
              <div className="p-4 sm:p-5 rounded-xl bg-[#06080c] border border-white/5">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                    <span>PRODUCTION ARCHITECTURE PIPELINE</span>
                  </div>
                  <span className="text-slate-500">Verified Integration</span>
                </div>

                <div className="relative py-2 flex flex-col md:flex-row items-center justify-between gap-4 text-center">
                  
                  {/* Pipeline Step 1 */}
                  <div className="flex-1 p-3 rounded-lg bg-white/[0.02] border border-white/5 w-full">
                    <span className="text-[10px] font-mono text-slate-500 block mb-1">01 / CLIENT LAYER</span>
                    <span className="text-xs font-semibold text-white">React Native / Web</span>
                    <p className="text-[10px] text-slate-400 mt-1">Stateful UI, caching, responsive design</p>
                  </div>

                  <div className="text-slate-600 hidden md:block">→</div>

                  {/* Pipeline Step 2 */}
                  <div className="flex-1 p-3 rounded-lg bg-sky-500/[0.04] border border-sky-500/20 w-full">
                    <span className="text-[10px] font-mono text-sky-400 block mb-1">02 / API & LOGIC</span>
                    <span className="text-xs font-semibold text-sky-200">Node.js + Express</span>
                    <p className="text-[10px] text-slate-400 mt-1">REST APIs, Socket.io, JWT auth</p>
                  </div>

                  <div className="text-slate-600 hidden md:block">→</div>

                  {/* Pipeline Step 3 */}
                  <div className="flex-1 p-3 rounded-lg bg-emerald-500/[0.04] border border-emerald-500/20 w-full">
                    <span className="text-[10px] font-mono text-emerald-400 block mb-1">03 / PERSISTENCE</span>
                    <span className="text-xs font-semibold text-emerald-200">PostgreSQL / MongoDB</span>
                    <p className="text-[10px] text-slate-400 mt-1">Prisma ORM, relational normalization</p>
                  </div>

                  <div className="text-slate-600 hidden md:block">→</div>

                  {/* Pipeline Step 4 */}
                  <div className="flex-1 p-3 rounded-lg bg-indigo-500/[0.04] border border-indigo-500/20 w-full">
                    <span className="text-[10px] font-mono text-indigo-400 block mb-1">04 / HOSTING</span>
                    <span className="text-xs font-semibold text-indigo-200">AWS EC2 / S3</span>
                    <p className="text-[10px] text-slate-400 mt-1">Secure VPS, TLS, media distribution</p>
                  </div>

                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
