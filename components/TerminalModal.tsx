"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { X, CornerDownLeft } from "lucide-react";
import { PERSONAL_INFO, PROJECTS, EXPERIENCES, SKILL_CATEGORIES } from "@/lib/data";
import { usePortfolio } from "@/context/PortfolioContext";
import { useScrollLock } from "@/hooks/useScrollLock";

interface TerminalHistoryItem {
  id: string;
  command: string;
  output: React.ReactNode;
}

export function TerminalModal() {
  const { isTerminalOpen, setIsTerminalOpen, setMode, setIsResumeDrawerOpen } = usePortfolio();
  useScrollLock(isTerminalOpen);

  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<TerminalHistoryItem[]>([
    {
      id: "init",
      command: "welcome",
      output: (
        <div className="space-y-1 text-slate-300">
          <div className="text-sky-400 font-bold">Lakshya Mudgal — Engineering Console v2.6.0</div>
          <div className="text-slate-400 text-xs">
            Type <span className="text-emerald-400 font-semibold">&apos;help&apos;</span> to inspect available commands, or <span className="text-amber-400 font-semibold">&apos;exit&apos;</span> to close.
          </div>
        </div>
      ),
    },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto focus input when opened
  useEffect(() => {
    if (isTerminalOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isTerminalOpen]);

  // Scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  // Handle ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsTerminalOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setIsTerminalOpen]);

  if (!isTerminalOpen) return null;

  const handleCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();
    if (!cleanCmd) return;

    let outputNode: React.ReactNode = null;

    switch (cleanCmd) {
      case "help":
        outputNode = (
          <div className="space-y-1 text-xs">
            <div className="text-emerald-400 font-semibold mb-1">Available commands:</div>
            <div><span className="text-sky-300 w-28 inline-block font-mono">projects</span> - List 5 selected engineering projects</div>
            <div><span className="text-sky-300 w-28 inline-block font-mono">experience</span> - Show production internship role &amp; stack</div>
            <div><span className="text-sky-300 w-28 inline-block font-mono">skills</span> - Grouped technical skill breakdown</div>
            <div><span className="text-sky-300 w-28 inline-block font-mono">about</span> - Background, education &amp; status</div>
            <div><span className="text-sky-300 w-28 inline-block font-mono">achievements</span> - Hackathon podiums &amp; LeetCode rating</div>
            <div><span className="text-sky-300 w-28 inline-block font-mono">resume</span> - Open interactive resume drawer</div>
            <div><span className="text-sky-300 w-28 inline-block font-mono">recruiter</span> - Switch portfolio to Recruiter Mode</div>
            <div><span className="text-sky-300 w-28 inline-block font-mono">github</span> - Open GitHub profile</div>
            <div><span className="text-sky-300 w-28 inline-block font-mono">linkedin</span> - Open LinkedIn profile</div>
            <div><span className="text-sky-300 w-28 inline-block font-mono">leetcode</span> - Open LeetCode profile</div>
            <div><span className="text-sky-300 w-28 inline-block font-mono">contact</span> - Display email address</div>
            <div><span className="text-sky-300 w-28 inline-block font-mono">clear</span> - Clear terminal session history</div>
            <div><span className="text-sky-300 w-28 inline-block font-mono">exit</span> - Close terminal console</div>
          </div>
        );
        break;

      case "projects":
        outputNode = (
          <div className="space-y-2 text-xs">
            <div className="text-emerald-400 font-semibold">Selected Engineering Work (5 Systems):</div>
            {PROJECTS.map((p) => (
              <div key={p.id} className="pl-2 border-l border-white/10">
                <span className="text-sky-300 font-bold">{`${p.num} // ${p.title}`}</span> ({p.category})
                <div className="text-slate-400 text-[11px]">{p.description}</div>
                <div className="text-slate-500 text-[10px]">Stack: {p.stack.join(", ")}</div>
              </div>
            ))}
          </div>
        );
        break;

      case "experience":
        outputNode = (
          <div className="space-y-2 text-xs">
            <div className="text-emerald-400 font-semibold">Production Software Experience:</div>
            {EXPERIENCES.map((e, idx) => (
              <div key={idx} className="pl-2 border-l border-white/10 space-y-1">
                <span className="text-white font-bold">{e.company}</span> — <span className="text-sky-300">{e.role}</span> ({e.period})
                <div className="text-slate-400 text-[11px]">{e.highlights[0]}</div>
                <div className="text-slate-500 text-[10px]">Tech: {e.technologies.join(", ")}</div>
              </div>
            ))}
          </div>
        );
        break;

      case "skills":
        outputNode = (
          <div className="space-y-1.5 text-xs">
            <div className="text-emerald-400 font-semibold">Core Technical Skills:</div>
            {SKILL_CATEGORIES.map((cat) => (
              <div key={cat.name} className="text-[11px]">
                <span className="text-slate-400 font-mono">{cat.name}:</span>{" "}
                <span className="text-slate-200">{cat.skills.map((s) => s.name).join(", ")}</span>
              </div>
            ))}
          </div>
        );
        break;

      case "about":
        outputNode = (
          <div className="space-y-1 text-xs text-slate-300 leading-relaxed">
            <div><span className="text-sky-300 font-semibold">Name:</span> {PERSONAL_INFO.name}</div>
            <div><span className="text-sky-300 font-semibold">Education:</span> Final-Year B.Tech IT, IIIT Una (Graduating 2026)</div>
            <div><span className="text-sky-300 font-semibold">Focus:</span> Full-Stack Systems, Real-time Architectures, Distributed APIs</div>
            <div><span className="text-sky-300 font-semibold">Status:</span> {PERSONAL_INFO.status}</div>
          </div>
        );
        break;

      case "achievements":
        outputNode = (
          <div className="space-y-1 text-xs text-slate-300">
            <div>• <span className="text-amber-400 font-bold">LeetCode Knight (1910 rating):</span> 1058+ problems solved, top 5% globally</div>
            <div>• <span className="text-emerald-400 font-bold">Hack 5.0 (NIT Hamirpur):</span> 2nd Position &amp; Best Use of GitHub Award</div>
            <div>• <span className="text-sky-300 font-bold">Hack The Hills:</span> 3rd Position</div>
            <div>• <span className="text-purple-300 font-bold">Open Source:</span> Meshery (CNCF) &amp; Juspay merged PRs</div>
          </div>
        );
        break;

      case "resume":
        setIsResumeDrawerOpen(true);
        outputNode = <div className="text-emerald-400 text-xs">Opening interactive resume drawer...</div>;
        break;

      case "recruiter":
        setMode("recruiter");
        setIsTerminalOpen(false);
        return;

      case "github":
        window.open(PERSONAL_INFO.socials.github, "_blank");
        outputNode = (
          <div className="text-sky-300 text-xs">
            Opening <a href={PERSONAL_INFO.socials.github} target="_blank" rel="noopener noreferrer" className="underline">{PERSONAL_INFO.socials.github}</a>
          </div>
        );
        break;

      case "linkedin":
        window.open(PERSONAL_INFO.socials.linkedin, "_blank");
        outputNode = (
          <div className="text-sky-300 text-xs">
            Opening <a href={PERSONAL_INFO.socials.linkedin} target="_blank" rel="noopener noreferrer" className="underline">{PERSONAL_INFO.socials.linkedin}</a>
          </div>
        );
        break;

      case "leetcode":
        window.open(PERSONAL_INFO.socials.leetcode, "_blank");
        outputNode = (
          <div className="text-sky-300 text-xs">
            Opening <a href={PERSONAL_INFO.socials.leetcode} target="_blank" rel="noopener noreferrer" className="underline">{PERSONAL_INFO.socials.leetcode}</a>
          </div>
        );
        break;

      case "contact":
        outputNode = (
          <div className="space-y-1 text-xs text-slate-300">
            <div>Email: <a href={`mailto:${PERSONAL_INFO.socials.email}`} className="text-sky-400 underline">{PERSONAL_INFO.socials.email}</a></div>
          </div>
        );
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      case "exit":
        setIsTerminalOpen(false);
        return;

      default:
        outputNode = (
          <div className="text-rose-400 text-xs">
            command not found: {cmd}. Type &apos;help&apos; for list of commands.
          </div>
        );
    }

    setHistory((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        command: cmd,
        output: outputNode,
      },
    ]);
    setInputVal("");
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[125] flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsTerminalOpen(false)}
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
        aria-hidden="true"
      />

      {/* Terminal Window */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.2 }}
        data-lenis-prevent="true"
        className="relative w-full max-w-2xl h-[480px] max-h-[85dvh] rounded-3xl bg-[#07090e] border border-white/15 shadow-2xl z-10 flex flex-col overflow-hidden font-mono overscroll-contain"
      >
        {/* Window Chrome Titlebar */}
        <div className="px-5 py-3.5 bg-[#0b0e16] border-b border-white/[0.08] flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            <span className="text-xs text-slate-400 ml-2 font-medium">lakshya@portfolio: ~ (bash)</span>
          </div>

          <button
            type="button"
            onClick={() => setIsTerminalOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close terminal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Terminal Screen Output Area */}
        <div
          ref={scrollRef}
          data-lenis-prevent="true"
          className="flex-1 p-5 overflow-y-auto overscroll-contain space-y-4 text-xs text-slate-200"
        >
          {history.map((item) => (
            <div key={item.id} className="space-y-1.5">
              <div className="flex items-center gap-2 text-slate-400">
                <span className="text-emerald-400">lakshya@portfolio:~$</span>
                <span className="text-white font-semibold">{item.command}</span>
              </div>
              <div className="pl-4">{item.output}</div>
            </div>
          ))}
        </div>

        {/* Command Input Row */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCommand(inputVal);
          }}
          className="px-5 py-3 bg-[#0a0d14] border-t border-white/[0.08] flex items-center gap-2"
        >
          <span className="text-emerald-400 text-xs font-bold">lakshya@portfolio:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type 'help' or any command..."
            className="flex-1 bg-transparent text-xs text-white focus:outline-none placeholder:text-slate-600 font-mono"
          />
          <button
            type="submit"
            className="p-1 rounded text-slate-500 hover:text-slate-300 transition-colors"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </form>
      </motion.div>
    </div>
  );
}
