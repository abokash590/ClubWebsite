"use client";

import "./VibeSwitcher.css";
import { useAccent } from "@/components/AccentProvider";
import { VIBE_ORDER } from "@/lib/accent-themes";

export function VibeSwitcher() {
  const { currentVibe, setManualVibe } = useAccent();

  return (
    <div className="vibe-switcher">
      {VIBE_ORDER.map((vibe) => (
        <button
          key={vibe}
          className={`vibe-dot vibe-dot--${vibe} ${currentVibe === vibe ? "vibe-dot--active" : ""}`}
          onClick={() => setManualVibe(vibe)}
          aria-label={`Set theme to ${vibe}`}
          title={vibe}
        />
      ))}
    </div>
  );
}
