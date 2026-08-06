export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { EventCard } from "@/components/ui/Card";
import { getUpcomingEvents, getPastEvents } from "@/data/events";
import "./events.css";

export const metadata: Metadata = {
  title: "Events | Execution Queue",
  description: "Upcoming and past events — workshops, contests, seminars, and more from MEC Computer Club.",
};

export default async function EventsPage() {
  const upcoming = await getUpcomingEvents();
  const past = await getPastEvents();

  return (
    <>
      <section className="section events-hero">
        <div className="container">
          <span className="kicker">Events</span>
          <h1>System Events & Tech Meetups</h1>
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
            Next in Queue
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
      <section className="section" id="past">
        <div className="container">
          <h2 className="events-section-title">
            Successfully Executed (Past Events)
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
