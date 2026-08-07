import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AccentIndicator } from "@/components/AccentIndicator";
import { ScaleWrapper } from "@/components/ScaleWrapper";
import { Toaster } from "react-hot-toast";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/lib/auth";
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
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;
  const user = sessionToken ? await verifySessionToken(sessionToken) : null;

  return (
    <html lang="en" className={`${GeistSans.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <ScaleWrapper>
            <Toaster position="bottom-right" />
            <Navbar user={user} />
            <main id="main-content">{children}</main>
            <Footer />
            <AccentIndicator />
          </ScaleWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
