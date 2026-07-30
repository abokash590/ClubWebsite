export interface Experience {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  authorImage?: string;
  readTime: number;
  tags: string[];
  slug: string;
}

export const experiences: Experience[] = [
  {
    id: "exp-1",
    title: "How I cracked my first Big Tech Interview",
    excerpt: "Sharing my 6-month journey from grinding LeetCode to receiving an offer from a FAANG company.",
    date: "2023-11-15",
    author: "Rakibul Islam",
    readTime: 8,
    tags: ["Interview", "FAANG", "DSA"],
    slug: "cracked-first-big-tech-interview",
  },
  {
    id: "exp-2",
    title: "Winning the National Hackathon 2024",
    excerpt: "A deep dive into our team's strategy, the late-night debugging sessions, and the final pitch that won us the championship.",
    date: "2024-03-22",
    author: "Sumaiya Akter",
    readTime: 5,
    tags: ["Hackathon", "Web Dev", "Teamwork"],
    slug: "winning-national-hackathon-2024",
  },
  {
    id: "exp-3",
    title: "Navigating Open Source Contributions as a Beginner",
    excerpt: "My experience contributing to major open-source repositories and how it shaped my career.",
    date: "2024-01-10",
    author: "Tanvir Hossain",
    readTime: 6,
    tags: ["Open Source", "GitHub", "Career"],
    slug: "navigating-open-source-contributions",
  },
];
