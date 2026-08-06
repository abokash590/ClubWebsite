import type { Metadata } from "next";
import { ProfileCard, ProfileGrid } from "@/components/ui/ProfileCard";
import { executives } from "@/data/executives";
import "./executives.css";

export const metadata: Metadata = {
  title: "Executive Panel | Root Users",
  description: "Meet the student leaders driving the MEC Computer Club forward.",
};

export default function ExecutivesPage() {
  return (
    <>
      <section className="section executives-hero">
        <div className="container">
          <span className="kicker">Leadership</span>
          <h1>Root Users (Executive Panel)</h1>
          <p className="executives-hero__subtitle">
            Meet the dedicated student leaders who run the operations and drive the vision of the MEC Computer Club.
          </p>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <ProfileGrid className="stagger-children">
            {executives.map((exec) => (
              <ProfileCard
                key={exec.id}
                slug={exec.id}
                name={exec.name}
                role={exec.role}
                batch={exec.batch}
                sublabel="PANEL"
                category="executive"
                socials={exec.socials}
              />
            ))}
          </ProfileGrid>
        </div>
      </section>
    </>
  );
}
