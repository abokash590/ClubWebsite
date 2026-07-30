"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import "./contact.css";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    
    // Terminal feedback logic
    setIsTyping(true);
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 1000);
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, subject: value }));
    setIsTyping(true);
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message sent! We will get back to you shortly.");
  };

  return (
    <section className="section contact-page">
      <div className="container container--narrow">
        <div className="contact-header">
          <span className="kicker">Contact Us</span>
          <h1>Ping Us! We&apos;re Listening</h1>
          <p>
            Have a question, want to collaborate, or interested in sponsoring the club? 
            We read every message and usually reply within 24 hours.
          </p>
        </div>

        <div className="contact-grid">
          {/* Left Column: Reassurance & Alternatives */}
          <div className="contact-info">
            <div className="contact-card">
              <h3>Hate filling out forms?</h3>
              <p>Skip the wait. DM us directly on Discord or shoot us an email. We are highly active on both.</p>
              <a href="mailto:hello@mec-cc.edu.bd">hello@mec-cc.edu.bd</a>
            </div>
            
            <div className="contact-card">
              <h3>Sponsorships & Partners</h3>
              <p>Interested in sponsoring our ICPC teams, our next hackathon, or recruiting from our talent pool?</p>
              <a href="mailto:partners@mec-cc.edu.bd">partners@mec-cc.edu.bd</a>
            </div>
            
            <div className="contact-card">
              <h3>Find Us IRL</h3>
              <p>
                <strong>MEC Campus, Building 2</strong><br />
                Room 402 (The Club Room)<br />
                Open Mon-Thu, 10am - 4pm
              </p>
            </div>
          </div>

          {/* Right Column: The Brutalist Form */}
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-form-header">
              <h3>Initialize Transmission</h3>
              <p>sys.contact_protocol // secure</p>
            </div>

            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" required value={formData.name} onChange={handleInputChange} placeholder="e.g. Farhan Ahmed" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" required value={formData.email} onChange={handleInputChange} placeholder="hello@example.com" />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject Area</label>
              <Select 
                id="subject"
                required
                value={formData.subject}
                onChange={handleSelectChange}
                options={[
                  { value: "general", label: "General Inquiry" },
                  { value: "membership", label: "Membership Question" },
                  { value: "sponsorship", label: "Sponsorship" },
                  { value: "collaboration", label: "Event Collaboration" }
                ]}
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" rows={3} required value={formData.message} onChange={handleInputChange} placeholder="Type your message here..."></textarea>
            </div>
            
            <div className="form-actions">
              <Button type="submit" fullWidth>Send Message</Button>
            </div>

            {/* Interactive Terminal Feedback */}
            <div className={`terminal-status ${isTyping ? "typing" : "idle"}`}>
              <span>{isTyping ? "> receiving_input..." : "> awaiting_input"}</span>
              <span className="cursor-blink"></span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
