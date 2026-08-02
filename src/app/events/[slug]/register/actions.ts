"use server";

import { getDb } from "@/lib/db";
import { verifySessionToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function submitRegistration(eventId: number, prevState: any, formData: FormData) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;
  
  if (!sessionToken) {
    return { error: "You must be logged in to register for events." };
  }

  const session = await verifySessionToken(sessionToken);
  if (!session) {
    return { error: "Invalid session. Please log in again." };
  }

  const db = getDb();
  const userId = session.userId;

  // 1. Check if event exists and if it's past deadline
  const event = db.prepare(`SELECT * FROM events WHERE id = ?`).get(eventId) as any;
  if (!event) {
    return { error: "Event not found." };
  }
  
  if (event.registration_deadline && new Date() > new Date(event.registration_deadline)) {
    return { error: "Registration deadline has passed." };
  }

  // 2. Fetch required fields to validate
  const fields = db.prepare(`SELECT * FROM event_fields WHERE event_id = ?`).all(eventId) as any[];

  // Collect answers
  const answersToInsert: { field_id: number; answer_value: string }[] = [];
  
  for (const field of fields) {
    let valStr = "";
    
    if (field.field_type === 'multiple_choice') {
      // Multiple choice comes as multiple FormData entries with the same name
      const values = formData.getAll(`field_${field.id}`);
      valStr = JSON.stringify(values.map(v => v.toString()));
      if (field.is_required && values.length === 0) {
        return { error: `${field.label} is required.` };
      }
    } else {
      const val = formData.get(`field_${field.id}`);
      valStr = val ? val.toString() : "";
      if (field.is_required && !valStr) {
        return { error: `${field.label} is required.` };
      }
    }
    
    answersToInsert.push({ field_id: field.id, answer_value: valStr });
  }

  try {
    db.transaction(() => {
      // 3. Insert registration (will throw if unique constraint fails)
      const insertReg = db.prepare(`
        INSERT INTO event_registrations (event_id, user_id)
        VALUES (?, ?)
      `);
      
      const result = insertReg.run(eventId, userId);
      const registrationId = result.lastInsertRowid;

      // 4. Insert answers
      if (answersToInsert.length > 0) {
        const insertAns = db.prepare(`
          INSERT INTO event_field_answers (registration_id, field_id, answer_value)
          VALUES (?, ?, ?)
        `);
        
        for (const ans of answersToInsert) {
          insertAns.run(registrationId, ans.field_id, ans.answer_value);
        }
      }
    })();
  } catch (error: any) {
    if (error.message?.includes('UNIQUE constraint failed')) {
      return { error: "You have already registered for this event." };
    }
    console.error("Failed to register:", error);
    return { error: "Failed to submit registration. Please try again." };
  }

  redirect(`/events/${eventId}?success=true`);
}
