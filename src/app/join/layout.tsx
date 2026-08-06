import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join | sudo adduser",
  description: "Join MEC Computer Club. Fill in your details and become a part of the active nodes in our network.",
};

export default function JoinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
