export interface Member {
  id: string;
  name: string;
  role: string;
  batch?: string;
  image: string;
  socials?: {
    github?: string;
    linkedin?: string;
  };
}

export const activeMembers: Member[] = [
  {
    id: "mem-1",
    name: "Sakib Al Hasan",
    role: "Senior Developer",
    batch: "CSE, 5th",
    image: "/images/members/sakib.jpg",
    socials: {
      github: "#",
    },
  },
  {
    id: "mem-2",
    name: "Nushrat Jahan",
    role: "UI/UX Designer",
    batch: "CSE, 5th",
    image: "/images/members/nushrat.jpg",
    socials: {
      linkedin: "#",
    },
  },
  {
    id: "mem-3",
    name: "Fahim Faysal",
    role: "Cybersecurity Analyst",
    batch: "CSE, 5th",
    image: "/images/members/fahim.jpg",
    socials: {
      github: "#",
      linkedin: "#",
    },
  },
  {
    id: "mem-4",
    name: "Tasnia Rahman",
    role: "Competitive Programmer",
    batch: "CSE, 5th",
    image: "/images/members/tasnia.jpg",
    socials: {
      github: "#",
    },
  },
];
