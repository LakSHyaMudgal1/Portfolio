"use client";

import React from "react";
import { Radio, Compass, Rocket, MapPin } from "lucide-react";
import { NOW_STATUS } from "@/lib/data";

export function CurrentlySection() {
  return (
    <section className="py-16 md:py-20 relative border-t border-white/[0.06] bg-[#050609]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h3 className="text-xs font-mono uppercase tracking-widest text-white font-semibold">
              CURRENT FOCUS // NOW STATUS DASHBOARD
            </h3>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-rose-400" />
            <span>{NOW_STATUS.location}</span>
          </div>
        </div>

        {/* 3-Column Live Status Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono">
          
          {/* Card 1: Building */}
          <div className="p-6 rounded-3xl bg-[#080a10] border border-white/[0.08] hover:border-white/15 transition-all space-y-3 relative overflow-hidden group">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-white/[0.05]">
              <div className="flex items-center gap-2 text-sky-400 font-semibold">
                <Rocket className="w-3.5 h-3.5" />
                <span>BUILDING</span>
              </div>
              <span className="text-[10px] text-slate-500">Active Sprint</span>
            </div>

            <h4 className="text-base font-bold text-white font-sans tracking-tight">
              {NOW_STATUS.building.title}
            </h4>

            <p className="text-xs text-slate-300 font-light font-sans leading-relaxed">
              {NOW_STATUS.building.detail}
            </p>
          </div>

          {/* Card 2: Exploring */}
          <div className="p-6 rounded-3xl bg-[#080a10] border border-white/[0.08] hover:border-white/15 transition-all space-y-3 relative overflow-hidden group">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-white/[0.05]">
              <div className="flex items-center gap-2 text-indigo-400 font-semibold">
                <Compass className="w-3.5 h-3.5" />
                <span>EXPLORING</span>
              </div>
              <span className="text-[10px] text-slate-500">Systems &amp; R&amp;D</span>
            </div>

            <h4 className="text-base font-bold text-white font-sans tracking-tight">
              {NOW_STATUS.exploring.title}
            </h4>

            <p className="text-xs text-slate-300 font-light font-sans leading-relaxed">
              {NOW_STATUS.exploring.detail}
            </p>
          </div>

          {/* Card 3: Preparing */}
          <div className="p-6 rounded-3xl bg-[#080a10] border border-white/[0.08] hover:border-white/15 transition-all space-y-3 relative overflow-hidden group">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-white/[0.05]">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                <span>OPPORTUNITIES</span>
              </div>
              <span className="text-[10px] text-emerald-400">Available &apos;26</span>
            </div>

            <h4 className="text-base font-bold text-white font-sans tracking-tight">
              {NOW_STATUS.preparing.title}
            </h4>

            <p className="text-xs text-slate-300 font-light font-sans leading-relaxed">
              {NOW_STATUS.preparing.detail}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
