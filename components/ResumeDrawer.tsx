"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  X, 
  Download, 
  Copy, 
  Check, 
  GraduationCap, 
  Award, 
  CheckCircle2
} from "lucide-react";
import { PERSONAL_INFO, EXPERIENCES, PROJECTS, ACHIEVEMENTS, SKILL_CATEGORIES } from "@/lib/data";
import { usePortfolio } from "@/context/PortfolioContext";
import { useScrollLock } from "@/hooks/useScrollLock";

type ResumeTab = "experience" | "projects" | "education" | "achievements" | "skills";

export function ResumeDrawer() {
  const { isResumeDrawerOpen, setIsResumeDrawerOpen } = usePortfolio();
  useScrollLock(isResumeDrawerOpen);
  const [activeTab, setActiveTab] = useState<ResumeTab>("experience");
  const [copied, setCopied] = useState(false);

  // Handle ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsResumeDrawerOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setIsResumeDrawerOpen]);

  if (!isResumeDrawerOpen) return null;

  const copySummary = () => {
    const summary = `${PERSONAL_INFO.name} — ${PERSONAL_INFO.title}
Education: Final-Year B.Tech IT, IIIT Una ('26)
LeetCode Knight (1910 rating, 1058+ problems solved)
Projects: CargoXpress (+40% freight capacity), TabTrack (Collaborative Workspace), OS Scheduler, TLB Simulator
Experience: Full Stack Intern at Infinito Comics (Node.js, Express, AWS EC2, S3)
Contact: ${PERSONAL_INFO.socials.email} | ${PERSONAL_INFO.socials.github}`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
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
        onClick={() => setIsResumeDrawerOpen(false)}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm"
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        data-lenis-prevent="true"
        className="relative w-full max-w-xl h-[100dvh] bg-[#0a0d14] border-l border-white/10 shadow-2xl z-10 flex flex-col justify-between overflow-hidden"
      >
        {/* Top Actions & Header (Sticky Top) */}
        <div className="p-6 sm:p-8 pb-4 border-b border-white/[0.08] shrink-0 bg-[#0a0d14]">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20 font-semibold uppercase tracking-widest">
                INTERACTIVE RESUME EXPLORER
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1.5">
                {PERSONAL_INFO.name}
              </h2>
              <p className="text-xs font-mono text-sky-400">
                {PERSONAL_INFO.title}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsResumeDrawerOpen(false)}
              className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white transition-colors cursor-pointer border border-white/5"
              aria-label="Close resume drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/[0.08] overflow-x-auto no-scrollbar text-xs font-mono">
            {(
              [
                { id: "experience", label: "Experience" },
                { id: "projects", label: "Projects" },
                { id: "skills", label: "Skills" },
                { id: "education", label: "Education" },
                { id: "achievements", label: "Honors" },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer shrink-0 ${
                  activeTab === tab.id
                    ? "bg-white/10 text-white font-semibold"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

        </div>

        {/* Active Tab Body (Scrollable Content Area) */}
        <div data-lenis-prevent="true" className="flex-1 overflow-y-auto overscroll-contain p-6 sm:p-8 space-y-4">
            {activeTab === "experience" && (
              <div className="space-y-4">
                {EXPERIENCES.map((exp, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-[#0c0f18] border border-white/[0.06] space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-base font-bold text-white">{exp.role}</h4>
                        <div className="text-xs font-mono text-sky-400">{exp.company}</div>
                      </div>
                      <span className="text-[11px] font-mono text-slate-400 shrink-0">
                        {exp.period}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-300 font-light">
                      {exp.highlights.map((h, hi) => (
                        <div key={hi} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 flex flex-wrap gap-1">
                      {exp.technologies.map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.03] border border-white/[0.06] text-slate-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "projects" && (
              <div className="space-y-3">
                {PROJECTS.map((p) => (
                  <div key={p.id} className="p-4 rounded-2xl bg-[#0c0f18] border border-white/[0.06] space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-sky-400 font-bold">{`${p.num} // ${p.title}`}</span>
                      <span className="text-slate-400">{p.category}</span>
                    </div>
                    <p className="text-xs text-slate-300 font-light leading-relaxed">
                      {p.description}
                    </p>
                    {p.metrics && (
                      <div className="text-[11px] font-mono text-emerald-400 font-medium">
                        Outcome: {p.metrics}
                      </div>
                    )}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {p.stack.slice(0, 5).map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.02] border border-white/[0.05] text-slate-400">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "skills" && (
              <div className="space-y-3">
                {SKILL_CATEGORIES.map((cat) => (
                  <div key={cat.name} className="p-3.5 rounded-2xl bg-[#0c0f18] border border-white/[0.06]">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-2 font-semibold">
                      {cat.name}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.skills.map((s) => (
                        <span key={s.name} className="px-2 py-1 rounded text-xs font-mono bg-white/[0.03] border border-white/[0.06] text-slate-200">
                          {s.name} {s.level && <span className="text-slate-500 text-[10px]">({s.level})</span>}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "education" && (
              <div className="p-5 rounded-2xl bg-[#0c0f18] border border-white/[0.06] space-y-3">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-sky-400" />
                  <div>
                    <h4 className="text-base font-bold text-white">{PERSONAL_INFO.education.degree}</h4>
                    <div className="text-xs font-mono text-slate-400">{PERSONAL_INFO.education.institution}</div>
                  </div>
                </div>
                <div className="text-xs font-mono text-emerald-400">
                  Status: {PERSONAL_INFO.education.status} (Graduation: 2026)
                </div>
                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  Focusing on data structures, algorithms, operating systems, database management systems, computer networks, and full-stack software development.
                </p>
              </div>
            )}

            {activeTab === "achievements" && (
              <div className="space-y-2.5">
                {ACHIEVEMENTS.map((ach, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-[#0c0f18] border border-white/[0.06] flex items-start gap-3">
                    <Award className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-white">{ach.title}</div>
                      <div className="text-[11px] font-mono text-slate-400">{ach.issuer} • {ach.date}</div>
                      <p className="text-[11px] text-slate-300 font-light mt-1">{ach.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
        </div>

        {/* Drawer Bottom Actions (Sticky Footer) */}
        <div className="p-6 sm:p-8 pt-4 border-t border-white/[0.08] shrink-0 bg-[#0a0d14] flex flex-wrap items-center gap-3 text-xs font-mono">
          <button
            type="button"
            onClick={copySummary}
            className="px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/10 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied Summary" : "Copy Brief"}</span>
          </button>

          <a
            href={`mailto:${PERSONAL_INFO.socials.email}`}
            className="px-3.5 py-2 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-300 hover:text-sky-200 hover:bg-sky-500/20 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Contact</span>
          </a>

          <a
            href="/resume.pdf"
            download="Lakshya_Mudgal_Resume.pdf"
            className="ml-auto btn-primary-tactile px-4 py-2 rounded-xl flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </a>
        </div>
      </motion.div>
    </div>
  );
}
