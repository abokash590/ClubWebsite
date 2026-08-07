"use server";

import { getDb } from "@/lib/db";
import { revalidatePath } from "next/cache";
import crypto from "crypto";

export async function rejectRequest(requestId: number) {
  const db = getDb();
  
  db.prepare(`UPDATE requests SET status = 'rejected' WHERE id = ?`).run(requestId);
  
  revalidatePath("/admin");
}

export async function getApplicationDetails(requestId: number) {
  const db = getDb();
  // Fetch all columns including photo_base64
  const row = db.prepare(`SELECT * FROM requests WHERE id = ?`).get(requestId);
  if (!row) return null;
  
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    reason: row.reason,
    status: row.status,
    created_at: row.created_at,
    student_id: row.student_id,
    registration_number: row.registration_number,
    batch: row.batch,
    linkedin: row.linkedin,
    github: row.github,
    facebook: row.facebook,
    discord: row.discord,
    codeforces: row.codeforces,
    codechef: row.codechef,
    photo_base64: row.photo_base64
  };
}

export async function approveRequest(requestId: number) {
  const db = getDb();
  
  try {
    const performApproval = db.transaction(() => {
      // Check if it's already approved/rejected
      const request = db.prepare(`SELECT status FROM requests WHERE id = ?`).get(requestId) as { status: string } | undefined;
      
      if (!request) {
        throw new Error("Request not found");
      }
      
      if (request.status !== "pending") {
        throw new Error("Request is already processed");
      }

      // 1. Update status
      db.prepare(`UPDATE requests SET status = 'approved' WHERE id = ?`).run(requestId);
      
      // 2. Generate random token
      const token = crypto.randomBytes(32).toString('hex');
      
      // 3. Insert into invite_tokens (expires in 24 hours)
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 24);
      
      db.prepare(`
        INSERT INTO invite_tokens (request_id, token, expires_at, used)
        VALUES (?, ?, ?, 0)
      `).run(requestId, token, expiresAt.toISOString());
      
      return token;
    });

    const token = performApproval();
    revalidatePath("/admin");
    return { success: true, token };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
