"use client";

import { useEffect } from "react";
import { pauseLenis, resumeLenis } from "@/components/SmoothScroll";

let lockCount = 0;
let savedScrollY = 0;

/**
 * Reusable scroll lock hook for modals, drawers, command palettes, and overlays.
 * Prevents background scroll leaking, preserves window scrollY position without layout jump,
 * compensates for scrollbar width, and integrates with Lenis smooth scroll.
 */
export function useScrollLock(isOpen: boolean) {
  useEffect(() => {
    if (!isOpen) return;

    if (lockCount === 0) {
      savedScrollY = window.scrollY || window.pageYOffset || 0;
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

      document.body.style.position = "fixed";
      document.body.style.top = `-${savedScrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";

      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }

      pauseLenis();
    }

    lockCount++;

    return () => {
      lockCount = Math.max(0, lockCount - 1);

      if (lockCount === 0) {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";

        window.scrollTo(0, savedScrollY);
        resumeLenis();
      }
    };
  }, [isOpen]);
}
