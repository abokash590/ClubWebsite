import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AccentIndicator } from "@/components/AccentIndicator";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | MEC Computer Club",
    default: "MEC Computer Club",
  },
  description: "Weekly CP practice, real projects, one club. The official computer club of MEC.",
};

export const viewport: Viewport = {
  width: 1280,
  initialScale: 1,
  // We leave maximumScale and userScalable at their defaults (which allows pinch-to-zoom)
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
          <AccentIndicator />
        </ThemeProvider>
      </body>
    </html>
  );
}
