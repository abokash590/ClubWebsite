import type { Metadata } from "next";
import { ProfileCard, ProfileGrid } from "@/components/ui/ProfileCard";
import { advisors } from "@/data/advisors";
import "./advisors.css";

export const metadata: Metadata = {
  title: "Advisor Panel | sudoers",
  description: "The guiding forces behind MEC Computer Club.",
};

export default function AdvisorsPage() {
  return (
    <>
      <section className="section advisors-hero">
        <div className="container">
          <span className="kicker">Guidance &amp; Vision</span>
          <h1>sudoers (Our Honorable Advisors)</h1>
          <p className="advisors-hero__subtitle">
            Meet the experienced mentors who guide our club towards excellence and innovation.
          </p>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <ProfileGrid className="stagger-children">
            {advisors.map((advisor) => (
              <ProfileCard
                key={advisor.id}
                slug={advisor.id}
                name={advisor.name}
                role={advisor.role}
                sublabel="FACULTY"
                category="advisor"
                socials={advisor.socials}
              />
            ))}
          </ProfileGrid>
        </div>
      </section>
    </>
  );
}
