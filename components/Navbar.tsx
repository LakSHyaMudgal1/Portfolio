"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Command, ArrowUpRight, Sparkles, Cpu, Terminal as TerminalIcon, RotateCcw, Briefcase, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from "@/components/Icons";
import { PERSONAL_INFO } from "@/lib/data";
import { usePortfolio } from "@/context/PortfolioContext";
import { ExperienceSwitcher } from "./ExperienceSwitcher";
import { useScrollLock } from "@/hooks/useScrollLock";

const NAV_ITEMS = [
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Algorithms", href: "#problem-solving" },
  { label: "Honors", href: "#achievements" },
  { label: "Open Source", href: "#open-source" },
  { label: "Stack", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export function Navbar({ onOpenCommandPalette }: { onOpenCommandPalette?: () => void }) {
  const { 
    mode, 
    setMode, 
    changeModeWithTransition,
    setIsCommandPaletteOpen, 
    setIsTerminalOpen, 
    setIsResumeDrawerOpen 
  } = usePortfolio();

  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [logoHoverCount, setLogoHoverCount] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      // Scroll progress percentage
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (height > 0) {
        setScrollProgress((winScroll / height) * 100);
      }

      // Active section detection
      const sections = NAV_ITEMS.map((item) => item.href.substring(1));
      let current = "";
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            current = section;
            break;
          }
        }
      }
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Use centralized scroll locking and Escape key handling for mobile menu
  useScrollLock(isMobileMenuOpen);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isMobileMenuOpen]);

  const handleOpenPalette = () => {
    if (onOpenCommandPalette) onOpenCommandPalette();
    else setIsCommandPaletteOpen(true);
  };

  return (
    <>
      {/* Top minimal scroll progress line */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-[60] bg-white/5 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-sky-400 via-indigo-400 to-emerald-400 transition-all duration-75 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "py-2.5 bg-[#050608]/94 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl shadow-black/40"
            : "py-4 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Left with Hidden Discovery Easter Egg */}
          <div
            className="flex items-center gap-3 group relative cursor-pointer"
            onMouseEnter={() => {
              setLogoHoverCount((c) => c + 1);
              if (logoHoverCount >= 2) setShowEasterEgg(true);
            }}
            onMouseLeave={() => setTimeout(() => setShowEasterEgg(false), 2000)}
          >
            <a
              href="#"
              className="flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-lg p-1"
            >
              <div className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center font-mono font-bold text-sm tracking-wider text-white group-hover:border-sky-400/50 group-hover:bg-sky-500/10 transition-colors shadow-sm">
                L
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-xs sm:text-sm tracking-widest font-semibold text-white group-hover:text-sky-300 transition-colors">
                  LAKSHYA MUDGAL
                </span>
                <span className="text-[10px] font-mono text-slate-400 tracking-wider">
                  FINAL-YEAR IT • IIIT UNA &apos;26
                </span>
              </div>
            </a>

            {/* Easter Egg Tooltip */}
            <AnimatePresence>
              {showEasterEgg && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-full left-0 mt-2 px-2.5 py-1 rounded-md bg-[#0c101c] border border-sky-400/30 text-[10px] font-mono text-sky-300 shadow-xl whitespace-nowrap z-50 pointer-events-none"
                >
                  ⚡ Systems &amp; Distributed Architecture Enthusiast
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Adaptive Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 rounded-full px-3 py-1 bg-white/[0.03] border border-white/[0.07] backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
            {mode === "engineering" ? (
              <div className="flex items-center gap-1 text-xs font-mono">
                <span className="px-2.5 py-1 text-sky-400 font-semibold flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>ENG MODE</span>
                </span>
                <a href="#projects" className="px-3 py-1 text-slate-300 hover:text-white transition-colors">
                  Architecture
                </a>
                <a href="#skills" className="px-3 py-1 text-slate-300 hover:text-white transition-colors">
                  Tech Graph
                </a>
                <a href="#problem-solving" className="px-3 py-1 text-slate-300 hover:text-white transition-colors">
                  Algorithms
                </a>
              </div>
            ) : mode === "recruiter" ? (
              <div className="flex items-center gap-1 text-xs font-mono">
                <span className="px-2.5 py-1 text-amber-400 font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>RECRUITER VIEW</span>
                </span>
                <button
                  type="button"
                  onClick={() => setIsResumeDrawerOpen(true)}
                  className="px-2.5 py-1 text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  Resume
                </button>
                <button
                  type="button"
                  onClick={() => setMode("explore")}
                  className="px-2.5 py-1 text-sky-400 hover:text-sky-300 transition-colors cursor-pointer flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Explore Mode</span>
                </button>
              </div>
            ) : (
              NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className={`relative px-3 py-1 text-xs font-mono uppercase tracking-wider transition-colors duration-200 rounded-full ${
                      isActive ? "text-white font-medium" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute inset-0 bg-white/10 rounded-full border border-white/15 shadow-sm"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </a>
                );
              })
            )}
          </nav>

          {/* Mode Switcher & Actions Right */}
          <div className="flex items-center gap-2.5">
            {/* The Unified Experience Switcher */}
            <ExperienceSwitcher />

            {/* Terminal Easter Egg Quick Launch */}
            <button
              type="button"
              onClick={() => setIsTerminalOpen(true)}
              className="hidden sm:flex p-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-slate-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-all cursor-pointer shadow-sm"
              title="Open Terminal Console (~ or `)"
              aria-label="Open terminal console"
            >
              <TerminalIcon className="w-3.5 h-3.5" />
            </button>

            {/* Command Palette Trigger */}
            <button
              type="button"
              onClick={handleOpenPalette}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-slate-400 hover:text-white hover:border-white/20 transition-all cursor-pointer shadow-sm"
              title="Open command palette (Ctrl+K or ⌘K)"
              aria-label="Open command palette"
            >
              <Command className="w-3.5 h-3.5" />
              <span className="text-[10px] text-slate-500">⌘K</span>
            </button>
          </div>

          {/* Mobile Menu & Command button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={handleOpenPalette}
              className="p-2 rounded-lg bg-white/[0.05] border border-white/10 text-slate-400 hover:text-white cursor-pointer"
              aria-label="Open command palette"
            >
              <Command className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-white/[0.05] border border-white/10 text-slate-300 hover:text-white focus:outline-none cursor-pointer"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-x-0 top-[60px] max-h-[calc(100dvh-60px)] overflow-y-auto overscroll-contain z-50 bg-[#050608]/98 backdrop-blur-2xl border-b border-white/10 p-6 md:hidden shadow-2xl touch-auto"
            >
              {/* Experience Switcher on Mobile */}
              <div className="mb-5 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-2.5 flex items-center justify-between">
                  <span>EXPERIENCE VIEWPORT</span>
                  <span className="text-sky-400">{mode.toUpperCase()} ACTIVE</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      changeModeWithTransition("explore");
                      setIsMobileMenuOpen(false);
                    }}
                    className={`p-2 rounded-xl text-center flex flex-col items-center gap-1 transition-all ${
                      mode === "explore"
                        ? "bg-sky-500/15 border border-sky-400/40 text-sky-300"
                        : "bg-white/[0.03] border border-white/[0.06] text-slate-400"
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-mono font-medium">Explore</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      changeModeWithTransition("recruiter");
                      setIsMobileMenuOpen(false);
                    }}
                    className={`p-2 rounded-xl text-center flex flex-col items-center gap-1 transition-all ${
                      mode === "recruiter"
                        ? "bg-amber-500/15 border border-amber-400/40 text-amber-300"
                        : "bg-white/[0.03] border border-white/[0.06] text-slate-400"
                    }`}
                  >
                    <Briefcase className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-mono font-medium">Recruiter</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      changeModeWithTransition("engineering");
                      setIsMobileMenuOpen(false);
                    }}
                    className={`p-2 rounded-xl text-center flex flex-col items-center gap-1 transition-all ${
                      mode === "engineering"
                        ? "bg-cyan-500/15 border border-cyan-400/40 text-cyan-300"
                        : "bg-white/[0.03] border border-white/[0.06] text-slate-400"
                    }`}
                  >
                    <Cpu className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-mono font-medium">Engine</span>
                  </button>
                </div>
              </div>

              <nav className="flex flex-col gap-2">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between text-base font-mono uppercase tracking-wider text-slate-300 hover:text-sky-400 py-2.5 border-b border-white/5 active:text-white"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-4 h-4 text-slate-500" />
                  </a>
                ))}
              </nav>

              <div className="mt-5 pt-4 border-t border-white/[0.08] space-y-3">
                {/* Social links row */}
                <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-2">Follow</div>
                <div className="flex items-center gap-2 flex-wrap">
                  <a
                    href={PERSONAL_INFO.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300 hover:text-white hover:border-white/25 transition-all cursor-pointer"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                    <ArrowUpRight className="w-3 h-3 text-slate-500" />
                  </a>
                  <a
                    href={PERSONAL_INFO.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300 hover:text-white hover:border-white/25 transition-all cursor-pointer"
                  >
                    <LinkedinIcon className="w-3.5 h-3.5 text-indigo-400" />
                    <span>LinkedIn</span>
                    <ArrowUpRight className="w-3 h-3 text-slate-500" />
                  </a>
                  <a
                    href={PERSONAL_INFO.socials.leetcode}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300 hover:text-white hover:border-white/25 transition-all cursor-pointer"
                  >
                    <LeetcodeIcon className="w-3.5 h-3.5 text-amber-400" />
                    <span>LeetCode</span>
                    <ArrowUpRight className="w-3 h-3 text-slate-500" />
                  </a>
                </div>

                {/* Bottom actions row */}
                <div className="flex items-center justify-between pt-1 text-xs font-mono text-slate-400">
                  <a
                    href={`mailto:${PERSONAL_INFO.socials.email}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-sky-400 hover:text-sky-300 flex items-center gap-1 cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Email Me</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsTerminalOpen(true);
                    }}
                    className="text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <TerminalIcon className="w-3.5 h-3.5" />
                    <span>Terminal</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsResumeDrawerOpen(true);
                    }}
                    className="text-slate-400 hover:text-white cursor-pointer"
                  >
                    Resume
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
