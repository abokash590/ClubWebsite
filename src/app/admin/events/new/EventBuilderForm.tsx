"use client";

import { useState, useActionState } from "react";
import { Button } from "@/components/ui/Button";
import { Plus, Trash2, GripVertical, Settings2 } from "lucide-react";
import { createEvent, updateEvent } from "../actions";
import "@/components/layout/dashboard-ui.css"; // Reuse dashboard/brutalist styles

import { DatePicker } from "@/components/ui/DatePicker";

type FieldType = 'short_text' | 'paragraph' | 'number' | 'single_choice' | 'multiple_choice' | 'dropdown';

interface Question {
  id: string; // client-only id for mapping
  label: string;
  field_type: FieldType;
  options: string[];
  is_required: boolean;
}

interface EventBuilderFormProps {
  initialEvent?: any;
  initialFields?: Question[];
}

export default function EventBuilderForm({ initialEvent, initialFields }: EventBuilderFormProps = {}) {
  const [eventDate, setEventDate] = useState<Date | null>(initialEvent?.event_date ? new Date(initialEvent.event_date) : null);
  const [registrationDeadline, setRegistrationDeadline] = useState<Date | null>(initialEvent?.registration_deadline ? new Date(initialEvent.registration_deadline) : null);

  const [questions, setQuestions] = useState<Question[]>(initialFields || [
    { id: Date.now().toString(), label: "Name", field_type: "short_text", options: [], is_required: true },
    { id: (Date.now() + 1).toString(), label: "Email", field_type: "short_text", options: [], is_required: true }
  ]);

  const action = initialEvent ? updateEvent.bind(null, initialEvent.id) : createEvent;
  const [state, formAction, isPending] = useActionState(action, { error: "" });

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { id: Date.now().toString(), label: "", field_type: "short_text", options: [], is_required: true }
    ]);
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const updateQuestion = (id: string, updates: Partial<Question>) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, ...updates } : q));
  };

  const addOption = (questionId: string) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        return { ...q, options: [...q.options, `Option ${q.options.length + 1}`] };
      }
      return q;
    }));
  };

  const removeOption = (questionId: string, optionIndex: number) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        return { ...q, options: q.options.filter((_, i) => i !== optionIndex) };
      }
      return q;
    }));
  };

  const updateOption = (questionId: string, optionIndex: number, newValue: string) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        const newOptions = [...q.options];
        newOptions[optionIndex] = newValue;
        return { ...q, options: newOptions };
      }
      return q;
    }));
  };

  // Validate form before submitting to ensure date is selected
  const handleSubmit = (formData: FormData) => {
    if (!eventDate) {
      alert("Please select an Event Date.");
      return;
    }
    formAction(formData);
  };

  return (
    <form action={handleSubmit} className="dash-form">
      {state?.error && (
        <div style={{ color: "var(--accent-primary)", padding: "10px", background: "rgba(255,0,0,0.1)", borderRadius: "4px", marginBottom: "16px", border: "1px solid var(--accent-primary)" }}>
          {state.error}
        </div>
      )}

      {/* Hidden input to pass questions to Server Action */}
      <input type="hidden" name="questions" value={JSON.stringify(questions)} />
      {/* Hidden inputs for dates in standard format */}
      {eventDate && <input type="hidden" name="event_date" value={eventDate.toISOString()} />}
      {registrationDeadline && <input type="hidden" name="registration_deadline" value={registrationDeadline.toISOString()} />}

      {/* Event Details Section */}
      <div className="dash-card" style={{ marginBottom: "var(--space-6)" }}>
        <h3 style={{ marginBottom: "var(--space-4)" }}>Event Details</h3>
        
        <div className="form-group" style={{ marginBottom: "var(--space-4)" }}>
          <label htmlFor="title" style={{ display: "block", marginBottom: "var(--space-2)", fontWeight: "500" }}>Event Title *</label>
          <input type="text" id="title" name="title" required placeholder="e.g. CodeForces Round #950 Watch Party" defaultValue={initialEvent?.title}
                 style={{ width: "100%", padding: "10px", border: "1px solid var(--border-brutalist)", borderRadius: "4px", background: "var(--surface-primary)" }} />
        </div>

        <div className="form-group" style={{ marginBottom: "var(--space-4)" }}>
          <label htmlFor="description" style={{ display: "block", marginBottom: "var(--space-2)", fontWeight: "500" }}>Description</label>
          <textarea id="description" name="description" rows={3} placeholder="What is this event about?" defaultValue={initialEvent?.description}
                 style={{ width: "100%", padding: "10px", border: "1px solid var(--border-brutalist)", borderRadius: "4px", background: "var(--surface-primary)", fontFamily: "inherit" }} />
        </div>

        <div className="dash-form-grid">
          <div className="form-group" style={{ position: "relative", zIndex: 100 }}>
            <label style={{ display: "block", marginBottom: "var(--space-2)", fontWeight: "500" }}>Event Date *</label>
            <DatePicker 
              value={eventDate} 
              onChange={(date) => setEventDate(date)} 
              placeholderText="Select Date and Time"
            />
          </div>
          <div className="form-group" style={{ position: "relative", zIndex: 99 }}>
            <label style={{ display: "block", marginBottom: "var(--space-2)", fontWeight: "500" }}>Registration Deadline</label>
            <DatePicker 
              value={registrationDeadline} 
              onChange={(date) => setRegistrationDeadline(date)} 
              placeholderText="Optional Deadline"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="location" style={{ display: "block", marginBottom: "var(--space-2)", fontWeight: "500" }}>Location</label>
          <input type="text" id="location" name="location" placeholder="e.g. Room 302 or Zoom Link" defaultValue={initialEvent?.location}
                 style={{ width: "100%", padding: "10px", border: "1px solid var(--border-brutalist)", borderRadius: "4px", background: "var(--surface-primary)" }} />
        </div>
      </div>

      {/* Registration Form Builder Section */}
      <h3 style={{ marginBottom: "var(--space-4)" }}>Registration Form Fields</h3>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)", marginBottom: "var(--space-6)" }}>
        {questions.map((q, index) => {
          const needsOptions = ['single_choice', 'multiple_choice', 'dropdown'].includes(q.field_type);
          
          return (
            <div key={q.id} className="dash-card" style={{ padding: "var(--space-4)", borderLeft: "4px solid var(--accent-primary)" }}>
              <div style={{ display: "flex", gap: "var(--space-4)", alignItems: "flex-start", marginBottom: "var(--space-4)" }}>
                
                {/* Question Label */}
                <div style={{ flex: 1 }}>
                  <input 
                    type="text" 
                    value={q.label} 
                    onChange={(e) => updateQuestion(q.id, { label: e.target.value })}
                    placeholder="Question Title"
                    style={{ width: "100%", padding: "10px", border: "1px solid transparent", borderBottomColor: "var(--border-brutalist)", background: "var(--surface-secondary)", fontSize: "1rem", fontWeight: "600" }}
                  />
                </div>

                {/* Question Type */}
                <select 
                  value={q.field_type} 
                  onChange={(e) => updateQuestion(q.id, { field_type: e.target.value as FieldType })}
                  style={{ padding: "10px", border: "1px solid var(--border-brutalist)", borderRadius: "4px", background: "var(--surface-primary)" }}
                >
                  <option value="short_text">Short Text</option>
                  <option value="paragraph">Paragraph</option>
                  <option value="number">Number</option>
                  <option value="single_choice">Single Choice (Radio)</option>
                  <option value="multiple_choice">Multiple Choice (Checkboxes)</option>
                  <option value="dropdown">Dropdown</option>
                </select>
              </div>

              {/* Options Builder */}
              {needsOptions && (
                <div style={{ marginLeft: "var(--space-2)", marginBottom: "var(--space-4)" }}>
                  {q.options.map((opt, optIndex) => (
                    <div key={optIndex} className="dash-option-row">
                      <div style={{ width: "16px", height: "16px", borderRadius: q.field_type === 'multiple_choice' ? "2px" : "50%", border: "1px solid var(--border-brutalist)" }}></div>
                      <input 
                        type="text" 
                        value={opt} 
                        onChange={(e) => updateOption(q.id, optIndex, e.target.value)}
                        style={{ flex: 1, padding: "6px 10px", border: "1px solid transparent", borderBottomColor: "var(--border-default)", background: "transparent" }}
                      />
                      <button type="button" onClick={() => removeOption(q.id, optIndex)} style={{ background: "none", border: "none", color: "var(--text-tertiary)", cursor: "pointer" }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                  <button type="button" onClick={() => addOption(q.id)} style={{ display: "flex", alignItems: "center", gap: "4px", background: "none", border: "none", color: "var(--accent-primary-hover)", fontWeight: "500", cursor: "pointer", marginTop: "8px", padding: "8px 0", minHeight: "44px" }}>
                    <Plus size={16} /> Add Option
                  </button>
                </div>
              )}

              <hr style={{ border: "none", borderTop: "1px solid var(--border-default)", margin: "var(--space-4) 0" }} />

              {/* Question Footer (Required, Delete) */}
              <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "var(--space-4)" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                  <input 
                    type="checkbox" 
                    checked={q.is_required} 
                    onChange={(e) => updateQuestion(q.id, { is_required: e.target.checked })}
                    style={{ width: "16px", height: "16px", accentColor: "var(--accent-primary)" }}
                  />
                  <span>Required</span>
                </label>
                
                <div style={{ width: "1px", height: "24px", background: "var(--border-default)" }}></div>
                
                <button 
                  type="button" 
                  onClick={() => removeQuestion(q.id)}
                  style={{ background: "none", border: "none", color: "var(--text-tertiary)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", width: "44px", height: "44px", borderRadius: "4px" }}
                  onMouseOver={(e) => e.currentTarget.style.background = "var(--surface-secondary)"}
                  onMouseOut={(e) => e.currentTarget.style.background = "none"}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: "var(--space-8)" }}>
        <Button type="button" variant="outline" onClick={addQuestion} style={{ display: "flex", alignItems: "center", gap: "8px", minHeight: "44px" }}>
          <Plus size={20} /> Add Question
        </Button>
      </div>

      {/* Submit */}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "var(--space-4)" }}>
        <Button href={initialEvent ? `/admin/events/${initialEvent.id}` : "/admin/events"} variant="outline">Cancel</Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : initialEvent ? "Update Event" : "Create Event"}
        </Button>
      </div>
    </form>
  );
}
