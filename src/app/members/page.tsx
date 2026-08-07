import type { Metadata } from "next";
import { ProfileCard, ProfileGrid } from "@/components/ui/ProfileCard";
import { activeMembers } from "@/data/members";
import { getDb } from "@/lib/db";
import "./members.css";

export const metadata: Metadata = {
  title: "Members | Active Nodes",
  description: "The passionate individuals driving the MEC Computer Club.",
};

export const dynamic = 'force-dynamic';

export default async function MembersPage() {
  const db = getDb();
  const dbMembers = db.prepare(`SELECT * FROM requests WHERE status = 'approved' ORDER BY id DESC`).all() as any[];

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
          <ProfileGrid className="stagger-children">
            {/* Database Members */}
            {dbMembers.map((member) => (
              <ProfileCard
                key={`db-${member.id}`}
                slug={`app-${member.id}`}
                name={member.name}
                role="Club Member"
                batch={member.batch || "N/A"}
                sublabel={member.registration_number ? `REG: ${member.registration_number}` : "NEW"}
                category="member"
                image={member.photo_base64 || undefined}
                socials={{
                  linkedin: member.linkedin || undefined,
                  github: member.github || undefined,
                  facebook: member.facebook || undefined,
                  discord: member.discord || undefined,
                  codeforces: member.codeforces || undefined,
                  codechef: member.codechef || undefined,
                  email: member.email || undefined,
                }}
              />
            ))}

            {/* Static Dummy Members */}
            {activeMembers.map((member) => (
              <ProfileCard
                key={member.id}
                slug={member.id}
                name={member.name}
                role={member.role}
                batch={member.batch}
                sublabel="STATIC"
                category="member"
                socials={member.socials}
              />
            ))}
          </ProfileGrid>
        </div>
      </section>
    </>
  );
}
