import { Metadata } from "next";
import Image from "next/image";
import { galleryItems } from "@/data/gallery";
import "./gallery.css";

export const metadata: Metadata = {
  title: "Gallery | MEC Computer Club",
  description: "Pictures and videos from past events of the MEC Computer Club.",
};

export default function GalleryPage() {
  return (
    <main className="gallery-page">
      <section className="section container">
        <div className="section-header">
          <span className="kicker">Memories</span>
          <h2>Our Gallery</h2>
          <p>Highlights from our past events, workshops, and hackathons.</p>
        </div>

        <div className="gallery-grid">
          {galleryItems.map((item) => (
            <div key={item.id} className="gallery-card">
              {item.type === "image" ? (
                <Image
                  src={item.url}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="gallery-card__media"
                />
              ) : (
                <video
                  src={item.url}
                  className="gallery-card__media"
                  poster={item.thumbnailUrl}
                  muted
                  loop
                  playsInline
                  autoPlay
                />
              )}
              
              <div className="gallery-card__badge">
                {item.type === "image" ? "Photo" : "Video"}
              </div>

              <div className="gallery-card__overlay">
                <span className="gallery-card__event">{item.event}</span>
                <h3 className="gallery-card__title">{item.title}</h3>
                <span className="gallery-card__date">
                  {new Date(item.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
