"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { 
  Laptop, 
  Server, 
  Database, 
  Cloud, 
  Zap
} from "lucide-react";

interface SystemNode {
  id: string;
  name: string;
  role: string;
  tech: string;
  icon: React.ElementType;
  metric: string;
  status: string;
}

const SYSTEM_NODES: SystemNode[] = [
  {
    id: "frontend",
    name: "Frontend",
    role: "Client & Native UI",
    tech: "React • React Native",
    icon: Laptop,
    metric: "<16ms UI frame render",
    status: "Active",
  },
  {
    id: "backend",
    name: "Backend",
    role: "APIs & Real-Time Bus",
    tech: "Node.js • Socket.io",
    icon: Server,
    metric: "<25ms event dispatch",
    status: "Connected",
  },
  {
    id: "database",
    name: "Database",
    role: "Normalized Persistence",
    tech: "PostgreSQL • Prisma",
    metric: "Indexed cursor queries",
    icon: Database,
    status: "Healthy",
  },
  {
    id: "cloud",
    name: "Cloud",
    role: "Infrastructure & Edge",
    tech: "AWS EC2 • S3 Storage",
    icon: Cloud,
    metric: "99.9% uptime SLA",
    status: "Deployed",
  },
];

export function SystemPipelineHero() {
  const [activeNode, setActiveNode] = useState<string>("backend");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const selectedNodeData = SYSTEM_NODES.find((n) => n.id === activeNode) || SYSTEM_NODES[1];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full rounded-2xl bg-[#08090d]/90 border border-white/[0.08] p-5 sm:p-6 lg:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl transition-all duration-300 group"
      style={{
        transform: `perspective(1000px) rotateX(${mousePos.y * -4}deg) rotateY(${mousePos.x * 5}deg)`,
      }}
    >
      {/* Subtle top hairline highlight */}
      <div className="absolute top-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-sky-400/25 to-transparent pointer-events-none" />

      {/* Header bar */}
      <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/[0.06] text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-slate-300 uppercase tracking-widest text-[11px] font-semibold">
            System Architecture Pipeline
          </span>
        </div>

        <div className="flex items-center gap-3 text-[10px] text-slate-500">
          <span className="hidden sm:inline">END-TO-END DATAFLOW</span>
          <span className="px-2 py-0.5 rounded bg-white/[0.04] text-sky-400 border border-white/[0.06]">
            LATENCY: 14ms
          </span>
        </div>
      </div>

      {/* Interactive 4-Station Flow: Frontend -> Backend -> Database -> Cloud */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 relative z-10">
        {SYSTEM_NODES.map((node, idx) => {
          const Icon = node.icon;
          const isSelected = activeNode === node.id;

          return (
            <div key={node.id} className="relative flex flex-col items-center">
              {/* Card button */}
              <button
                type="button"
                onClick={() => setActiveNode(node.id)}
                onMouseEnter={() => setActiveNode(node.id)}
                className={`w-full p-3.5 sm:p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? "bg-[#0f131d] border-sky-400/50 shadow-[0_0_20px_rgba(56,189,248,0.12),inset_0_1px_0_rgba(255,255,255,0.1)]"
                    : "bg-[#0b0d13]/70 border-white/[0.06] hover:bg-[#0e111a] hover:border-white/15"
                }`}
              >
                {/* Active glow pip */}
                {isSelected && (
                  <motion.div
                    layoutId="activeStationGlow"
                    className="absolute top-0 right-0 w-16 h-16 bg-sky-500/10 rounded-bl-full pointer-events-none"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}

                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`p-2 rounded-lg border transition-colors ${
                      isSelected
                        ? "bg-sky-500/20 border-sky-400/40 text-sky-300"
                        : "bg-white/[0.03] border-white/[0.06] text-slate-400"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">
                    0{idx + 1}
                  </span>
                </div>

                <div className="text-sm font-semibold text-white tracking-tight mb-0.5">
                  {node.name}
                </div>
                <div className="text-[11px] font-mono text-slate-400 mb-2 truncate">
                  {node.tech}
                </div>

                <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-500">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isSelected ? "bg-emerald-400 animate-pulse" : "bg-slate-600"
                    }`}
                  />
                  <span>{node.status}</span>
                </div>
              </button>

              {/* Connecting arrow line on desktop */}
              {idx < SYSTEM_NODES.length - 1 && (
                <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
                  <span className="w-4 h-[1px] bg-slate-700 block" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Real-time packet bus flow animation indicator */}
      <div className="mt-4 pt-3.5 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-[11px] font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <Zap className="w-3.5 h-3.5 text-sky-400" />
          <span className="text-slate-300 font-medium">{selectedNodeData.name} Inspection:</span>
          <span className="text-sky-300">{selectedNodeData.metric}</span>
        </div>

        <div className="flex items-center gap-2 text-[10px] text-slate-500">
          <span>PIPELINE: STREAMING</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>ZERO DROP FRAMES</span>
        </div>
      </div>
    </div>
  );
}
