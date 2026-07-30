import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the MEC Computer Club for sponsorships, collaborations, or general questions.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
