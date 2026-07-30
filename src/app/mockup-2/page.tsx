import "./mockup-2.css";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function Mockup2() {
  return (
    <div className="mockup-wrapper canvas-wrapper">
      <div className="mockup-header canvas-header">
        <Link href="/" className="back-link">← Back to Main</Link>
        <span className="mockup-title">Concept 2: Interactive Code Canvas</span>
      </div>

      <section className="canvas-hero">
        
        {/* Background Marquee Code */}
        <div className="canvas-marquee">
          <div className="marquee-track">
            <span>{`import { algorithm } from 'icpc'; const team = new Developers(); team.ship(production);`}</span>
            <span>{`import { algorithm } from 'icpc'; const team = new Developers(); team.ship(production);`}</span>
            <span>{`import { algorithm } from 'icpc'; const team = new Developers(); team.ship(production);`}</span>
          </div>
          <div className="marquee-track track-2">
            <span>{`sudo apt-get install skills && while(true) { compete(); learn(); build(); }`}</span>
            <span>{`sudo apt-get install skills && while(true) { compete(); learn(); build(); }`}</span>
            <span>{`sudo apt-get install skills && while(true) { compete(); learn(); build(); }`}</span>
          </div>
        </div>

        {/* Foreground Content */}
        <div className="canvas-content">
          <h1 className="canvas-title">
            <span className="canvas-word w-1">BUILD</span><br/>
            <span className="canvas-word w-2 hover-glow">SOMETHING</span><br/>
            <span className="canvas-word w-3">REAL.</span>
          </h1>
          
          <div className="canvas-bottom">
            <p className="canvas-subtitle">
              Weekly CP practice, real projects, one club.
            </p>
            <div className="canvas-actions">
              <Button size="lg" className="canvas-btn">Join MEC CC</Button>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
}
