import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { EventCard, ProjectCard } from "@/components/ui/Card";
import { departments } from "@/data/departments";
import { getUpcomingEvents, events } from "@/data/events";
import { getFeaturedProjects } from "@/data/projects";
import { testimonials } from "@/data/testimonials";
import { leaderboard } from "@/data/cp";
import { AlgorithmVisualizer } from "@/components/ui/AlgorithmVisualizer";
import "./page.css";

export const metadata: Metadata = {
  title: "MEC Computer Club — Weekly CP Practice, Real Projects, One Club",
  description:
    "The official computer club of MEC. Competitive programming, web development, ML/AI, cybersecurity — join 70+ members building real things.",
};

export default function HomePage() {
  const upcomingEvents = getUpcomingEvents();
  const featuredProjects = getFeaturedProjects();
  const nextEvent = upcomingEvents[0];
  const topCP = leaderboard.slice(0, 3);

  return (
    <>
      {/* ===== 1. HERO — 50ms credibility check (§6.1) ===== */}
      <section className="hero" id="hero">
        <div className="hero__bg">
          <div className="hero__gradient" />
          <div className="hero__pattern" />
        </div>
        <div className="container hero__content">
          <div className="hero__text">
            <Badge variant="upcoming" size="md" className="hero__badge">
              <span className="hero__pulse-dot"></span>
              {nextEvent
                ? `Next: ${nextEvent.title.slice(0, 40)}${nextEvent.title.length > 40 ? "…" : ""}`
                : "Applications Open"}
            </Badge>
            <h1 className="hero__title">
              Debug your limits.
              <br />
              Build reality.
              <span className="hero__accent"> Welcome to the Club.</span>
            </h1>
            <p className="hero__subtitle">
              MEC Computer Club is where students compete in ICPC, build
              production software, and grow as developers — not just attend
              meetings.
            </p>
            <div className="hero__actions">
              <Button href="/join" size="lg" id="hero-join-cta">
                Apply to join
              </Button>
              <Button href="/events" variant="secondary" size="lg" id="hero-events-cta">
                See upcoming events
              </Button>
            </div>
            <div className="hero__stats">
              <div className="hero__stat">
                <span className="hero__stat-value">70+</span>
                <span className="hero__stat-label">Members</span>
              </div>
              <div className="hero__stat-divider" />
              <div className="hero__stat">
                <span className="hero__stat-value">4</span>
                <span className="hero__stat-label">Departments</span>
              </div>
              <div className="hero__stat-divider" />
              <div className="hero__stat">
                <span className="hero__stat-value">12+</span>
                <span className="hero__stat-label">Events this year</span>
              </div>
            </div>
          </div>
          
          <div className="hero__visual">
            <AlgorithmVisualizer />
          </div>
        </div>
      </section>

      {/* ===== 2. MISSION STRIP (§6.2) ===== */}
      <section className="mission-strip" id="mission">
        <div className="container">
          <p className="mission-strip__text">
            We don&apos;t just learn about technology —{" "}
            <strong>we compete, we build, we ship.</strong>
          </p>
        </div>
      </section>

      {/* ===== 3. UPCOMING EVENT TEASER (§6.3) ===== */}
      <section className="section" id="upcoming-events">
        <div className="container">
          <div className="section-header">
            <span className="kicker">What&apos;s happening</span>
            <h2>Upcoming Events Queue</h2>
            <p>Never an empty calendar. Here&apos;s what&apos;s next.</p>
          </div>
          <div className="grid grid--3 home-events-grid">
            {(upcomingEvents.length > 0 ? upcomingEvents : events.slice(0, 3)).map(
              (event) => (
                <EventCard key={event.id} {...event} />
              )
            )}
          </div>
          <div className="section-cta">
            <Button href="/events" variant="secondary" id="home-all-events">
              View all events →
            </Button>
          </div>
        </div>
      </section>

      {/* ===== 4. DEPARTMENTS (§6.4) ===== */}
      <section className="section section--alt" id="departments">
        <div className="container">
          <div className="section-header">
            <span className="kicker">Find your path</span>
            <h2>Choose Your Tech Tree</h2>
            <p>Every member belongs to at least one. Which one fits you?</p>
          </div>
          <div className="grid grid--4 departments-grid stagger-children">
            {departments.map((dept) => (
              <div key={dept.id} className="dept-card" id={`dept-${dept.id}`}>
                <span className="dept-card__icon">{dept.icon}</span>
                <h3 className="dept-card__name">{dept.name}</h3>
                <p className="dept-card__desc">{dept.description}</p>
                <span className="dept-card__count">
                  {dept.memberCount} members
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 5. CP / ACHIEVEMENTS SNAPSHOT (§6.5) ===== */}
      <section className="section" id="achievements">
        <div className="container">
          <div className="section-header">
            <span className="kicker">Competitive Programming</span>
            <h2>Club Leaderboard</h2>
            <p>Our CP team&apos;s standings — updated, not inflated.</p>
          </div>
          <div className="cp-snapshot">
            <div className="cp-snapshot__leaderboard">
              <div className="cp-snapshot__header">
                <span>Rank</span>
                <span>Member</span>
                <span>Handle</span>
                <span>Rating</span>
                <span>Solved</span>
              </div>
              {topCP.map((entry) => (
                <div key={entry.rank} className="cp-snapshot__row">
                  <span className="cp-snapshot__rank">#{entry.rank}</span>
                  <span className="cp-snapshot__name">{entry.name}</span>
                  <span className="cp-snapshot__handle">@{entry.handle}</span>
                  <span className="cp-snapshot__rating">{entry.rating}</span>
                  <span className="cp-snapshot__solved">{entry.solved}</span>
                </div>
              ))}
            </div>
            <div className="cp-snapshot__cta">
              <Button href="/cp-hub" variant="secondary" id="home-cp-hub">
                Full leaderboard & resources →
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 6. PROJECTS SHOWCASE (§6.6) ===== */}
      <section className="section section--alt" id="projects">
        <div className="container">
          <div className="section-header">
            <span className="kicker">Proof of work</span>
            <h2>Successfully Deployed Projects</h2>
            <p>Not tutorials — real software used by real people.</p>
          </div>
          <div className="grid grid--3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} {...project} team={project.team || []} />
            ))}
          </div>
          <div className="section-cta">
            <Button href="/projects" variant="secondary" id="home-all-projects">
              View all projects →
            </Button>
          </div>
        </div>
      </section>

      {/* ===== 7. TESTIMONIALS (§6.7) ===== */}
      <section className="section" id="testimonials">
        <div className="container">
          <div className="section-header">
            <span className="kicker">From our members</span>
            <h2>System Logs: Member Feedbacks</h2>
            <p>
              What actual club members say — not &quot;Great club!&quot; quotes.
            </p>
          </div>
          <div className="grid grid--3 testimonials-grid stagger-children">
            {testimonials.map((t) => (
              <blockquote key={t.id} className="testimonial" id={`testimonial-${t.id}`}>
                <p className="testimonial__quote">&ldquo;{t.quote}&rdquo;</p>
                <footer className="testimonial__footer">
                  <div className="testimonial__avatar">
                    {t.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <cite className="testimonial__name">{t.name}</cite>
                    <span className="testimonial__role">{t.role}</span>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 8. JOIN CTA BAND (§6.8) ===== */}
      <section className="cta-band" id="join-cta">
        <div className="container">
          <div className="cta-band__content">
            <h2 className="cta-band__title">Ready to sudo join us?</h2>
            <p className="cta-band__subtitle">
              Applications are open. No prerequisites — just bring curiosity and
              consistency.
            </p>
            <div className="cta-band__actions">
              <Button href="/join" size="lg" id="cta-band-join">
                Apply to join
              </Button>
              <Button href="/contact" variant="secondary" size="lg" id="cta-band-contact">
                Have questions? Contact us →
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
