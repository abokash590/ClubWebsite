/**
 * Multi-Accent Cycling Theme System
 * -----------------------------------
 * 7 named accent vibes × 2 modes (light / dark).
 * Neutral tokens (surfaces, text, shadows) stay in CSS.
 * Only these accent tokens are JS-driven so they can rotate.
 */

export const VIBE_ORDER = [
  "lime",
  "mint",
  "sky",
  "amber",
  "rose",
  "violet",
  "slate",
] as const;

export type VibeName = (typeof VIBE_ORDER)[number];

export interface AccentTokens {
  logoColor: string;
  accentPrimary: string;
  accentPrimaryHover: string;
  accentPrimaryLight: string;
  accentPrimaryText: string;
  accentTextOnSurface: string;
  accentSecondary: string;
  accentSecondaryLight: string;
  borderDefault: string;
  borderHover: string;
  borderFocus: string;
  gridLines: string;
}

interface VibeDefinition {
  light: AccentTokens;
  dark: AccentTokens;
}

/* ------------------------------------------------------------------ */
/*  Helper: build border/grid tokens from an RGB triplet              */
/* ------------------------------------------------------------------ */
function borders(r: number, g: number, b: number, mode: "light" | "dark") {
  const gridOpacity = mode === "dark" ? 0.08 : 0.05;
  return {
    borderDefault: `rgba(${r}, ${g}, ${b}, 0.15)`,
    borderHover: `rgba(${r}, ${g}, ${b}, 0.3)`,
    gridLines: `rgba(${r}, ${g}, ${b}, ${gridOpacity})`,
  };
}

/* ------------------------------------------------------------------ */
/*  THEMES lookup table                                               */
/* ------------------------------------------------------------------ */
export const THEMES: Record<VibeName, VibeDefinition> = {
  /* ── Lime ─────────────────────────────────────────────────── */
  lime: {
    light: {
      logoColor: "#1A1A1A",
      accentPrimary: "#84CC16",
      accentPrimaryHover: "#65A30D",
      accentPrimaryLight: "#D9F99D",
      accentPrimaryText: "#1A1A1A", // lime is too pale for white text
      accentTextOnSurface: "#3f6212", // darkened for readability on light bg
      accentSecondary: "#84CC16",
      accentSecondaryLight: "#D9F99D",
      borderFocus: "#84CC16",
      ...borders(132, 204, 22, "light"),
    },
    dark: {
      logoColor: "#D4F429",
      accentPrimary: "#D4F429",
      accentPrimaryHover: "#bde010",
      accentPrimaryLight: "#3A4013",
      accentPrimaryText: "#0D0F0A",
      accentTextOnSurface: "#D4F429",
      accentSecondary: "#D4F429",
      accentSecondaryLight: "#3A4013",
      borderFocus: "#D4F429",
      ...borders(212, 244, 41, "dark"),
    },
  },

  /* ── Mint ─────────────────────────────────────────────────── */
  mint: {
    light: {
      logoColor: "#1A5C48",
      accentPrimary: "#2E8B6B",
      accentPrimaryHover: "#246E55",
      accentPrimaryLight: "#E5F7F0",
      accentPrimaryText: "#FFFFFF",
      accentTextOnSurface: "#2E8B6B",
      accentSecondary: "#2E8B6B",
      accentSecondaryLight: "#E5F7F0",
      borderFocus: "#2E8B6B",
      ...borders(46, 139, 107, "light"),
    },
    dark: {
      logoColor: "#34D399",
      accentPrimary: "#34D399",
      accentPrimaryHover: "#2AB882",
      accentPrimaryLight: "#0F3D30",
      accentPrimaryText: "#0D0F0A",
      accentTextOnSurface: "#34D399",
      accentSecondary: "#34D399",
      accentSecondaryLight: "#0F3D30",
      borderFocus: "#34D399",
      ...borders(52, 211, 153, "dark"),
    },
  },

  /* ── Sky ──────────────────────────────────────────────────── */
  sky: {
    light: {
      logoColor: "#1E3F8A",
      accentPrimary: "#2D5BC0",
      accentPrimaryHover: "#244A9D",
      accentPrimaryLight: "#E9F0FD",
      accentPrimaryText: "#FFFFFF",
      accentTextOnSurface: "#2D5BC0",
      accentSecondary: "#2D5BC0",
      accentSecondaryLight: "#E9F0FD",
      borderFocus: "#2D5BC0",
      ...borders(45, 91, 192, "light"),
    },
    dark: {
      logoColor: "#5B8DEF",
      accentPrimary: "#5B8DEF",
      accentPrimaryHover: "#4A78D4",
      accentPrimaryLight: "#152A4D",
      accentPrimaryText: "#0D0F0A",
      accentTextOnSurface: "#5B8DEF",
      accentSecondary: "#5B8DEF",
      accentSecondaryLight: "#152A4D",
      borderFocus: "#5B8DEF",
      ...borders(91, 141, 239, "dark"),
    },
  },

  /* ── Amber ────────────────────────────────────────────────── */
  amber: {
    light: {
      logoColor: "#8A4410",
      accentPrimary: "#B25A15",
      accentPrimaryHover: "#934A11",
      accentPrimaryLight: "#FDF0E4",
      accentPrimaryText: "#FFFFFF",
      accentTextOnSurface: "#B25A15",
      accentSecondary: "#B25A15",
      accentSecondaryLight: "#FDF0E4",
      borderFocus: "#B25A15",
      ...borders(178, 90, 21, "light"),
    },
    dark: {
      logoColor: "#F2A65A",
      accentPrimary: "#F2A65A",
      accentPrimaryHover: "#D99248",
      accentPrimaryLight: "#402711",
      accentPrimaryText: "#0D0F0A",
      accentTextOnSurface: "#F2A65A",
      accentSecondary: "#F2A65A",
      accentSecondaryLight: "#402711",
      borderFocus: "#F2A65A",
      ...borders(242, 166, 90, "dark"),
    },
  },

  /* ── Rose ─────────────────────────────────────────────────── */
  rose: {
    light: {
      logoColor: "#8A2637",
      accentPrimary: "#B23A4D",
      accentPrimaryHover: "#932F3F",
      accentPrimaryLight: "#FBE9EC",
      accentPrimaryText: "#FFFFFF",
      accentTextOnSurface: "#B23A4D",
      accentSecondary: "#B23A4D",
      accentSecondaryLight: "#FBE9EC",
      borderFocus: "#B23A4D",
      ...borders(178, 58, 77, "light"),
    },
    dark: {
      logoColor: "#F0687D",
      accentPrimary: "#F0687D",
      accentPrimaryHover: "#D45A6C",
      accentPrimaryLight: "#3D141B",
      accentPrimaryText: "#0D0F0A",
      accentTextOnSurface: "#F0687D",
      accentSecondary: "#F0687D",
      accentSecondaryLight: "#3D141B",
      borderFocus: "#F0687D",
      ...borders(240, 104, 125, "dark"),
    },
  },

  /* ── Violet ───────────────────────────────────────────────── */
  violet: {
    light: {
      logoColor: "#3E3590",
      accentPrimary: "#5A4FBF",
      accentPrimaryHover: "#4A409E",
      accentPrimaryLight: "#F0EEFB",
      accentPrimaryText: "#FFFFFF",
      accentTextOnSurface: "#5A4FBF",
      accentSecondary: "#5A4FBF",
      accentSecondaryLight: "#F0EEFB",
      borderFocus: "#5A4FBF",
      ...borders(90, 79, 191, "light"),
    },
    dark: {
      logoColor: "#8B7FE8",
      accentPrimary: "#8B7FE8",
      accentPrimaryHover: "#7A6ED0",
      accentPrimaryLight: "#251F45",
      accentPrimaryText: "#0D0F0A",
      accentTextOnSurface: "#8B7FE8",
      accentSecondary: "#8B7FE8",
      accentSecondaryLight: "#251F45",
      borderFocus: "#8B7FE8",
      ...borders(139, 127, 232, "dark"),
    },
  },

  /* ── Slate ────────────────────────────────────────────────── */
  slate: {
    light: {
      logoColor: "#3D3D3A",
      accentPrimary: "#5F5E5A",
      accentPrimaryHover: "#4D4D49",
      accentPrimaryLight: "#F1EFEA",
      accentPrimaryText: "#FFFFFF",
      accentTextOnSurface: "#5F5E5A",
      accentSecondary: "#5F5E5A",
      accentSecondaryLight: "#F1EFEA",
      borderFocus: "#5F5E5A",
      ...borders(95, 94, 90, "light"),
    },
    dark: {
      logoColor: "#B8B6AC",
      accentPrimary: "#B8B6AC",
      accentPrimaryHover: "#A3A198",
      accentPrimaryLight: "#33322D",
      accentPrimaryText: "#0D0F0A",
      accentTextOnSurface: "#B8B6AC",
      accentSecondary: "#B8B6AC",
      accentSecondaryLight: "#33322D",
      borderFocus: "#B8B6AC",
      ...borders(184, 182, 172, "dark"),
    },
  },
};

/* ------------------------------------------------------------------ */
/*  camelCase → kebab-case CSS custom property                        */
/* ------------------------------------------------------------------ */
function toKebab(key: string): string {
  return "--" + key.replace(/([A-Z])/g, "-$1").toLowerCase();
}

/**
 * Apply all accent tokens for a given vibe + mode onto the root element.
 */
export function applyAccentTokens(
  vibe: VibeName,
  mode: "light" | "dark",
  root: HTMLElement = document.documentElement
): void {
  const tokens = THEMES[vibe][mode];
  for (const [key, value] of Object.entries(tokens)) {
    root.style.setProperty(toKebab(key), value);
  }
}
