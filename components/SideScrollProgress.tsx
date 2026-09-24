"use client";

import React, { useState, useEffect } from "react";

interface SectionMarker {
  id: string;
  num: string;
  label: string;
}

const SECTIONS: SectionMarker[] = [
  { id: "projects", num: "01", label: "WORK" },
  { id: "experience", num: "02", label: "EXPERIENCE" },
  { id: "problem-solving", num: "03", label: "ALGORITHMS" },
  { id: "achievements", num: "04", label: "HONORS" },
  { id: "skills", num: "05", label: "STACK" },
  { id: "contact", num: "06", label: "CONTACT" },
];

export function SideScrollProgress() {
  const [activeSection, setActiveSection] = useState<string>("projects");
  const [scrollPercent, setScrollPercent] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (height > 0) {
        setScrollPercent(Math.min(100, Math.max(0, (scrollY / height) * 100)));
      }

      // Check section in middle of screen
      const viewportMiddle = scrollY + window.innerHeight * 0.4;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el && el.offsetTop <= viewportMiddle) {
          setActiveSection(SECTIONS[i].id);
          return;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const activeIndex = SECTIONS.findIndex((s) => s.id === activeSection);
  const activeItem = SECTIONS[activeIndex] || SECTIONS[0];

  return (
    <>
      {/* Desktop Vertical Indicator on Right Margin */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-end gap-3 pointer-events-auto select-none">
        {/* Subtle vertical spine track */}
        <div className="absolute right-[5px] top-0 bottom-0 w-[1px] bg-white/[0.07] -z-10" />

        {SECTIONS.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              type="button"
              onClick={() => scrollTo(sec.id)}
              className="group flex items-center gap-3 py-1 cursor-pointer transition-all text-right"
              aria-label={`Scroll to ${sec.label}`}
            >
              {/* Text label revealed or highlighted */}
              <span
                className={`text-[10px] font-mono tracking-widest uppercase transition-all duration-300 ${
                  isActive
                    ? "text-sky-300 font-semibold opacity-100 translate-x-0"
                    : "text-slate-400 group-hover:text-slate-200 group-hover:opacity-100 opacity-60 translate-x-1 group-hover:translate-x-0"
                }`}
              >
                <span className="text-slate-400 mr-1.5">{sec.num}</span>
                {sec.label}
              </span>

              {/* Pin indicator dot */}
              <div
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 flex items-center justify-center ${
                  isActive
                    ? "bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.8)] scale-125"
                    : "bg-white/20 group-hover:bg-white/50 group-hover:scale-110"
                }`}
              >
                {isActive && <div className="w-1 h-1 rounded-full bg-white animate-ping" />}
              </div>
            </button>
          );
        })}
      </div>

      {/* Mobile Minimal Bottom Pill Indicator */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 xl:hidden pointer-events-none">
        <div className="px-3 py-1 rounded-full bg-[#080b12]/90 backdrop-blur-md border border-white/10 text-[10px] font-mono flex items-center gap-2 text-slate-300 shadow-xl">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
          <span className="text-white font-medium">{activeItem.num} {activeItem.label}</span>
          <span className="text-slate-400">/</span>
          <span className="text-slate-400">{Math.round(scrollPercent)}%</span>
        </div>
      </div>
    </>
  );
}
