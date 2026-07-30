// Codeforces Roadmap Page

import "./roadmaps.css";

const roadmapLevels = [
  {
    level: "Newbie",
    rating: "< 1200",
    color: "#808080", // Gray
    topics: [
      "Basic syntax (C++, Java, or Python)",
      "Time Complexity Analysis",
      "Basic Arrays & Strings",
      "Brute Force & Simulation",
    ],
  },
  {
    level: "Pupil",
    rating: "1200 - 1399",
    color: "#008000", // Green
    topics: [
      "Sorting & Searching",
      "Prefix Sums & Two Pointers",
      "Basic Number Theory (Sieve, GCD)",
      "Greedy Algorithms",
    ],
  },
  {
    level: "Specialist",
    rating: "1400 - 1599",
    color: "#03A89E", // Cyan
    topics: [
      "Binary Search (on answer)",
      "Basic Dynamic Programming",
      "Bit Manipulation",
      "Graph Traversals (BFS / DFS)",
    ],
  },
  {
    level: "Expert+",
    rating: "1600+",
    color: "#0000FF", // Blue
    topics: [
      "Advanced DP (Bitmask, Digit)",
      "Shortest Paths (Dijkstra)",
      "Segment Trees & Fenwick Trees",
      "Combinatorics & Game Theory",
    ],
  },
];

export default function RoadmapsPage() {
  return (
    <main className="section container">
      <div className="section-header text-center">
        <span className="kicker">CP Hub</span>
        <h2>Codeforces Roadmaps</h2>
        <p>Follow the path to reach your target rating!</p>
      </div>
      
      <div className="container container--narrow">
        <div className="roadmap-timeline">
          {roadmapLevels.map((r) => (
            <div key={r.level} className="roadmap-timeline__item">
              <div 
                className="roadmap-timeline__marker" 
                style={{ backgroundColor: r.color, borderColor: 'var(--surface-primary)' }} 
              />
              <div className="roadmap-timeline__content">
                <span className="roadmap-timeline__rating" style={{ color: r.color }}>
                  {r.rating}
                </span>
                <h4 style={{ color: r.color }}>{r.level}</h4>
                <ul className="roadmap-timeline__topics">
                  {r.topics.map((t, idx) => (
                    <li key={idx}>{t}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
