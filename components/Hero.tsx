"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, type Variants, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from "@/components/Icons";
import { PERSONAL_INFO } from "@/lib/data";
import { SystemPipelineHero } from "./SystemPipelineHero";
import { Magnetic } from "./MagneticButton";

const CORE_STACK = [
  { name: "React / Next.js", highlight: true },
  { name: "Node.js / Express", highlight: true },
  { name: "TypeScript", highlight: true },
  { name: "PostgreSQL", highlight: false },
  { name: "Socket.io", highlight: false },
  { name: "AWS EC2", highlight: false },
];

const RECRUITER_SIGNALS = [
  {
    tag: "EDUCATION & DEGREE",
    title: "Final-Year B.Tech IT",
    subtitle: "IIIT Una ('26) • Full-Stack Focus",
    href: "#about",
    accent: "text-sky-300",
  },
  {
    tag: "REAL-WORLD PRODUCTION",
    title: "Infinito Comics",
    subtitle: "Full-Stack Intern • AWS EC2 & Media",
    href: "#experience",
    accent: "text-indigo-300",
  },
  {
    tag: "ENGINEERING PROJECTS",
    title: "CargoXpress & TabTrack",
    subtitle: "Logistics Engine • Collaborative Sync",
    href: "#projects",
    accent: "text-emerald-300",
  },
  {
    tag: "ALGORITHMS & OPEN SOURCE",
    title: "Knight (1910) • Hack 5.0",
    subtitle: "1058+ Solved • CNCF & Juspay",
    href: "#problem-solving",
    accent: "text-amber-300",
  },
];

export function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Subtle visual parallax and scroll-linked hero transformation
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const headlineScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.94]);
  const headlineY = useTransform(scrollYProgress, [0, 0.8], [0, -35]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.25]);
  const pipelineScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);
  const pipelineRotate = useTransform(scrollYProgress, [0, 0.8], [0, -1.2]);
  const consoleY = useTransform(scrollYProgress, [0, 1], [0, -20]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Subtle radial spotlight tracking around cursor
      setMousePos({
        x: e.clientX,
        y: e.clientY,
      });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Animation variants for subtle staggered text reveal
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  // Split-text word reveal variant with blur and translateY
  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-[96vh] flex flex-col justify-center pt-28 sm:pt-32 pb-20 overflow-hidden bg-[#050608]"
    >
      {/* Background Engineering Grid with Subtle Scroll Parallax */}
      <motion.div 
        style={{ y: gridY }}
        className="absolute inset-0 engineering-grid opacity-30 pointer-events-none" 
      />

      {/* Dynamic ambient spotlight following cursor with subtle opacity */}
      <div
        className="pointer-events-none absolute -inset-px opacity-35 transition-opacity duration-300 hidden md:block"
        style={{
          background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(56, 189, 248, 0.05), transparent 75%)`,
        }}
      />

      {/* Fixed soft top ambient illumination */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[340px] bg-gradient-to-b from-sky-500/8 via-indigo-500/4 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        {/* Main Hero Header Stack */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center max-w-4xl mx-auto mb-10 sm:mb-12"
        >
          {/* Eyebrow / Positioning Tag */}
          <motion.div variants={itemVariants} className="mb-6">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.035] border border-white/[0.08] text-[11px] font-mono tracking-[0.14em] text-slate-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
              <span>FINAL-YEAR B.TECH IT</span>
              <span className="text-slate-600 font-sans">•</span>
              <span>IIIT UNA &apos;26</span>
              <span className="text-slate-600 font-sans">•</span>
              <span className="text-sky-300">FULL-STACK SWE</span>
            </div>
          </motion.div>

          {/* Oversized Headline with Purposeful Visual Emphasis & Split-Word Motion */}
          <motion.h1
            style={{ scale: headlineScale, y: headlineY, opacity: headlineOpacity }}
            variants={itemVariants}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-[5.85rem] xl:text-[6.4rem] font-bold text-white tracking-[-0.04em] leading-[0.94] mb-6 select-none"
          >
            <motion.span variants={wordVariants} className="inline-block">Building&nbsp;</motion.span>
            {/* Elegant emphasis on 'products' */}
            <motion.span variants={wordVariants} className="relative inline-block">
              <span className="bg-gradient-to-b from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                products
              </span>
              <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-slate-400/50 to-transparent rounded-full pointer-events-none" />
            </motion.span>
            <motion.span variants={wordVariants} className="inline-block">,</motion.span>
            <br className="hidden sm:inline" />
            <motion.span variants={wordVariants} className="inline-block sm:ml-2">solving&nbsp;</motion.span>
            {/* Elegant emphasis on 'problems' */}
            <motion.span variants={wordVariants} className="relative inline-block">
              <span className="bg-gradient-to-r from-sky-300 via-indigo-200 to-slate-100 bg-clip-text text-transparent">
                problems
              </span>
              <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-sky-400/60 to-transparent rounded-full pointer-events-none" />
            </motion.span>
            <motion.span variants={wordVariants} className="inline-block text-sky-400">.</motion.span>
          </motion.h1>

          {/* Editorial Subheading tailored for immediate recruiter clarity */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl text-slate-300 font-light leading-relaxed max-w-2xl mb-6 text-balance"
          >
            Final-year B.Tech IT student at <span className="text-white font-medium">IIIT Una</span> specializing in <span className="text-sky-300 font-medium">React, Node.js, and TypeScript</span>. Real-world production internship experience, high-throughput real-time architectures, and open-source contributions.
          </motion.p>

          {/* Core Tech Stack Badges Strip */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-2 mb-8 max-w-xl"
          >
            <span className="text-[10px] font-mono tracking-widest uppercase text-slate-500 mr-1">
              Core Stack:
            </span>
            {CORE_STACK.map((tech) => (
              <span
                key={tech.name}
                className={`px-2.5 py-1 rounded-md text-xs font-mono border transition-colors ${
                  tech.highlight
                    ? "bg-sky-500/10 border-sky-500/25 text-sky-300"
                    : "bg-white/[0.03] border-white/[0.08] text-slate-300"
                }`}
              >
                {tech.name}
              </span>
            ))}
          </motion.div>

          {/* Strong CTA Button Hierarchy with Magnetic spring physics */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-3 w-full sm:w-auto mb-6"
          >
            {/* Primary Action Button (Magnetic) */}
            <Magnetic strength={10}>
              <a
                href="#projects"
                className="btn-primary-tactile px-6 py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto group shadow-xl"
              >
                <span>View Selected Work</span>
                <ArrowDown className="w-4 h-4 text-slate-700 group-hover:translate-y-0.5 transition-transform duration-200" />
              </a>
            </Magnetic>

            {/* Secondary Action Button (Magnetic) */}
            <Magnetic strength={8}>
              <a
                href="#contact"
                className="btn-secondary-tactile px-5 py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
              >
                <Mail className="w-4 h-4 text-slate-400" />
                <span>Get In Touch</span>
              </a>
            </Magnetic>

            {/* Tertiary GitHub Link (Magnetic) */}
            <Magnetic strength={8}>
              <a
                href={PERSONAL_INFO.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary-tactile px-4 py-3 rounded-xl text-xs font-mono flex items-center justify-center gap-2 cursor-pointer text-slate-300"
                title="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4 text-slate-400" />
                <span>GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
              </a>
            </Magnetic>

            {/* Quaternary LinkedIn Link (Magnetic) */}
            <Magnetic strength={8}>
              <a
                href={PERSONAL_INFO.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary-tactile px-4 py-3 rounded-xl text-xs font-mono flex items-center justify-center gap-2 cursor-pointer text-slate-300"
                title="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4 text-indigo-400" />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
              </a>
            </Magnetic>

            {/* LeetCode Social Link (Magnetic) */}
            <Magnetic strength={8}>
              <a
                href={PERSONAL_INFO.socials.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary-tactile px-4 py-3 rounded-xl text-xs font-mono flex items-center justify-center gap-2 cursor-pointer text-slate-300"
                title="LeetCode Profile"
              >
                <LeetcodeIcon className="w-4 h-4 text-amber-400" />
                <span>LeetCode</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
              </a>
            </Magnetic>
          </motion.div>

          {/* Availability Status Badge */}
          <motion.div variants={itemVariants} className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/[0.07] border border-emerald-500/20 text-xs font-mono text-emerald-400 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>{PERSONAL_INFO.status}</span>
            </div>
          </motion.div>
        </motion.div>

        {/* 20-Second Recruiter Fast-Scan HUD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto w-full mb-12"
        >
          <div className="flex items-center justify-between gap-2 px-1 mb-3">
            <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
              <span>RECRUITER 20-SECOND BRIEF // EXECUTIVE SNAPSHOT</span>
            </div>
            <span className="text-[10px] font-mono text-slate-500 hidden sm:inline">
              CLICK ANY SIGNAL TO JUMP
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {RECRUITER_SIGNALS.map((sig) => (
              <a
                key={sig.tag}
                href={sig.href}
                className="group p-3.5 sm:p-4 rounded-xl bg-[#090b10]/90 hover:bg-[#0d1017] border border-white/[0.08] hover:border-sky-500/30 transition-all text-left block shadow-lg relative overflow-hidden"
              >
                <div className="absolute top-0 left-3 right-3 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-sky-400/30 transition-colors" />
                <div className="text-[9px] font-mono text-slate-400 uppercase tracking-widest mb-1.5 flex items-center justify-between">
                  <span>{sig.tag}</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-600 group-hover:text-sky-400 transition-colors" />
                </div>
                <div className={`text-sm font-semibold text-white group-hover:${sig.accent} transition-colors tracking-tight`}>
                  {sig.title}
                </div>
                <div className="text-[11px] text-slate-400 font-mono mt-0.5 leading-snug">
                  {sig.subtitle}
                </div>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Secondary Technical System Visualization (Frontend → Backend → Database → Cloud) */}
        <motion.div
          style={{ y: consoleY, scale: pipelineScale, rotate: pipelineRotate }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto w-full"
        >
          <SystemPipelineHero />
        </motion.div>

      </div>

      {/* Bottom Scroll Indicator */}
      <div className="w-full flex justify-center mt-14 sm:mt-18">
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-slate-500 hover:text-slate-300 transition-colors group cursor-pointer"
          aria-label="Scroll to About section"
        >
          <span className="text-[10px] font-mono tracking-widest uppercase text-slate-500 group-hover:text-slate-400 transition-colors">
            Scroll to inspect
          </span>
          <div className="w-5 h-8 rounded-full border border-white/10 flex items-start justify-center p-1 group-hover:border-white/25 transition-colors">
            <motion.span
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="w-1 h-1.5 rounded-full bg-sky-400"
            />
          </div>
        </a>
      </div>

    </section>
  );
}
