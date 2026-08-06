export const dynamic = "force-dynamic";

import { getDb } from "@/lib/db";
import "@/components/layout/dashboard-ui.css";
import { Button } from "@/components/ui/Button";
import ApplicationRow from "./ApplicationRow";
import { logoutAction } from "../logout/actions";

type JoinRequestWithToken = {
  id: number;
  name: string;
  email: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  token: string | null;
};

export default function AdminDashboard() {
  const db = getDb();
  
  // Fetch real applications along with their tokens if they are approved
  const applications = db.prepare(`
    SELECT r.*, t.token 
    FROM requests r
    LEFT JOIN invite_tokens t ON r.id = t.request_id
    ORDER BY r.created_at DESC
  `).all() as JoinRequestWithToken[];
  
  // Get counts for metrics
  const pendingCount = applications.filter(app => app.status === 'pending').length;
  
  // Also get total users
  const totalMembers = (db.prepare(`SELECT COUNT(*) as count FROM users`).get() as { count: number }).count;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "var(--space-6)" }}>
        <div>
          <h2 style={{ fontSize: "var(--text-2xl)", marginBottom: "var(--space-1)" }}>Club Overview</h2>
          <p style={{ color: "var(--text-secondary)" }}>High-level metrics and recent activity.</p>
        </div>
        <div style={{ display: "flex", gap: "var(--space-3)", alignItems: "center" }}>
          <form action={logoutAction}>
            <Button type="submit" variant="outline" size="sm">Logout</Button>
          </form>
          <Button href="/admin/events" size="sm">Manage Events</Button>
        </div>
      </div>

      <div className="dash-grid">
        <div className="dash-card">
          <div className="dash-card__label">Total Members</div>
          <div className="dash-card__value">{totalMembers}</div>
        </div>
        <div className="dash-card">
          <div className="dash-card__label">Pending Applications</div>
          <div className="dash-card__value" style={{ color: "var(--accent-primary-hover)" }}>{pendingCount}</div>
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
              <th>Email</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: "center", padding: "2rem", color: "var(--text-tertiary)" }}>
                  No applications yet.
                </td>
              </tr>
            ) : (
              applications.map((app) => (
                <ApplicationRow key={app.id} app={{ ...app }} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
