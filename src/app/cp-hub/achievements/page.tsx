import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Achievements | CP Hub | MEC Computer Club",
};

export default function AchievementsPage() {
  const achievements = [
    { year: "2023", title: "ICPC Dhaka Regional Finalists", desc: "Team MEC_Byte_Me secured 15th position out of 120 teams." },
    { year: "2022", title: "NCPC Top 10", desc: "Our team placed 8th in the National Collegiate Programming Contest." },
    { year: "2021", title: "IUPC Champions", desc: "Secured 1st place in the XYZ Inter-University Programming Contest." }
  ];

  return (
    <main className="section container">
      <div className="section-header">
        <span className="kicker">CP Hub</span>
        <h2>Achievements</h2>
        <p>A timeline of our competitive programming successes.</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)", position: "relative", paddingLeft: "var(--space-6)" }}>
        {/* Timeline line */}
        <div style={{ position: "absolute", left: "11px", top: "10px", bottom: "10px", width: "2px", background: "var(--border-default)" }}></div>
        
        {achievements.map(a => (
          <div key={a.year} style={{ position: "relative" }}>
            {/* Timeline dot */}
            <div style={{ position: "absolute", left: "calc(-var(--space-6) + 4px)", top: "8px", width: "16px", height: "16px", borderRadius: "50%", background: "var(--accent-primary)", border: "2px solid var(--text-primary)", zIndex: 2 }}></div>
            
            <div className="card" style={{ padding: "var(--space-5)", cursor: "default" }}>
              <span style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)", fontSize: "var(--text-sm)", marginBottom: "var(--space-2)", display: "block" }}>{a.year}</span>
              <h3 style={{ fontSize: "var(--text-xl)", marginBottom: "var(--space-2)", color: "var(--text-primary)" }}>{a.title}</h3>
              <p style={{ color: "var(--text-secondary)", lineHeight: "1.5" }}>{a.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
