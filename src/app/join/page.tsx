"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import "./join.css";

export default function JoinPage() {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <section className="section join-success">
        <div className="container container--narrow text-center">
          <div className="join-success__icon">✓</div>
          <h1>Application Received</h1>
          <p className="join-success__message">
            Thanks for applying! We&apos;ve received your application and will email you
            at the provided address within 3-5 business days with next steps.
          </p>
          <Button href="/" size="lg">Return Home</Button>
        </div>
      </section>
    );
  }

  return (
    <section className="section join-page">
      <div className="container container--narrow">
        <div className="join-header">
          <span className="kicker">Join Us</span>
          <h1>Apply to MEC Computer Club</h1>
          <p>
            We&apos;re looking for students who want to build, compete, and learn.
            No prior experience required — just curiosity and a willingness to put in the work.
          </p>
        </div>

        <div className="join-progress">
          <div className={`join-progress__step ${step >= 1 ? "active" : ""}`}>1. Basics</div>
          <div className={`join-progress__step ${step >= 2 ? "active" : ""}`}>2. Interests</div>
          <div className={`join-progress__step ${step >= 3 ? "active" : ""}`}>3. Submit</div>
        </div>

        <form className="join-form" onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="join-form__step animate-fade-in">
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input type="text" id="fullName" required placeholder="e.g., Farhan Ahmed" />
              </div>
              <div className="form-group">
                <label htmlFor="studentId">Student ID</label>
                <input type="text" id="studentId" required placeholder="e.g., 202314050" />
              </div>
              <div className="form-group">
                <label htmlFor="email">University Email</label>
                <input type="email" id="email" required placeholder="name@std.mec.edu.bd" />
              </div>
              <div className="form-group">
                <label htmlFor="semester">Current Semester</label>
                <select id="semester" required>
                  <option value="">Select...</option>
                  <option value="1">1st Semester</option>
                  <option value="2">2nd Semester</option>
                  <option value="3">3rd Semester</option>
                  <option value="4">4th Semester</option>
                  <option value="5">5th Semester</option>
                  <option value="6">6th Semester</option>
                  <option value="7">7th Semester</option>
                  <option value="8">8th Semester</option>
                </select>
              </div>
              <div className="form-actions">
                <Button type="button" onClick={() => setStep(2)}>Next Step →</Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="join-form__step animate-fade-in">
              <div className="form-group">
                <label>Primary Interest Area</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input type="radio" name="department" value="cp" required />
                    Competitive Programming
                  </label>
                  <label className="radio-label">
                    <input type="radio" name="department" value="webdev" />
                    Web Development
                  </label>
                  <label className="radio-label">
                    <input type="radio" name="department" value="ml" />
                    Machine Learning / AI
                  </label>
                  <label className="radio-label">
                    <input type="radio" name="department" value="cybersec" />
                    Cybersecurity
                  </label>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="experience">Current Experience Level</label>
                <select id="experience" required>
                  <option value="">Select...</option>
                  <option value="none">Complete beginner (Never coded before)</option>
                  <option value="basic">Know basic syntax (Variables, loops, if/else)</option>
                  <option value="intermediate">Have built small projects / solved some CP problems</option>
                  <option value="advanced">Comfortable building full apps / high CP rating</option>
                </select>
              </div>
              <div className="form-actions form-actions--split">
                <Button type="button" variant="secondary" onClick={() => setStep(1)}>← Back</Button>
                <Button type="button" onClick={() => setStep(3)}>Next Step →</Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="join-form__step animate-fade-in">
              <div className="form-group">
                <label htmlFor="whyJoin">Why do you want to join this club? (Be honest, not formal)</label>
                <textarea 
                  id="whyJoin" 
                  rows={4} 
                  required 
                  placeholder="e.g., I want to learn web dev to build my own startup ideas, or I want to represent the university in ICPC..."
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="commitment">
                  <input type="checkbox" id="commitment" required />
                  I understand that active membership requires attending at least one session/meeting per week.
                </label>
              </div>
              <div className="form-actions form-actions--split">
                <Button type="button" variant="secondary" onClick={() => setStep(2)}>← Back</Button>
                <Button type="submit">Submit Application</Button>
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
