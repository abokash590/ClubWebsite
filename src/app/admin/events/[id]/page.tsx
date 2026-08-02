import { getDb } from "@/lib/db";
import { Button } from "@/components/ui/Button";
import { notFound } from "next/navigation";
import { deleteEvent } from "../actions";
import DeleteEventButton from "./DeleteEventButton";
import "@/components/layout/dashboard-ui.css";

export default async function EventDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const eventId = resolvedParams.id;
  const db = getDb();
  
  // 1. Fetch Event Details
  const event = db.prepare(`
    SELECT * FROM events WHERE id = ?
  `).get(eventId) as any;

  if (!event) {
    notFound();
  }

  // 2. Fetch Form Fields (Questions)
  const fields = db.prepare(`
    SELECT * FROM event_fields WHERE event_id = ? ORDER BY field_order ASC
  `).all(eventId) as any[];

  // 3. Fetch Registrations
  const registrations = db.prepare(`
    SELECT r.id, r.submitted_at, u.name, u.email 
    FROM event_registrations r
    JOIN users u ON r.user_id = u.id
    WHERE r.event_id = ?
    ORDER BY r.submitted_at DESC
  `).all(eventId) as any[];

  // 4. Fetch Answers for all registrations of this event
  const answers = db.prepare(`
    SELECT a.registration_id, a.field_id, a.answer_value
    FROM event_field_answers a
    JOIN event_registrations r ON a.registration_id = r.id
    WHERE r.event_id = ?
  `).all(eventId) as any[];

  // Organize answers by registration_id
  const answersByRegId: Record<number, Record<number, string>> = {};
  for (const ans of answers) {
    if (!answersByRegId[ans.registration_id]) {
      answersByRegId[ans.registration_id] = {};
    }
    answersByRegId[ans.registration_id][ans.field_id] = ans.answer_value;
  }

  const deleteEventWithId = deleteEvent.bind(null, Number(eventId));

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "var(--space-6)" }}>
        <div>
          <h2 style={{ fontSize: "var(--text-3xl)", marginBottom: "var(--space-2)" }}>{event.title}</h2>
          <div style={{ display: "flex", gap: "var(--space-4)", color: "var(--text-secondary)", fontSize: "0.95rem" }}>
            <span>📅 {new Date(event.event_date).toLocaleString()}</span>
            {event.location && <span>📍 {event.location}</span>}
          </div>
          {event.description && <p style={{ marginTop: "var(--space-4)", maxWidth: "800px" }}>{event.description}</p>}
        </div>
        <div style={{ display: "flex", gap: "var(--space-3)" }}>
          <Button href={`/admin/events/${eventId}/edit`} variant="outline" size="sm">Edit Event</Button>
          <Button href="/admin/events" variant="outline" size="sm">Back to Events</Button>
          <form action={deleteEventWithId}>
            <DeleteEventButton />
          </form>
        </div>
      </div>

      <div className="dash-grid" style={{ marginBottom: "var(--space-6)" }}>
        <div className="dash-card">
          <div className="dash-card__label">Total Registrations</div>
          <div className="dash-card__value" style={{ color: "var(--accent-primary-hover)" }}>{registrations.length}</div>
        </div>
        <div className="dash-card">
          <div className="dash-card__label">Deadline</div>
          <div className="dash-card__value" style={{ fontSize: "1.2rem" }}>
            {event.registration_deadline ? new Date(event.registration_deadline).toLocaleDateString() : "No Deadline"}
          </div>
        </div>
      </div>

      <h3 style={{ marginBottom: "var(--space-4)" }}>Registrations List</h3>
      <div className="dash-table-container">
        <table className="dash-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              {fields.map(f => (
                <th key={f.id}>{f.label}</th>
              ))}
              <th>Registered At</th>
            </tr>
          </thead>
          <tbody>
            {registrations.length === 0 ? (
              <tr>
                <td colSpan={3 + fields.length} style={{ textAlign: "center", padding: "2rem", color: "var(--text-tertiary)" }}>
                  No one has registered for this event yet.
                </td>
              </tr>
            ) : (
              registrations.map((reg) => (
                <tr key={reg.id}>
                  <td data-label="Name" style={{ fontWeight: "500" }}>{reg.name}</td>
                  <td data-label="Email">{reg.email}</td>
                  {fields.map(f => {
                    const ans = answersByRegId[reg.id]?.[f.id];
                    let displayAns = ans || "-";
                    // If JSON array (multiple choice)
                    if (ans && ans.startsWith("[")) {
                      try {
                        displayAns = JSON.parse(ans).join(", ");
                      } catch(e) {}
                    }
                    return <td data-label={f.label} key={f.id}>{displayAns}</td>;
                  })}
                  <td data-label="Registered At" style={{ fontSize: "0.85rem", color: "var(--text-tertiary)" }}>
                    {new Date(reg.submitted_at).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
