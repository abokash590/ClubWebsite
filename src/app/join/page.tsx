"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { RobotIcon } from "@/components/ui/RobotIcon";
import { ClubIcon } from "@/components/ui/ClubIcon";
import { Select } from "@/components/ui/Select";
import "./join.css";

export default function JoinPage() {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Track all form data
  const [formData, setFormData] = useState({
    fullName: "",
    studentId: "",
    email: "",
    semester: "",
    department: "",
    experience: "",
    whyJoin: "",
    commitment: false,
  });

  const [mood, setMood] = useState<"neutral" | "happy" | "sad">("neutral");
  const [isHoveringNext, setIsHoveringNext] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value, type } = e.target;
    // Handle specific radio group mapping
    if (e.target.name === "department") {
      setFormData(prev => ({ ...prev, department: value }));
      return;
    }
    
    // Handle checkbox
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [id]: checked }));
      return;
    }

    setFormData(prev => ({ ...prev, [id]: value }));
  };

  // Calculate progress %
  const calculateProgress = () => {
    let filled = 0;
    if (formData.fullName.trim() !== "") filled++;
    if (formData.studentId.trim() !== "") filled++;
    if (formData.email.trim() !== "") filled++;
    if (formData.semester !== "") filled++;
    if (formData.department !== "") filled++;
    if (formData.experience !== "") filled++;
    if (formData.whyJoin.trim() !== "") filled++;
    if (formData.commitment) filled++;
    return (filled / 8) * 100;
  };

  const progress = calculateProgress();
  const prevProgressRef = useRef(progress);
  const moodTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Watch for progress changes to set robot mood
  useEffect(() => {
    if (progress > prevProgressRef.current) {
      setMood("happy");
    } else if (progress < prevProgressRef.current) {
      setMood("sad");
    }

    prevProgressRef.current = progress;

    if (moodTimeoutRef.current) clearTimeout(moodTimeoutRef.current);
    moodTimeoutRef.current = setTimeout(() => {
      setMood("neutral");
    }, 2000);

    return () => {
      if (moodTimeoutRef.current) clearTimeout(moodTimeoutRef.current);
    };
  }, [progress]);

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
          <span className="kicker">New Connection</span>
          <h1>Ready to Git Commit to the Club?</h1>
          <p>
            We&apos;re looking for students who want to build, compete, and learn.
            No prior experience required — just curiosity and a willingness to write some code.
          </p>
        </div>

        {/* Dynamic Robot Progress Bar */}
        <div className="robot-progress-container">
          <div className="robot-progress-header">
            <span style={{ fontWeight: step >= 1 ? "bold" : "normal", color: step >= 1 ? "var(--text-primary)" : "var(--text-tertiary)" }}>1. Basics</span>
            <span style={{ fontWeight: step >= 2 ? "bold" : "normal", color: step >= 2 ? "var(--text-primary)" : "var(--text-tertiary)" }}>2. Interests</span>
            <span style={{ fontWeight: step >= 3 ? "bold" : "normal", color: step >= 3 ? "var(--text-primary)" : "var(--text-tertiary)" }}>3. Submit</span>
          </div>
          <div className="robot-progress-track">
            <div className="robot-progress-fill" style={{ width: `${progress}%` }}></div>
            <div className="robot-character" style={{ left: `${progress}%` }}>
              <RobotIcon mood={isHoveringNext ? "happy" : mood} />
            </div>
            <div className="robot-destination">
              <ClubIcon />
            </div>
          </div>
        </div>

        <form className="join-form" onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="join-form__step animate-fade-in">
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input type="text" id="fullName" value={formData.fullName} onChange={handleInputChange} required placeholder="e.g., Farhan Ahmed" />
              </div>
              <div className="form-group">
                <label htmlFor="studentId">Student ID</label>
                <input type="text" id="studentId" value={formData.studentId} onChange={handleInputChange} required placeholder="e.g., 202314050" />
              </div>
              <div className="form-group">
                <label htmlFor="email">University Email</label>
                <input type="email" id="email" value={formData.email} onChange={handleInputChange} required placeholder="name@std.mec.edu.bd" />
              </div>
              <div className="form-group">
                <label htmlFor="semester">Current Semester</label>
                <Select
                  id="semester"
                  value={formData.semester}
                  onChange={(val) => setFormData(prev => ({ ...prev, semester: val }))}
                  options={[
                    { value: "1", label: "1st Semester" },
                    { value: "2", label: "2nd Semester" },
                    { value: "3", label: "3rd Semester" },
                    { value: "4", label: "4th Semester" },
                    { value: "5", label: "5th Semester" },
                    { value: "6", label: "6th Semester" },
                    { value: "7", label: "7th Semester" },
                    { value: "8", label: "8th Semester" },
                  ]}
                  required
                />
              </div>
              <div className="form-actions">
                <div onMouseEnter={() => setIsHoveringNext(true)} onMouseLeave={() => setIsHoveringNext(false)}>
                  <Button type="button" onClick={() => setStep(2)}>Next Step →</Button>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="join-form__step animate-fade-in">
              <div className="form-group">
                <label>Primary Interest Area</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input type="radio" name="department" value="cp" checked={formData.department === "cp"} onChange={handleInputChange} required />
                    Competitive Programming
                  </label>
                  <label className="radio-label">
                    <input type="radio" name="department" value="webdev" checked={formData.department === "webdev"} onChange={handleInputChange} />
                    Web Development
                  </label>
                  <label className="radio-label">
                    <input type="radio" name="department" value="ml" checked={formData.department === "ml"} onChange={handleInputChange} />
                    Machine Learning / AI
                  </label>
                  <label className="radio-label">
                    <input type="radio" name="department" value="cybersec" checked={formData.department === "cybersec"} onChange={handleInputChange} />
                    Cybersecurity
                  </label>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="experience">Current Experience Level</label>
                <Select
                  id="experience"
                  value={formData.experience}
                  onChange={(val) => setFormData(prev => ({ ...prev, experience: val }))}
                  options={[
                    { value: "none", label: "Complete beginner (Never coded before)" },
                    { value: "basic", label: "Know basic syntax (Variables, loops, if/else)" },
                    { value: "intermediate", label: "Have built small projects / solved some CP problems" },
                    { value: "advanced", label: "Comfortable building full apps / high CP rating" },
                  ]}
                  required
                />
              </div>
              <div className="form-actions form-actions--split">
                <Button type="button" variant="secondary" onClick={() => setStep(1)}>← Back</Button>
                <div onMouseEnter={() => setIsHoveringNext(true)} onMouseLeave={() => setIsHoveringNext(false)}>
                  <Button type="button" onClick={() => setStep(3)}>Next Step →</Button>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="join-form__step animate-fade-in">
              <div className="form-group">
                <label htmlFor="whyJoin">Why do you want to join this club? (Be honest, not formal)</label>
                <textarea 
                  id="whyJoin" 
                  value={formData.whyJoin}
                  onChange={handleInputChange}
                  rows={4} 
                  required 
                  placeholder="e.g., I want to learn web dev to build my own startup ideas, or I want to represent the university in ICPC..."
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="commitment">
                  <input type="checkbox" id="commitment" checked={formData.commitment} onChange={handleInputChange} required />
                  I understand that active membership requires attending at least one session/meeting per week.
                </label>
              </div>
              <div className="form-actions form-actions--split">
                <Button type="button" variant="secondary" onClick={() => setStep(2)}>← Back</Button>
                <div onMouseEnter={() => setIsHoveringNext(true)} onMouseLeave={() => setIsHoveringNext(false)}>
                  <Button type="submit">Submit Application</Button>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
