import { Department } from "@/types";

export const departments: Department[] = [
  {
    id: "cp",
    name: "Competitive Programming",
    description:
      "Train for ICPC, national contests, and online competitions. Weekly practice sessions, editorial discussions, and team formations.",
    icon: "⚡",
    color: "var(--accent-primary)",
    memberCount: 24,
  },
  {
    id: "webdev",
    name: "Web Development",
    description:
      "Build real-world projects using modern frameworks. From frontend to full-stack, learn by shipping, not just studying.",
    icon: "🌐",
    color: "var(--accent-secondary)",
    memberCount: 18,
  },
  {
    id: "ml",
    name: "Machine Learning & AI",
    description:
      "Explore data science, deep learning, and AI applications. Kaggle competitions, research projects, and study groups.",
    icon: "🧠",
    color: "#7C3AED",
    memberCount: 15,
  },
  {
    id: "cybersec",
    name: "Cybersecurity",
    description:
      "CTF competitions, ethical hacking workshops, and security research. Learn to break things — responsibly.",
    icon: "🔒",
    color: "#DC2626",
    memberCount: 12,
  },
];
