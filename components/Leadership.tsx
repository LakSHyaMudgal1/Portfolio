"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { LEADERSHIP } from "@/lib/data";


export function Leadership() {
  return (
    <section id="leadership" className="py-24 md:py-32 relative border-t border-white/[0.06] bg-[#050608]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <SectionHeading
          number="// 08"
          eyebrow="TEAM & INITIATIVE LEADERSHIP"
          title="Beyond code"
          description="Cross-functional team leadership, event coordination, and operations at IIIT Una."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          {LEADERSHIP.map((item, idx) => (
            <motion.div
              key={item.role}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 sm:p-8 rounded-2xl bg-[#090b10] border border-white/[0.08] hover:border-white/18 transition-all group shadow-2xl relative"
            >
              {/* Top hairline highlight */}
              <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-[11px] font-mono bg-sky-500/10 border border-sky-500/25 text-sky-400 font-medium">
                  {item.role}
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  {item.metric}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white tracking-tight mb-2 group-hover:text-sky-300 transition-colors">
                {item.organization}
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
