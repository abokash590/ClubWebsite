import { getDb } from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import { verifySessionToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/Button";
import RegistrationForm from "./RegistrationForm";
import "@/app/events/[slug]/event-detail.css"; // Reuse event details styling for the header
import "@/components/layout/dashboard-ui.css"; // Reuse dashboard/brutalist styles for the form

export default async function EventRegistrationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Must be a valid event ID
  if (isNaN(Number(slug))) {
    notFound();
  }

  const eventId = Number(slug);
  const db = getDb();

  // Fetch Event
  const event = db.prepare(`SELECT * FROM events WHERE id = ?`).get(eventId) as any;
  if (!event) {
    notFound();
  }

  // Check Auth
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;
  let userId = null;

  if (sessionToken) {
    const session = await verifySessionToken(sessionToken);
    if (session) {
      userId = session.userId;
    }
  }

  if (!userId) {
    redirect(`/login?redirect=/events/${eventId}/register`);
  }

  // Check if already registered
  const existingRegistration = db.prepare(`
    SELECT * FROM event_registrations WHERE event_id = ? AND user_id = ?
  `).get(eventId, userId);

  // Fetch Fields
  const fields = db.prepare(`
    SELECT * FROM event_fields WHERE event_id = ? ORDER BY field_order ASC
  `).all(eventId) as any[];

  // Convert to plain objects to fix React serialization error
  const plainFields = fields.map((f: any) => ({
    id: f.id,
    label: f.label,
    field_type: f.field_type,
    options: f.options,
    is_required: f.is_required,
  }));

  return (
    <article className="event-detail">
      <div className="container container--narrow">
        <div className="event-detail__header" style={{ marginBottom: "var(--space-6)" }}>
          <h1>Register for: {event.title}</h1>
          <div className="event-detail__meta">
            <div className="event-detail__meta-item">
              <span className="event-detail__meta-label">Date</span>
              <span>{new Date(event.event_date).toLocaleString()}</span>
            </div>
            {event.location && (
              <div className="event-detail__meta-item">
                <span className="event-detail__meta-label">Location</span>
                <span>{event.location}</span>
              </div>
            )}
          </div>
        </div>

        {existingRegistration ? (
          <div className="dash-card" style={{ textAlign: "center", padding: "3rem 1rem", border: "2px solid var(--border-brutalist)" }}>
            <h2 style={{ marginBottom: "var(--space-3)" }}>You're already registered! 🎉</h2>
            <p style={{ color: "var(--text-secondary)", marginBottom: "var(--space-5)" }}>
              We've received your registration for this event. 
            </p>
            <Button href={`/events/${eventId}`} variant="outline">Back to Event Details</Button>
          </div>
        ) : (
          <div className="dash-card">
            <h3 style={{ marginBottom: "var(--space-5)" }}>Registration Form</h3>
            {fields.length === 0 ? (
              <p style={{ color: "var(--text-secondary)" }}>This event doesn't have any custom registration fields. Proceed to click submit.</p>
            ) : null}
            
            <RegistrationForm eventId={eventId} fields={plainFields} />
          </div>
        )}
      </div>
    </article>
  );
}
