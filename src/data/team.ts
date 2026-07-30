import { TeamMember } from "@/types";

export const teamMembers: TeamMember[] = [
  {
    id: "t1",
    name: "Tanvir Hasan",
    role: "President",
    image: "/images/team/tanvir.jpg",
    bio: "4th year CSE. Leading the club's growth from 30 to 70+ members. Previously CP panel lead.",
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      codeforces: "https://codeforces.com/profile/tanvir",
    },
    isExec: true,
  },
  {
    id: "t2",
    name: "Nusrat Jahan",
    role: "Vice President",
    image: "/images/team/nusrat.jpg",
    bio: "3rd year CSE. CP team lead, Codeforces Expert. Organized 3 programming contests this year.",
    socials: {
      github: "https://github.com",
      codeforces: "https://codeforces.com/profile/nusrat",
    },
    isExec: true,
  },
  {
    id: "t3",
    name: "Farhan Ahmed",
    role: "General Secretary",
    department: "webdev",
    image: "/images/team/farhan.jpg",
    bio: "3rd year CSE. Full-stack developer. Built MEC Judge and manages the club's web presence.",
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
    isExec: true,
  },
  {
    id: "t4",
    name: "Sadia Rahman",
    role: "Treasurer",
    image: "/images/team/sadia.jpg",
    bio: "3rd year CSE. Manages sponsorships, budgets, and event funding. Also an active web dev contributor.",
    socials: {
      linkedin: "https://linkedin.com",
    },
    isExec: true,
  },
  {
    id: "t5",
    name: "Rafi Islam",
    role: "CP Panel Lead",
    department: "cp",
    image: "/images/team/rafi.jpg",
    bio: "2nd year CSE. Codeforces Specialist. Runs weekly practice sessions and curates problem sets.",
    socials: {
      codeforces: "https://codeforces.com/profile/rafi",
      github: "https://github.com",
    },
    isExec: false,
  },
  {
    id: "t6",
    name: "Tasnim Akter",
    role: "Web Dev Panel Lead",
    department: "webdev",
    image: "/images/team/tasnim.jpg",
    bio: "3rd year CSE. React/Next.js specialist. Leads the web development workshop series.",
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
    isExec: false,
  },
  {
    id: "t7",
    name: "Imran Khan",
    role: "Cybersecurity Panel Lead",
    department: "cybersec",
    image: "/images/team/imran.jpg",
    bio: "4th year CSE. CTF enthusiast, organized the first Capture The Flag Night at MEC.",
    socials: {
      github: "https://github.com",
    },
    isExec: false,
  },
  {
    id: "t8",
    name: "Mehedi Hasan",
    role: "ML/AI Panel Lead",
    department: "ml",
    image: "/images/team/mehedi.jpg",
    bio: "3rd year CSE. Kaggle contributor, leads the ML study group and research projects.",
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
    isExec: false,
  },
];

export function getExecTeam(): TeamMember[] {
  return teamMembers.filter((m) => m.isExec);
}

export function getPanelLeads(): TeamMember[] {
  return teamMembers.filter((m) => !m.isExec && m.department);
}
