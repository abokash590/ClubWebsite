import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import "./contact.css";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the MEC Computer Club for sponsorships, collaborations, or general questions.",
};

export default function ContactPage() {
  return (
    <section className="section contact-page">
      <div className="container container--narrow">
        <div className="contact-header">
          <span className="kicker">Contact Us</span>
          <h1>Get in touch</h1>
          <p>
            Have a question, want to collaborate on an event, or interested in sponsoring the club? 
            We&apos;d love to hear from you.
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-info">
            <div className="contact-card">
              <h3>General Inquiries</h3>
              <p>For questions about membership, events, or general information.</p>
              <a href="mailto:hello@mec-cc.edu.bd">hello@mec-cc.edu.bd</a>
            </div>
            
            <div className="contact-card">
              <h3>Sponsorships & Partners</h3>
              <p>Interested in sponsoring our ICPC teams or our next hackathon?</p>
              <a href="mailto:partners@mec-cc.edu.bd">partners@mec-cc.edu.bd</a>
            </div>
            
            <div className="contact-card">
              <h3>Visit Us</h3>
              <p>
                <strong>MEC Campus, Building 2</strong><br />
                Room 402 (Club Room)<br />
                Dhaka, Bangladesh
              </p>
            </div>
          </div>

          <form className="contact-form">
            <h3>Send a message</h3>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <select id="subject" required>
                <option value="">Select...</option>
                <option value="general">General Inquiry</option>
                <option value="membership">Membership Question</option>
                <option value="sponsorship">Sponsorship</option>
                <option value="collaboration">Event Collaboration</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" rows={5} required></textarea>
            </div>
            <div className="form-actions">
              <Button type="button" fullWidth>Send Message</Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
