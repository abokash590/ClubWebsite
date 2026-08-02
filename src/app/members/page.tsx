import type { Metadata } from "next";
import { TeamCard } from "@/components/ui/Card";
import { activeMembers } from "@/data/members";
import "./members.css";

export const metadata: Metadata = {
  title: "Members | Active Nodes",
  description: "The passionate individuals driving the MEC Computer Club.",
};

export default function MembersPage() {
  return (
    <>
      <section className="section members-hero">
        <div className="container">
          <span className="kicker">Our Core</span>
          <h1>Active Nodes (Members)</h1>
          <p className="members-hero__subtitle">
            Meet the talented developers, designers, and problem solvers who make up the heart of our community.
          </p>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="grid grid--4 stagger-children">
            {activeMembers.map((member) => (
              <TeamCard key={member.id} {...member} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
