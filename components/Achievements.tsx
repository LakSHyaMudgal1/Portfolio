"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { ACHIEVEMENTS } from "@/lib/data";
import { CheckCircle2, Trophy } from "lucide-react";

export function Achievements() {
  return (
    <section id="achievements" className="py-28 md:py-36 relative border-t border-white/[0.06] bg-[#050608]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <SectionHeading
          number="// 04"
          eyebrow="HACKATHONS & DISTINCTIONS"
          title="National Hackathons & Recognition."
          description="Proven ability to conceptualize, architect, and ship winning solutions under high-pressure competitive conditions."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACHIEVEMENTS.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className={`p-6 sm:p-7 rounded-2xl border transition-all duration-300 relative group flex flex-col justify-between shadow-2xl ${
                item.featured
                  ? "bg-[#090b10] border-white/[0.12] hover:border-sky-400/40 shadow-sky-500/5"
                  : "bg-[#090b10]/70 border-white/[0.06] hover:border-white/18"
              }`}
            >
              {/* Inset top highlight */}
              <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              <div>
                {/* Header with badge & date */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  {item.badge && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-sky-500/10 border border-sky-500/25 text-sky-400 flex items-center gap-1.5 font-medium">
                      <Trophy className="w-3 h-3 text-sky-400" />
                      {item.badge.includes(" ") ? (
                        <span>
                          <motion.span
                            initial={{ scale: 0.8 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            className="font-bold text-sky-300 mr-1"
                          >
                            {item.badge.split(" ")[0]}
                          </motion.span>
                          <span>{item.badge.split(" ").slice(1).join(" ")}</span>
                        </span>
                      ) : (
                        <span>{item.badge}</span>
                      )}
                    </span>
                  )}
                  <span className="text-[11px] font-mono text-slate-400">
                    {item.date}
                  </span>
                </div>

                {/* Title & Issuer */}
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-1 group-hover:text-sky-300 transition-colors">
                  {item.title}
                </h3>
                <div className="text-xs font-mono text-slate-400 mb-3.5">
                  {item.issuer}
                </div>

                {/* Description */}
                {item.description && (
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light mb-6">
                    {item.description}
                  </p>
                )}
              </div>

              {/* Verified footer indicator with proof */}
              <div className="pt-3.5 border-t border-white/[0.05] flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified: {item.issuer}</span>
                </span>
                <span className="text-slate-500">HONOR #0{idx + 1}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
