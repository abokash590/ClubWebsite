import EventBuilderForm from "./EventBuilderForm";
import { Button } from "@/components/ui/Button";

export default function NewEventPage() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "var(--space-6)" }}>
        <div>
          <h2 style={{ fontSize: "var(--text-2xl)", marginBottom: "var(--space-1)" }}>Create New Event</h2>
          <p style={{ color: "var(--text-secondary)" }}>Set up your event details and registration form.</p>
        </div>
        <Button href="/admin/events" variant="outline" size="sm">Back to Events</Button>
      </div>
      
      <EventBuilderForm />
    </div>
  );
}
