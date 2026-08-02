"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import { submitRegistration } from "./actions";

interface Field {
  id: number;
  label: string;
  field_type: 'short_text' | 'paragraph' | 'number' | 'single_choice' | 'multiple_choice' | 'dropdown';
  options: string | null;
  is_required: boolean;
}

interface RegistrationFormProps {
  eventId: number;
  fields: Field[];
}

export default function RegistrationForm({ eventId, fields }: RegistrationFormProps) {
  const submitWithId = submitRegistration.bind(null, eventId);
  const [state, formAction, isPending] = useActionState(submitWithId, { error: "" });

  return (
    <form action={formAction} className="dash-form">
      {state?.error && (
        <div style={{ color: "var(--accent-primary)", padding: "10px", background: "rgba(255,0,0,0.1)", borderRadius: "4px", marginBottom: "16px", border: "1px solid var(--accent-primary)" }}>
          {state.error}
        </div>
      )}

      {fields.map((field) => {
        let parsedOptions: string[] = [];
        if (field.options) {
          try {
            parsedOptions = JSON.parse(field.options);
          } catch (e) {}
        }

        const name = `field_${field.id}`;

        return (
          <div key={field.id} className="form-group" style={{ marginBottom: "var(--space-5)" }}>
            <label style={{ display: "block", marginBottom: "var(--space-2)", fontWeight: "600", fontSize: "1.1rem" }}>
              {field.label} {field.is_required && <span style={{ color: "var(--accent-primary)" }}>*</span>}
            </label>

            {field.field_type === "short_text" && (
              <input type="text" name={name} required={field.is_required} className="dash-input" />
            )}

            {field.field_type === "paragraph" && (
              <textarea name={name} required={field.is_required} rows={4} className="dash-textarea" />
            )}

            {field.field_type === "number" && (
              <input type="number" name={name} required={field.is_required} className="dash-input" />
            )}

            {field.field_type === "dropdown" && (
              <select name={name} required={field.is_required} className="dash-select">
                <option value="">Select an option</option>
                {parsedOptions.map((opt, i) => (
                  <option key={i} value={opt}>{opt}</option>
                ))}
              </select>
            )}

            {field.field_type === "single_choice" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "8px" }}>
                {parsedOptions.map((opt, i) => (
                  <label key={i} style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontWeight: "500" }}>
                    <input type="radio" name={name} value={opt} required={field.is_required} className="dash-radio" />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            )}

            {field.field_type === "multiple_choice" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "8px" }}>
                {/* Note: HTML5 required on multiple checkboxes means ALL are required if we just slap it on. 
                    So we don't put required on individual checkboxes. Validation is done server-side. */}
                {parsedOptions.map((opt, i) => (
                  <label key={i} style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontWeight: "500" }}>
                    <input type="checkbox" name={name} value={opt} className="dash-checkbox" />
                    <span>{opt}</span>
                  </label>
                ))}
                {field.is_required && <small style={{ color: "var(--text-tertiary)" }}>Select at least one</small>}
              </div>
            )}
          </div>
        );
      })}

      <div style={{ marginTop: "var(--space-6)" }}>
        <Button type="submit" size="lg" disabled={isPending} style={{ width: "100%", justifyContent: "center" }}>
          {isPending ? "Submitting..." : "Submit Registration"}
        </Button>
      </div>
    </form>
  );
}
