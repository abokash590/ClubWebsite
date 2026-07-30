import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sheet Tracker | CP Hub | MEC Computer Club",
};

export default function SheetTrackerPage() {
  const sheets = [
    { title: "CSES Problem Set", total: 300, solved: 150, color: "var(--accent-primary)" },
    { title: "Striver's SDE Sheet", total: 190, solved: 190, color: "var(--accent-primary)" },
    { title: "Blind 75", total: 75, solved: 30, color: "var(--accent-primary)" },
  ];

  return (
    <main className="section container">
      <div className="section-header">
        <span className="kicker">CP Hub</span>
        <h2>Sheet Tracker</h2>
        <p>Track your progress across standard CP sheets.</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
        {sheets.map(sheet => {
          const percent = Math.round((sheet.solved / sheet.total) * 100);
          return (
            <div key={sheet.title} className="card" style={{ padding: "var(--space-4)", cursor: "default" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "var(--space-2)" }}>
                <h3 style={{ fontSize: "var(--text-lg)" }}>{sheet.title}</h3>
                <span style={{ fontFamily: "var(--font-mono)", fontFeatureSettings: '"liga" 0, "calt" 0' }}>{sheet.solved} / {sheet.total}</span>
              </div>
              <div style={{ height: "12px", background: "var(--surface-secondary)", borderRadius: "var(--radius-full)", overflow: "hidden", border: "1px solid var(--border-default)" }}>
                <div style={{ 
                  height: "100%", 
                  width: `${percent}%`, 
                  background: percent === 100 ? "var(--text-primary)" : sheet.color, 
                  transition: "width 1s ease" 
                }}></div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
