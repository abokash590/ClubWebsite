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

const ROTATION_INTERVAL = 30_000; // 30 seconds

interface AccentContextValue {
  currentVibe: VibeName;
}

const AccentContext = createContext<AccentContextValue>({ currentVibe: "lime" });

export function useAccent() {
  return useContext(AccentContext);
}

export function AccentProvider({ children }: { children: React.ReactNode }) {
  const [vibeIndex, setVibeIndex] = useState(0);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

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
  }, []); // Only run once — never reset on mode toggle

  return (
    <AccentContext.Provider value={{ currentVibe }}>
      {children}
    </AccentContext.Provider>
  );
}
