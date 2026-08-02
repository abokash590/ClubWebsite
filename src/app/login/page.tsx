"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { loginAction } from "./actions";
import "./login.css";
import "../join/join.css"; // Reuse the brutalist form-group styling

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, {
    success: false,
    message: "",
  });

  return (
    <div className="login-page">
      {/* Left side: Form */}
      <div className="login-container">
        <div className="login-header">
          <h1>Hello, World.</h1>
          <p>Initialize your session to access member resources and track your progress.</p>
        </div>

        <form className="login-form" action={formAction}>
          {state.message && (
            <div style={{ color: "var(--accent-primary)", padding: "10px", background: "rgba(255,0,0,0.1)", borderRadius: "4px", marginBottom: "16px" }}>
              {state.message}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="text" 
              id="email" 
              name="email"
              required 
              placeholder="e.g., admin@mec.edu.bd" 
              disabled={isPending}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password"
              required 
              placeholder="••••••••" 
              disabled={isPending}
            />
          </div>

          <Button type="submit" fullWidth disabled={isPending}>
            {isPending ? "Signing in..." : "Sign In"}
          </Button>

          <div className="login-form__footer">
            <Link href="#" className="login-form__forgot">
              Forgot your password?
            </Link>
            <span className="login-form__signup">
              Not a member yet? <Link href="/join">Apply to join</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
