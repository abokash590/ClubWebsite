import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { events, getEventBySlug } from "@/data/events";
import "./event-detail.css";

export async function generateStaticParams() {
  return events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) return { title: "Event Not Found" };
  return {
    title: event.title,
    description: event.description,
  };
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) notFound();

  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="event-detail">
      <div className="container container--narrow">
        <div className="event-detail__header">
          <Badge variant={event.status === "upcoming" ? "upcoming" : "past"} size="md">
            {event.status}
          </Badge>
          <h1>{event.title}</h1>
          <div className="event-detail__meta">
            <div className="event-detail__meta-item">
              <span className="event-detail__meta-label">Date</span>
              <span>{formattedDate}</span>
            </div>
            <div className="event-detail__meta-item">
              <span className="event-detail__meta-label">Time</span>
              <span>{event.time}</span>
            </div>
            <div className="event-detail__meta-item">
              <span className="event-detail__meta-label">Location</span>
              <span>{event.location}</span>
            </div>
            {event.attendeeCount && (
              <div className="event-detail__meta-item">
                <span className="event-detail__meta-label">Attendees</span>
                <span>{event.attendeeCount}</span>
              </div>
            )}
          </div>
          {event.status === "upcoming" && event.registrationUrl && (
            <Button href={event.registrationUrl} size="lg" id="event-register-cta">
              Register for this event
            </Button>
          )}
        </div>

        <div className="event-detail__body">
          <p>{event.longDescription || event.description}</p>
          {event.speakers && event.speakers.length > 0 && (
            <div className="event-detail__speakers">
              <h3>Speakers / Teams</h3>
              <ul>
                {event.speakers.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          )}
          {event.tags && (
            <div className="event-detail__tags">
              {event.tags.map((tag) => (
                <span key={tag} className="event-detail__tag">{tag}</span>
              ))}
            </div>
          )}
        </div>

        <div className="event-detail__back">
          <Button href="/events" variant="ghost">
            ← Back to all events
          </Button>
        </div>
      </div>
    </article>
  );
}
