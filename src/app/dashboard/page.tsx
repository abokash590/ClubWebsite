"use client";

import "@/components/layout/dashboard-ui.css";
import { Button } from "@/components/ui/Button";

export default function UserDashboard() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "var(--space-6)" }}>
        <div>
          <h2 style={{ fontSize: "var(--text-2xl)", marginBottom: "var(--space-1)" }}>Welcome back, Farhan</h2>
          <p style={{ color: "var(--text-secondary)" }}>Here's what's happening with your account today.</p>
        </div>
        <Button href="/events" size="sm">Browse Events</Button>
      </div>

      <div className="dash-grid">
        <div className="dash-card">
          <div className="dash-card__label">CP Rating</div>
          <div className="dash-card__value">1450</div>
        </div>
        <div className="dash-card">
          <div className="dash-card__label">Events Attended</div>
          <div className="dash-card__value">12</div>
        </div>
        <div className="dash-card">
          <div className="dash-card__label">Projects Contributed</div>
          <div className="dash-card__value">3</div>
        </div>
      </div>

      <h3 style={{ marginBottom: "var(--space-3)" }}>Upcoming Registered Events</h3>
      <div className="dash-table-container">
        <table className="dash-table">
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Intro to React Workshop</td>
              <td>Oct 12, 2026</td>
              <td><span className="dash-badge dash-badge--success">Confirmed</span></td>
              <td><a href="#" style={{ color: "var(--accent-primary-hover)", textDecoration: "underline", fontSize: "var(--text-sm)" }}>View Details</a></td>
            </tr>
            <tr>
              <td>ICPC Preliminary Mock</td>
              <td>Nov 5, 2026</td>
              <td><span className="dash-badge dash-badge--warning">Waitlisted</span></td>
              <td><a href="#" style={{ color: "var(--accent-primary-hover)", textDecoration: "underline", fontSize: "var(--text-sm)" }}>View Details</a></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
