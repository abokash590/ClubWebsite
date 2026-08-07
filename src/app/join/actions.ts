"use server";

import { getDb, initDb } from "@/lib/db";

export type JoinActionState = {
  success: boolean;
  message: string;
  errors?: {
    name?: string;
    email?: string;
    reason?: string;
  };
};

export async function submitJoinRequest(prevState: JoinActionState, formData: FormData): Promise<JoinActionState> {
  const name = formData.get("fullName")?.toString() || "";
  const email = formData.get("email")?.toString() || "";
  const reason = formData.get("whyJoin")?.toString() || "";
  const student_id = formData.get("studentId")?.toString() || "";
  const registration_number = formData.get("registrationNumber")?.toString() || "";
  const batch = formData.get("batch")?.toString() || "";
  const linkedin = formData.get("linkedin")?.toString() || "";
  const github = formData.get("github")?.toString() || "";
  const facebook = formData.get("facebook")?.toString() || "";
  const discord = formData.get("discord")?.toString() || "";
  const codeforces = formData.get("codeforces")?.toString() || "";
  const codechef = formData.get("codechef")?.toString() || "";
  const photo_base64 = formData.get("photo_base64")?.toString() || "";

  const errors: JoinActionState["errors"] = {};

  if (!name.trim()) errors.name = "Name is required";
  if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) errors.email = "Valid email is required";
  if (!reason.trim()) errors.reason = "Reason is required";
  
  if (photo_base64 && !photo_base64.startsWith("data:image/")) {
    return { success: false, message: "Invalid photo format." };
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, message: "Please fix the errors below.", errors };
  }

  try {
    // Ensure DB tables exist before querying
    initDb();
    
    const db = getDb();

    // Check for an existing pending request with the same email
    const existing = db.prepare(`SELECT id FROM requests WHERE email = ? AND status = 'pending'`).get(email);
    if (existing) {
      return { success: false, message: "A request with this email is already pending approval." };
    }

    // Insert new request
    const insert = db.prepare(`
      INSERT INTO requests (
        name, email, reason, status,
        student_id, registration_number, batch,
        linkedin, github, facebook, discord,
        codeforces, codechef, photo_base64
      ) VALUES (
        ?, ?, ?, 'pending',
        ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?, ?
      )
    `);
    insert.run(
      name, email, reason,
      student_id, registration_number, batch,
      linkedin, github, facebook, discord,
      codeforces, codechef, photo_base64
    );

    return { success: true, message: "Your request has been submitted. We'll email you if approved." };
  } catch (err) {
    console.error("Join submission error:", err);
    return { success: false, message: "An error occurred while submitting your request. Please try again later." };
  }
}
