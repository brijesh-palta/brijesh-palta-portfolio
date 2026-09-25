"use client";

import { useEffect } from "react";

/**
 * SecurityProvider
 * ----------------
 * This file applies LIGHT client-side deterrence only.
 * It does NOT claim to block DevTools or screenshots.
 * Purpose: UX-level protection + professional signaling.
 */

export function SecurityProvider() {
  useEffect(() => {
    // Disable right-click
    const blockContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // Disable common copy shortcuts
    const blockKeys = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey && ["c", "x", "s", "p"].includes(e.key.toLowerCase())) ||
        (e.ctrlKey && e.shiftKey)
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", blockContextMenu);
    document.addEventListener("keydown", blockKeys);

    return () => {
      document.removeEventListener("contextmenu", blockContextMenu);
      document.removeEventListener("keydown", blockKeys);
    };
  }, []);

  return null;
}
