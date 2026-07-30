import type { Metadata } from "next";
import { TeamCard } from "@/components/ui/Card";
import { executives } from "@/data/executives";
import "./executives.css";

export const metadata: Metadata = {
  title: "Executive Panel",
  description: "Meet the student leaders driving the MEC Computer Club forward.",
};

export default function ExecutivesPage() {
  return (
    <>
      <section className="section executives-hero">
        <div className="container">
          <span className="kicker">Leadership</span>
          <h1>Executive Panel</h1>
          <p className="executives-hero__subtitle">
            Meet the dedicated student leaders who run the operations and drive the vision of the MEC Computer Club.
          </p>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="grid grid--3 stagger-children">
            {executives.map((exec) => (
              <TeamCard key={exec.id} {...exec} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
