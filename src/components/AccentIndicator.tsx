"use client";

import { useEffect, useRef } from "react";
import { useAccent } from "./AccentProvider";
import "./AccentIndicator.css";

export function AccentIndicator() {
  const { currentVibe } = useAccent();
  const barRef = useRef<HTMLDivElement>(null);

  // Restart the progress bar animation each time the vibe changes
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    // Remove class → force reflow → re-add class
    bar.classList.remove("accent-indicator__bar--animating");
    void bar.offsetWidth; // trigger reflow
    bar.classList.add("accent-indicator__bar--animating");
  }, [currentVibe]);

  return (
    <div className="accent-indicator" aria-hidden="true">
      <span className="accent-indicator__dot" />
      <span className="accent-indicator__label">{currentVibe}</span>
      <div className="accent-indicator__progress">
        <div ref={barRef} className="accent-indicator__bar" />
      </div>
    </div>
  );
}
