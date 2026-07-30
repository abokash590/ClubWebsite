import type { Metadata } from "next";
import { BlogCard } from "@/components/ui/Card";
import { experiences } from "@/data/experiences";
import "./experiences.css";

export const metadata: Metadata = {
  title: "Experience Panel",
  description: "Read stories and experiences from our club members and alumni.",
};

export default function ExperiencesPage() {
  return (
    <>
      <section className="section experiences-hero">
        <div className="container">
          <span className="kicker">Knowledge Base</span>
          <h1>Experience Panel</h1>
          <p className="experiences-hero__subtitle">
            Dive into the real-world experiences of our alumni and senior members. 
            From cracking interviews to winning hackathons, learn from the best.
          </p>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="grid grid--2 stagger-children">
            {experiences.map((exp) => (
              <BlogCard key={exp.id} {...exp} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
