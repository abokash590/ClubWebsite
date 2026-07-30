import type { Metadata } from "next";
import { EventCard } from "@/components/ui/Card";
import { getUpcomingEvents, getPastEvents } from "@/data/events";
import "./events.css";

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming and past events — workshops, contests, seminars, and more from MEC Computer Club.",
};

export default function EventsPage() {
  const upcoming = getUpcomingEvents();
  const past = getPastEvents();

  return (
    <>
      <section className="section events-hero">
        <div className="container">
          <span className="kicker">Events</span>
          <h1>What&apos;s happening</h1>
          <p className="events-hero__subtitle">
            Workshops, contests, seminars, and socials — all organized by
            members, for members.
          </p>
        </div>
      </section>

      {/* Upcoming */}
      <section className="section" id="upcoming">
        <div className="container">
          <h2 className="events-section-title">
            Upcoming
            <span className="events-count">{upcoming.length}</span>
          </h2>
          {upcoming.length > 0 ? (
            <div className="grid grid--3">
              {upcoming.map((event) => (
                <EventCard key={event.id} {...event} />
              ))}
            </div>
          ) : (
            <div className="events-empty">
              <p>No upcoming events right now — check back soon or browse past events below.</p>
            </div>
          )}
        </div>
      </section>

      {/* Past */}
      <section className="section section--alt" id="past">
        <div className="container">
          <h2 className="events-section-title">
            Past Events
            <span className="events-count">{past.length}</span>
          </h2>
          <div className="grid grid--3 past-events-grid">
            {past.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
