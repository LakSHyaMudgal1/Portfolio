"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { OPEN_SOURCE_CONTRIBUTIONS } from "@/lib/data";
import { ArrowUpRight, CheckCircle2, GitCommit, GitMerge } from "lucide-react";
import { GithubIcon } from "@/components/Icons";

export function OpenSource() {
  return (
    <section id="open-source" className="py-28 md:py-36 relative border-t border-white/[0.06] bg-[#050608]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <SectionHeading
          number="// 05"
          eyebrow="OPEN-SOURCE CONTRIBUTIONS"
          title="Upstream Open-Source Code."
          description="Contributing to global cloud-native infrastructure (CNCF Meshery) and fintech developer tooling (Juspay HyperSwitch)."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {OPEN_SOURCE_CONTRIBUTIONS.map((item, idx) => (
            <motion.div
              key={item.project}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 sm:p-8 rounded-2xl bg-[#090b10] border border-white/[0.08] hover:border-white/20 transition-all duration-300 relative group shadow-2xl"
            >
              {/* Top hairline highlight */}
              <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

              {/* Top Row: Tags and PR merged badge */}
              <div className="flex items-center justify-between gap-2 mb-5">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-purple-500/10 border border-purple-500/25 text-purple-300 flex items-center gap-1.5">
                    <GitMerge className="w-3.5 h-3.5 text-purple-400" />
                    <span>Merged Pull Requests</span>
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-white/[0.04] border border-white/[0.08] text-slate-400">
                    {item.tag}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-[11px] font-mono text-slate-500">
                  <GitCommit className="w-3 h-3 text-sky-400" />
                  <span>upstream/main</span>
                </div>
              </div>

              {/* Title & Organization */}
              <h3 className="text-2xl font-bold text-white tracking-tight mb-1">
                {item.project}
              </h3>
              <p className="text-xs font-mono text-sky-400/90 mb-4">
                {item.org}
              </p>

              {/* Description */}
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-light">
                {item.description}
              </p>

              {/* GitHub Card Footer */}
              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-slate-400">
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Contributions</span>
                </div>

                <a
                  href="https://github.com/lakshyamudgal"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>Inspect PRs</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Banner quote */}
        <div className="p-4 rounded-xl bg-[#090b10] border border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-slate-400">
          <span>Active participant in collaborative code reviews, issue triage, and upstream pull requests.</span>
          <span className="text-sky-400">github.com/lakshyamudgal</span>
        </div>

      </div>
    </section>
  );
}
