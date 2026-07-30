import { TeamMember } from "@/types";

export interface AlumniBatch {
  batchNumber: string;
  year: string;
  members: TeamMember[];
}

export const alumniBatches: AlumniBatch[] = [
  {
    batchNumber: "1st Batch",
    year: "2019 - 2023",
    members: [
      {
        id: "a1-1",
        name: "Sabbir Hossain",
        role: "Former President",
        image: "",
        bio: "Founding member of the club. Currently Software Engineer at TechCorp.",
      },
      {
        id: "a1-2",
        name: "Jamil Akter",
        role: "Former CP Lead",
        image: "",
        bio: "Led the first ICPC team from MEC. Now pursuing MSc at University of Texas.",
      },
      {
        id: "a1-3",
        name: "Mashrafe Ahmed",
        role: "Former Web Lead",
        image: "",
        bio: "Architected the original MEC Judge. Frontend Developer at Innovate BD.",
      }
    ],
  },
  {
    batchNumber: "2nd Batch",
    year: "2020 - 2024",
    members: [
      {
        id: "a2-1",
        name: "Sumaiya Islam",
        role: "Former General Secretary",
        image: "",
        bio: "Organized the first intra-university hackathon. SQA Engineer at QualityWorks.",
      },
      {
        id: "a2-2",
        name: "Rafi Rahman",
        role: "Former ML Lead",
        image: "",
        bio: "Started the ML research wing. AI Researcher at NeuroTech.",
      }
    ],
  },
  {
    batchNumber: "3rd Batch",
    year: "2021 - 2025",
    members: [
      {
        id: "a3-1",
        name: "Ayman Sadiq",
        role: "Former Vice President",
        image: "",
        bio: "Competitive Programming coach. Software Engineer at Optimizely.",
      },
      {
        id: "a3-2",
        name: "Nabila Haque",
        role: "Former CyberSec Lead",
        image: "",
        bio: "Established the CTF team. Security Analyst at SecureNet.",
      },
      {
        id: "a3-3",
        name: "Tahmid Hasan",
        role: "Former Web Lead",
        image: "",
        bio: "Full-stack developer. Started the open-source initiative in the club.",
      }
    ],
  },
];
