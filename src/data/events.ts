import { Event } from "@/types";

export const events: Event[] = [
  {
    id: "e1",
    slug: "icpc-preliminary-2025",
    title: "ICPC Asia Dhaka Regional — Preliminary",
    description:
      "Our CP teams compete in the ICPC Asia Dhaka Regional preliminary round. Three teams representing MEC.",
    longDescription:
      "The International Collegiate Programming Contest (ICPC) is the premier algorithmic programming contest for university students worldwide. This year, MEC Computer Club is sending three teams to the Asia Dhaka Regional preliminary round. Each team of three will face 10–12 problems over 5 hours, testing their algorithmic thinking, teamwork, and ability to code under pressure.\n\nJoin us to cheer on our teams and watch the contest live-streamed in the club room.",
    date: "2025-11-15",
    time: "10:00 AM - 3:00 PM",
    location: "Online + Club Room (Live Watch)",
    type: "contest",
    department: "cp",
    image: "/images/events/icpc.jpg",
    speakers: ["Team Alpha", "Team Beta", "Team Gamma"],
    status: "upcoming",
    registrationUrl: "#",
    tags: ["ICPC", "competitive-programming", "team-contest"],
  },
  {
    id: "e2",
    slug: "react-workshop-series",
    title: "React + Next.js Workshop Series",
    description:
      "A 4-week hands-on workshop series covering React fundamentals through production deployment with Next.js.",
    longDescription:
      "This workshop series takes you from React basics to deploying a full-stack Next.js application. Each session is 2 hours of guided coding with real projects — no slides-only lectures.\n\n**Week 1:** React fundamentals — components, state, props\n**Week 2:** Hooks deep dive — useEffect, custom hooks, context\n**Week 3:** Next.js App Router — routing, layouts, server components\n**Week 4:** Full-stack project — database, auth, deployment",
    date: "2025-10-04",
    endDate: "2025-10-25",
    time: "4:00 PM - 6:00 PM",
    location: "Lab 302, CSE Building",
    type: "workshop",
    department: "webdev",
    image: "/images/events/react-workshop.jpg",
    speakers: ["Farhan Ahmed", "Tasnim Akter"],
    status: "upcoming",
    registrationUrl: "#",
    attendeeCount: 42,
    tags: ["react", "nextjs", "web-development", "workshop"],
  },
  {
    id: "e3",
    slug: "intro-to-ml-bootcamp",
    title: "Introduction to Machine Learning — Weekend Bootcamp",
    description:
      "A weekend intensive covering ML fundamentals: supervised learning, model evaluation, and your first Kaggle submission.",
    date: "2025-09-20",
    time: "10:00 AM - 5:00 PM",
    location: "Seminar Hall, Main Building",
    type: "workshop",
    department: "ml",
    image: "/images/events/ml-bootcamp.jpg",
    speakers: ["Dr. Kamal Hossain", "Rafi Islam"],
    status: "upcoming",
    attendeeCount: 35,
    tags: ["machine-learning", "python", "kaggle", "bootcamp"],
  },
  {
    id: "e4",
    slug: "intra-mec-programming-contest-2025",
    title: "Intra-MEC Programming Contest 2025",
    description:
      "The annual intra-university programming contest. Open to all MEC students. Prizes for top 3 individuals and top freshman.",
    date: "2025-08-30",
    time: "2:00 PM - 5:00 PM",
    location: "Computer Lab 1 & 2, CSE Building",
    type: "contest",
    department: "cp",
    image: "/images/events/intra-contest.jpg",
    status: "past",
    attendeeCount: 78,
    tags: ["programming-contest", "competitive-programming", "intra-university"],
  },
  {
    id: "e5",
    slug: "ctf-night-2025",
    title: "Capture The Flag Night",
    description:
      "An overnight CTF competition. Solve security challenges, crack codes, and compete in teams of 2–3.",
    date: "2025-08-15",
    time: "8:00 PM - 8:00 AM",
    location: "Club Room + Online",
    type: "contest",
    department: "cybersec",
    image: "/images/events/ctf-night.jpg",
    status: "past",
    attendeeCount: 30,
    tags: ["ctf", "cybersecurity", "overnight", "team-contest"],
  },
  {
    id: "e6",
    slug: "github-and-open-source-seminar",
    title: "Git, GitHub & Open Source — Getting Started",
    description:
      "A beginner-friendly seminar on version control, GitHub workflows, and how to make your first open source contribution.",
    date: "2025-07-22",
    time: "4:00 PM - 5:30 PM",
    location: "Lab 301, CSE Building",
    type: "seminar",
    department: "webdev",
    image: "/images/events/git-seminar.jpg",
    speakers: ["Nusrat Jahan"],
    status: "past",
    attendeeCount: 55,
    tags: ["git", "github", "open-source", "beginner"],
  },
];

export function getUpcomingEvents(): Event[] {
  return events.filter((e) => e.status === "upcoming");
}

export function getPastEvents(): Event[] {
  return events.filter((e) => e.status === "past");
}

export function getEventBySlug(slug: string): Event | undefined {
  return events.find((e) => e.slug === slug);
}
