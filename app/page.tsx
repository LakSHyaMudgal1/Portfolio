"use client";

import React from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CustomCursor } from "@/components/CustomCursor";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { EngineeringStack } from "@/components/EngineeringStack";
import { ProblemSolving } from "@/components/ProblemSolving";
import { OpenSource } from "@/components/OpenSource";
import { Achievements } from "@/components/Achievements";
import { Leadership } from "@/components/Leadership";
import { ContactSection } from "@/components/ContactSection";
import { CurrentlySection } from "@/components/CurrentlySection";
import { Footer } from "@/components/Footer";

// Global Interactive Modules & Modals
import { PortfolioProvider, usePortfolio } from "@/context/PortfolioContext";
import { CommandPalette } from "@/components/CommandPalette";
import { RecruiterModeView } from "@/components/RecruiterModeView";
import { ArchitectureReplayModal } from "@/components/ArchitectureReplayModal";
import { ProjectStoryModal } from "@/components/ProjectStoryModal";
import { TechDepthDrawer } from "@/components/TechDepthDrawer";
import { ProjectCompareModal } from "@/components/ProjectCompareModal";
import { TerminalModal } from "@/components/TerminalModal";
import { ResumeDrawer } from "@/components/ResumeDrawer";
import { KeyboardShortcutsModal } from "@/components/KeyboardShortcutsModal";
import { ModeTransitionOverlay } from "@/components/ModeTransitionOverlay";
import { SideScrollProgress } from "@/components/SideScrollProgress";
import { IntroLoader } from "@/components/IntroLoader";

export default function Home() {
  return (
    <PortfolioProvider>
      <PortfolioApp />
    </PortfolioProvider>
  );
}

function PortfolioApp() {
  const { mode, isCommandPaletteOpen, setIsCommandPaletteOpen } = usePortfolio();
  const { scrollYProgress } = useScroll();

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-[#08090d] text-[#f8fafc] flex flex-col selection:bg-sky-500/20 selection:text-white overflow-x-clip w-full">
        {/* Short branded technical initialization */}
        <IntroLoader />

        {/* Cinematic mode transition sweep */}
        <ModeTransitionOverlay />

        {/* Global Side Section Progress Indicator */}
        <SideScrollProgress />

        {/* Subtle Global Scroll Progress Line */}
        <motion.div
          style={{ scaleX: scrollYProgress }}
          className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-sky-400 via-indigo-500 to-emerald-400 z-[120] origin-left pointer-events-none"
        />

        {/* Contextual Desktop Cursor with VIEW, OPEN, EXPLORE states */}
        <CustomCursor />

        {/* Adaptive Navbar with Experience Switcher */}
        <Navbar onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />

        {/* Command Palette */}
        <CommandPalette
          isOpen={isCommandPaletteOpen}
          onClose={() => setIsCommandPaletteOpen(false)}
        />

        {/* Global Interactive Overlays */}
        <ArchitectureReplayModal />
        <ProjectStoryModal />
        <TechDepthDrawer />
        <ProjectCompareModal />
        <TerminalModal />
        <ResumeDrawer />
        <KeyboardShortcutsModal />

        {/* Main Content Area: Smooth transformation between Recruiter and Explore/Engineering Modes */}
        <AnimatePresence mode="wait">
          {mode === "recruiter" ? (
            <motion.div
              key="recruiter-mode"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex-1 pt-24"
            >
              <RecruiterModeView />
            </motion.div>
          ) : (
            <motion.div
              key="standard-modes"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex-1"
            >
              <main>
                <Hero />
                <ProjectShowcase />
                <ExperienceTimeline />
                <ProblemSolving />
                <Achievements />
                <OpenSource />
                <EngineeringStack />
                <About />
                {/* Requirement 17: "Currently" / NOW Status Dashboard */}
                <CurrentlySection />
                <Leadership />
                <ContactSection />
              </main>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Editorial Footer with Keyboard Shortcut Hint */}
        <Footer />
      </div>
    </SmoothScroll>
  );
}
