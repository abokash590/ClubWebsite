/* ===== Core Data Types ===== */

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface Department {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  memberCount: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department?: string;
  image: string;
  bio?: string;
  socials?: {
    github?: string;
    linkedin?: string;
    codeforces?: string;
  };
  isExec: boolean;
}

export interface Event {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  date: string;
  endDate?: string;
  time: string;
  location: string;
  type: "workshop" | "contest" | "seminar" | "social" | "hackathon";
  department?: string;
  image: string;
  speakers?: string[];
  status: "upcoming" | "ongoing" | "past";
  registrationUrl?: string;
  attendeeCount?: number;
  tags?: string[];
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  department: string;
  techStack: string[];
  image: string;
  team: string[];
  liveUrl?: string;
  repoUrl?: string;
  status: "in-progress" | "completed" | "archived";
  featured?: boolean;
  completedDate?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorImage?: string;
  date: string;
  readTime: number;
  tags: string[];
  image?: string;
  featured?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  image: string;
  quote: string;
  department?: string;
  year?: string;
}

export interface CPContest {
  id: string;
  name: string;
  platform: string;
  date: string;
  participants: string[];
  results?: {
    rank?: number;
    totalTeams?: number;
    highlights?: string;
  };
}

export interface CPResource {
  id: string;
  title: string;
  type: "editorial" | "tutorial" | "problem-set" | "video";
  difficulty: "beginner" | "intermediate" | "advanced";
  url: string;
  tags: string[];
  author?: string;
  date?: string;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  handle: string;
  platform: string;
  rating: number;
  solved: number;
  image?: string;
}

export interface Stat {
  label: string;
  value: string;
  icon?: string;
}
