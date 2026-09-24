"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  ArrowUpRight, 
  Briefcase, 
  Code, 
  Download, 
  FileText, 
  GraduationCap, 
  Mail, 
  RotateCcw, 
  Sparkles, 
  CheckCircle2,
  ExternalLink
} from "lucide-react";
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from "@/components/Icons";
import { PERSONAL_INFO, EXPERIENCES, PROJECTS, SKILL_CATEGORIES } from "@/lib/data";
import { usePortfolio } from "@/context/PortfolioContext";

export function RecruiterModeView() {
  const { setMode, setIsResumeDrawerOpen, setIsCompareOpen, setSelectedTechDrawer } = usePortfolio();

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8"
    >
      {/* Top Recruiter Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-sky-500/10 via-indigo-500/10 to-emerald-500/10 border border-sky-500/30 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-400 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-sky-400 font-bold">
                RECRUITER MODE ACTIVE
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <p className="text-xs sm:text-sm text-slate-300 font-light">
              High-density technical briefing optimized for a 20-second engineering evaluation.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => setIsResumeDrawerOpen(true)}
            className="px-4 py-2 rounded-xl text-xs font-mono bg-white/10 hover:bg-white/15 text-white border border-white/15 flex items-center gap-2 transition-colors cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-sky-400" />
            <span>Explore Resume</span>
          </button>

          <button
            type="button"
            onClick={() => setMode("explore")}
            className="btn-primary-tactile px-4 py-2 rounded-xl text-xs font-mono flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Switch to Explore Mode</span>
          </button>
        </div>
      </div>

      {/* Candidate Executive Summary Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#08090d] border border-white/[0.08] shadow-2xl relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 font-medium">
                {PERSONAL_INFO.status}
              </span>
              <span className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.06] text-slate-400">
                Graduating 2026
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              {PERSONAL_INFO.name}
            </h1>

            <p className="text-base sm:text-lg text-sky-300 font-mono font-medium">
              {PERSONAL_INFO.title}
            </p>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
              Final-year B.Tech Information Technology student at Indian Institute of Information Technology (IIIT) Una. Combines production full-stack engineering (Node.js, Express, React, MongoDB) with competitive algorithmic depth (LeetCode Knight 1910, 1058+ problems solved, Hack 5.0 2nd Position).
            </p>

            {/* Quick Link Row */}
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-mono">
              <a
                href={PERSONAL_INFO.socials.github}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/10 flex items-center gap-1.5 transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>

              <a
                href={PERSONAL_INFO.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/10 flex items-center gap-1.5 transition-colors"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>

              <a
                href={PERSONAL_INFO.socials.leetcode}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/10 flex items-center gap-1.5 transition-colors"
              >
                <LeetcodeIcon className="w-3.5 h-3.5" />
                <span>LeetCode (Knight 1910)</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>

              <a
                href={`mailto:${PERSONAL_INFO.socials.email}`}
                className="px-3 py-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 border border-sky-500/30 flex items-center gap-1.5 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{PERSONAL_INFO.socials.email}</span>
              </a>
            </div>
          </div>

          {/* Quick Metrics Column */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-3 font-mono">
            <div className="p-3.5 rounded-2xl bg-[#0c0e15] border border-white/[0.08] text-center">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest block mb-1">LEETCODE RATING</span>
              <span className="text-2xl font-bold text-amber-400">1910</span>
              <span className="text-[9px] text-slate-500 block">Knight Badge (Top 5%)</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#0c0e15] border border-white/[0.08] text-center">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest block mb-1">PROBLEMS SOLVED</span>
              <span className="text-2xl font-bold text-sky-400">1058+</span>
              <span className="text-[9px] text-slate-500 block">610+ Active Days</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#0c0e15] border border-white/[0.08] text-center">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest block mb-1">HACKATHONS</span>
              <span className="text-2xl font-bold text-emerald-400">2nd Place</span>
              <span className="text-[9px] text-slate-500 block">Hack 5.0 (NIT Hamirpur)</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#0c0e15] border border-white/[0.08] text-center">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest block mb-1">OPTIMIZATION</span>
              <span className="text-2xl font-bold text-purple-400">+40%</span>
              <span className="text-[9px] text-slate-500 block">Vehicle Capacity Gain</span>
            </div>
          </div>

        </div>
      </div>

      {/* Production Experience Section */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#08090d] border border-white/[0.08] shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-indigo-400" />
            <h2 className="text-sm font-mono uppercase tracking-widest text-white font-semibold">
              PRODUCTION EXPERIENCE
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">1 Professional Role</span>
        </div>

        {EXPERIENCES.map((exp, idx) => (
          <div key={idx} className="p-4 sm:p-5 rounded-2xl bg-[#0c0e15] border border-white/[0.06] space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <div>
                <span className="text-base sm:text-lg font-bold text-white mr-2">{exp.company}</span>
                <span className="text-xs font-mono text-sky-400">/ {exp.role}</span>
              </div>
              <div className="text-xs font-mono text-slate-400">
                {exp.period} • {exp.location}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-300 font-light">
              {exp.highlights.slice(0, 4).map((h, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-wrap gap-1.5">
              {exp.technologies.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setSelectedTechDrawer(t)}
                  className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/[0.03] hover:bg-white/10 border border-white/[0.06] text-slate-300 transition-colors cursor-pointer"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 4 Selected Projects — High Density Cards */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#08090d] border border-white/[0.08] shadow-2xl space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <Code className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-mono uppercase tracking-widest text-white font-semibold">
              SELECTED PROJECTS MATRIX (5 ENGINEERING SYSTEMS)
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setIsCompareOpen(true)}
            className="text-xs font-mono text-sky-400 hover:text-sky-300 underline cursor-pointer"
          >
            Compare Projects Side-by-Side →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PROJECTS.map((proj) => (
            <div
              key={proj.id}
              className="p-5 rounded-2xl bg-[#0c0e15] border border-white/[0.06] hover:border-white/20 transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono pb-2 border-b border-white/[0.05]">
                  <span className="text-sky-400 font-semibold">{`${proj.num} // ${proj.category}`}</span>
                  {proj.metrics && (
                    <span className="text-emerald-400 font-bold">{proj.metrics}</span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-white mt-3 mb-1">
                  {proj.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light mb-3">
                  {proj.description}
                </p>

                <div className="space-y-1.5 text-xs text-slate-400 font-light">
                  {proj.highlights.slice(0, 2).map((h, i) => (
                    <div key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {proj.stack.slice(0, 5).map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.02] border border-white/[0.05] text-slate-400"
                    >
                      {t}
                    </span>
                  ))}
                  {proj.stack.length > 5 && (
                    <span className="px-1.5 py-0.5 text-[10px] font-mono text-slate-500">
                      +{proj.stack.length - 5} more
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/[0.05]">
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>View Repository</span>
                    <ArrowUpRight className="w-3 h-3 text-slate-500" />
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-xs font-mono text-sky-400 hover:text-sky-300 cursor-pointer"
                  >
                    Inspect Architecture
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Skill Breakdown */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#08090d] border border-white/[0.08] shadow-2xl space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-white/[0.06]">
          <GraduationCap className="w-4 h-4 text-emerald-400" />
          <h2 className="text-sm font-mono uppercase tracking-widest text-white font-semibold">
            ENGINEERING STACK &amp; CORE PROFICIENCY
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SKILL_CATEGORIES.map((cat) => (
            <div key={cat.name} className="p-4 rounded-2xl bg-[#0c0e15] border border-white/[0.06] space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 block font-semibold">
                {cat.name}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((s) => (
                  <button
                    key={s.name}
                    type="button"
                    onClick={() => setSelectedTechDrawer(s.name)}
                    className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/[0.03] hover:bg-white/10 border border-white/[0.06] text-slate-300 hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recruiter Bottom Actions */}
      <div className="p-6 rounded-2xl bg-[#0a0d14] border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
        <div className="text-slate-400">
          Want the complete formatted 1-page PDF resume or full interactive case studies?
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/resume.pdf"
            download="Lakshya_Mudgal_Resume.pdf"
            className="btn-primary-tactile px-4 py-2 rounded-xl flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Resume PDF</span>
          </a>
          <button
            type="button"
            onClick={() => setMode("explore")}
            className="btn-secondary-tactile px-4 py-2 rounded-xl text-slate-300 hover:text-white cursor-pointer"
          >
            Return to Explore
          </button>
        </div>
      </div>

    </motion.div>
  );
}
