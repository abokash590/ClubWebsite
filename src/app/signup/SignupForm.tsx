"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import { completeSignup } from "./actions";
import "../login/login.css"; // Reuse the brutalist styles

export default function SignupForm({ 
  token, 
  initialName, 
  initialEmail 
}: { 
  token: string, 
  initialName: string, 
  initialEmail: string 
}) {
  const [state, formAction, isPending] = useActionState(
    completeSignup.bind(null, token),
    {}
  );

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>Complete Signup</h1>
          <p>Welcome! Please set a password for your account.</p>
        </div>

        {state.error && (
          <div style={{ color: "var(--accent-primary)", padding: "10px", background: "rgba(255,0,0,0.1)", borderRadius: "4px", marginBottom: "16px", width: "100%", textAlign: "center" }}>
            {state.error}
          </div>
        )}

        <form action={formAction} className="login-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              defaultValue={initialName} 
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={initialEmail} 
              readOnly 
              style={{ backgroundColor: "var(--bg-elevated)", color: "var(--text-tertiary)" }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              required 
              minLength={8}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input 
              type="password" 
              id="confirmPassword" 
              name="confirmPassword" 
              required 
              minLength={8}
            />
          </div>

          <Button type="submit" disabled={isPending} style={{ width: "100%", marginTop: "var(--space-4)" }}>
            {isPending ? "Creating Account..." : "Create Account"}
          </Button>
        </form>
      </div>
    </div>
  );
}
