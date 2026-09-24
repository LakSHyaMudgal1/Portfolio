"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { PROJECTS, Project } from "@/lib/data";
import { useScrollLock } from "@/hooks/useScrollLock";
import { 
  AlertCircle,
  ArrowDown,
  ArrowRight,
  ArrowUpRight, 
  Award, 
  BookOpen,
  Check, 
  Code2,
  Cpu,
  GitCompare,
  Layers,
  MapPin,
  MessageSquare,
  Play,
  RefreshCw,
  Share2, 
  ShieldCheck,
  Send,
  CheckCheck,
  Bell,
  Wifi,
  Battery,
  Sparkles, 
  Terminal,
  TrendingUp, 
  Truck, 
  Video,
  X,
} from "lucide-react";
import { GithubIcon, ChromeIcon } from "@/components/Icons";
import { Magnetic } from "./MagneticButton";
import { usePortfolio } from "@/context/PortfolioContext";
import { EngineeringKnowledgeGraph } from "./EngineeringKnowledgeGraph";

export function ProjectShowcase() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { 
    mode, 
    setMode, 
    setSelectedTechDrawer, 
    setSelectedStoryProject, 
    setSelectedReplayProject, 
    setIsCompareOpen 
  } = usePortfolio();

  return (
    <section id="projects" className="py-28 md:py-36 relative border-t border-white/[0.06] bg-[#050608]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-sky-500/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <SectionHeading
          number="// 01"
          eyebrow="SELECTED WORK"
          title="Things I've built, broken, optimized and shipped."
          description="Four focused engineering systems spanning logistics route optimization, real-time collaborative workspaces, operating system schedulers, and hardware memory simulation."
        />

        {/* Interactive Engineering Controls Toolbar */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 p-3.5 sm:p-4 rounded-2xl bg-[#090b10] border border-white/[0.08] shadow-lg">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest pl-1 font-semibold">
              Interactive Tools:
            </span>

            {/* Compare Projects Trigger */}
            <button
              type="button"
              onClick={() => setIsCompareOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-slate-200 hover:text-white flex items-center gap-2 transition-all cursor-pointer shadow-sm"
              title="Open side-by-side engineering comparison matrix"
            >
              <GitCompare className="w-3.5 h-3.5 text-sky-400" />
              <span>Compare Projects</span>
            </button>

            {/* Engineering Mode Quick Toggle */}
            <button
              type="button"
              onClick={() => setMode(mode === "engineering" ? "explore" : "engineering")}
              className={`px-3 py-1.5 rounded-xl border text-xs font-mono flex items-center gap-2 transition-all cursor-pointer ${
                mode === "engineering"
                  ? "bg-amber-500/15 border-amber-500/40 text-amber-300 font-semibold shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                  : "bg-white/[0.04] hover:bg-white/[0.08] border-white/10 text-slate-300"
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>{mode === "engineering" ? "Engineering Mode: ACTIVE" : "Toggle Engineering Depth"}</span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="hidden sm:inline">Scroll case study / Architecture replay available below</span>
          </div>
        </div>

        {/* Engineering Mode Active Callout Banner */}
        {mode === "engineering" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 rounded-xl bg-amber-500/10 border border-amber-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono"
          >
            <div className="flex items-center gap-2.5 text-amber-300 font-medium">
              <Layers className="w-4 h-4 text-amber-400 shrink-0" />
              <span>ENGINEERING MODE ENGAGED — Deeper system topologies, algorithms, and architectural trade-offs are now revealed across all cards.</span>
            </div>
            <button
              type="button"
              onClick={() => setMode("explore")}
              className="px-2.5 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/30 text-[11px] self-start sm:self-auto cursor-pointer"
            >
              Exit to Standard View
            </button>
          </motion.div>
        )}

        {/* Four Projects with Editorial Asymmetric Scale & Hierarchy */}
        <div className="space-y-14 sm:space-y-20 mt-12 md:mt-16">
          
          {/* Project 01: CARGOXPRESS (Largest Full-Width Project Presentation) */}
          <CargoxpressCaseStudy 
            project={PROJECTS[0]} 
            isEngineeringMode={mode === "engineering"}
            onOpenDetails={() => setSelectedProject(PROJECTS[0])} 
            onOpenStory={() => setSelectedStoryProject("cargoxpress")}
            onOpenReplay={() => setSelectedReplayProject("cargoxpress")}
            onOpenTech={(t) => setSelectedTechDrawer(t)}
          />

          {/* Project 02: TABTRACK (Large Horizontal Project Presentation) */}
          <TabtrackPresentation 
            project={PROJECTS[1]} 
            isEngineeringMode={mode === "engineering"}
            onOpenDetails={() => setSelectedProject(PROJECTS[1])} 
            onOpenStory={() => setSelectedStoryProject("tabtrack")}
            onOpenReplay={() => setSelectedReplayProject("tabtrack")}
            onOpenTech={(t) => setSelectedTechDrawer(t)}
          />

          {/* Paired Engineering Projects: OS SCHEDULER (03) & TLB SIMULATOR (04) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
            <div className="md:col-span-6 flex">
              <OsSchedulerCard 
                project={PROJECTS[2]} 
                isEngineeringMode={mode === "engineering"}
                onOpenDetails={() => setSelectedProject(PROJECTS[2])} 
                onOpenReplay={() => setSelectedReplayProject("os-scheduler")}
                onOpenTech={(t) => setSelectedTechDrawer(t)}
              />
            </div>
            <div className="md:col-span-6 flex">
              <TlbSimulatorCard 
                project={PROJECTS[3]} 
                isEngineeringMode={mode === "engineering"}
                onOpenDetails={() => setSelectedProject(PROJECTS[3])} 
                onOpenReplay={() => setSelectedReplayProject("tlb-simulator")}
                onOpenTech={(t) => setSelectedTechDrawer(t)}
              />
            </div>
          </div>

          {/* Project 05: CHATMATE (Compact but Polished Real-Time Mobile Application) */}
          <ChatmateCard 
            project={PROJECTS[4]} 
            isEngineeringMode={mode === "engineering"}
            onOpenDetails={() => setSelectedProject(PROJECTS[4])} 
            onOpenReplay={() => setSelectedReplayProject("chatmate")}
            onOpenTech={(t) => setSelectedTechDrawer(t)}
          />

        </div>

        {/* Interactive Knowledge Graph Section */}
        <div className="mt-24 pt-16 border-t border-white/[0.06]">
          <EngineeringKnowledgeGraph onSelectTech={(tech: string) => setSelectedTechDrawer(tech)} />
        </div>

        {/* Unified Project Details Modal */}
        <AnimatePresence>
          {selectedProject && (
            <ProjectDetailsModal
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
              onOpenStory={(id) => {
                setSelectedProject(null);
                setSelectedStoryProject(id);
              }}
              onOpenReplay={(id) => {
                setSelectedProject(null);
                setSelectedReplayProject(id);
              }}
              onOpenTech={(t) => setSelectedTechDrawer(t)}
            />
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}

/* =========================================================================
   PROJECT 01: CARGOXPRESS — Largest Full-Width Presentation
   ========================================================================= */
function CargoxpressCaseStudy({ 
  project, 
  isEngineeringMode,
  onOpenDetails,
  onOpenStory,
  onOpenReplay,
  onOpenTech,
}: { 
  project: Project; 
  isEngineeringMode?: boolean;
  onOpenDetails: () => void;
  onOpenStory: () => void;
  onOpenReplay: () => void;
  onOpenTech: (tech: string) => void;
}) {
  const [isOptimized, setIsOptimized] = useState(true);
  const [hoveredArchNode, setHoveredArchNode] = useState<string | null>(null);

  // Architecture components for interactive diagram
  const archNodes = [
    { id: "react", label: "React Frontend", role: "Dispatcher & Broker UI", highlight: "Stateful route inputs & real-time map canvas" },
    { id: "api", label: "Express API Layer", role: "REST Endpoints & RBAC", highlight: "JWT verification & route param validation" },
    { id: "algo", label: "Shipment Merger", role: "Consolidation Engine", highlight: "O(N log N) spatio-temporal route overlap matching" },
    { id: "mongo", label: "MongoDB", role: "Persistence Layer", highlight: "Indexed geospatial coordinates & manifest collections" },
  ];

  return (
    <article className="relative rounded-3xl bg-[#08090d] border border-white/[0.08] hover:border-white/20 transition-all duration-300 p-6 sm:p-10 lg:p-14 shadow-2xl shadow-black/90 overflow-hidden group">
      {/* Top subtle hairline highlight */}
      <div className="absolute top-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/25 to-transparent pointer-events-none" />
      <div className="absolute inset-0 engineering-grid opacity-15 pointer-events-none" />

      {/* Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-white/[0.06] relative z-10">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="px-3 py-1 rounded-full text-[10px] font-mono bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 uppercase tracking-widest font-semibold cursor-pointer hover:bg-emerald-500/20 transition-colors"
            title="Project Number // Click for engineering easter egg"
          >
            PROJECT // {project.num}
          </button>
          <span className="text-xs font-mono text-slate-400">
            {project.category}
          </span>
        </div>

        {/* Awards Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-amber-500/10 border border-amber-500/25 text-amber-400 flex items-center gap-1.5 font-medium">
            <Award className="w-3 h-3" />
            <span>2nd Position — Hack 5.0 (NIT Hamirpur)</span>
          </span>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-sky-500/10 border border-sky-500/25 text-sky-400 flex items-center gap-1.5 font-medium">
            <Award className="w-3 h-3" />
            <span>Best Use of GitHub Award</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start relative z-10">
        
        {/* Left Column: Narrative (Problem, Details, Results) */}
        <div className="lg:col-span-6 flex flex-col items-start space-y-7 order-2 lg:order-1">
          
          {/* Title & Description */}
          <div>
            <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-3 group-hover:text-emerald-300 group-hover:translate-x-1 transition-all">
              {project.title}
            </h3>
            <p className="text-base sm:text-lg text-emerald-400/90 font-mono font-normal leading-snug">
              {project.subtitle}
            </p>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mt-4 font-light">
              {project.description}
            </p>
          </div>

          {/* Section 1: The Problem Solved */}
          <div className="p-5 rounded-2xl bg-[#0c0e15] border border-white/[0.06] w-full space-y-2 group-hover:border-white/10 transition-colors">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>THE LOGISTICS PROBLEM SOLVED</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              Freight carriers regularly operate with partially utilized truck capacity (empty space) and redundant dispatch routes, wasting fuel, highway tolls, and fleet throughput. CargoXpress matches shipment loads with overlapping route schedules to merge cargo dynamically.
            </p>
          </div>

          {/* Interactive Project Architecture Schematic */}
          <div className="w-full p-4 rounded-2xl bg-[#090b10] border border-white/[0.06] space-y-3">
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 uppercase tracking-wider">
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <Cpu className="w-3.5 h-3.5" />
                <span>INTERACTIVE SYSTEM ARCHITECTURE</span>
              </span>
              <span className="text-slate-500">Hover node to inspect data flow</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {archNodes.map((node) => {
                const isHovered = hoveredArchNode === node.id;
                return (
                  <div
                    key={node.id}
                    data-arch-node="true"
                    onMouseEnter={() => setHoveredArchNode(node.id)}
                    onMouseLeave={() => setHoveredArchNode(null)}
                    className={`p-2.5 rounded-xl border transition-all text-center cursor-pointer ${
                      isHovered
                        ? "bg-emerald-500/15 border-emerald-400 text-emerald-200 shadow-[0_0_12px_rgba(16,185,129,0.3)] scale-105"
                        : "bg-white/[0.02] border-white/5 text-slate-300 hover:border-white/20"
                    }`}
                  >
                    <span className="text-[11px] font-semibold block">{node.label}</span>
                    <span className="text-[9px] font-mono text-slate-400 block mt-0.5">{node.role}</span>
                  </div>
                );
              })}
            </div>

            {/* Hover explanation bar */}
            <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 text-xs font-mono text-slate-300 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
              <span>
                {hoveredArchNode 
                  ? archNodes.find((n) => n.id === hoveredArchNode)?.highlight 
                  : "Hover any architecture component to inspect request flow role."}
              </span>
            </div>
          </div>

          {/* Section 2: Key Engineering Details */}
          <div className="w-full space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-slate-400 font-semibold flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              <span>KEY ENGINEERING ARCHITECTURE</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.highlights.map((highlight, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 text-emerald-400" />
                  </div>
                  <span className="text-xs text-slate-300 font-light">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Documented 40% Result with Proof Layer */}
          <div className="w-full p-4 rounded-xl bg-emerald-500/[0.07] border border-emerald-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group/proof">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-emerald-500/15 text-emerald-400">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 block font-semibold">
                  DOCUMENTED BENCHMARK
                </span>
                <span className="text-sm sm:text-base font-semibold text-white">
                  40% improvement in vehicle capacity utilization
                </span>
              </div>
            </div>

            {/* Proof Layer badge */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-[10px] font-mono text-emerald-300 self-start sm:self-auto">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Source: Hack 5.0 Project Documentation</span>
            </div>
          </div>

          {/* Engineering Mode Deep Technical Layer */}
          {isEngineeringMode && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="w-full p-5 rounded-2xl bg-amber-500/[0.04] border border-amber-500/20 space-y-4"
            >
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
                <Layers className="w-4 h-4" />
                <span>ENGINEERING MODE: DEEP SYSTEM TELEMETRY</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">Algorithm</span>
                  <span className="font-semibold text-white">Spatio-Temporal Windowing</span>
                  <p className="text-[10px] text-slate-400 font-light mt-1">Consolidates truck routes matching within ±2h departure windows and shared highway corridors.</p>
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">Security & RBAC</span>
                  <span className="font-semibold text-white">JWT + Bcrypt Hashes</span>
                  <p className="text-[10px] text-slate-400 font-light mt-1">Role-based access separating fleet managers, individual consignors, and transport operators.</p>
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">Trade-off Decision</span>
                  <span className="font-semibold text-white">In-Memory Route Consolidation</span>
                  <p className="text-[10px] text-slate-400 font-light mt-1">Prioritized deterministic compute speed over heavy database aggregations for real-time dispatch matching.</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Section 4: Technology Stack (Clickable Drawer Integration) */}
          <div className="w-full">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-semibold">
                TECHNOLOGY STACK
              </span>
              <span className="text-[10px] font-mono text-slate-500">Click badge for tech drawer</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <button
                  key={tech}
                  type="button"
                  onClick={() => onOpenTech(tech)}
                  className="px-3 py-1 rounded-lg text-xs font-mono bg-white/[0.03] border border-white/[0.08] text-slate-300 hover:border-emerald-400/50 hover:bg-emerald-500/10 hover:text-white transition-all cursor-pointer"
                  title={`Inspect ${tech} architecture details`}
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>

          {/* CTAs with Story Mode & Replay Architecture */}
          <div className="pt-2 flex flex-wrap items-center gap-3 w-full">
            <Magnetic strength={10}>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-primary-tactile px-5 py-2.5 rounded-xl text-xs font-mono flex items-center gap-2 cursor-pointer justify-center group/btn"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>Source Code</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-600 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </a>
            </Magnetic>

            {/* Story Mode Button */}
            <button
              type="button"
              onClick={onOpenStory}
              className="px-4 py-2.5 rounded-xl text-xs font-mono bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 flex items-center gap-2 transition-all cursor-pointer shadow-sm"
              title="Launch 6-Step Scroll Case Study"
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
              <span>Story Mode</span>
            </button>

            {/* Architecture Replay Button */}
            <button
              type="button"
              onClick={onOpenReplay}
              className="px-4 py-2.5 rounded-xl text-xs font-mono bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 text-sky-300 flex items-center gap-2 transition-all cursor-pointer shadow-sm"
              title="Replay Request Flow Animation"
            >
              <Play className="w-3.5 h-3.5 text-sky-400" />
              <span>Replay Architecture</span>
            </button>

            <button
              type="button"
              onClick={onOpenDetails}
              className="btn-secondary-tactile px-4 py-2.5 rounded-xl text-xs font-mono flex items-center gap-1.5 cursor-pointer text-slate-300 hover:text-white"
            >
              <span>Full Specs</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>

        </div>

        {/* Right Column: 4-Stage Logistics Merging Visualization */}
        <div className="lg:col-span-6 order-1 lg:order-2 w-full">
          <div className="p-6 sm:p-8 rounded-2xl bg-[#07090e] border border-white/[0.08] shadow-2xl relative overflow-hidden group-hover:border-white/15 transition-colors">
            
            {/* Visualizer Header */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-mono text-slate-200 uppercase tracking-wider font-semibold">
                  Shipment-Merging Pipeline
                </span>
              </div>

              {/* Simulation Toggle */}
              <button
                type="button"
                onClick={() => setIsOptimized(!isOptimized)}
                className="px-3 py-1.5 rounded-lg text-xs font-mono bg-white/[0.05] hover:bg-white/[0.08] border border-white/10 text-emerald-400 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>{isOptimized ? "State: Merged (+40%)" : "State: Unmerged"}</span>
              </button>
            </div>

            {/* 4-STAGE VISUAL ARCHITECTURE */}
            <div className="space-y-4">
              
              {/* STAGE 1: MULTIPLE PARTIALLY UTILIZED TRUCKS */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-400 uppercase">01 / Partially Utilized Trucks</span>
                  <span className="text-amber-400 font-semibold">{isOptimized ? "Wasted Space Merged" : "Separate Dispatches"}</span>
                </div>

                {/* Truck A */}
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-300 mb-1">
                    <span>Truck A (Delhi Depot)</span>
                    <span className="text-amber-400">45% Capacity</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <motion.div
                      animate={{ width: isOptimized ? "0%" : "45%" }}
                      transition={{ duration: 0.4 }}
                      className="h-full bg-amber-400 rounded-full"
                    />
                  </div>
                </div>

                {/* Truck B */}
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-300 mb-1">
                    <span>Truck B (Ambala Hub)</span>
                    <span className="text-sky-400">40% Capacity</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <motion.div
                      animate={{ width: isOptimized ? "0%" : "40%" }}
                      transition={{ duration: 0.4 }}
                      className="h-full bg-sky-400 rounded-full"
                    />
                  </div>
                </div>
              </div>

              {/* STAGE 2: ROUTE / SCHEDULE OVERLAP */}
              <div className="flex flex-col items-center justify-center py-1">
                <ArrowDown className="w-4 h-4 text-slate-500 mb-1" />
                <div className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-[10px] font-mono text-slate-400 flex items-center gap-2">
                  <MapPin className="w-3 h-3 text-sky-400" />
                  <span>02 / Route &amp; Schedule Overlap Detected</span>
                </div>
                <ArrowDown className="w-4 h-4 text-slate-500 mt-1" />
              </div>

              {/* STAGE 3: SHIPMENT MERGING ENGINE */}
              <div className="p-3.5 rounded-xl bg-slate-900/40 border border-white/5 flex items-center justify-between text-xs font-mono text-slate-300">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>03 / Shipment-Merging Engine Active</span>
                </div>
                <span className="text-[10px] text-slate-400">Dijkstra Shortest Path</span>
              </div>

              {/* STAGE 4: HIGHER TRUCK UTILIZATION */}
              <div className="flex flex-col items-center justify-center py-1">
                <ArrowDown className="w-4 h-4 text-slate-500 mb-1" />
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">
                  04 / Higher Truck Utilization
                </span>
                <ArrowDown className="w-4 h-4 text-slate-500 mt-1" />
              </div>

              <div className="p-4 rounded-xl bg-emerald-500/[0.08] border border-emerald-500/30 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-emerald-300 font-bold">CONSOLIDATED TRUCK CAPACITY</span>
                  <span className="text-emerald-400 font-bold">{isOptimized ? "85% Optimal Load" : "45% (Unmerged)"}</span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden">
                  <motion.div
                    animate={{ width: isOptimized ? "85%" : "45%" }}
                    transition={{ duration: 0.5 }}
                    className="h-full bg-gradient-to-r from-emerald-500 to-sky-400 rounded-full"
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-emerald-400/90 pt-1">
                  <span>Single dispatch eliminates 1 vehicle run</span>
                  <span className="font-bold">+40% capacity utilization boost</span>
                </div>
              </div>

            </div>

            {/* Bottom Status */}
            <div className="mt-5 pt-3.5 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span>HACK 5.0 PODIUM ARCHITECTURE</span>
              <span>JWT RBAC SECURED</span>
            </div>

          </div>
        </div>

      </div>
    </article>
  );
}

/* =========================================================================
   PROJECT 02: TABTRACK — Large Horizontal Presentation
   ========================================================================= */
function TabtrackPresentation({ 
  project, 
  isEngineeringMode,
  onOpenDetails,
  onOpenStory,
  onOpenReplay,
  onOpenTech,
}: { 
  project: Project; 
  isEngineeringMode?: boolean;
  onOpenDetails: () => void;
  onOpenStory: () => void;
  onOpenReplay: () => void;
  onOpenTech: (tech: string) => void;
}) {
  const [activeTab, setActiveTab] = useState<"workspace" | "extension">("workspace");
  const [hoveredArchNode, setHoveredArchNode] = useState<string | null>(null);

  const tabArchNodes = [
    { id: "ext", label: "Chrome MV3 Ext", role: "Active Tab Profiler", highlight: "Manifest V3 service worker monitoring tab switches & productivity telemetry" },
    { id: "ws", label: "Socket.IO Client", role: "Bi-directional Pipe", highlight: "Low-latency multiplexed event channels for typing, presence & state diffs" },
    { id: "server", label: "Node.js Server", role: "Signaling & Routing", highlight: "Room state manager, WebRTC SDP handshake coordinator, and REST auth" },
    { id: "rtc", label: "WebRTC Mesh", role: "P2P AV Streaming", highlight: "Direct peer-to-peer audio/video streaming avoiding centralized media relay costs" },
  ];

  return (
    <article className="relative rounded-3xl bg-[#08090d] border border-white/[0.08] hover:border-white/20 transition-all duration-300 p-6 sm:p-9 lg:p-10 shadow-2xl overflow-hidden group">
      {/* Top hairline highlight */}
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

            {/* Interactive Real-Time Architecture Schematic */}
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/[0.06] space-y-2.5 mb-6">
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 uppercase">
                <span className="text-indigo-400 font-semibold">REAL-TIME ARCHITECTURE TOPOLOGY</span>
                <span className="text-slate-500 text-[9px]">Hover node</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {tabArchNodes.map((n) => (
                  <div
                    key={n.id}
                    data-arch-node="true"
                    onMouseEnter={() => setHoveredArchNode(n.id)}
                    onMouseLeave={() => setHoveredArchNode(null)}
                    className={`p-2 rounded-lg border text-left transition-all cursor-pointer ${
                      hoveredArchNode === n.id
                        ? "bg-indigo-500/20 border-indigo-400 text-indigo-200"
                        : "bg-white/[0.02] border-white/5 text-slate-300"
                    }`}
                  >
                    <span className="text-[10px] font-semibold block">{n.label}</span>
                    <span className="text-[9px] font-mono text-slate-400 block">{n.role}</span>
                  </div>
                ))}
              </div>
              <p className="text-[10px] font-mono text-slate-400 pt-1 border-t border-white/5">
                {hoveredArchNode 
                  ? tabArchNodes.find((n) => n.id === hoveredArchNode)?.highlight 
                  : "Hover component to view real-time synchronization role."}
              </p>
            </div>

            {/* Engineering Mode Deep Technical Layer */}
            {isEngineeringMode && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="p-4 rounded-xl bg-amber-500/[0.04] border border-amber-500/20 space-y-3 mb-6"
              >
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
                  <Layers className="w-3.5 h-3.5" />
                  <span>ENGINEERING MODE: REAL-TIME SUBSYSTEM</span>
                </div>
                <div className="space-y-2 text-[11px] font-light text-slate-300">
                  <div className="p-2 rounded bg-black/40 border border-white/5">
                    <span className="font-semibold text-white block mb-0.5">WebRTC Signaling & ICE:</span>
                    SDP offer/answer exchange through Socket.IO namespaces with STUN fallback for NAT traversal.
                  </div>
                  <div className="p-2 rounded bg-black/40 border border-white/5">
                    <span className="font-semibold text-white block mb-0.5">Manifest V3 Service Worker:</span>
                    Managed short-lived background worker persistence with chrome.storage.local caching to survive idle unloading.
                  </div>
                </div>
              </motion.div>
            )}

            {/* Tech Stack Chips (Clickable) */}
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <button
                  key={tech}
                  type="button"
                  onClick={() => onOpenTech(tech)}
                  className="px-2.5 py-1 rounded text-[11px] font-mono bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 hover:bg-indigo-500/25 hover:border-indigo-400 transition-all cursor-pointer"
                  title={`Inspect ${tech} architecture details`}
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-2.5">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-primary-tactile px-4 py-2 rounded-xl text-xs font-mono flex items-center gap-1.5 cursor-pointer group/btn"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>Source</span>
              <ArrowUpRight className="w-3 h-3 text-slate-600 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </a>

            {/* Story Mode */}
            <button
              type="button"
              onClick={onOpenStory}
              className="px-3.5 py-2 rounded-xl text-xs font-mono bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 flex items-center gap-1.5 transition-all cursor-pointer"
              title="Launch 6-Step Scroll Case Study"
            >
              <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
              <span>Story Mode</span>
            </button>

            {/* Architecture Replay */}
            <button
              type="button"
              onClick={onOpenReplay}
              className="px-3.5 py-2 rounded-xl text-xs font-mono bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 text-sky-300 flex items-center gap-1.5 transition-all cursor-pointer"
              title="Replay WebSocket & WebRTC Event Flow"
            >
              <Play className="w-3.5 h-3.5 text-sky-400" />
              <span>Replay</span>
            </button>

            <button
              type="button"
              onClick={onOpenDetails}
              className="btn-secondary-tactile px-3.5 py-2 rounded-xl text-xs font-mono text-slate-300 hover:text-white cursor-pointer"
            >
              Details
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

                  {/* 4 Indicators: Video, Code, Chat, Screen Share */}
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
   PROJECT 03: OS SCHEDULER — Paired Engineering Project (6 Columns)
   ========================================================================= */
function OsSchedulerCard({
  project,
  isEngineeringMode,
  onOpenDetails,
  onOpenReplay,
  onOpenTech,
}: {
  project: Project;
  isEngineeringMode?: boolean;
  onOpenDetails: () => void;
  onOpenReplay: () => void;
  onOpenTech: (tech: string) => void;
}) {
  const [selectedAlgo, setSelectedAlgo] = useState<
    "FCFS" | "SJF" | "SRTF" | "Priority (Preemptive)" | "Priority (Non-Preemptive)"
  >("FCFS");

  return (
    <article className="w-full h-full relative rounded-3xl bg-[#08090d] border border-white/[0.08] hover:border-white/20 transition-all duration-300 p-6 sm:p-8 shadow-2xl flex flex-col justify-between group overflow-hidden">
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

        {/* Engineering Mode Subsystem Details */}
        {isEngineeringMode && (
          <div className="mb-4 p-3 rounded-xl bg-amber-500/[0.04] border border-amber-500/20 text-[11px] font-mono text-slate-300 space-y-1">
            <span className="text-amber-400 font-semibold uppercase text-[10px] block">ENGINEERING METRIC: CONTEXT SWITCH OVERHEAD</span>
            <p className="text-[10px] text-slate-400">Simulates register save/restore cycle penalties (T_cs = 1ms) during preemptive priority changes.</p>
          </div>
        )}

        {/* Tech Stack Chips (Clickable) */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.stack.map((tech) => (
            <button
              key={tech}
              type="button"
              onClick={() => onOpenTech(tech)}
              className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-white/[0.03] border border-white/[0.06] text-slate-300 hover:border-sky-400/50 hover:bg-sky-500/10 hover:text-white transition-colors cursor-pointer"
              title={`Inspect ${tech} architecture details`}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2.5 pt-3 border-t border-white/[0.06]">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="btn-primary-tactile px-3.5 py-2 rounded-xl text-xs font-mono flex items-center gap-1.5 cursor-pointer group/btn"
        >
          <GithubIcon className="w-3.5 h-3.5" />
          <span>GitHub</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-slate-600 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
        </a>

        {/* Replay Architecture */}
        <button
          type="button"
          onClick={onOpenReplay}
          className="px-3 py-2 rounded-xl text-xs font-mono bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 text-sky-300 flex items-center gap-1.5 transition-all cursor-pointer"
          title="Replay CPU Dispatch Loop"
        >
          <Play className="w-3 h-3 text-sky-400" />
          <span>Replay</span>
        </button>

        <button
          type="button"
          onClick={onOpenDetails}
          className="btn-secondary-tactile px-3 py-2 rounded-xl text-xs font-mono text-slate-300 hover:text-white cursor-pointer"
        >
          Details
        </button>
      </div>
    </article>
  );
}

/* =========================================================================
   PROJECT 04: TLB SIMULATOR — Paired Engineering Project (6 Columns)
   ========================================================================= */
function TlbSimulatorCard({
  project,
  isEngineeringMode,
  onOpenDetails,
  onOpenReplay,
  onOpenTech,
}: {
  project: Project;
  isEngineeringMode?: boolean;
  onOpenDetails: () => void;
  onOpenReplay: () => void;
  onOpenTech: (tech: string) => void;
}) {
  const [activePolicy, setActivePolicy] = useState<"LRU" | "FIFO">("LRU");

  return (
    <article className="w-full h-full relative rounded-3xl bg-[#08090d] border border-white/[0.08] hover:border-white/20 transition-all duration-300 p-6 sm:p-8 shadow-2xl flex flex-col justify-between group overflow-hidden">
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

        {/* Engineering Mode Subsystem Details */}
        {isEngineeringMode && (
          <div className="mb-4 p-3 rounded-xl bg-amber-500/[0.04] border border-amber-500/20 text-[11px] font-mono text-slate-300 space-y-1">
            <span className="text-amber-400 font-semibold uppercase text-[10px] block">ENGINEERING HARDWARE SPEC: MEMORY PENALTY</span>
            <p className="text-[10px] text-slate-400">TLB Hit: 1 clock cycle (~1ns). Page Table Walk Miss: 2 DRAM accesses (~100ns penalty).</p>
          </div>
        )}

        {/* Tech Stack Chips (Clickable) */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.stack.map((tech) => (
            <button
              key={tech}
              type="button"
              onClick={() => onOpenTech(tech)}
              className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-white/[0.03] border border-white/[0.06] text-slate-300 hover:border-amber-400/50 hover:bg-amber-500/10 hover:text-white transition-colors cursor-pointer"
              title={`Inspect ${tech} architecture details`}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2.5 pt-3 border-t border-white/[0.06]">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="btn-primary-tactile px-3.5 py-2 rounded-xl text-xs font-mono flex items-center gap-1.5 cursor-pointer group/btn"
        >
          <GithubIcon className="w-3.5 h-3.5" />
          <span>GitHub</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-slate-600 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
        </a>

        {/* Replay Architecture */}
        <button
          type="button"
          onClick={onOpenReplay}
          className="px-3 py-2 rounded-xl text-xs font-mono bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 flex items-center gap-1.5 transition-all cursor-pointer"
          title="Replay Virtual-to-Physical Address Translation"
        >
          <Play className="w-3 h-3 text-amber-400" />
          <span>Replay</span>
        </button>

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
   PROJECT 05: CHATMATE — Compact Real-Time Mobile Application
   ========================================================================= */
function ChatmateCard({
  project,
  isEngineeringMode,
  onOpenDetails,
  onOpenReplay,
  onOpenTech,
}: {
  project: Project;
  isEngineeringMode?: boolean;
  onOpenDetails: () => void;
  onOpenReplay: () => void;
  onOpenTech: (t: string) => void;
}) {
  return (
    <article
      className="p-6 sm:p-8 rounded-3xl bg-[#08090d] border border-white/[0.08] hover:border-white/20 transition-all duration-300 relative overflow-hidden group shadow-2xl"
    >
      {/* Top hairline accent */}
      <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-sky-400/40 to-transparent pointer-events-none" />

      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-white/[0.06] mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-mono font-bold tracking-widest text-sky-400 bg-sky-500/10 px-2.5 py-0.5 rounded-full border border-sky-500/20">
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

        <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20 self-start sm:self-auto flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>Real-time Mobile Sockets</span>
        </span>
      </div>

      {/* Grid: Left specs & Right Mobile App UI */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Product Info & Architecture */}
        <div className="lg:col-span-7 space-y-5">
          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            {project.description}
          </p>

          {/* Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {project.highlights.map((h, i) => (
              <div key={i} className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-start gap-2">
                <div className="w-4 h-4 rounded-full bg-sky-500/10 border border-sky-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-2.5 h-2.5 text-sky-400" />
                </div>
                <span className="text-slate-300 font-light leading-snug">{h}</span>
              </div>
            ))}
          </div>

          {/* Engineering Mode Deep Technical Layer */}
          {isEngineeringMode && (
            <div className="p-3.5 rounded-2xl bg-amber-500/[0.04] border border-amber-500/20 space-y-2 text-xs font-mono">
              <span className="text-amber-400 font-semibold uppercase text-[10px] block">
                ENGINEERING PIPELINE // SOCKET.IO &amp; POSTGRESQL ARCHITECTURE
              </span>
              <p className="text-[10px] text-slate-400 font-light">
                Expo Mobile Client dispatches WebSocket events to Node.js gateway. Messages are persisted via Prisma into indexed PostgreSQL using cursor pagination, and broadcasted to recipient device sockets with push notification fallbacks.
              </p>
            </div>
          )}

          {/* Tech Stack Chips */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.stack.map((tech) => (
              <button
                key={tech}
                type="button"
                onClick={() => onOpenTech(tech)}
                className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-white/[0.03] border border-white/[0.06] text-slate-300 hover:border-sky-400/50 hover:bg-sky-500/10 hover:text-white transition-colors cursor-pointer"
                title={`Inspect ${tech} architecture details`}
              >
                {tech}
              </button>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-white/[0.06]">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-primary-tactile px-4 py-2 rounded-xl text-xs font-mono flex items-center gap-1.5 cursor-pointer group/btn"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-600 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </a>

            <button
              type="button"
              onClick={onOpenReplay}
              className="px-3.5 py-2 rounded-xl text-xs font-mono bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 text-sky-300 flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
              title="Replay Real-Time Mobile Messaging & Presence Flow"
            >
              <Play className="w-3 h-3 text-sky-400" />
              <span>Replay Architecture</span>
            </button>

            <button
              type="button"
              onClick={onOpenDetails}
              className="btn-secondary-tactile px-3.5 py-2 rounded-xl text-xs font-mono text-slate-300 hover:text-white cursor-pointer"
            >
              Details
            </button>
          </div>
        </div>

        {/* Right Column: Interactive Mobile Conversation UI */}
        <div className="lg:col-span-5 w-full flex justify-center">
          <div className="w-full max-w-sm rounded-3xl bg-[#090b14] border border-white/[0.12] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.7)] relative overflow-hidden group/phone">
            
            {/* Ambient phone glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Mobile Top Bar */}
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pb-3 border-b border-white/[0.06] mb-3">
              <span className="font-semibold text-slate-200">09:41</span>
              <div className="flex items-center gap-1.5">
                <Wifi className="w-3 h-3 text-slate-400" />
                <span className="text-[9px] font-bold">5G</span>
                <Battery className="w-3.5 h-3.5 text-slate-300" />
              </div>
            </div>

            {/* Chat Conversation App Header */}
            <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.03] border border-white/[0.06] mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-500 flex items-center justify-center text-xs font-bold text-white shadow-sm">
                  AM
                </div>
                <div>
                  <div className="text-xs font-semibold text-white leading-tight">Alex Morgan</div>
                  <div className="flex items-center gap-1.5 text-[9px] font-mono text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                    <span>Active now</span>
                  </div>
                </div>
              </div>

              {/* Dynamic typing status badge */}
              <div className="text-[10px] font-mono text-sky-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                <span>typing...</span>
              </div>
            </div>

            {/* Floating Push Notification Toast */}
            <div className="mb-3 p-2 rounded-xl bg-[#0f1422] border border-sky-400/30 flex items-center gap-2 shadow-lg">
              <div className="p-1 rounded-lg bg-sky-500/20 text-sky-300">
                <Bell className="w-3 h-3" />
              </div>
              <div className="text-[10px] font-mono text-slate-300">
                <span className="text-white font-semibold">ChatMate</span> • New message received
              </div>
            </div>

            {/* Message Feed */}
            <div className="space-y-2.5 mb-3 font-sans">
              
              {/* Message 1 (Incoming) */}
              <div className="flex flex-col items-start max-w-[85%]">
                <div className="p-2.5 rounded-2xl rounded-tl-sm bg-white/[0.06] border border-white/10 text-xs text-slate-200 leading-snug">
                  Hey Lakshya, are real-time sockets synced with PostgreSQL?
                </div>
                <span className="text-[9px] font-mono text-slate-500 mt-0.5 pl-1">09:40 AM</span>
              </div>

              {/* Message 2 (Outgoing) */}
              <div className="flex flex-col items-end ml-auto max-w-[85%]">
                <div className="p-2.5 rounded-2xl rounded-tr-sm bg-sky-500 text-white text-xs leading-snug shadow-md shadow-sky-500/20">
                  Yes! Sub-40ms latency with PostgreSQL cursor pagination and Prisma ORM.
                </div>
                <div className="flex items-center gap-1 text-[9px] font-mono text-slate-500 mt-0.5 pr-1">
                  <span>09:41 AM</span>
                  <CheckCheck className="w-3 h-3 text-sky-400" />
                </div>
              </div>

              {/* Message 3: Animated Dynamic Typing Indicator */}
              <div className="flex items-center gap-1.5 p-2 rounded-2xl rounded-tl-sm bg-white/[0.04] border border-white/[0.06] w-14">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce" />
              </div>
            </div>

            {/* Bottom Message Input Bar */}
            <div className="p-1.5 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between text-xs">
              <span className="text-slate-500 text-[11px] pl-2 font-light">Type a message...</span>
              <button
                type="button"
                className="p-1.5 rounded-lg bg-sky-500 text-white shadow-sm"
                aria-label="Send message"
              >
                <Send className="w-3 h-3" />
              </button>
            </div>

            {/* Hover Telemetry Footer */}
            <div className="mt-2.5 pt-2 border-t border-white/[0.05] flex items-center justify-between text-[9px] font-mono text-slate-500">
              <span className="text-emerald-400">⚡ Socket.IO Event Engine</span>
              <span>Sub-40ms Ping</span>
            </div>
          </div>
        </div>

      </div>
    </article>
  );
}

/* =========================================================================
   PROJECT DETAILS MODAL (Shared across all 5 selected projects)
   ========================================================================= */
function ProjectDetailsModal({
  project,
  onClose,
  onOpenStory,
  onOpenReplay,
  onOpenTech,
}: {
  project: Project;
  onClose: () => void;
  onOpenStory?: (id: string) => void;
  onOpenReplay?: (id: string) => void;
  onOpenTech?: (t: string) => void;
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
        <div className="absolute top-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent pointer-events-none" />

        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 mb-6 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-semibold">
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

          {/* Interactive Actions: Story & Replay */}
          <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-wrap items-center gap-2.5">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mr-1">
              Interactive Tools:
            </span>
            {onOpenReplay && (
              <button
                type="button"
                onClick={() => onOpenReplay(project.id)}
                className="px-3 py-1.5 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 text-sky-300 text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 text-sky-400" />
                <span>Replay Architecture Flow</span>
              </button>
            )}
            {onOpenStory && (project.id === "cargoxpress" || project.id === "tabtrack") && (
              <button
                type="button"
                onClick={() => onOpenStory(project.id)}
                className="px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                <span>Open 6-Step Story Mode</span>
              </button>
            )}
          </div>

          {/* Interactive System Architecture Topology */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3">
            <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-slate-400">
              <span className="flex items-center gap-1.5 text-sky-400 font-semibold">
                <Cpu className="w-3.5 h-3.5" />
                <span>SYSTEM ARCHITECTURE TOPOLOGY</span>
              </span>
              <span>INTERACTIVE DATA FLOW</span>
            </div>

            {/* Architecture Node Sequence */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs font-mono">
              {project.id === "cargoxpress" ? (
                <>
                  <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-400/20 text-sky-300">
                    <span className="text-[9px] text-slate-400 block">CLIENT</span>
                    <span>React Web</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-400/20 text-indigo-300">
                    <span className="text-[9px] text-slate-400 block">GATEWAY</span>
                    <span>Express REST</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-400/20 text-amber-300">
                    <span className="text-[9px] text-slate-400 block">ENGINE</span>
                    <span>Route Merging</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-400/20 text-emerald-300">
                    <span className="text-[9px] text-slate-400 block">DATABASE</span>
                    <span>MongoDB Atlas</span>
                  </div>
                </>
              ) : project.id === "tabtrack" ? (
                <>
                  <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-400/20 text-sky-300">
                    <span className="text-[9px] text-slate-400 block">CLIENTS</span>
                    <span>React + MV3</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-400/20 text-purple-300">
                    <span className="text-[9px] text-slate-400 block">WEBSOCKET</span>
                    <span>Socket.IO Hub</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-400/20 text-indigo-300">
                    <span className="text-[9px] text-slate-400 block">STATE</span>
                    <span>Room Sessions</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-400/20 text-emerald-300">
                    <span className="text-[9px] text-slate-400 block">STORAGE</span>
                    <span>MongoDB Store</span>
                  </div>
                </>
              ) : project.id === "os-scheduler" ? (
                <>
                  <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-400/20 text-sky-300">
                    <span className="text-[9px] text-slate-400 block">INPUT</span>
                    <span>Process Queue</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-400/20 text-amber-300">
                    <span className="text-[9px] text-slate-400 block">ENGINE</span>
                    <span>C++ Scheduler</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-400/20 text-rose-300">
                    <span className="text-[9px] text-slate-400 block">CORE</span>
                    <span>Context Switch</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-400/20 text-emerald-300">
                    <span className="text-[9px] text-slate-400 block">OUTPUT</span>
                    <span>Gantt Timeline</span>
                  </div>
                </>
              ) : project.id === "tlb-simulator" ? (
                <>
                  <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-400/20 text-sky-300">
                    <span className="text-[9px] text-slate-400 block">ADDRESS</span>
                    <span>Virtual 32-bit</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-400/20 text-indigo-300">
                    <span className="text-[9px] text-slate-400 block">CACHE</span>
                    <span>TLB Tag Match</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-400/20 text-amber-300">
                    <span className="text-[9px] text-slate-400 block">POLICY</span>
                    <span>LRU / FIFO</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-400/20 text-emerald-300">
                    <span className="text-[9px] text-slate-400 block">TARGET</span>
                    <span>Physical Frame</span>
                  </div>
                </>
              ) : (
                /* ChatMate */
                <>
                  <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-400/20 text-sky-300">
                    <span className="text-[9px] text-slate-400 block">CLIENT</span>
                    <span>Expo / Native</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-400/20 text-purple-300">
                    <span className="text-[9px] text-slate-400 block">REAL-TIME</span>
                    <span>Socket.io Hub</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-400/20 text-indigo-300">
                    <span className="text-[9px] text-slate-400 block">ORM</span>
                    <span>Node &amp; Prisma</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-400/20 text-emerald-300">
                    <span className="text-[9px] text-slate-400 block">DATABASE</span>
                    <span>PostgreSQL</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Highlights */}
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-3 font-semibold">
              ENGINEERING HIGHLIGHTS &amp; ARCHITECTURE
            </span>
            <div className="space-y-2.5">
              {project.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 font-light">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 text-emerald-400" />
                  </div>
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Breakdown */}
          {project.techCategories && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-semibold">
                  SYSTEM &amp; TECH STACK
                </span>
                <span className="text-[10px] font-mono text-slate-500">Click any badge for tech drawer</span>
              </div>
              <div className="space-y-2 text-xs font-mono">
                {project.techCategories.frontend && (
                  <div>
                    <span className="text-slate-500 block mb-1">Frontend / Client:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.techCategories.frontend.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => onOpenTech && onOpenTech(t)}
                          className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-slate-300 hover:border-sky-400/50 hover:bg-sky-500/10 hover:text-white transition-all cursor-pointer"
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {project.techCategories.backend && (
                  <div>
                    <span className="text-slate-500 block mb-1 mt-2">Backend &amp; Database:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.techCategories.backend.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => onOpenTech && onOpenTech(t)}
                          className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-slate-300 hover:border-emerald-400/50 hover:bg-emerald-500/10 hover:text-white transition-all cursor-pointer"
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {project.techCategories.extension && (
                  <div>
                    <span className="text-slate-500 block mb-1 mt-2">Browser Extension:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.techCategories.extension.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => onOpenTech && onOpenTech(t)}
                          className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-slate-300 hover:border-indigo-400/50 hover:bg-indigo-500/10 hover:text-white transition-all cursor-pointer"
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {project.techCategories.core && (
                  <div>
                    <span className="text-slate-500 block mb-1 mt-2">Core Engine &amp; Algorithms:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.techCategories.core.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => onOpenTech && onOpenTech(t)}
                          className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-slate-300 hover:border-amber-400/50 hover:bg-amber-500/10 hover:text-white transition-all cursor-pointer"
                        >
                          {t}
                        </button>
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
