import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Roadmaps | CP Hub | MEC Computer Club",
};

export default function RoadmapsPage() {
  const roadmaps = [
    { title: "Beginner", desc: "Basic Math, Time Complexity, Array operations, Basic strings.", color: "var(--accent-primary)" },
    { title: "Intermediate", desc: "Number Theory, Binary Search, Basic DP, Graph Traversals.", color: "#ffb3ba" },
    { title: "Advanced", desc: "Segment Trees, Advanced Graph Theory, Network Flow, Game Theory.", color: "#bae1ff" }
  ];

  return (
    <main className="section container">
      <div className="section-header">
        <span className="kicker">CP Hub</span>
        <h2>Roadmaps</h2>
        <p>Structured learning paths designed to take you from a novice to an expert in competitive programming.</p>
      </div>
      <div style={{ display: "grid", gap: "var(--space-5)", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
        {roadmaps.map(r => (
          <div key={r.title} className="card" style={{ padding: "var(--space-5)", borderTop: `6px solid ${r.color}`, cursor: "default" }}>
            <h3 style={{ marginBottom: "var(--space-2)", fontSize: "var(--text-xl)" }}>{r.title}</h3>
            <p style={{ color: "var(--text-secondary)", lineHeight: "1.5" }}>{r.desc}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
