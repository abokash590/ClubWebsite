import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentor Sessions | CP Hub | MEC Computer Club",
};

export default function MentorSessionsPage() {
  const sessions = [
    { topic: "Introduction to Segment Trees", mentor: "Ashik (ICPC Regionalist)", time: "Friday, 8:00 PM", status: "Upcoming" },
    { topic: "Dynamic Programming on Trees", mentor: "Rahim (Codeforces Master)", time: "Saturday, 9:00 PM", status: "Upcoming" },
    { topic: "Graph Theory Basics", mentor: "Karim (Expert)", time: "Last Week", status: "Completed" }
  ];

  return (
    <main className="section container">
      <div className="section-header">
        <span className="kicker">CP Hub</span>
        <h2>Mentor Sessions</h2>
        <p>Learn directly from the best programmers in our club.</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
        {sessions.map(s => (
          <div key={s.topic} className="card" style={{ padding: "var(--space-5)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "var(--space-4)", cursor: "default" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", marginBottom: "var(--space-2)" }}>
                <h3 style={{ fontSize: "var(--text-xl)" }}>{s.topic}</h3>
                <span style={{ 
                  background: s.status === "Upcoming" ? "var(--accent-primary)" : "var(--surface-secondary)", 
                  color: s.status === "Upcoming" ? "var(--text-primary)" : "var(--text-secondary)",
                  padding: "4px 8px", 
                  borderRadius: "var(--radius-sm)", 
                  fontSize: "var(--text-xs)",
                  fontFamily: "var(--font-mono)",
                  fontWeight: "var(--weight-bold)",
                  border: s.status === "Upcoming" ? "1px solid var(--text-primary)" : "none"
                }}>
                  {s.status}
                </span>
              </div>
              <p style={{ color: "var(--text-secondary)" }}>Led by <strong style={{ color: "var(--text-primary)" }}>{s.mentor}</strong></p>
            </div>
            <div style={{ fontFamily: "var(--font-mono)", color: "var(--text-primary)", fontWeight: "var(--weight-bold)", background: "var(--surface-elevated)", padding: "var(--space-2) var(--space-3)", borderRadius: "var(--radius-md)", border: "1px dashed var(--border-default)" }}>
              {s.time}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
