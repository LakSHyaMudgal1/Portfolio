"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { 
  Award, 
  Briefcase, 
  Check, 
  Code, 
  Copy, 
  Cpu, 
  FileText,
  GitCompare,
  GraduationCap, 
  Keyboard,
  Layers, 
  Mail, 
  RotateCcw,
  Search, 
  Sparkles,
  Terminal
} from "lucide-react";
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from "@/components/Icons";
import { PERSONAL_INFO } from "@/lib/data";
import { usePortfolio } from "@/context/PortfolioContext";
import { useScrollLock } from "@/hooks/useScrollLock";

interface CommandItem {
  id: string;
  title: string;
  category: "Mode" | "Tool" | "Navigation" | "Action" | "Social";
  icon: React.ElementType;
  action: () => void;
  shortcut?: string;
  keywords?: string[];
}

export function CommandPalette({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;
  return <CommandPaletteModal onClose={onClose} />;
}

function CommandPaletteModal({ onClose }: { onClose: () => void }) {
  useScrollLock(true);

  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const {
    mode,
    changeModeWithTransition,
    setIsTerminalOpen,
    setIsResumeDrawerOpen,
    setIsCompareOpen,
    setIsShortcutsOpen,
  } = usePortfolio();

  const navigateTo = (hash: string) => {
    onClose();
    if (mode === "recruiter") {
      changeModeWithTransition("explore");
    }
    setTimeout(() => {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.socials.email);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      onClose();
    }, 1200);
  };

  const openUrl = (url: string) => {
    onClose();
    window.open(url, "_blank");
  };

  const commands: CommandItem[] = [
    // Modes
    {
      id: "mode-recruiter",
      title: "Activate Recruiter Mode (High-Density View)",
      category: "Mode",
      icon: Sparkles,
      action: () => {
        changeModeWithTransition("recruiter");
        onClose();
      },
      shortcut: "Recruiter",
      keywords: ["recruiter", "hire", "eval", "summary", "quick"],
    },
    {
      id: "mode-engineering",
      title: "Activate Engineering Mode (Deep Architecture & Telemetry)",
      category: "Mode",
      icon: Cpu,
      action: () => {
        changeModeWithTransition("engineering");
        onClose();
      },
      shortcut: "Eng Mode",
      keywords: ["engineering", "architecture", "deep", "technical", "telemetry"],
    },
    {
      id: "mode-explore",
      title: "Activate Explore Mode (Standard Experience)",
      category: "Mode",
      icon: RotateCcw,
      action: () => {
        changeModeWithTransition("explore");
        onClose();
      },
      shortcut: "Explore",
      keywords: ["explore", "default", "normal", "story"],
    },

    // Interactive Tools & Overlays
    {
      id: "tool-terminal",
      title: "Open Developer Terminal Console (Easter Egg)",
      category: "Tool",
      icon: Terminal,
      action: () => {
        onClose();
        setIsTerminalOpen(true);
      },
      shortcut: "~",
      keywords: ["terminal", "bash", "cli", "shell", "console", "easter"],
    },
    {
      id: "tool-compare",
      title: "Compare Projects Side-by-Side",
      category: "Tool",
      icon: GitCompare,
      action: () => {
        onClose();
        setIsCompareOpen(true);
      },
      shortcut: "Compare",
      keywords: ["compare", "diff", "matrix", "cargoxpress", "tabtrack", "scheduler", "tlb"],
    },
    {
      id: "tool-resume",
      title: "Explore Interactive Resume Drawer",
      category: "Tool",
      icon: FileText,
      action: () => {
        onClose();
        setIsResumeDrawerOpen(true);
      },
      shortcut: "R",
      keywords: ["resume", "cv", "experience", "education", "pdf"],
    },
    {
      id: "tool-shortcuts",
      title: "Show Global Keyboard Shortcuts",
      category: "Tool",
      icon: Keyboard,
      action: () => {
        onClose();
        setIsShortcutsOpen(true);
      },
      shortcut: "?",
      keywords: ["shortcuts", "keys", "hotkeys", "help"],
    },

    // Navigation
    {
      id: "nav-projects",
      title: "Jump to Selected Work (CargoXpress, TabTrack, OS Scheduler, TLB, ChatMate)",
      category: "Navigation",
      icon: Layers,
      action: () => navigateTo("#projects"),
      shortcut: "3",
      keywords: ["projects", "cargoxpress", "tabtrack", "scheduler", "tlb", "chatmate", "mobile", "work"],
    },
    {
      id: "nav-experience",
      title: "Jump to Experience (Infinito Comics)",
      category: "Navigation",
      icon: Briefcase,
      action: () => navigateTo("#experience"),
      shortcut: "2",
      keywords: ["experience", "work", "job", "internship", "infinito"],
    },
    {
      id: "nav-problem-solving",
      title: "Jump to Problem Solving (LeetCode Knight 1910)",
      category: "Navigation",
      icon: Code,
      action: () => navigateTo("#problem-solving"),
      shortcut: "C",
      keywords: ["leetcode", "problems", "algorithms", "dsa", "knight", "competitive"],
    },
    {
      id: "nav-achievements",
      title: "Jump to Hackathons & Honors",
      category: "Navigation",
      icon: Award,
      action: () => navigateTo("#achievements"),
      shortcut: "5",
      keywords: ["achievements", "hackathon", "hack 5.0", "podium", "awards"],
    },
    {
      id: "nav-skills",
      title: "Jump to Engineering Stack & Tools",
      category: "Navigation",
      icon: Terminal,
      action: () => navigateTo("#skills"),
      shortcut: "4",
      keywords: ["skills", "stack", "languages", "cpp", "node", "react"],
    },
    {
      id: "nav-about",
      title: "Jump to About & Education (IIIT Una)",
      category: "Navigation",
      icon: GraduationCap,
      action: () => navigateTo("#about"),
      shortcut: "1",
      keywords: ["about", "education", "college", "iiit", "una", "btech"],
    },
    {
      id: "nav-contact",
      title: "Jump to Contact Form",
      category: "Navigation",
      icon: Mail,
      action: () => navigateTo("#contact"),
      shortcut: "6",
      keywords: ["contact", "email", "message", "reach"],
    },

    // Actions & Socials
    {
      id: "act-download-resume",
      title: "Download Resume PDF",
      category: "Action",
      icon: FileText,
      action: () => {
        onClose();
        const a = document.createElement("a");
        a.href = "/resume.pdf";
        a.download = "Lakshya_Mudgal_Resume.pdf";
        a.click();
      },
      shortcut: "PDF",
      keywords: ["download", "pdf", "cv", "resume"],
    },
    {
      id: "act-copy-email",
      title: copied ? "Email Copied!" : "Copy Email to Clipboard",
      category: "Action",
      icon: copied ? Check : Copy,
      action: copyEmail,
      shortcut: "Email",
      keywords: ["email", "copy", "clipboard"],
    },
    {
      id: "soc-github",
      title: "Open GitHub (@LakSHyaMudgal1)",
      category: "Social",
      icon: GithubIcon,
      action: () => openUrl(PERSONAL_INFO.socials.github),
      shortcut: "G",
      keywords: ["github", "code", "repo", "git"],
    },
    {
      id: "soc-linkedin",
      title: "Open LinkedIn (@lakshya-mudgal-ba149728a)",
      category: "Social",
      icon: LinkedinIcon,
      action: () => openUrl(PERSONAL_INFO.socials.linkedin),
      shortcut: "L",
      keywords: ["linkedin", "network", "connect"],
    },
    {
      id: "soc-leetcode",
      title: "Open LeetCode (@luxmdgl1403)",
      category: "Social",
      icon: LeetcodeIcon,
      action: () => openUrl(PERSONAL_INFO.socials.leetcode),
      shortcut: "LC",
      keywords: ["leetcode", "competitive", "dsa", "luxmdgl1403"],
    },
    {
      id: "soc-email",
      title: "Email Lakshya (lakshyawork14@gmail.com)",
      category: "Social",
      icon: Mail,
      action: () => {
        onClose();
        window.open(`mailto:${PERSONAL_INFO.socials.email}`, "_self");
      },
      shortcut: "E",
      keywords: ["email", "mail", "contact", "lakshyawork14"],
    },
  ];

  // Fuzzy search filter
  const cleanQ = query.trim().toLowerCase();
  const filteredCommands = commands.filter((cmd) => {
    if (!cleanQ) return true;
    if (cmd.title.toLowerCase().includes(cleanQ)) return true;
    if (cmd.category.toLowerCase().includes(cleanQ)) return true;
    if (cmd.shortcut?.toLowerCase().includes(cleanQ)) return true;
    if (cmd.keywords?.some((k) => k.toLowerCase().includes(cleanQ))) return true;
    return false;
  });

  // Focus input on open
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Automatically scroll selected item into view when navigating via keyboard
  useEffect(() => {
    if (itemRefs.current[selectedIndex]) {
      itemRefs.current[selectedIndex]?.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  // Keyboard navigation inside list
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
      }
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[120] flex items-start justify-center pt-12 sm:pt-20 px-4 overscroll-contain"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
        aria-hidden="true"
      />

      {/* Palette Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: -10 }}
        transition={{ duration: 0.15 }}
        data-lenis-prevent="true"
        className="relative w-full max-w-2xl bg-[#090b11] border border-white/15 rounded-3xl shadow-2xl overflow-hidden z-10 font-sans"
        onKeyDown={handleKeyDown}
      >
        {/* Top hairline accent */}
        <div className="absolute top-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-sky-400/40 to-transparent pointer-events-none" />

        {/* Input Bar */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-white/[0.08]">
          <Search className="w-5 h-5 text-sky-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command or search (e.g. 'recruiter', 'projects', 'terminal')..."
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none font-light"
          />
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-slate-400 bg-white/[0.06] rounded border border-white/10 shrink-0">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div data-lenis-prevent="true" className="max-h-[min(55vh,380px)] overflow-y-auto overscroll-contain p-2 font-sans">
          {filteredCommands.length === 0 ? (
            <div className="py-12 text-center text-sm font-mono text-slate-500">
              No matching commands found.
            </div>
          ) : (
            filteredCommands.map((cmd, index) => {
              const isSelected = index === selectedIndex;
              const Icon = cmd.icon;
              return (
                <button
                  key={cmd.id}
                  ref={(el) => { itemRefs.current[index] = el; }}
                  type="button"
                  onClick={cmd.action}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-2xl text-left transition-all cursor-pointer ${
                    isSelected
                      ? "bg-white/[0.08] text-white shadow-sm"
                      : "text-slate-300 hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border ${
                        isSelected
                          ? "bg-sky-500/20 border-sky-400/40 text-sky-300"
                          : "bg-white/[0.03] border-white/[0.06] text-slate-400"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs sm:text-sm font-medium truncate">{cmd.title}</div>
                      <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">{cmd.category}</div>
                    </div>
                  </div>

                  {cmd.shortcut && (
                    <kbd className="px-2 py-0.5 text-[10px] font-mono text-slate-400 bg-white/[0.04] rounded border border-white/10 shrink-0">
                      {cmd.shortcut}
                    </kbd>
                  )}
                </button>
              );
            })
          )}
        </div>

        {/* Footer Hints */}
        <div className="px-6 py-3 bg-[#06070a] border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-500">
          <div className="flex items-center gap-4">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span className="hidden sm:inline">Ctrl+K / ⌘K anytime</span>
        </div>
      </motion.div>
    </div>
  );
}
