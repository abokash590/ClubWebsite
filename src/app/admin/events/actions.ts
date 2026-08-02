"use server";

import { getDb } from "@/lib/db";
import { verifySessionToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function createEvent(prevState: any, formData: FormData) {
  const title = formData.get("title")?.toString();
  const description = formData.get("description")?.toString() || "";
  const event_date = formData.get("event_date")?.toString();
  const location = formData.get("location")?.toString() || "";
  const registration_deadline = formData.get("registration_deadline")?.toString() || null;
  const questionsJson = formData.get("questions")?.toString() || "[]";

  if (!title || !event_date) {
    return { error: "Title and Event Date are required." };
  }

  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;
  if (!sessionToken) {
    return { error: "Unauthorized" };
  }

  const session = await verifySessionToken(sessionToken);
  if (!session || session.role !== "admin") {
    return { error: "Unauthorized" };
  }

  const created_by = session.userId;
  let questions: any[] = [];
  try {
    questions = JSON.parse(questionsJson);
  } catch (err) {
    return { error: "Invalid questions format." };
  }

  const db = getDb();

  try {
    db.transaction(() => {
      // 1. Insert Event
      const insertEvent = db.prepare(`
        INSERT INTO events (title, description, event_date, location, registration_deadline, created_by)
        VALUES (?, ?, ?, ?, ?, ?)
      `);
      
      const result = insertEvent.run(
        title, 
        description, 
        event_date, 
        location, 
        registration_deadline, 
        created_by
      );
      
      const event_id = result.lastInsertRowid;

      // 2. Insert Fields
      if (questions.length > 0) {
        const insertField = db.prepare(`
          INSERT INTO event_fields (event_id, label, field_type, options, is_required, field_order)
          VALUES (?, ?, ?, ?, ?, ?)
        `);
        
        for (let i = 0; i < questions.length; i++) {
          const q = questions[i];
          const optionsStr = (q.field_type === 'single_choice' || q.field_type === 'multiple_choice' || q.field_type === 'dropdown') 
            ? JSON.stringify(q.options || []) 
            : null;
            
          insertField.run(
            event_id,
            q.label || "Untitled Question",
            q.field_type,
            optionsStr,
            q.is_required ? 1 : 0,
            i
          );
        }
      }
    })();
  } catch (error: any) {
    console.error("Failed to create event:", error);
    return { error: "Failed to create event. Please try again." };
  }

  redirect("/admin/events");
}

export async function deleteEvent(eventId: number, formData?: FormData) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;
  if (!sessionToken) {
    return { error: "Unauthorized" };
  }

  const session = await verifySessionToken(sessionToken);
  if (!session || session.role !== "admin") {
    return { error: "Unauthorized" };
  }

  const db = getDb();
  
  try {
    db.prepare(`DELETE FROM events WHERE id = ?`).run(eventId);
  } catch (error: any) {
    console.error("Failed to delete event:", error);
    return { error: "Failed to delete event." };
  }
  
  redirect("/admin/events");
}
export async function updateEvent(eventId: number, prevState: any, formData: FormData) {
  const title = formData.get("title")?.toString();
  const description = formData.get("description")?.toString() || "";
  const event_date = formData.get("event_date")?.toString();
  const location = formData.get("location")?.toString() || "";
  const registration_deadline = formData.get("registration_deadline")?.toString() || null;
  const questionsJson = formData.get("questions")?.toString() || "[]";

  if (!title || !event_date) {
    return { error: "Title and Event Date are required." };
  }

  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;
  if (!sessionToken) {
    return { error: "Unauthorized" };
  }

  const session = await verifySessionToken(sessionToken);
  if (!session || session.role !== "admin") {
    return { error: "Unauthorized" };
  }

  let questions: any[] = [];
  try {
    questions = JSON.parse(questionsJson);
  } catch (err) {
    return { error: "Invalid questions format." };
  }

  const db = getDb();

  try {
    db.transaction(() => {
      // 1. Update Event details
      db.prepare(`
        UPDATE events 
        SET title = ?, description = ?, event_date = ?, location = ?, registration_deadline = ?
        WHERE id = ?
      `).run(title, description, event_date, location, registration_deadline, eventId);

      // 2. Fetch existing fields to reconcile
      const existingFields = db.prepare(`SELECT id FROM event_fields WHERE event_id = ?`).all(eventId) as { id: number }[];
      const existingFieldIds = new Set(existingFields.map(f => f.id));

      const incomingIds = new Set<number>();

      const insertField = db.prepare(`
        INSERT INTO event_fields (event_id, label, field_type, options, is_required, field_order)
        VALUES (?, ?, ?, ?, ?, ?)
      `);

      const updateField = db.prepare(`
        UPDATE event_fields 
        SET label = ?, field_type = ?, options = ?, is_required = ?, field_order = ?
        WHERE id = ? AND event_id = ?
      `);

      for (let i = 0; i < questions.length; i++) {
        const q = questions[i];
        const optionsStr = (q.field_type === 'single_choice' || q.field_type === 'multiple_choice' || q.field_type === 'dropdown') 
          ? JSON.stringify(q.options || []) 
          : null;

        const isExisting = !isNaN(Number(q.id)) && existingFieldIds.has(Number(q.id));

        if (isExisting) {
          // Update
          const fieldId = Number(q.id);
          incomingIds.add(fieldId);
          updateField.run(
            q.label || "Untitled Question",
            q.field_type,
            optionsStr,
            q.is_required ? 1 : 0,
            i,
            fieldId,
            eventId
          );
        } else {
          // Insert
          insertField.run(
            eventId,
            q.label || "Untitled Question",
            q.field_type,
            optionsStr,
            q.is_required ? 1 : 0,
            i
          );
        }
      }

      // 3. Delete removed fields
      const deleteField = db.prepare(`DELETE FROM event_fields WHERE id = ?`);
      for (const oldId of existingFieldIds) {
        if (!incomingIds.has(oldId)) {
          deleteField.run(oldId);
        }
      }

    })();
  } catch (error: any) {
    console.error("Failed to update event:", error);
    return { error: "Failed to update event. Please try again." };
  }

  redirect(`/admin/events/${eventId}`);
}
