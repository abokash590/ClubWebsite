import { getDb } from "@/lib/db";
import SignupForm from "./SignupForm";
import "../login/login.css"; // Reuse login brutalist styles for error messages

export default async function SignupPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ [key: string]: string | string[] | undefined }> 
}) {
  const resolvedSearchParams = await searchParams;
  const token = resolvedSearchParams.token as string | undefined;

  // Render a full-screen brutalist error message
  const renderError = (title: string, message: string) => (
    <div className="login-container">
      <div className="login-box" style={{ textAlign: "center", border: "2px solid var(--accent-red)", padding: "var(--space-8)" }}>
        <h1 className="login-title" style={{ color: "var(--accent-red)" }}>{title}</h1>
        <p style={{ color: "var(--text-secondary)", marginTop: "var(--space-4)" }}>
          {message}
        </p>
      </div>
    </div>
  );

  if (!token) {
    return renderError("Invalid Link", "No invite token was provided in the URL.");
  }

  const db = getDb();

  // Validate the token and get associated request info
  const tokenData = db.prepare(`
    SELECT t.used, t.expires_at, r.name, r.email
    FROM invite_tokens t
    JOIN requests r ON t.request_id = r.id
    WHERE t.token = ?
  `).get(token) as { used: number; expires_at: string; name: string; email: string } | undefined;

  if (!tokenData) {
    return renderError("Invalid Link", "This invite link does not exist or is invalid.");
  }

  if (tokenData.used) {
    return renderError("Already Used", "This invite link has already been used.");
  }

  if (new Date(tokenData.expires_at) < new Date()) {
    return renderError("Link Expired", "This invite link has expired. Please contact an admin for a new one.");
  }

  return (
    <SignupForm 
      token={token} 
      initialName={tokenData.name} 
      initialEmail={tokenData.email} 
    />
  );
}
