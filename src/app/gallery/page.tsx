import { Metadata } from "next";
import Image from "next/image";
import { galleryData } from "@/data/gallery";
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
          {galleryData.map((item) => (
            <div key={item.id} className="gallery-item card">
              <div className="gallery-item__media">
                {item.type === "image" ? (
                  <Image
                    src={item.url}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="gallery-item__image"
                  />
                ) : (
                  <video
                    src={item.url}
                    controls
                    className="gallery-item__video"
                    poster={item.thumbnailUrl}
                  />
                )}
                <div className="gallery-item__type-badge">
                  {item.type === "image" ? "Photo" : "Video"}
                </div>
              </div>
              <div className="gallery-item__info">
                <h3 className="gallery-item__title">{item.title}</h3>
                <div className="gallery-item__meta">
                  <span className="gallery-item__event">{item.event}</span>
                  <span className="gallery-item__date">
                    {new Date(item.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
