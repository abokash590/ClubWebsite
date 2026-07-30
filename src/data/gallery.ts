export type GalleryItem = {
  id: string;
  title: string;
  type: "image" | "video";
  url: string;
  thumbnailUrl?: string; // For videos
  event: string;
  date: string;
};

export const galleryData: GalleryItem[] = [
  {
    id: "g1",
    title: "MEC Hackathon 2024 Winners",
    type: "image",
    url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
    event: "MEC Hackathon 2024",
    date: "2024-03-15",
  },
  {
    id: "g2",
    title: "Workshop on Web Development",
    type: "image",
    url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80",
    event: "Web Dev Bootcamp",
    date: "2024-02-10",
  },
  {
    id: "g3",
    title: "Competitive Programming Seminar",
    type: "image",
    url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80",
    event: "CP Seminar",
    date: "2023-11-20",
  },
  {
    id: "g4",
    title: "Tech Fest 2023 Highlights",
    type: "video",
    url: "https://www.w3schools.com/html/mov_bbb.mp4",
    event: "Tech Fest 2023",
    date: "2023-10-05",
  },
  {
    id: "g5",
    title: "Alumni Meet & Greet",
    type: "image",
    url: "https://images.unsplash.com/photo-1523580494112-071d38458a5c?w=800&q=80",
    event: "Alumni Meet",
    date: "2023-08-12",
  },
  {
    id: "g6",
    title: "Intra-College Coding Contest",
    type: "image",
    url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    event: "ICPC Regional Practice",
    date: "2023-06-25",
  },
];
