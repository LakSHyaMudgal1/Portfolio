"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { PERSONAL_INFO } from "@/lib/data";

export type PortfolioMode = "explore" | "recruiter" | "engineering";

interface PortfolioContextType {
  mode: PortfolioMode;
  setMode: (mode: PortfolioMode) => void;
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;
  isTerminalOpen: boolean;
  setIsTerminalOpen: (open: boolean) => void;
  isResumeDrawerOpen: boolean;
  setIsResumeDrawerOpen: (open: boolean) => void;
  isCompareOpen: boolean;
  setIsCompareOpen: (open: boolean) => void;
  isShortcutsOpen: boolean;
  setIsShortcutsOpen: (open: boolean) => void;
  selectedTechDrawer: string | null;
  setSelectedTechDrawer: (tech: string | null) => void;
  selectedStoryProject: string | null;
  setSelectedStoryProject: (projectId: string | null) => void;
  selectedReplayProject: string | null;
  setSelectedReplayProject: (projectId: string | null) => void;
  cursorLabel: string | null;
  setCursorLabel: (label: string | null) => void;
  isTransitioningMode: boolean;
  changeModeWithTransition: (newMode: PortfolioMode) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<PortfolioMode>("explore");
  const [isTransitioningMode, setIsTransitioningMode] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isResumeDrawerOpen, setIsResumeDrawerOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [selectedTechDrawer, setSelectedTechDrawer] = useState<string | null>(null);
  const [selectedStoryProject, setSelectedStoryProject] = useState<string | null>(null);
  const [selectedReplayProject, setSelectedReplayProject] = useState<string | null>(null);
  const [cursorLabel, setCursorLabel] = useState<string | null>(null);

  const changeModeWithTransition = (newMode: PortfolioMode) => {
    if (newMode === mode) return;
    setIsTransitioningMode(true);
    setMode(newMode);
    setTimeout(() => {
      setIsTransitioningMode(false);
    }, 750);
  };

  // Global Keyboard Shortcuts (Keyboard-first navigation)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Allow Ctrl+K / Cmd+K everywhere
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
        return;
      }

      // Check if user is typing in an editable field
      const activeEl = document.activeElement;
      const isInput =
        activeEl &&
        (activeEl.tagName === "INPUT" ||
          activeEl.tagName === "TEXTAREA" ||
          activeEl.tagName === "SELECT" ||
          (activeEl as HTMLElement).isContentEditable);

      if (isInput) return;

      // Global single-key navigation
      if (e.key === "1") {
        document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
      } else if (e.key === "2") {
        document.querySelector("#experience")?.scrollIntoView({ behavior: "smooth" });
      } else if (e.key === "3") {
        document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
      } else if (e.key === "4") {
        document.querySelector("#skills")?.scrollIntoView({ behavior: "smooth" });
      } else if (e.key === "5") {
        document.querySelector("#achievements")?.scrollIntoView({ behavior: "smooth" });
      } else if (e.key === "6") {
        document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
      } else if (e.key === "g" || e.key === "G") {
        window.open(PERSONAL_INFO.socials.github, "_blank");
      } else if (e.key === "l" || e.key === "L") {
        window.open(PERSONAL_INFO.socials.linkedin, "_blank");
      } else if (e.key === "c" || e.key === "C") {
        window.open(PERSONAL_INFO.socials.leetcode, "_blank");
      } else if (e.key === "r" || e.key === "R") {
        setIsResumeDrawerOpen((prev) => !prev);
      } else if (e.key === "?") {
        e.preventDefault();
        setIsShortcutsOpen((prev) => !prev);
      } else if (e.key === "~" || e.key === "`") {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <PortfolioContext.Provider
      value={{
        mode,
        setMode,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        isTerminalOpen,
        setIsTerminalOpen,
        isResumeDrawerOpen,
        setIsResumeDrawerOpen,
        isCompareOpen,
        setIsCompareOpen,
        isShortcutsOpen,
        setIsShortcutsOpen,
        selectedTechDrawer,
        setSelectedTechDrawer,
        selectedStoryProject,
        setSelectedStoryProject,
        selectedReplayProject,
        setSelectedReplayProject,
        cursorLabel,
        setCursorLabel,
        isTransitioningMode,
        changeModeWithTransition,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
}
