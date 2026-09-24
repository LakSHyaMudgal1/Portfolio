"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { EXPERIENCES } from "@/lib/data";
import { 
  Briefcase, 
  Calendar, 
  ChevronDown, 
  ChevronRight, 
  ChevronUp, 
  Cpu, 
  Database, 
  HardDrive, 
  MapPin, 
  Server, 
  Terminal, 
  Zap 
} from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";

export function ExperienceTimeline() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(0);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const { setSelectedTechDrawer } = usePortfolio();

  // Documented production pipeline chain
  const pipelineChain = [
    { label: "Infinito Comics", type: "system", icon: Briefcase },
    { label: "Node.js", type: "tech", icon: Server },
    { label: "Express", type: "tech", icon: Zap },
    { label: "AWS EC2", type: "infra", icon: Cpu },
    { label: "Cloudinary", type: "media", icon: HardDrive },
    { label: "Amazon S3", type: "storage", icon: Database },
  ];

  return (
    <section id="experience" className="py-28 md:py-36 relative border-t border-white/[0.06] bg-[#050608]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <SectionHeading
          number="// 02"
          eyebrow="PRODUCTION TRACK RECORD // INTERNSHIP"
          title="Where I've built in production."
          description="Real-world full-stack engineering impact, media delivery pipelines, and AWS EC2 cloud infrastructure."
        />

        {/* Experience Timeline Container */}
        <div className="relative mt-12 max-w-4xl">
          {/* Vertical glowing timeline rail */}
          <div className="absolute left-4 sm:left-8 top-3 bottom-3 w-[2px] bg-gradient-to-b from-sky-400 via-indigo-500 to-transparent opacity-80" />

          {EXPERIENCES.map((exp, idx) => {
            const isHovered = hoveredIdx === idx;

            return (
              <div
                key={exp.company}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(idx)}
                className="relative pl-12 sm:pl-20 pb-12 group"
              >
                {/* Timeline node icon */}
                <div
                  className={`absolute left-4 sm:left-8 -translate-x-1/2 top-1.5 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 z-10 ${
                    isHovered
                      ? "bg-sky-500 text-slate-950 border-sky-300 shadow-[0_0_20px_rgba(56,189,248,0.5)] scale-110"
                      : "bg-[#090b10] text-slate-400 border-white/20"
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5" />
                </div>

                {/* Experience Card */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className={`p-6 sm:p-8 rounded-2xl border transition-all duration-300 relative shadow-2xl ${
                    isHovered
                      ? "bg-[#090b10] border-sky-500/40 shadow-sky-500/5 translate-x-1"
                      : "bg-[#090b10]/80 border-white/[0.08]"
                  }`}
                >
                  {/* Top hairline highlight */}
                  <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                  {/* Card top banner */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-5 border-b border-white/[0.06]">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                          {exp.company}
                        </h3>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-sky-500/10 border border-sky-500/25 text-sky-400 font-medium">
                          Production Internship
                        </span>
                      </div>
                      <p className="text-sm sm:text-base text-slate-300 font-medium mt-1">
                        {exp.role}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono text-slate-400">
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.03] border border-white/[0.08]">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.03] border border-white/[0.08]">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Production Pipeline Flow Connection */}
                  <div className="mb-6 p-4 rounded-xl bg-slate-950/60 border border-white/[0.06]">
                    <div className="flex items-center justify-between mb-3 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                      <span className="flex items-center gap-1.5 text-sky-400">
                        <Zap className="w-3 h-3" />
                        <span>Production Data Flow & Infrastructure Connection</span>
                      </span>
                      <span className="text-slate-500 hidden sm:inline">Click any node for tech depth</span>
                    </div>

                    {/* Flow badges with arrows */}
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                      {pipelineChain.map((node, i) => {
                        const IconComponent = node.icon;
                        const isClickable = node.type === "tech" || node.type === "infra" || node.type === "storage" || node.type === "media";

                        return (
                          <React.Fragment key={node.label}>
                            <button
                              type="button"
                              onClick={() => isClickable && setSelectedTechDrawer(node.label)}
                              className={`px-2.5 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all border ${
                                isClickable
                                  ? "bg-white/[0.03] border-white/10 text-slate-200 hover:border-sky-400/50 hover:bg-sky-500/10 hover:text-sky-300 cursor-pointer"
                                  : "bg-sky-500/10 border-sky-500/25 text-sky-300 font-semibold cursor-default"
                              }`}
                              title={isClickable ? `Inspect ${node.label} engineering role` : undefined}
                            >
                              <IconComponent className="w-3 h-3 text-slate-400 group-hover:text-sky-400" />
                              <span>{node.label}</span>
                            </button>
                            {i < pipelineChain.length - 1 && (
                              <span className="text-slate-600 font-mono text-xs px-0.5">→</span>
                            )}
                          </React.Fragment>
                        );
                      })}
                    </div>
                  </div>

                  {/* Bullet points */}
                  <div className="space-y-3 mb-6">
                    {exp.highlights.map((point, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-3 text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                        <ChevronRight className="w-4 h-4 text-sky-400 mt-1 shrink-0" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>

                  {/* Expand / Collapse Toggle for Engineering Depth */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="text-xs font-mono text-sky-400 hover:text-sky-300 flex items-center gap-1.5 py-1.5 transition-colors cursor-pointer"
                    >
                      <span>{isExpanded ? "Collapse Infrastructure Depth" : "Expand Infrastructure & Engineering Details"}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="mt-4 pt-4 border-t border-white/[0.06] space-y-4 overflow-hidden"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Infrastructure & Deployment */}
                            <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1.5">
                              <span className="text-[10px] font-mono uppercase tracking-widest text-sky-400 block font-semibold">
                                INFRASTRUCTURE ARCHITECTURE
                              </span>
                              <p className="text-xs text-slate-300 font-light leading-relaxed">
                                Deployed and provisioned Node.js/Express service on AWS EC2 with reverse proxy routing, managed environment secrets, and monitored runtime uptime.
                              </p>
                            </div>

                            {/* Media Storage Decisions */}
                            <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1.5">
                              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 block font-semibold">
                                CLOUD STORAGE & CDN OFFLOAD
                              </span>
                              <p className="text-xs text-slate-300 font-light leading-relaxed">
                                Streamed heavy multi-format comic assets directly to Amazon S3 & Cloudinary CDN pipelines, preserving backend Node.js CPU resources for core query execution.
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Technology Badges (Clickable with Drawer Integration) */}
                  <div className="pt-6 mt-6 border-t border-white/[0.06]">
                    <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Terminal className="w-3.5 h-3.5 text-sky-400" />
                        <span>PRODUCTION STACK & INFRASTRUCTURE</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500">Click badge for tech drawer</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <button
                          key={tech}
                          type="button"
                          onClick={() => setSelectedTechDrawer(tech)}
                          className="px-3 py-1.5 rounded-lg text-xs font-mono bg-white/[0.03] border border-white/[0.08] text-slate-300 hover:border-sky-400/50 hover:bg-sky-500/10 hover:text-white transition-all cursor-pointer"
                          title={`Explore ${tech} in technical drawer`}
                        >
                          {tech}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
