import { getDb } from "@/lib/db";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import "@/components/layout/dashboard-ui.css";

export default function AdminEventsPage() {
  const db = getDb();
  
  const events = db.prepare(`
    SELECT e.*, COUNT(r.id) as registration_count
    FROM events e
    LEFT JOIN event_registrations r ON e.id = r.event_id
    GROUP BY e.id
    ORDER BY e.created_at DESC
  `).all() as any[];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "var(--space-6)" }}>
        <div>
          <h2 style={{ fontSize: "var(--text-2xl)", marginBottom: "var(--space-1)" }}>Events Management</h2>
          <p style={{ color: "var(--text-secondary)" }}>Manage your club events and registrations.</p>
        </div>
        <div style={{ display: "flex", gap: "var(--space-3)" }}>
          <Button href="/admin" variant="outline" size="sm">Back to Dashboard</Button>
          <Button href="/admin/events/new" size="sm">Create Event</Button>
        </div>
      </div>

      <div className="dash-table-container">
        <table className="dash-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Location</th>
              <th>Registrations</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: "center", padding: "2rem", color: "var(--text-tertiary)" }}>
                  No events found. Create one to get started!
                </td>
              </tr>
            ) : (
              events.map((event) => (
                <tr key={event.id}>
                  <td data-label="Title" style={{ fontWeight: "500" }}>{event.title}</td>
                  <td data-label="Date">{new Date(event.event_date).toLocaleString()}</td>
                  <td data-label="Location">{event.location || "-"}</td>
                  <td data-label="Registrations">
                    <span style={{ 
                      background: "var(--surface-secondary)", 
                      padding: "4px 8px", 
                      borderRadius: "12px", 
                      fontSize: "0.85rem",
                      fontWeight: "600"
                    }}>
                      {event.registration_count}
                    </span>
                  </td>
                  <td data-label="Actions">
                    {/* Placeholder for viewing registrations or editing */}
                    <Link href={`/admin/events/${event.id}`} style={{ color: "var(--accent-primary-hover)", fontWeight: "500", textDecoration: "none" }}>
                      View Details
                    </Link>
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
