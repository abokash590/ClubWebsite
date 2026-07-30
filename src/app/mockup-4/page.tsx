"use client";

import "./mockup-4.css";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

// Helper for draggable windows
function DraggableWindow({ title, initialX, initialY, zIndex, setZIndex, children }: any) {
  const [pos, setPos] = useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setZIndex();
    dragStart.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setPos({ x: e.clientX - dragStart.current.x, y: e.clientY - dragStart.current.y });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

  return (
    <div
      className="os-window"
      style={{ transform: `translate(${pos.x}px, ${pos.y}px)`, zIndex }}
      onPointerDown={() => setZIndex()}
    >
      <div 
        className="os-window-header"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <div className="os-window-controls">
          <span className="ctrl close"></span>
          <span className="ctrl min"></span>
          <span className="ctrl max"></span>
        </div>
        <span className="os-window-title">{title}</span>
      </div>
      <div className="os-window-body">
        {children}
      </div>
    </div>
  );
}

export default function Mockup4() {
  const [zIndices, setZIndices] = useState([1, 2, 3]);

  const bringToFront = (index: number) => {
    const maxZ = Math.max(...zIndices);
    const newZ = [...zIndices];
    newZ[index] = maxZ + 1;
    setZIndices(newZ);
  };

  return (
    <div className="os-desktop">
      <div className="os-nav">
        <Link href="/" className="back-link">← Return to Normalcy</Link>
        <span className="os-clock">MEC OS • v2026</span>
      </div>

      <div className="os-workspace">
        
        {/* Window 1: The Main Message */}
        <DraggableWindow 
          title="welcome.md - MEC_CC" 
          initialX={100} 
          initialY={100} 
          zIndex={zIndices[0]} 
          setZIndex={() => bringToFront(0)}
        >
          <div className="editor-content">
            <h1># We build reality.</h1>
            <p>MEC Computer Club isn't just about attending meetings.</p>
            <p>We are a collective of <strong>70+ developers, hackers, and designers</strong> pushing boundaries.</p>
            <br/>
            <div className="editor-actions">
              <Button size="lg">Initialize Application &gt;</Button>
            </div>
          </div>
        </DraggableWindow>

        {/* Window 2: The Terminal / Stats */}
        <DraggableWindow 
          title="Terminal - zsh" 
          initialX={550} 
          initialY={300} 
          zIndex={zIndices[1]} 
          setZIndex={() => bringToFront(1)}
        >
          <div className="term-content">
            <p><span className="term-prompt">mec-cc@server:~$</span> fetch-stats</p>
            <div className="term-table">
              <div>[+] Active Members:</div><div className="term-highlight">70+</div>
              <div>[+] Departments:</div><div className="term-highlight">4 (CP, Web, ML, Cyber)</div>
              <div>[+] Projects Shipped:</div><div className="term-highlight">6 in production</div>
              <div>[+] CP Problems Solved:</div><div className="term-highlight">2,000+</div>
              <div>[+] ICPC Teams Qualified:</div><div className="term-highlight">3 Teams</div>
            </div>
            <p><span className="term-prompt">mec-cc@server:~$</span> <span className="term-cursor"></span></p>
          </div>
        </DraggableWindow>

        {/* Window 3: The "Art" / Vibe Window */}
        <DraggableWindow 
          title="vibe_check.exe" 
          initialX={750} 
          initialY={50} 
          zIndex={zIndices[2]} 
          setZIndex={() => bringToFront(2)}
        >
          <div className="vibe-content">
            <div className="vibe-orb"></div>
            <p>Theme Sync Active</p>
          </div>
        </DraggableWindow>

      </div>

      {/* Massive Background Typography just to anchor the desktop */}
      <div className="os-bg-text">MEC_CC</div>
    </div>
  );
}
