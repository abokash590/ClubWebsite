import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources | CP Hub | MEC Computer Club",
};

export default function ResourcesPage() {
  const categories = [
    { name: "Websites", links: ["CP-Algorithms", "Codeforces", "CSES Problem Set", "AtCoder", "USACO Guide"] },
    { name: "Books", links: ["Competitive Programming 4 (Halim)", "Guide to Competitive Programming (Antti Laaksonen)"] },
    { name: "Tools", links: ["CF Tracker", "VJudge", "Codeforces Visualizer"] }
  ];

  return (
    <main className="section container">
      <div className="section-header">
        <span className="kicker">CP Hub</span>
        <h2>Resources</h2>
        <p>Essential websites, books, and tools for every CP enthusiast.</p>
      </div>
      <div style={{ display: "grid", gap: "var(--space-6)" }}>
        {categories.map(cat => (
          <div key={cat.name}>
            <h3 style={{ borderBottom: "1px solid var(--border-default)", paddingBottom: "var(--space-2)", marginBottom: "var(--space-4)", fontSize: "var(--text-xl)" }}>{cat.name}</h3>
            <ul style={{ listStyle: "none", paddingLeft: "0", display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
              {cat.links.map(link => (
                <li key={link}>
                  <a href="#" className="link" style={{ 
                    color: "var(--text-primary)", 
                    fontWeight: "var(--weight-medium)",
                    padding: "var(--space-2) var(--space-3)",
                    border: "1px solid var(--border-default)",
                    borderRadius: "var(--radius-sm)",
                    display: "inline-block",
                    backgroundColor: "var(--surface-elevated)",
                    transition: "all var(--transition-fast)"
                  }}>{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
}
