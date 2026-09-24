"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const [cursorText, setCursorText] = useState<string | null>(null);

  const cursorX = useSpring(0, { damping: 28, stiffness: 350 });
  const cursorY = useSpring(0, { damping: 28, stiffness: 350 });

  useEffect(() => {
    // Only enable on pointer-fine devices without reduced motion
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!hasFinePointer || prefersReducedMotion) {
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const interactive = target.closest("a, button, [role='button'], input, textarea, .cursor-pointer, [data-cursor-interactive], [data-cursor]");
      setIsHovered(!!interactive);

      // Check contextual cursor state
      const cursorTarget = target.closest("[data-cursor]") as HTMLElement | null;
      if (cursorTarget) {
        setCursorText(cursorTarget.getAttribute("data-cursor"));
      } else {
        const ghLink = target.closest("a[href*='github.com']");
        const extLink = target.closest("a[target='_blank']");
        const archElement = target.closest("[data-arch-node], [data-replay-node]");

        if (archElement) {
          setCursorText("EXPLORE");
        } else if (ghLink || extLink) {
          setCursorText("OPEN");
        } else {
          setCursorText(null);
        }
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousemove", handleElementHover);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousemove", handleElementHover);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
      {/* Outer subtle ring / text capsule */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isClicking ? 0.85 : isHovered ? 1.4 : 1,
          opacity: isHovered ? 0.9 : 0.35,
          borderColor: isHovered ? "rgba(56, 189, 248, 0.85)" : "rgba(255, 255, 255, 0.4)",
        }}
        transition={{ duration: 0.15 }}
        className={`rounded-full border backdrop-blur-[1px] flex items-center justify-center transition-all ${
          cursorText
            ? "px-2.5 py-1 w-auto h-auto rounded-full bg-slate-950/80 border-sky-400 text-sky-300 font-mono text-[9px] tracking-wider uppercase shadow-lg shadow-sky-500/20"
            : "w-8 h-8"
        }`}
      >
        {cursorText && (
          <span className="font-semibold select-none">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Center dot (only when no label) */}
      {!cursorText && (
        <motion.div
          style={{
            x: cursorX,
            y: cursorY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          animate={{
            scale: isClicking ? 0.5 : isHovered ? 0 : 1,
            opacity: isHovered ? 0 : 1,
          }}
          transition={{ duration: 0.1 }}
          className="w-1.5 h-1.5 rounded-full bg-sky-400 absolute"
        />
      )}
    </div>
  );
}
