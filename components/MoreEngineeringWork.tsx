"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowUpRight, 
  Code2, 
  Cpu, 
  MessageSquare, 
  Share2, 
  Terminal, 
  Video, 
  X,
  Check
} from "lucide-react";
import { ChromeIcon, GithubIcon } from "@/components/Icons";
import { SECONDARY_PROJECTS, SecondaryProject } from "@/lib/data";
import { useScrollLock } from "@/hooks/useScrollLock";

type FilterType = "ALL" | "FULL-STACK" | "SYSTEMS" | "ALGORITHMS";

const FILTERS: FilterType[] = ["ALL", "FULL-STACK", "SYSTEMS", "ALGORITHMS"];

export function MoreEngineeringWork() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("ALL");
  const [selectedProject, setSelectedProject] = useState<SecondaryProject | null>(null);

  const filteredProjects = SECONDARY_PROJECTS.filter((proj) => {
    if (activeFilter === "ALL") return true;
    return proj.filterCategories?.includes(activeFilter) ?? false;
  });

  return (
    <div className="mt-32 md:mt-44 pt-20 border-t border-white/[0.08] relative">
      {/* Subtle section header for More Engineering Work */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2.5 text-[11px] font-mono tracking-[0.16em] uppercase text-slate-400 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
            <span>MORE ENGINEERING WORK // SYSTEMS &amp; WORKSPACES</span>
          </div>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Breadth across systems &amp; platforms.
          </h3>
          <p className="mt-3 text-base text-slate-400 max-w-2xl font-light">
            Specialized architectures spanning collaborative workspaces, operating system schedulers, and computer architecture hardware simulations.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.03] border border-white/[0.08] self-start md:self-auto overflow-x-auto no-scrollbar max-w-full">
          {FILTERS.map((f) => {
            const isActive = activeFilter === f;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setActiveFilter(f)}
                className={`relative px-3.5 py-1.5 text-xs font-mono tracking-wider rounded-lg transition-colors cursor-pointer shrink-0 ${
                  isActive ? "text-white font-medium" : "text-slate-400 hover:text-slate-200"
                }`}
                aria-pressed={isActive}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeSecondaryFilter"
                    className="absolute inset-0 bg-white/10 rounded-lg border border-white/15"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{f}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Asymmetric Gallery Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => {
            if (project.id === "tabtrack") {
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4 }}
                  className="md:col-span-12"
                >
                  <TabtrackCard
                    project={project}
                    onOpenDetails={() => setSelectedProject(project)}
                  />
                </motion.div>
              );
            }

            if (project.id === "os-scheduler") {
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4 }}
                  className="md:col-span-6"
                >
                  <OsSchedulerCard
                    project={project}
                    onOpenDetails={() => setSelectedProject(project)}
                  />
                </motion.div>
              );
            }

            if (project.id === "tlb-simulator") {
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4 }}
                  className="md:col-span-6"
                >
                  <TlbSimulatorCard
                    project={project}
                    onOpenDetails={() => setSelectedProject(project)}
                  />
                </motion.div>
              );
            }

            return null;
          })}
        </AnimatePresence>
      </motion.div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailsModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* =========================================================================
   CARD 1: TABTRACK (Large Asymmetric Horizontal Card)
   ========================================================================= */
function TabtrackCard({
  project,
  onOpenDetails,
}: {
  project: SecondaryProject;
  onOpenDetails: () => void;
}) {
  const [activeTab, setActiveTab] = useState<"workspace" | "extension">("workspace");

  return (
    <article className="relative rounded-3xl bg-[#08090d] border border-white/[0.08] hover:border-white/20 transition-all duration-300 p-6 sm:p-9 lg:p-10 shadow-2xl overflow-hidden group">
      {/* Top subtle hairline highlight */}
      <div className="absolute top-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-indigo-400/25 to-transparent pointer-events-none" />

      {/* Top Meta Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-7 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 font-semibold tracking-wider">
            PROJECT // {project.num}
          </span>
          <span className="text-xs font-mono text-slate-400">
            {project.category}
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>COLLABORATIVE WORKSPACE &amp; CHROME EXTENSION</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left Narrative Column */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div>
            <h4 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2 group-hover:text-indigo-200 group-hover:translate-x-1 transition-all">
              {project.title}
            </h4>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light mb-5">
              {project.description}
            </p>

            {/* Documented Capabilities Pill Badges */}
            <div className="space-y-2 mb-6">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block font-semibold">
                DOCUMENTED CAPABILITIES
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "Collaborative Rooms",
                  "Video Calling",
                  "Real-time Code Editor",
                  "Live Chat",
                  "Screen Sharing",
                  "Persistent History",
                  "Web Activity Time Tracker (Manifest V3)",
                  "Timetable Functionality",
                  "Global Search",
                  "Invitations & Profiles",
                ].map((cap) => (
                  <span
                    key={cap}
                    className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/[0.03] border border-white/[0.06] text-slate-300 hover:border-white/15 transition-colors"
                  >
                    {cap}
                  </span>
                ))}
              </div>
            </div>

            {/* Tech Stack Chips */}
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-indigo-500/10 border border-indigo-500/20 text-indigo-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-primary-tactile px-5 py-2.5 rounded-xl text-xs font-mono flex items-center gap-2 cursor-pointer group/btn"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>View on GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-600 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </a>

            <button
              type="button"
              onClick={onOpenDetails}
              className="btn-secondary-tactile px-4 py-2.5 rounded-xl text-xs font-mono text-slate-300 hover:text-white cursor-pointer"
            >
              Inspect Architecture
            </button>
          </div>
        </div>

        {/* Right Interactive Mini Product Visualization */}
        <div className="lg:col-span-7 flex flex-col space-y-3">
          {/* Sub-view switcher */}
          <div className="flex items-center justify-between px-1 text-xs font-mono">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
              PRODUCT VISUALIZATION
            </span>
            <div className="flex items-center gap-1 p-0.5 rounded-lg bg-white/[0.04] border border-white/[0.08]">
              <button
                type="button"
                onClick={() => setActiveTab("workspace")}
                className={`px-2.5 py-1 rounded text-[11px] transition-colors cursor-pointer ${
                  activeTab === "workspace"
                    ? "bg-white/10 text-white font-medium"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Workspace Room
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("extension")}
                className={`px-2.5 py-1 rounded text-[11px] transition-colors cursor-pointer ${
                  activeTab === "extension"
                    ? "bg-white/10 text-white font-medium"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Web Activity Extension (MV3)
              </button>
            </div>
          </div>

          {/* Visual Canvas Box */}
          <div className="rounded-2xl bg-[#0b0e16] border border-white/[0.08] p-4 sm:p-5 shadow-inner relative overflow-hidden group-hover:border-white/15 transition-colors">
            {activeTab === "workspace" ? (
              <div className="space-y-3">
                {/* Room Top Bar with 4 Animated Indicators */}
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-white font-medium">Room #engineering-sync</span>
                    <span className="text-slate-500 hidden sm:inline">• Persistent Room</span>
                  </div>

                  {/* 4 Animated Indicators: Video, Code, Chat, Screen Share */}
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="flex items-center gap-1 text-[10px] text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                      <Video className="w-3 h-3 animate-pulse" />
                      <span>Video</span>
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
                      <Code2 className="w-3 h-3 animate-bounce" />
                      <span>Code</span>
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                      <MessageSquare className="w-3 h-3" />
                      <span>Chat</span>
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      <Share2 className="w-3 h-3" />
                      <span className="hidden sm:inline">Screen</span>
                    </span>
                  </div>
                </div>

                {/* 2-Quadrant Composition */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Quadrant 1: Video Call & Active Users */}
                  <div className="rounded-xl bg-[#0e121d] border border-white/[0.06] p-3.5 space-y-2.5">
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span>Live Video Call</span>
                      <span className="text-emerald-400 text-[10px]">Active • 3 Peers</span>
                    </div>

                    <div className="h-28 rounded-lg bg-black/40 border border-white/5 flex flex-col items-center justify-center relative overflow-hidden">
                      <div className="w-9 h-9 rounded-full bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center font-mono font-bold text-xs text-indigo-300 mb-1">
                        LM
                      </div>
                      <span className="text-[11px] font-mono text-slate-300">Lakshya Mudgal (Host)</span>
                      <div className="absolute bottom-2 left-2 flex items-center gap-1 text-[9px] font-mono text-emerald-400 bg-black/60 px-1.5 py-0.5 rounded">
                        <Share2 className="w-2.5 h-2.5" />
                        <span>Screen Sharing Active</span>
                      </div>
                    </div>
                  </div>

                  {/* Quadrant 2: Synchronized Live Code Editor */}
                  <div className="rounded-xl bg-[#0e121d] border border-white/[0.06] p-3.5 space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span>Real-time Code Editor</span>
                      <span className="text-sky-400 text-[10px]">Socket.IO sync</span>
                    </div>

                    <div className="h-28 rounded-lg bg-black/40 border border-white/5 p-2 font-mono text-[10px] text-slate-300 leading-snug overflow-hidden select-none">
                      <div className="text-slate-500">&#47;&#47; Synchronized collaborative workspace</div>
                      <div>
                        <span className="text-purple-400">function</span>{" "}
                        <span className="text-sky-300">broadcastSync</span>(delta) &#123;
                      </div>
                      <div className="pl-2">
                        socket.<span className="text-amber-300">emit</span>(
                        <span className="text-emerald-300">&quot;code:stream&quot;</span>, delta);
                      </div>
                      <div>&#125;</div>
                      <div className="flex items-center gap-1 text-slate-400 mt-1">
                        <span className="w-1.5 h-3 bg-sky-400 animate-pulse" />
                        <span>Peer editing workspace...</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Row: Chat & Active Users / History */}
                <div className="p-3 rounded-xl bg-[#0e121d] border border-white/[0.06] flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2 text-slate-300">
                    <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
                    <span className="text-[11px]">Chat Feed: &quot;Code session synced to room history&quot;</span>
                  </div>
                  <span className="text-[10px] text-slate-500">Persistent Chat History</span>
                </div>
              </div>
            ) : (
              /* Chrome MV3 Web Activity Extension Preview */
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <ChromeIcon className="w-4 h-4 text-sky-400" />
                    <span className="text-white font-medium">Web Activity Time Tracker</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Manifest V3 Extension
                  </span>
                </div>

                <div className="space-y-2.5">
                  <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between">
                    <span>Automated web browsing telemetry:</span>
                    <span className="text-slate-500 text-[10px]">Synced to Analytics Dashboard</span>
                  </div>

                  {/* Usage Bars */}
                  {[
                    { site: "github.com", time: "3h 42m", pct: "75%", color: "bg-sky-400" },
                    { site: "developer.mozilla.org", time: "1h 15m", pct: "30%", color: "bg-indigo-400" },
                    { site: "leetcode.com", time: "2h 10m", pct: "55%", color: "bg-amber-400" },
                  ].map((row) => (
                    <div key={row.site} className="space-y-1">
                      <div className="flex justify-between text-[11px] font-mono">
                        <span className="text-slate-300">{row.site}</span>
                        <span className="text-slate-400">{row.time}</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <div className={`h-full rounded-full ${row.color}`} style={{ width: row.pct }} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 text-[10px] font-mono text-slate-500 flex items-center justify-between">
                  <span>Background Service Worker Engine</span>
                  <span>Dashboard Productivity Analytics</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

/* =========================================================================
   CARD 2: OS SCHEDULER (Medium Card - CPU Scheduling Simulation)
   ========================================================================= */
function OsSchedulerCard({
  project,
  onOpenDetails,
}: {
  project: SecondaryProject;
  onOpenDetails: () => void;
}) {
  const [selectedAlgo, setSelectedAlgo] = useState<
    "FCFS" | "SJF" | "SRTF" | "Priority (Preemptive)" | "Priority (Non-Preemptive)"
  >("FCFS");

  return (
    <article className="h-full relative rounded-3xl bg-[#08090d] border border-white/[0.08] hover:border-white/20 transition-all duration-300 p-6 sm:p-8 shadow-2xl flex flex-col justify-between group overflow-hidden">
      {/* Top subtle highlight */}
      <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-sky-400/20 to-transparent pointer-events-none" />

      <div>
        {/* Meta Header */}
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-sky-500/10 border border-sky-500/25 text-sky-400 font-semibold">
              PROJECT // {project.num}
            </span>
            <span className="text-xs font-mono text-slate-400">
              {project.category}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 bg-white/[0.03] px-2 py-0.5 rounded border border-white/[0.06]">
            <Cpu className="w-3.5 h-3.5 text-sky-400" />
            <span>CPU Scheduling</span>
          </div>
        </div>

        {/* Title & Description */}
        <h4 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2 group-hover:text-sky-300 group-hover:translate-x-1 transition-all">
          {project.title}
        </h4>
        <p className="text-slate-300 text-sm leading-relaxed font-light mb-6">
          {project.description}
        </p>

        {/* Interactive Gantt Chart Simulator */}
        <div className="p-4 rounded-2xl bg-[#0b0e16] border border-white/[0.08] mb-6 space-y-3 group-hover:border-white/15 transition-colors">
          {/* Algorithm Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-semibold">
                ALGORITHM:
              </span>
              <span className="text-[10px] font-mono text-sky-300 bg-sky-500/10 px-1.5 py-0.5 rounded">
                {selectedAlgo}
              </span>
            </div>

            {/* Playback Control Indicator */}
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
              <span className="text-[9px] text-slate-500">SPEED 1.0x</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/[0.04] text-slate-300">
                [◀ ❚❚ ▶]
              </span>
            </div>
          </div>

          {/* Algorithm Selection Buttons */}
          <div className="flex flex-wrap items-center gap-1 pb-1">
            {(
              [
                "FCFS",
                "SJF",
                "SRTF",
                "Priority (Preemptive)",
                "Priority (Non-Preemptive)",
              ] as const
            ).map((algo) => (
              <button
                key={algo}
                type="button"
                onClick={() => setSelectedAlgo(algo)}
                className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors cursor-pointer ${
                  selectedAlgo === algo
                    ? "bg-sky-500/20 text-sky-300 border border-sky-500/30 font-medium"
                    : "text-slate-400 hover:text-slate-200 bg-white/[0.02]"
                }`}
              >
                {algo.replace("Priority (", "P-(")}
              </button>
            ))}
          </div>

          {/* Miniature OS Gantt Chart Process Bars */}
          <div className="space-y-2 pt-1 font-mono text-[11px]">
            {selectedAlgo === "FCFS" && (
              <>
                <div className="flex items-center gap-2">
                  <span className="w-6 text-slate-400">P1</span>
                  <div className="w-[30%] bg-sky-500/25 border border-sky-400/50 rounded px-2 py-0.5 text-sky-300 text-[10px]">
                    ━━━ 0 → 4ms
                  </div>
                  <span className="text-[9px] text-slate-500 ml-auto">WT: 0ms | TAT: 4ms</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-6 text-slate-400">P2</span>
                  <div className="w-[50%] bg-indigo-500/25 border border-indigo-400/50 rounded px-2 py-0.5 text-indigo-300 text-[10px]">
                    ━━━━━ 4 → 10ms
                  </div>
                  <span className="text-[9px] text-slate-500 ml-auto">WT: 4ms | TAT: 10ms</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-6 text-slate-400">P3</span>
                  <div className="w-[20%] bg-emerald-500/25 border border-emerald-400/50 rounded px-2 py-0.5 text-emerald-300 text-[10px]">
                    ━━ 10 → 12ms
                  </div>
                  <span className="text-[9px] text-slate-500 ml-auto">WT: 10ms | TAT: 12ms</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-6 text-slate-400">P4</span>
                  <div className="w-[45%] bg-amber-500/25 border border-amber-400/50 rounded px-2 py-0.5 text-amber-300 text-[10px]">
                    ━━━━━ 12 → 17ms
                  </div>
                  <span className="text-[9px] text-slate-500 ml-auto">WT: 12ms | TAT: 17ms</span>
                </div>
              </>
            )}

            {selectedAlgo === "SJF" && (
              <>
                <div className="flex items-center gap-2">
                  <span className="w-6 text-slate-400">P3</span>
                  <div className="w-[20%] bg-emerald-500/25 border border-emerald-400/50 rounded px-2 py-0.5 text-emerald-300 text-[10px]">
                    ━━ Shortest: 0 → 2ms
                  </div>
                  <span className="text-[9px] text-slate-500 ml-auto">WT: 0ms | TAT: 2ms</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-6 text-slate-400">P1</span>
                  <div className="w-[30%] bg-sky-500/25 border border-sky-400/50 rounded px-2 py-0.5 text-sky-300 text-[10px]">
                    ━━━ Burst 4ms: 2 → 6ms
                  </div>
                  <span className="text-[9px] text-slate-500 ml-auto">WT: 2ms | TAT: 6ms</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-6 text-slate-400">P4</span>
                  <div className="w-[45%] bg-amber-500/25 border border-amber-400/50 rounded px-2 py-0.5 text-amber-300 text-[10px]">
                    ━━━━━ Burst 5ms: 6 → 11ms
                  </div>
                  <span className="text-[9px] text-slate-500 ml-auto">WT: 6ms | TAT: 11ms</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-6 text-slate-400">P2</span>
                  <div className="w-[50%] bg-indigo-500/25 border border-indigo-400/50 rounded px-2 py-0.5 text-indigo-300 text-[10px]">
                    ━━━━━ Burst 6ms: 11 → 17ms
                  </div>
                  <span className="text-[9px] text-slate-500 ml-auto">WT: 11ms | TAT: 17ms</span>
                </div>
              </>
            )}

            {(selectedAlgo === "SRTF" || selectedAlgo === "Priority (Preemptive)") && (
              <>
                <div className="flex items-center gap-2">
                  <span className="w-6 text-slate-400">P1</span>
                  <div className="w-[18%] bg-amber-500/25 border border-amber-400/50 rounded px-1.5 py-0.5 text-amber-300 text-[10px]">
                    Preempted @ 2ms
                  </div>
                  <div className="w-[22%] bg-sky-500/25 border border-sky-400/50 rounded px-1.5 py-0.5 text-sky-300 text-[10px]">
                    Resumed @ 6ms
                  </div>
                  <span className="text-[9px] text-slate-500 ml-auto">Preempted context switch</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-6 text-slate-400">P3</span>
                  <div className="w-[28%] bg-emerald-500/25 border border-emerald-400/50 rounded px-2 py-0.5 text-emerald-300 text-[10px]">
                    ━━ High Priority (2 → 6ms)
                  </div>
                  <span className="text-[9px] text-slate-500 ml-auto">WT: 0ms | TAT: 4ms</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-6 text-slate-400">P2</span>
                  <div className="w-[45%] bg-indigo-500/25 border border-indigo-400/50 rounded px-2 py-0.5 text-indigo-300 text-[10px]">
                    ━━━━━ Scheduled @ 8ms
                  </div>
                  <span className="text-[9px] text-slate-500 ml-auto">WT: 8ms | TAT: 14ms</span>
                </div>
              </>
            )}

            {selectedAlgo === "Priority (Non-Preemptive)" && (
              <>
                <div className="flex items-center gap-2">
                  <span className="w-6 text-slate-400">P1</span>
                  <div className="w-[30%] bg-sky-500/25 border border-sky-400/50 rounded px-2 py-0.5 text-sky-300 text-[10px]">
                    Runs to completion (0 → 4ms)
                  </div>
                  <span className="text-[9px] text-slate-500 ml-auto">No preemption</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-6 text-slate-400">P3</span>
                  <div className="w-[25%] bg-emerald-500/25 border border-emerald-400/50 rounded px-2 py-0.5 text-emerald-300 text-[10px]">
                    Highest Priority (4 → 7ms)
                  </div>
                  <span className="text-[9px] text-slate-500 ml-auto">Priority: 1</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-6 text-slate-400">P2</span>
                  <div className="w-[45%] bg-indigo-500/25 border border-indigo-400/50 rounded px-2 py-0.5 text-indigo-300 text-[10px]">
                    Priority: 2 (7 → 13ms)
                  </div>
                  <span className="text-[9px] text-slate-500 ml-auto">Priority: 2</span>
                </div>
              </>
            )}

            {/* Timeline markers underneath */}
            <div className="pt-2 border-t border-white/5 flex justify-between text-[9px] text-slate-500">
              <span>0ms</span>
              <span>4ms</span>
              <span>8ms</span>
              <span>12ms</span>
              <span>16ms</span>
            </div>
          </div>
        </div>

        {/* Tech Stack Chips */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-white/[0.03] border border-white/[0.06] text-slate-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 pt-3 border-t border-white/[0.06]">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="btn-primary-tactile px-4 py-2 rounded-xl text-xs font-mono flex items-center gap-1.5 cursor-pointer group/btn"
        >
          <GithubIcon className="w-3.5 h-3.5" />
          <span>View on GitHub</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-slate-600 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
        </a>

        <button
          type="button"
          onClick={onOpenDetails}
          className="btn-secondary-tactile px-3.5 py-2 rounded-xl text-xs font-mono text-slate-300 hover:text-white cursor-pointer"
        >
          Details
        </button>
      </div>
    </article>
  );
}

/* =========================================================================
   CARD 3: TLB SIMULATOR (Medium Card - Computer Architecture / Systems)
   ========================================================================= */
function TlbSimulatorCard({
  project,
  onOpenDetails,
}: {
  project: SecondaryProject;
  onOpenDetails: () => void;
}) {
  const [activePolicy, setActivePolicy] = useState<"LRU" | "FIFO">("LRU");

  return (
    <article className="h-full relative rounded-3xl bg-[#08090d] border border-white/[0.08] hover:border-white/20 transition-all duration-300 p-6 sm:p-8 shadow-2xl flex flex-col justify-between group overflow-hidden">
      {/* Top subtle highlight */}
      <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-amber-400/20 to-transparent pointer-events-none" />

      <div>
        {/* Meta Header */}
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-amber-500/10 border border-amber-500/25 text-amber-300 font-semibold">
              PROJECT // {project.num}
            </span>
            <span className="text-xs font-mono text-slate-400">
              {project.category}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 bg-white/[0.03] px-2 py-0.5 rounded border border-white/[0.06]">
            <Terminal className="w-3.5 h-3.5 text-amber-400" />
            <span>C++17 Engine</span>
          </div>
        </div>

        {/* Title & Description */}
        <h4 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2 group-hover:text-amber-200 group-hover:translate-x-1 transition-all">
          {project.title}
        </h4>
        <p className="text-slate-300 text-sm leading-relaxed font-light mb-6">
          {project.description}
        </p>

        {/* Translation Lookaside Buffer Architecture Diagram */}
        <div className="p-4 rounded-2xl bg-[#0b0e16] border border-white/[0.08] mb-6 space-y-3 font-mono group-hover:border-white/15 transition-colors">
          {/* Policy selector */}
          <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
              REPLACEMENT POLICY
            </span>
            <div className="flex items-center gap-1">
              {(["LRU", "FIFO"] as const).map((policy) => (
                <button
                  key={policy}
                  type="button"
                  onClick={() => setActivePolicy(policy)}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors cursor-pointer ${
                    activePolicy === policy
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/30 font-medium"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {policy}
                </button>
              ))}
            </div>
          </div>

          {/* Virtual Address Translation Pipeline Flow */}
          <div className="space-y-2 text-[10px]">
            {/* Step 1: Virtual Address */}
            <div className="p-2 rounded bg-black/40 border border-white/5 flex items-center justify-between">
              <span className="text-slate-400">Virtual Address:</span>
              <span className="text-white font-semibold">0x7FFF8A4C</span>
            </div>

            {/* Step 2: Breakdown into VPN + Offset */}
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="p-1.5 rounded bg-sky-500/10 border border-sky-500/20 text-sky-300">
                <span className="text-slate-400 block text-[9px]">VPN (Virtual Page #)</span>
                <span>0x7FFF8</span>
              </div>
              <div className="p-1.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">
                <span className="text-slate-400 block text-[9px]">Offset (4KB Page)</span>
                <span>0xA4C</span>
              </div>
            </div>

            {/* Step 3: TLB Lookup with LRU/FIFO Entries */}
            <div className="p-2 rounded bg-black/40 border border-white/5 space-y-1">
              <div className="flex justify-between text-slate-400">
                <span>Set-Associative TLB (Set #0)</span>
                <span className="text-emerald-400 font-semibold">TLB HIT</span>
              </div>
              <div className="flex justify-between text-slate-300 text-[9px]">
                <span>Tag: 0x7FFF8 → Frame: 0x1A4</span>
                <span className="text-amber-400">{activePolicy} State: Entry #0 (Hot)</span>
              </div>
            </div>

            {/* Step 4: Hit / Miss Branch */}
            <div className="grid grid-cols-2 gap-2 text-center text-[9px]">
              <div className="p-1.5 rounded bg-emerald-500/10 border border-emerald-500/25 text-emerald-300">
                <span className="block text-slate-400">HIT PATH</span>
                <span>Physical Addr: 0x1A4A4C</span>
              </div>
              <div className="p-1.5 rounded bg-white/[0.02] border border-white/[0.05] text-slate-400">
                <span className="block text-slate-500">MISS PATH</span>
                <span>Page Table Walk</span>
              </div>
            </div>

            {/* Compact Metric Visualization: HITS, MISSES, ACCESS COUNT */}
            <div className="grid grid-cols-3 gap-1.5 pt-1 text-center text-[9px]">
              <div className="p-1.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                <span className="text-slate-400 block">HITS</span>
                <span className="text-emerald-400 font-bold text-[11px]">892</span>
              </div>
              <div className="p-1.5 rounded bg-rose-500/10 border border-rose-500/20">
                <span className="text-slate-400 block">MISSES</span>
                <span className="text-rose-400 font-bold text-[11px]">132</span>
              </div>
              <div className="p-1.5 rounded bg-sky-500/10 border border-sky-500/20">
                <span className="text-slate-400 block">ACCESS COUNT</span>
                <span className="text-sky-300 font-bold text-[11px]">1,024</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Stack Chips */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-white/[0.03] border border-white/[0.06] text-slate-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 pt-3 border-t border-white/[0.06]">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="btn-primary-tactile px-4 py-2 rounded-xl text-xs font-mono flex items-center gap-1.5 cursor-pointer group/btn"
        >
          <GithubIcon className="w-3.5 h-3.5" />
          <span>View on GitHub</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-slate-600 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
        </a>

        <button
          type="button"
          onClick={onOpenDetails}
          className="btn-secondary-tactile px-3.5 py-2 rounded-xl text-xs font-mono text-slate-300 hover:text-white cursor-pointer"
        >
          Details
        </button>
      </div>
    </article>
  );
}


/* =========================================================================
   PROJECT DETAILS MODAL
   ========================================================================= */
function ProjectDetailsModal({
  project,
  onClose,
}: {
  project: SecondaryProject;
  onClose: () => void;
}) {
  useScrollLock(true);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 overscroll-contain"
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

      {/* Modal Dialog Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.2 }}
        data-lenis-prevent="true"
        className="relative w-full max-w-2xl max-h-[85dvh] overflow-y-auto overscroll-contain rounded-3xl bg-[#0c0e15] border border-white/15 p-6 sm:p-8 shadow-2xl z-10"
      >
        {/* Top hairline */}
        <div className="absolute top-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-sky-400/30 to-transparent pointer-events-none" />

        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 mb-6 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
                PROJECT // {project.num}
              </span>
              <span className="text-xs font-mono text-slate-400">
                {project.category}
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {project.title}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white transition-colors cursor-pointer border border-white/5"
            aria-label="Close details modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-6">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-2 font-semibold">
              OVERVIEW
            </span>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
              {project.description}
            </p>
          </div>

          {/* Highlights */}
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-3 font-semibold">
              ENGINEERING HIGHLIGHTS &amp; ARCHITECTURE
            </span>
            <div className="space-y-2.5">
              {project.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 font-light">
                  <div className="w-4 h-4 rounded-full bg-sky-500/10 border border-sky-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 text-sky-400" />
                  </div>
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Breakdown */}
          {project.techCategories && (
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-3 font-semibold">
                SYSTEM &amp; TECH STACK
              </span>
              <div className="space-y-2 text-xs font-mono">
                {project.techCategories.frontend && (
                  <div>
                    <span className="text-slate-500 block mb-1">Frontend / Client:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.techCategories.frontend.map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-slate-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {project.techCategories.backend && (
                  <div>
                    <span className="text-slate-500 block mb-1 mt-2">Backend &amp; Database:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.techCategories.backend.map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-slate-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {project.techCategories.extension && (
                  <div>
                    <span className="text-slate-500 block mb-1 mt-2">Browser Extension:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.techCategories.extension.map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-slate-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {project.techCategories.core && (
                  <div>
                    <span className="text-slate-500 block mb-1 mt-2">Core Engine:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.techCategories.core.map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-slate-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Row */}
          <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-primary-tactile px-6 py-2.5 rounded-xl text-xs font-mono flex items-center gap-2 cursor-pointer"
            >
              <GithubIcon className="w-4 h-4" />
              <span>View Repository on GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-600" />
            </a>

            <button
              type="button"
              onClick={onClose}
              className="btn-secondary-tactile px-4 py-2.5 rounded-xl text-xs font-mono text-slate-400 hover:text-white cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
