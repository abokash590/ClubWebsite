import type { Metadata } from "next";
import "./constitution.css";

export const metadata: Metadata = {
  title: "Constitution | README.md",
  description: "The official constitution and guidelines of MEC Computer Club.",
};

export default function ConstitutionPage() {
  return (
    <>
      <section className="section constitution-hero">
        <div className="container">
          <span className="kicker">Official Document</span>
          <h1>README.md (Constitution)</h1>
          <p className="constitution-hero__subtitle">
            The rules, regulations, and core values that govern the MEC Computer Club.
          </p>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container container--narrow">
          <article className="constitution-doc">
            <h2>Article I: Name & Purpose</h2>
            <p>
              <strong>Section 1.</strong> The name of this organization shall be the MEC Computer Club.
            </p>
            <p>
              <strong>Section 2.</strong> The purpose of this club is to foster a community of tech enthusiasts, 
              provide a platform for learning and collaboration, and to promote computer science education 
              through workshops, seminars, and competitive programming.
            </p>

            <h2>Article II: Membership</h2>
            <p>
              <strong>Section 1.</strong> Membership is open to all students of MEC who have an interest in computing.
            </p>
            <p>
              <strong>Section 2.</strong> Active members must attend at least 50% of general meetings and participate 
              in club activities to maintain their voting rights.
            </p>

            <h2>Article III: Executive Committee</h2>
            <p>
              <strong>Section 1.</strong> The Executive Committee shall consist of the President, Vice President, 
              General Secretary, and Department Leads.
            </p>
            <p>
              <strong>Section 2.</strong> Elections for the Executive Committee will be held annually during the Spring semester.
            </p>

            <h2>Article IV: Code of Conduct</h2>
            <p>
              All members must adhere to a strict code of conduct promoting respect, inclusivity, and academic integrity. 
              Harassment or discrimination of any kind will result in immediate termination of membership.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
