import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Problem Sets | CP Hub | MEC Computer Club",
};

export default function ProblemSetsPage() {
  const topics = [
    { title: "Dynamic Programming", count: 50 },
    { title: "Graph Theory", count: 35 },
    { title: "Data Structures", count: 40 },
    { title: "Number Theory", count: 25 },
    { title: "Combinatorics", count: 15 },
    { title: "String Algorithms", count: 20 },
    { title: "Greedy", count: 45 },
    { title: "Binary Search", count: 30 }
  ];

  return (
    <main className="section container">
      <div className="section-header">
        <span className="kicker">CP Hub</span>
        <h2>Problem Sets</h2>
        <p>Curated problems organized by topic to target your weak spots.</p>
      </div>
      <div style={{ display: "grid", gap: "var(--space-4)", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))" }}>
        {topics.map(t => (
          <a href="#" key={t.title} className="card" style={{ padding: "var(--space-4)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <h3 style={{ fontSize: "var(--text-lg)", marginBottom: "var(--space-2)" }}>{t.title}</h3>
            <span style={{ 
              fontSize: "var(--text-xs)", 
              color: "var(--text-primary)", 
              fontFamily: "var(--font-mono)",
              background: "var(--surface-secondary)",
              padding: "4px 8px",
              borderRadius: "var(--radius-sm)",
              width: "fit-content"
            }}>{t.count} Problems</span>
          </a>
        ))}
      </div>
    </main>
  );
}
