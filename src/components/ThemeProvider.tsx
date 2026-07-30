"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { AccentProvider } from "./AccentProvider";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute={["class", "data-theme"]}
      defaultTheme="light"
      enableSystem
    >
      <AccentProvider>{children}</AccentProvider>
    </NextThemesProvider>
  );
}
