import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ICPC Preparation | CP Hub | MEC Computer Club",
};

export default function ICPCPreparationPage() {
  return (
    <main className="section container">
      <div className="section-header">
        <span className="kicker">CP Hub</span>
        <h2>ICPC Preparation</h2>
        <p>Guidelines and resources for forming teams and preparing for regional contests.</p>
      </div>
      
      <div className="card" style={{ padding: "var(--space-6)", cursor: "default" }}>
        <h3 style={{ marginBottom: "var(--space-4)", fontSize: "var(--text-2xl)", color: "var(--text-primary)" }}>Team Formation</h3>
        <p style={{ marginBottom: "var(--space-4)", color: "var(--text-secondary)", lineHeight: "1.6" }}>
          The ICPC requires teams of 3 eligible students. Teams should ideally consist of members with complementary skills (e.g., a math expert, a DP specialist, and a fast implementer).
        </p>
        <ul style={{ listStyle: "disc", paddingLeft: "var(--space-5)", marginBottom: "var(--space-6)", color: "var(--text-secondary)", lineHeight: "1.6" }}>
          <li>All members must be enrolled at the university.</li>
          <li>Practice as a team regularly to build synergy.</li>
          <li>Participate in our internal selection contests.</li>
        </ul>

        <h3 style={{ marginBottom: "var(--space-4)", fontSize: "var(--text-2xl)", color: "var(--text-primary)" }}>Recommended Team Practice</h3>
        <p style={{ color: "var(--text-secondary)", lineHeight: "1.6" }}>
          We recommend practicing past regional contests on Codeforces Gym or VJudge. Aim for at least one 5-hour virtual participation session per week in the month leading up to the regionals.
        </p>
      </div>
    </main>
  );
}
