import { Button } from "@/components/ui/Button";
import { logoutAction } from "../logout/actions";

export default function DashboardPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", gap: "var(--space-4)" }}>
      <h1 style={{ fontSize: "var(--text-4xl)" }}>Welcome, logged in member</h1>
      <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-lg)" }}>
        This is a placeholder for the member dashboard.
      </p>
      <div style={{ marginTop: "var(--space-4)", display: "flex", gap: "var(--space-4)" }}>
        <Button href="/">Return Home</Button>
        <form action={logoutAction}>
          <Button type="submit" variant="outline">Logout</Button>
        </form>
      </div>
    </div>
  );
}
