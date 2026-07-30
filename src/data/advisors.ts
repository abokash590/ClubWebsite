export interface Advisor {
  id: string;
  name: string;
  role: string;
  image: string;
  bio?: string;
  socials?: {
    linkedin?: string;
    github?: string;
  };
}

export const advisors: Advisor[] = [
  {
    id: "adv-1",
    name: "Dr. Abu Sayed",
    role: "Chief Advisor",
    image: "/images/advisors/abu-sayed.jpg",
    bio: "Head of CSE Department. Passionate about algorithms and data structures.",
    socials: {
      linkedin: "#",
    },
  },
  {
    id: "adv-2",
    name: "Prof. Farhana Haque",
    role: "Technical Advisor",
    image: "/images/advisors/farhana-haque.jpg",
    bio: "Specializes in Artificial Intelligence and Machine Learning research.",
    socials: {
      linkedin: "#",
      github: "#",
    },
  },
  {
    id: "adv-3",
    name: "Dr. Rakib Hasan",
    role: "Faculty Advisor",
    image: "/images/advisors/rakib-hasan.jpg",
    bio: "Expert in Cyber Security and Software Engineering principles.",
    socials: {
      linkedin: "#",
    },
  },
];
