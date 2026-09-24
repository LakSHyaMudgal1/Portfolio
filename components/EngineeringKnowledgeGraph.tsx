"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Network, Sparkles, Layers, Cpu, Database, Server, Cloud, Radio } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";

interface GraphLayer {
  id: string;
  name: string;
  icon: React.ElementType;
  techs: string[];
  projects: string[];
  connections: string[];
}

const GRAPH_LAYERS: GraphLayer[] = [
  {
    id: "frontend",
    name: "Frontend & UI",
    icon: Layers,
    techs: ["React.js", "Vite", "Tailwind CSS", "Redux Toolkit"],
    projects: ["CargoXpress", "TabTrack", "OS Scheduler"],
    connections: ["backend", "realtime"],
  },
  {
    id: "backend",
    name: "Backend APIs",
    icon: Server,
    techs: ["Node.js", "Express.js", "REST APIs", "JWT / RBAC"],
    projects: ["CargoXpress", "TabTrack", "Infinito Comics"],
    connections: ["frontend", "databases", "cloud"],
  },
  {
    id: "realtime",
    name: "Real-time Systems",
    icon: Radio,
    techs: ["Socket.IO", "WebSockets", "Chrome Manifest V3"],
    projects: ["TabTrack"],
    connections: ["frontend", "backend"],
  },
  {
    id: "databases",
    name: "Databases & State",
    icon: Database,
    techs: ["MongoDB", "Mongoose", "PostgreSQL"],
    projects: ["CargoXpress", "TabTrack"],
    connections: ["backend", "cloud"],
  },
  {
    id: "cloud",
    name: "Cloud & Infrastructure",
    icon: Cloud,
    techs: ["AWS EC2", "Amazon S3", "Hostinger VPS", "Reverse Proxy"],
    projects: ["Infinito Comics"],
    connections: ["backend", "databases"],
  },
  {
    id: "systems",
    name: "Systems & Architecture",
    icon: Cpu,
    techs: ["C++17", "TLB Hardware Modeling", "Virtual Memory"],
    projects: ["OS Scheduler", "TLB Simulator"],
    connections: ["algorithms"],
  },
  {
    id: "algorithms",
    name: "Algorithms & Simulation",
    icon: Network,
    techs: ["CPU Schedulers", "LRU/FIFO Eviction", "Route Merging Knapsack"],
    projects: ["CargoXpress", "OS Scheduler", "TLB Simulator"],
    connections: ["systems"],
  },
];

interface EngineeringKnowledgeGraphProps {
  onSelectTech?: (tech: string) => void;
}

export function EngineeringKnowledgeGraph({ onSelectTech }: EngineeringKnowledgeGraphProps = {}) {
  const [hoveredLayer, setHoveredLayer] = useState<string | null>(null);
  const { setSelectedTechDrawer } = usePortfolio();

  const handleSelectTech = (t: string) => {
    if (onSelectTech) {
      onSelectTech(t);
    } else {
      setSelectedTechDrawer(t);
    }
  };

  return (
    <div className="mt-20 p-6 sm:p-10 rounded-3xl bg-[#07090e] border border-white/[0.08] shadow-2xl relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-sky-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 mb-8 border-b border-white/[0.06] relative z-10">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest uppercase text-sky-400 font-semibold mb-2">
            <Network className="w-3.5 h-3.5" />
            <span>HOW I BUILD // ARCHITECTURE KNOWLEDGE GRAPH</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Interconnected system layers.
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-slate-400 font-light max-w-xl">
            Hover over any architectural layer to inspect connected technologies, protocols, and production projects.
          </p>
        </div>

        <div className="text-[11px] font-mono text-slate-500">
          7 Connected Subsystems
        </div>
      </div>

      {/* Interactive Matrix of Connected Nodes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 relative z-10">
        {GRAPH_LAYERS.map((layer) => {
          const isHovered = hoveredLayer === layer.id;
          const isConnected = hoveredLayer
            ? layer.connections.includes(hoveredLayer) ||
              GRAPH_LAYERS.find((l) => l.id === hoveredLayer)?.connections.includes(layer.id)
            : false;
          const isDimmed = hoveredLayer && !isHovered && !isConnected;

          const Icon = layer.icon;

          return (
            <motion.div
              key={layer.id}
              onMouseEnter={() => setHoveredLayer(layer.id)}
              onMouseLeave={() => setHoveredLayer(null)}
              animate={{
                opacity: isDimmed ? 0.35 : 1,
                scale: isHovered ? 1.02 : 1,
              }}
              transition={{ duration: 0.2 }}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                isHovered
                  ? "bg-[#0f1422] border-sky-400/50 shadow-[0_0_20px_rgba(56,189,248,0.15)]"
                  : isConnected
                  ? "bg-[#0b101c] border-indigo-400/40"
                  : "bg-[#090b12] border-white/[0.06]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/[0.05]">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-mono font-semibold text-white">
                      {layer.name}
                    </span>
                  </div>

                  {isHovered && (
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
                  )}
                </div>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {layer.techs.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectTech(t);
                      }}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.03] hover:bg-white/10 text-slate-300 hover:text-white border border-white/[0.06] transition-colors cursor-pointer"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Projects Utilizing this Layer */}
              <div className="pt-2 border-t border-white/[0.05]">
                <span className="text-[9px] font-mono uppercase tracking-widest text-slate-500 block mb-1">
                  DEPLOYED IN:
                </span>
                <div className="flex flex-wrap gap-1 text-[10px] font-mono text-emerald-400">
                  {layer.projects.map((p) => (
                    <span key={p} className="bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer Insight */}
      <div className="mt-8 pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-slate-500 relative z-10">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-sky-400" />
          <span>Click any technology badge to inspect implementation patterns &amp; architecture notes.</span>
        </div>
        <span>Zero-fluff full-stack topology</span>
      </div>
    </div>
  );
}
