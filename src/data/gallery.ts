export type GalleryItem = {
  id: string;
  title: string;
  type: "image" | "video";
  url: string;
  thumbnailUrl?: string;
  event: string;
  date: string; // YYYY-MM-DD for sorting
};

export const rawGalleryItems: GalleryItem[] = [
  {
    id: "g1",
    title: "Hackathon Winners",
    type: "image",
    url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
    event: "MEC Hackathon 2024",
    date: "2024-03-15",
  },
  {
    id: "g2",
    title: "Late Night Coding",
    type: "image",
    url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80",
    event: "MEC Hackathon 2024",
    date: "2024-03-15",
  },
  {
    id: "g3",
    title: "Frontend Workshop",
    type: "image",
    url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80",
    event: "Web Dev Bootcamp",
    date: "2024-02-10",
  },
  {
    id: "g4",
    title: "Event Highlights",
    type: "video",
    url: "https://www.w3schools.com/html/mov_bbb.mp4",
    event: "Tech Fest 2023",
    date: "2023-10-05",
  },
  {
    id: "g5",
    title: "Robotics Showcase",
    type: "image",
    url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    event: "Tech Fest 2023",
    date: "2023-10-05",
  },
  {
    id: "g6",
    title: "Panel Discussion",
    type: "image",
    url: "https://images.unsplash.com/photo-1523580494112-071d38458a5c?w=800&q=80",
    event: "Alumni Meet & Greet",
    date: "2023-08-12",
  },
];

// Sort by date descending so newest are always first
export const galleryItems = [...rawGalleryItems].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);
