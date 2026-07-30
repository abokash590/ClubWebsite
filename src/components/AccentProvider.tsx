"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { useTheme } from "next-themes";
import {
  VIBE_ORDER,
  applyAccentTokens,
  type VibeName,
} from "@/lib/accent-themes";

const ROTATION_INTERVAL = 8_000; // 8 seconds for dynamic feel

interface AccentContextValue {
  currentVibe: VibeName;
  setManualVibe: (vibe: VibeName) => void;
  cycleManualVibe: () => void;
  isManual: boolean;
}

const AccentContext = createContext<AccentContextValue>({ 
  currentVibe: "lime",
  setManualVibe: () => {},
  cycleManualVibe: () => {},
  isManual: false
});

export function useAccent() {
  return useContext(AccentContext);
}

export function AccentProvider({ children }: { children: React.ReactNode }) {
  const [vibeIndex, setVibeIndex] = useState(0);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isManual, setIsManual] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const setManualVibe = useCallback((vibe: VibeName) => {
    setIsManual(true);
    const index = VIBE_ORDER.indexOf(vibe);
    if (index !== -1) {
      setVibeIndex(index);
    }
  }, []);

  const cycleManualVibe = useCallback(() => {
    setIsManual(true);
    setVibeIndex((prev) => (prev + 1) % VIBE_ORDER.length);
  }, []);

  const currentVibe = VIBE_ORDER[vibeIndex];
  const mode = (resolvedTheme === "light" ? "light" : "dark") as
    | "light"
    | "dark";

  // Mark mounted to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Apply accent tokens whenever vibe or mode changes
  const applyTokens = useCallback(() => {
    if (!mounted) return;
    applyAccentTokens(currentVibe, mode);
  }, [currentVibe, mode, mounted]);

  useEffect(() => {
    applyTokens();
  }, [applyTokens]);

  // Start the rotation interval (independent of mode toggle)
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setVibeIndex((prev) => (prev + 1) % VIBE_ORDER.length);
    }, ROTATION_INTERVAL);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []); // Continuous loop

  return (
    <AccentContext.Provider value={{ currentVibe, setManualVibe, cycleManualVibe, isManual }}>
      {children}
    </AccentContext.Provider>
  );
}
