import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contests | CP Hub | MEC Computer Club",
};

export default function ContestsPage() {
  const upcoming = [
    { name: "Codeforces Round 900 (Div. 2)", date: "Tomorrow, 20:35", platform: "Codeforces" },
    { name: "AtCoder Beginner Contest 320", date: "Saturday, 18:00", platform: "AtCoder" }
  ];
  const past = [
    { name: "Codeforces Round 899 (Div. 2)", date: "2 days ago", platform: "Codeforces", link: "#" },
    { name: "Educational Codeforces Round 150", date: "1 week ago", platform: "Codeforces", link: "#" }
  ];

  return (
    <main className="section container">
      <div className="section-header">
        <span className="kicker">CP Hub</span>
        <h2>Contests</h2>
        <p>Upcoming and past programming contests.</p>
      </div>
      
      <div style={{ display: "grid", gap: "var(--space-8)", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
        <div>
          <h3 style={{ borderBottom: "2px solid var(--text-primary)", paddingBottom: "var(--space-2)", marginBottom: "var(--space-4)" }}>Upcoming Contests</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
            {upcoming.map(c => (
              <div key={c.name} className="card" style={{ padding: "var(--space-4)" }}>
                <div style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "var(--weight-bold)" }}>{c.platform}</div>
                <h4 style={{ fontSize: "var(--text-base)", marginBottom: "var(--space-3)" }}>{c.name}</h4>
                <div style={{ color: "var(--accent-primary-text)", background: "var(--accent-primary)", padding: "4px 8px", borderRadius: "var(--radius-sm)", display: "inline-block", fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", fontWeight: "var(--weight-bold)" }}>{c.date}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 style={{ borderBottom: "2px solid var(--text-primary)", paddingBottom: "var(--space-2)", marginBottom: "var(--space-4)" }}>Past Contests</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
            {past.map(c => (
              <a href={c.link} key={c.name} className="card" style={{ padding: "var(--space-4)" }}>
                <div style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "var(--weight-bold)" }}>{c.platform}</div>
                <h4 style={{ fontSize: "var(--text-base)", marginBottom: "var(--space-3)" }}>{c.name}</h4>
                <div style={{ color: "var(--text-tertiary)", fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)" }}>{c.date}</div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
