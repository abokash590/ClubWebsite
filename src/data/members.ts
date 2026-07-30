export interface Member {
  id: string;
  name: string;
  role: string;
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
    image: "/images/members/sakib.jpg",
    socials: {
      github: "#",
    },
  },
  {
    id: "mem-2",
    name: "Nushrat Jahan",
    role: "UI/UX Designer",
    image: "/images/members/nushrat.jpg",
    socials: {
      linkedin: "#",
    },
  },
  {
    id: "mem-3",
    name: "Fahim Faysal",
    role: "Cybersecurity Analyst",
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
    image: "/images/members/tasnia.jpg",
    socials: {
      github: "#",
    },
  },
];
