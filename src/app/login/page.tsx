"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import "./login.css";
import "../join/join.css"; // Reuse the brutalist form-group styling

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Get the student ID value
    const studentIdInput = (document.getElementById("studentId") as HTMLInputElement)?.value;
    
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      if (studentIdInput && studentIdInput.toLowerCase() === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/dashboard";
      }
    }, 1500);
  };

  return (
    <div className="login-page">
      {/* Left side: Form */}
      <div className="login-container">
        <div className="login-header">
          <h1>Hello, World.</h1>
          <p>Initialize your session to access member resources and track your progress.</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="studentId">Student ID or Email</label>
            <input 
              type="text" 
              id="studentId" 
              required 
              placeholder="e.g., 202314050" 
              disabled={isLoading}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              required 
              placeholder="••••••••" 
              disabled={isLoading}
            />
          </div>

          <Button type="submit" fullWidth disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
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
