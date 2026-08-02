"use client";

import { Button } from "@/components/ui/Button";

export default function DeleteEventButton() {
  return (
    <Button 
      type="submit" 
      size="sm" 
      style={{ backgroundColor: "var(--accent-error)", color: "white", borderColor: "var(--accent-error)" }}
      onClick={(e) => {
        if (!window.confirm('Are you sure you want to delete this event? This action cannot be undone and will delete all registrations.')) {
          e.preventDefault();
        }
      }}
    >
      Delete Event
    </Button>
  );
}
