import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { TeamCard } from "@/components/ui/Card";
import { departments } from "@/data/departments";
import { teamMembers, getExecTeam, getPanelLeads } from "@/data/team";
import "./about.css";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about MEC Computer Club — our mission, departments, and the team behind it all.",
};

export default function AboutPage() {
  const execTeam = getExecTeam();
  const panelLeads = getPanelLeads();

  return (
    <>
      {/* Mission */}
      <section className="section about-hero">
        <div className="container">
          <span className="kicker">About us</span>
          <h1>We build things that work.</h1>
          <p className="about-hero__subtitle">
            MEC Computer Club exists to give students a structured path from
            &quot;I&apos;m interested in CS&quot; to &quot;I&apos;ve shipped real projects, competed
            at ICPC, and have something concrete to show for it.&quot;
          </p>
          <p className="about-hero__body">
            Founded in 2019, the club started as a small competitive programming
            group. Today, 70+ members work across four departments — Competitive
            Programming, Web Development, Machine Learning, and Cybersecurity.
            We run weekly practice sessions, build internal tools, host contests,
            and send teams to national and regional competitions.
          </p>
        </div>
      </section>

      {/* Departments */}
      <section className="section section--alt" id="departments">
        <div className="container">
          <div className="section-header">
            <span className="kicker">Departments</span>
            <h2>What you&apos;d actually do here</h2>
            <p>Each department runs its own activities, projects, and learning tracks.</p>
          </div>
          <div className="about-depts">
            {departments.map((dept, i) => (
              <div key={dept.id} className={`about-dept ${i % 2 !== 0 ? "about-dept--reverse" : ""}`}>
                <div className="about-dept__icon-wrap">
                  <span className="about-dept__icon">{dept.icon}</span>
                </div>
                <div className="about-dept__content">
                  <h3>{dept.name}</h3>
                  <p>{dept.description}</p>
                  <span className="about-dept__meta">{dept.memberCount} active members</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Exec Team */}
      <section className="section" id="team">
        <div className="container">
          <div className="section-header">
            <span className="kicker">Leadership</span>
            <h2>Executive Committee</h2>
            <p>The people keeping things running.</p>
          </div>
          <div className="grid grid--4 stagger-children">
            {execTeam.map((member) => (
              <TeamCard key={member.id} {...member} />
            ))}
          </div>
        </div>
      </section>

      {/* Panel Leads */}
      <section className="section section--alt">
        <div className="container">
          <div className="section-header">
            <span className="kicker">Department leads</span>
            <h2>Panel Leaders</h2>
            <p>Each department is run by a lead who sets the direction and activities.</p>
          </div>
          <div className="grid grid--4 stagger-children">
            {panelLeads.map((member) => (
              <TeamCard key={member.id} {...member} />
            ))}
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="section">
        <div className="container container--narrow">
          <div className="section-header">
            <span className="kicker">History</span>
            <h2>How we got here</h2>
          </div>
          <div className="timeline">
            <div className="timeline__item">
              <div className="timeline__marker" />
              <div className="timeline__content">
                <span className="timeline__year">2019</span>
                <h4>Founded</h4>
                <p>Started as a CP study group with 12 members and a shared Google Sheet.</p>
              </div>
            </div>
            <div className="timeline__item">
              <div className="timeline__marker" />
              <div className="timeline__content">
                <span className="timeline__year">2020</span>
                <h4>First ICPC participation</h4>
                <p>Sent our first team to ICPC Asia Dhaka Regional. Didn&apos;t place, but learned everything.</p>
              </div>
            </div>
            <div className="timeline__item">
              <div className="timeline__marker" />
              <div className="timeline__content">
                <span className="timeline__year">2022</span>
                <h4>Expanded to 4 departments</h4>
                <p>Added Web Dev, ML/AI, and Cybersecurity panels. Membership grew to 40+.</p>
              </div>
            </div>
            <div className="timeline__item">
              <div className="timeline__marker" />
              <div className="timeline__content">
                <span className="timeline__year">2024</span>
                <h4>Built MEC Judge</h4>
                <p>Launched our own online judge platform. 80+ students used it in the first contest.</p>
              </div>
            </div>
            <div className="timeline__item">
              <div className="timeline__marker" />
              <div className="timeline__content">
                <span className="timeline__year">2025</span>
                <h4>70+ members, 3 ICPC teams</h4>
                <p>Largest year yet. Shipping projects, running workshops, and sending 3 teams to ICPC.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
