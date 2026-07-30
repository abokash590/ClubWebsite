import type { Metadata } from "next";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=general-sans@500,600,700&display=swap" rel="stylesheet" />
      </head>
      <body className={`${GeistSans.variable} ${jetbrainsMono.variable}`}>
        <ThemeProvider>
          <Navbar />
          <main id="main-content" className="animate-fade-in">{children}</main>
          <Footer />
          <AccentIndicator />
        </ThemeProvider>
      </body>
    </html>
  );
}
