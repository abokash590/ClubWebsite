"use server";

import { getDb } from "@/lib/db";
import { hashPassword, createSessionToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type SignupActionState = {
  success?: false;
  error?: string;
};

export async function completeSignup(
  token: string,
  prevState: SignupActionState,
  formData: FormData
): Promise<SignupActionState> {
  const name = formData.get("name") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!name || !password || !confirmPassword) {
    return { success: false, error: "All fields are required" };
  }

  if (password.length < 8) {
    return { success: false, error: "Password must be at least 8 characters long" };
  }

  if (password !== confirmPassword) {
    return { success: false, error: "Passwords do not match" };
  }

  const db = getDb();

  // Create a transaction function
  const processSignup = db.transaction(() => {
    // 1. Re-validate token
    const tokenRow = db.prepare(`
      SELECT t.used, t.expires_at, r.email
      FROM invite_tokens t
      JOIN requests r ON t.request_id = r.id
      WHERE t.token = ?
    `).get(token) as { used: number; expires_at: string; email: string } | undefined;

    if (!tokenRow) {
      throw new Error("Invalid invite link.");
    }
    if (tokenRow.used) {
      throw new Error("This invite link has already been used.");
    }
    if (new Date(tokenRow.expires_at) < new Date()) {
      throw new Error("This invite link has expired.");
    }

    // 2. Hash password
    // (Note: Since we are in a synchronous sqlite transaction, calling async hashPassword directly inside 
    // db.transaction is problematic because the transaction completes when the synchronous function returns.
    // So we must hash the password BEFORE the transaction.)
    return tokenRow.email;
  });

  let userEmail: string;
  try {
    userEmail = processSignup();
  } catch (error: any) {
    return { success: false, error: error.message };
  }

  // Hash password outside the synchronous transaction
  const hashedPassword = await hashPassword(password);

  // Second transaction to actually perform the inserts
  const finalizeSignup = db.transaction(() => {
    // Re-check used status to prevent race conditions during password hashing
    const tokenStatus = db.prepare(`SELECT used FROM invite_tokens WHERE token = ?`).get(token) as { used: number };
    if (tokenStatus.used) {
      throw new Error("This invite link has already been used.");
    }

    // Insert user
    const result = db.prepare(`
      INSERT INTO users (name, email, password_hash, role)
      VALUES (?, ?, ?, 'member')
    `).run(name, userEmail, hashedPassword);

    const userId = result.lastInsertRowid as number;

    // Mark token as used
    db.prepare(`UPDATE invite_tokens SET used = 1 WHERE token = ?`).run(token);

    return userId;
  });

  let userId: number;
  try {
    userId = finalizeSignup();
  } catch (error: any) {
    return { success: false, error: error.message };
  }

  // Create session
  const sessionToken = await createSessionToken({ userId, role: 'member' });
  
  // Set cookie
  const cookieStore = await cookies();
  cookieStore.set("session", sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });

  // Redirect
  redirect("/dashboard");
}
