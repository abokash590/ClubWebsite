import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leaderboard | CP Hub | MEC Computer Club",
};

export default function LeaderboardPage() {
  const users = [
    { rank: 1, handle: "tourist_fan", rating: 2150, title: "Master" },
    { rank: 2, handle: "dp_wizard", rating: 1950, title: "Candidate Master" },
    { rank: 3, handle: "graph_god", rating: 1800, title: "Expert" },
    { rank: 4, handle: "binary_searcher", rating: 1550, title: "Specialist" },
    { rank: 5, handle: "greedy_noob", rating: 1350, title: "Pupil" },
  ];

  return (
    <main className="section container">
      <div className="section-header">
        <span className="kicker">CP Hub</span>
        <h2>Leaderboard</h2>
        <p>Top competitive programmers in our club.</p>
      </div>
      
      <div className="card" style={{ overflowX: "auto", padding: "0" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "600px" }}>
          <thead style={{ backgroundColor: "var(--surface-secondary)" }}>
            <tr style={{ borderBottom: "2px solid var(--text-primary)", textAlign: "left" }}>
              <th style={{ padding: "var(--space-4)", fontFamily: "var(--font-mono)" }}>#</th>
              <th style={{ padding: "var(--space-4)" }}>Handle</th>
              <th style={{ padding: "var(--space-4)" }}>Title</th>
              <th style={{ padding: "var(--space-4)", textAlign: "right" }}>Rating</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={u.handle} style={{ borderBottom: "1px solid var(--border-default)", backgroundColor: i % 2 === 0 ? "transparent" : "var(--surface-secondary)", transition: "background-color var(--transition-fast)" }} className="table-row-hover">
                <td style={{ padding: "var(--space-4)", fontFamily: "var(--font-mono)" }}>{u.rank}</td>
                <td style={{ padding: "var(--space-4)", fontWeight: "var(--weight-bold)", color: "var(--text-primary)" }}>{u.handle}</td>
                <td style={{ padding: "var(--space-4)", color: "var(--text-secondary)" }}>{u.title}</td>
                <td style={{ padding: "var(--space-4)", textAlign: "right", fontFamily: "var(--font-mono)", color: "var(--accent-primary-hover)", fontWeight: "var(--weight-bold)" }}>{u.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
