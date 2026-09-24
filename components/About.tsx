"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { StatItem } from "./StatsCounter";
import { PERSONAL_INFO } from "@/lib/data";
import { Database, Globe, Layers, Server, ShieldCheck, Zap } from "lucide-react";

const CAPABILITY_PILLARS = [
  {
    icon: Layers,
    title: "Full-Stack Development",
    desc: "End-to-end web & mobile product architecture using TypeScript, React, React Native and Node.js.",
    badge: "Core Focus",
  },
  {
    icon: Zap,
    title: "Real-Time Systems",
    desc: "Low-latency bidirectional WebSocket communication, live presence sync, and event-driven data flow.",
    badge: "Socket.io",
  },
  {
    icon: Server,
    title: "REST APIs & Backend",
    desc: "Modular RESTful microservices, stateful/stateless auth, rate limiting, and structured validation.",
    badge: "Express.js",
  },
  {
    icon: Database,
    title: "Databases & ORM",
    desc: "Relational modeling in PostgreSQL with Prisma, schema design in MongoDB, and indexed queries.",
    badge: "PostgreSQL",
  },
  {
    icon: Globe,
    title: "Cloud & Infrastructure",
    desc: "Production deployments on AWS EC2, S3 media buckets, Hostinger VPS, reverse proxies and TLS.",
    badge: "AWS EC2",
  },
  {
    icon: ShieldCheck,
    title: "Problem Solving & OS",
    desc: "1058+ problems solved, LeetCode Knight (1910), and verified open-source contributions to CNCF Meshery & Juspay.",
    badge: "Algorithms",
  },
];

export function About() {
  return (
    <section id="about" className="py-28 md:py-36 relative border-t border-white/[0.06] bg-[#050608]">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Heading */}
        <SectionHeading
          number="// 07"
          eyebrow="ENGINEERING PHILOSOPHY & BACKGROUND"
          title="Engineering with curiosity, building with intent."
          description="A look into my engineering principles, technical breadth, and focus on scalable systems."
        />

        {/* Narrative & Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start mb-20">
          
          {/* Left Narrative Column */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-6 text-slate-300 text-lg leading-relaxed font-light"
          >
            <p className="text-xl sm:text-2xl text-white font-normal leading-snug">
              I am a final-year Information Technology undergraduate at{" "}
              <span className="text-sky-300 font-medium">IIIT Una</span> who approaches software engineering as a craft of balancing clean system architecture with real-world product reliability.
            </p>

            <p>
              My work spans the full stack: from designing fluid, responsive user interfaces in{" "}
              <strong className="text-white font-medium">React and React Native</strong> to architecting resilient backends with{" "}
              <strong className="text-white font-medium">Node.js, Express, Socket.io, and PostgreSQL</strong>.
            </p>

            <p>
              Whether it&apos;s implementing persistent real-time messaging with sub-100ms response times, optimizing logistics algorithms to cut wasted freight capacity by 40%, or deploying containerized services on{" "}
              <strong className="text-white font-medium">AWS EC2</strong>, I focus on solving hard architectural challenges with rigorous code hygiene.
            </p>

            <div className="pt-4 flex flex-wrap gap-2 text-[11px] font-mono text-slate-400">
              <span className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08]">Full-Stack Development</span>
              <span className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08]">REST APIs</span>
              <span className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08]">Real-Time Systems</span>
              <span className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08]">PostgreSQL & Prisma</span>
              <span className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08]">AWS & Cloud Deployments</span>
              <span className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08]">Algorithmic Problem Solving</span>
              <span className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08]">Open Source</span>
            </div>
          </motion.div>

          {/* Right Capability Pillars Column */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3"
          >
            {CAPABILITY_PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="p-4 rounded-xl bg-[#090b10] border border-white/[0.06] hover:border-white/18 hover:bg-[#0d1017] transition-all group shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                >
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 group-hover:scale-105 transition-transform shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h4 className="text-sm font-semibold text-white tracking-tight">
                        {pillar.title}
                      </h4>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-slate-400">
                      {pillar.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed pl-11">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Technical Stats Row with Animated Count-Up */}
        <div className="pt-10 border-t border-white/[0.06]">
          <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
            <span>VERIFIED PERFORMANCE METRICS</span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {PERSONAL_INFO.stats.map((stat) => (
              <StatItem
                key={stat.label}
                label={stat.label}
                value={stat.value}
                suffix={stat.suffix}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
