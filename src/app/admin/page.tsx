"use client";

import "@/components/layout/dashboard-ui.css";
import { Button } from "@/components/ui/Button";

export default function AdminDashboard() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "var(--space-6)" }}>
        <div>
          <h2 style={{ fontSize: "var(--text-2xl)", marginBottom: "var(--space-1)" }}>Club Overview</h2>
          <p style={{ color: "var(--text-secondary)" }}>High-level metrics and recent activity.</p>
        </div>
        <Button href="/admin/events" size="sm">Create Event</Button>
      </div>

      <div className="dash-grid">
        <div className="dash-card">
          <div className="dash-card__label">Total Members</div>
          <div className="dash-card__value">342</div>
        </div>
        <div className="dash-card">
          <div className="dash-card__label">Pending Applications</div>
          <div className="dash-card__value" style={{ color: "var(--accent-primary-hover)" }}>15</div>
        </div>
        <div className="dash-card">
          <div className="dash-card__label">Active Events</div>
          <div className="dash-card__value">4</div>
        </div>
      </div>

      <h3 style={{ marginBottom: "var(--space-3)" }}>Recent Applications</h3>
      <div className="dash-table-container">
        <table className="dash-table">
          <thead>
            <tr>
              <th>Applicant Name</th>
              <th>Student ID</th>
              <th>Interest</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Rahim Uddin</td>
              <td>202414001</td>
              <td>Web Development</td>
              <td><span className="dash-badge dash-badge--warning">Pending</span></td>
              <td>
                <div style={{ display: "flex", gap: "8px" }}>
                  <Button size="sm" variant="primary">Approve</Button>
                  <Button size="sm" variant="ghost">Reject</Button>
                </div>
              </td>
            </tr>
            <tr>
              <td>Sadia Islam</td>
              <td>202414050</td>
              <td>Competitive Programming</td>
              <td><span className="dash-badge dash-badge--success">Approved</span></td>
              <td>
                <span style={{ fontSize: "var(--text-xs)", color: "var(--text-tertiary)" }}>Processed</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
