import type { Metadata } from "next";
import { TeamCard } from "@/components/ui/Card";
import { alumniBatches } from "@/data/alumni";
import "./alumni.css";

export const metadata: Metadata = {
  title: "Alumni",
  description: "Meet the legends who built MEC Computer Club.",
};

export default function AlumniPage() {
  return (
    <>
      <section className="section alumni-hero">
        <div className="container">
          <span className="kicker">Hall of Fame</span>
          <h1>Our Alumni Network (Legacy Code)</h1>
          <p className="alumni-hero__subtitle">
            The legends who built this club and shaped its culture.
          </p>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="alumni-batches">
            {alumniBatches.map((batch) => (
              <div key={batch.batchNumber} className="alumni-batch">
                <div className="alumni-batch__header">
                  <h2>{batch.batchNumber}</h2>
                  <span className="alumni-batch__year">{batch.year}</span>
                </div>
                <div className="grid grid--4 stagger-children">
                  {batch.members.map((member) => (
                    <TeamCard key={member.id} {...member} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
