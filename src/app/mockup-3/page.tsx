import "./mockup-3.css";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function Mockup3() {
  return (
    <div className="mockup-wrapper node-wrapper">
      <div className="mockup-header node-header">
        <Link href="/" className="back-link">← Back to Main</Link>
        <span className="mockup-title">Concept 3: Floating Node Graph</span>
      </div>

      <section className="node-hero">
        
        {/* Abstract Node Network */}
        <div className="node-network">
          {/* SVG for connecting lines */}
          <svg className="node-lines" xmlns="http://www.w3.org/2000/svg">
            <line x1="20%" y1="20%" x2="50%" y2="50%" className="line l1" />
            <line x1="80%" y1="30%" x2="50%" y2="50%" className="line l2" />
            <line x1="30%" y1="80%" x2="50%" y2="50%" className="line l3" />
            <line x1="70%" y1="75%" x2="50%" y2="50%" className="line l4" />
            <circle cx="50%" cy="50%" r="150" className="center-orbit" />
          </svg>

          {/* Glowing Nodes */}
          <div className="node n1">CP</div>
          <div className="node n2">Web</div>
          <div className="node n3">AI</div>
          <div className="node n4">Cyber</div>
        </div>

        {/* Center Content */}
        <div className="node-content">
          <h1 className="node-title">
            Connect. Compete.<br/>
            <span className="node-accent">Create.</span>
          </h1>
          <p className="node-subtitle">
            MEC Computer Club — Where 70+ students build the future.
          </p>
          <div className="node-actions">
            <Button size="lg" className="node-btn">Join the Network</Button>
          </div>
        </div>

      </section>
    </div>
  );
}
