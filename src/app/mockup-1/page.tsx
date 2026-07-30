import "./mockup-1.css";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function Mockup1() {
  return (
    <div className="mockup-wrapper">
      <div className="mockup-header">
        <Link href="/" className="back-link">← Back to Main</Link>
        <span className="mockup-title">Concept 1: Bento Dashboard</span>
      </div>

      <section className="bento-hero">
        <div className="bento-grid">
          
          {/* Main Content Block */}
          <div className="bento-item bento-main">
            <h1 className="bento-main__title">
              Weekly CP practice,<br/>
              real projects,<br/>
              <span className="bento-accent">one club.</span>
            </h1>
            <p className="bento-main__subtitle">
              MEC Computer Club is where students compete in ICPC, build production software, and grow as developers.
            </p>
            <div className="bento-main__actions">
              <Button size="lg">Apply to join</Button>
              <Button variant="secondary" size="lg">Upcoming events</Button>
            </div>
          </div>

          {/* Stat Block 1 */}
          <div className="bento-item bento-stat bento-stat--1">
            <div className="bento-stat__value">70+</div>
            <div className="bento-stat__label">Active Members</div>
          </div>

          {/* Terminal Block */}
          <div className="bento-item bento-terminal">
            <div className="terminal-header">
              <div className="terminal-dots">
                <span className="dot" style={{background: '#ff5f56'}}></span>
                <span className="dot" style={{background: '#ffbd2e'}}></span>
                <span className="dot" style={{background: '#27c93f'}}></span>
              </div>
              <span className="terminal-title">bash</span>
            </div>
            <div className="terminal-body">
              <p><span className="prompt">~/mec-cc$</span> npm run build</p>
              <p className="output-dim">Compiling...</p>
              <p className="output-success">✓ 6 Projects shipped to production</p>
              <p className="output-success">✓ 3 Teams qualified for ICPC Regionals</p>
              <p><span className="prompt">~/mec-cc$</span> <span className="cursor"></span></p>
            </div>
          </div>

          {/* Stat Block 2 */}
          <div className="bento-item bento-stat bento-stat--2">
            <div className="bento-stat__value">2,000+</div>
            <div className="bento-stat__label">Problems Solved</div>
          </div>

          {/* Abstract Vibe Block */}
          <div className="bento-item bento-abstract">
            <div className="abstract-shape"></div>
            <div className="abstract-glow"></div>
            <span className="abstract-label">4 Departments</span>
          </div>

        </div>
      </section>
    </div>
  );
}
