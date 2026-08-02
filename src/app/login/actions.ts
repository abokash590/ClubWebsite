"use server";

import { getDb } from "@/lib/db";
import { verifyPassword, createSessionToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type LoginActionState = {
  success: boolean;
  message: string;
};

export async function loginAction(prevState: LoginActionState, formData: FormData): Promise<LoginActionState> {
  const email = formData.get("email")?.toString() || "";
  const password = formData.get("password")?.toString() || "";

  if (!email || !password) {
    return { success: false, message: "Email and password are required." };
  }

  const db = getDb();
  
  // Find the user by email
  const user = db.prepare(`SELECT * FROM users WHERE email = ?`).get(email) as any;
  
  if (!user) {
    return { success: false, message: "Invalid email or password" };
  }

  // Verify the password
  const isValid = await verifyPassword(password, user.password_hash);
  
  if (!isValid) {
    return { success: false, message: "Invalid email or password" };
  }

  // Generate JWT token
  const token = await createSessionToken({
    userId: user.id,
    role: user.role
  });

  // Set the cookie
  const cookieStore = await cookies();
  cookieStore.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  // Redirect to admin dashboard if the role is admin
  if (user.role === "admin") {
    redirect("/admin");
  } else {
    redirect("/dashboard"); // For non-admin members
  }
}
