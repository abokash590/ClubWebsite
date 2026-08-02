import { getDb } from "@/lib/db";
import { notFound } from "next/navigation";
import EventBuilderForm from "../../new/EventBuilderForm";
import "@/components/layout/dashboard-ui.css";

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
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

  // Convert fields to Question format and parse JSON options
  const initialFields = fields.map(f => ({
    id: f.id.toString(),
    label: f.label,
    field_type: f.field_type,
    options: f.options ? JSON.parse(f.options) : [],
    is_required: Boolean(f.is_required)
  }));

  // Convert event to plain object
  const initialEvent = {
    id: event.id,
    title: event.title,
    description: event.description,
    event_date: event.event_date,
    location: event.location,
    registration_deadline: event.registration_deadline
  };

  return (
    <div>
      <div style={{ marginBottom: "var(--space-6)" }}>
        <h2 style={{ fontSize: "var(--text-3xl)", marginBottom: "var(--space-2)" }}>Edit Event</h2>
        <p style={{ color: "var(--text-secondary)" }}>Modify event details or update the registration form.</p>
        <p style={{ color: "var(--accent-warning)", fontSize: "var(--text-sm)", marginTop: "var(--space-2)", fontWeight: "500" }}>
          ⚠️ Warning: Deleting a field will also delete all submitted answers for that field.
        </p>
      </div>
      
      <EventBuilderForm initialEvent={initialEvent} initialFields={initialFields} />
    </div>
  );
}
