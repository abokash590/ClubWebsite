export interface Executive {
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

export const executives: Executive[] = [
  {
    id: "exec-1",
    name: "Ayman Sadiq",
    role: "President",
    image: "/images/executives/ayman.jpg",
    bio: "Leading the club's vision and coordinating all major activities.",
    socials: {
      linkedin: "#",
    },
  },
  {
    id: "exec-2",
    name: "Nafisa Tabassum",
    role: "Vice President",
    image: "/images/executives/nafisa.jpg",
    bio: "Managing the internal teams and overseeing event execution.",
    socials: {
      linkedin: "#",
      github: "#",
    },
  },
  {
    id: "exec-3",
    name: "Tahmid Rahman",
    role: "General Secretary",
    image: "/images/executives/tahmid.jpg",
    bio: "Handling communications, documentation, and external relations.",
    socials: {
      linkedin: "#",
    },
  },
];
