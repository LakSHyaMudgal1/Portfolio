"use client";

import React from "react";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/data";
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from "@/components/Icons";
import { usePortfolio } from "@/context/PortfolioContext";

export function Footer() {
  const { setIsShortcutsOpen, setIsTerminalOpen } = usePortfolio();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-20 border-t border-white/[0.08] bg-[#040507] relative">
      {/* Inset top highlight */}
      <div className="absolute top-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-white/[0.06]">
          
          {/* Left Brand */}
          <div>
            <div className="text-xl font-bold font-mono tracking-widest text-white mb-1.5">
              LAKSHYA MUDGAL
            </div>
            <p className="text-xs font-mono text-slate-500">
              Final-Year B.Tech IT • IIIT Una &apos;26 • Full-Stack Developer
            </p>
          </div>

          {/* Right Links */}
          <div className="flex flex-wrap items-center gap-5 text-xs font-mono text-slate-400">
            <a
              href={PERSONAL_INFO.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1.5 p-2 rounded-lg hover:bg-white/[0.04]"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
              <ArrowUpRight className="w-3 h-3 text-slate-500" />
            </a>

            <a
              href={PERSONAL_INFO.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1.5 p-2 rounded-lg hover:bg-white/[0.04]"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3 h-3 text-slate-500" />
            </a>

            <a
              href={PERSONAL_INFO.socials.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1.5 p-2 rounded-lg hover:bg-white/[0.04]"
            >
              <LeetcodeIcon className="w-3.5 h-3.5" />
              <span>LeetCode</span>
              <ArrowUpRight className="w-3 h-3 text-slate-500" />
            </a>

            <a
              href={PERSONAL_INFO.socials.codolio}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1.5 p-2 rounded-lg hover:bg-white/[0.04]"
            >
              <span>Codolio</span>
              <ArrowUpRight className="w-3 h-3 text-slate-500" />
            </a>

            {/* Email */}
            <a
              href={`mailto:${PERSONAL_INFO.socials.email}`}
              className="hover:text-white transition-colors flex items-center gap-1.5 p-2 rounded-lg hover:bg-white/[0.04]"
            >
              <span>{PERSONAL_INFO.socials.email}</span>
            </a>

            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white transition-all cursor-pointer border border-white/5 shadow-sm"
              title="Back to top"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Bottom Attribution & Shortcuts */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div className="flex flex-wrap items-center gap-3">
            <span>© {currentYear} Lakshya Mudgal.</span>
            <span className="hidden sm:inline text-slate-700">•</span>
            <div className="flex items-center gap-2 text-slate-400">
              <button
                type="button"
                onClick={() => setIsShortcutsOpen(true)}
                className="hover:text-sky-400 transition-colors flex items-center gap-1 cursor-pointer"
                title="View Keyboard Shortcuts"
              >
                <span>Press</span>
                <kbd className="px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/10 text-[10px] text-slate-300 font-mono">?</kbd>
                <span>for shortcuts</span>
              </button>
              <span className="text-slate-700">•</span>
              <button
                type="button"
                onClick={() => setIsTerminalOpen(true)}
                className="hover:text-emerald-400 transition-colors flex items-center gap-1 cursor-pointer"
                title="Launch Developer Terminal"
              >
                <span>Press</span>
                <kbd className="px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/10 text-[10px] text-slate-300 font-mono">~</kbd>
                <span>for terminal</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span>Next.js • TypeScript • Tailwind</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
