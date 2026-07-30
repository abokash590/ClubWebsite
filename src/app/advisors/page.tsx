import type { Metadata } from "next";
import { TeamCard } from "@/components/ui/Card";
import { advisors } from "@/data/advisors";
import "./advisors.css";

export const metadata: Metadata = {
  title: "Advisor Panel",
  description: "The guiding forces behind MEC Computer Club.",
};

export default function AdvisorsPage() {
  return (
    <>
      <section className="section advisors-hero">
        <div className="container">
          <span className="kicker">Guidance & Vision</span>
          <h1>Our Honorable Advisors</h1>
          <p className="advisors-hero__subtitle">
            Meet the experienced mentors who guide our club towards excellence and innovation.
          </p>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="grid grid--3 stagger-children">
            {advisors.map((advisor) => (
              <TeamCard key={advisor.id} {...advisor} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
