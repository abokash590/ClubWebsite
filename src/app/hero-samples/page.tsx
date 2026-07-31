import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import './samples.css';

export default function HeroSamples() {
  return (
    <div className="samples-container">
      <div className="samples-header">
        <h1>Hero Left-Side Design Samples</h1>
        <p>Review the options below and let me know which one you like best!</p>
      </div>

      {/* Variation 1: Terminal Style */}
      <div className="sample-wrapper">
        <h2 className="sample-label">Option 1: The Terminal / Code Editor</h2>
        <div className="hero-sample terminal-hero">
          <div className="terminal-window">
            <div className="terminal-header">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
              <span className="terminal-title">~/mec-computer-club/init.sh</span>
            </div>
            <div className="terminal-body">
              <h1 className="hero__title terminal-text">
                <span className="prompt">$&gt;</span> Debug your limits.<br />
                <span className="prompt">$&gt;</span> Build reality.<br />
                <span className="prompt blinking-cursor">_</span>
              </h1>
              <p className="hero__subtitle terminal-sub">
                // MEC Computer Club is where students compete in ICPC, build
                production software, and grow as developers — not just attend
                meetings.
              </p>
              <div className="hero__actions">
                <Button href="/join" size="lg">Execute /join</Button>
                <Button href="/events" variant="secondary" size="lg">cat events.txt</Button>
              </div>
              <div className="terminal-stats">
                <span>[70+ Members]</span>
                <span>[4 Departments]</span>
                <span>[12+ Events]</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Variation 2: Brutalist Block Highlights */}
      <div className="sample-wrapper">
        <h2 className="sample-label">Option 2: High-Contrast Brutalist Blocks</h2>
        <div className="hero-sample brutal-hero">
          <div className="hero__text">
            <h1 className="hero__title brutal-title">
              <span className="brutal-block">Debug</span> your limits.<br />
              <span className="brutal-block inverted">Build</span> reality.<br />
              Welcome to the <span className="brutal-underline">Club.</span>
            </h1>
            <p className="hero__subtitle brutal-sub">
              <strong>MEC Computer Club</strong> is where students compete in ICPC, build
              production software, and grow as developers — not just attend meetings.
            </p>
            <div className="hero__actions brutal-actions">
              <Button href="/join" size="lg" className="brutal-btn">Apply to join</Button>
              <Button href="/events" variant="secondary" size="lg" className="brutal-btn">See upcoming events</Button>
            </div>
            <div className="brutal-stats-grid">
              <div className="b-stat"><strong>70+</strong> MEMBERS</div>
              <div className="b-stat"><strong>4</strong> DEPTS</div>
              <div className="b-stat"><strong>12+</strong> EVENTS</div>
            </div>
          </div>
        </div>
      </div>

      {/* Variation 3: Typographic Grid & Glitch */}
      <div className="sample-wrapper">
        <h2 className="sample-label">Option 3: Cyberpunk / Glitch Grid</h2>
        <div className="hero-sample cyber-hero">
          <div className="hero__text cyber-text-container">
            <h1 className="hero__title cyber-title" data-text="Debug your limits.">
              Debug your limits.<br />
              Build reality.<br />
              <span className="cyber-accent">Welcome to the Club.</span>
            </h1>
            <div className="cyber-divider"></div>
            <p className="hero__subtitle cyber-sub">
              MEC Computer Club is where students compete in ICPC, build
              production software, and grow as developers.
            </p>
            <div className="hero__actions">
              <Button href="/join" size="lg">Apply to join</Button>
            </div>
            <div className="cyber-stats">
              <div className="c-stat">
                <span className="c-val">70+</span><br/><span className="c-lbl">MEMBERS</span>
              </div>
              <div className="c-stat">
                <span className="c-val">04</span><br/><span className="c-lbl">DEPARTMENTS</span>
              </div>
              <div className="c-stat">
                <span className="c-val">12</span><br/><span className="c-lbl">EVENTS</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Variation 4: High-End Minimal / Glassmorphism */}
      <div className="sample-wrapper">
        <h2 className="sample-label">Option 4: High-End Tech (Glassmorphic)</h2>
        <div className="hero-sample glass-hero">
          <div className="glass-blob"></div>
          <div className="hero__text glass-content">
            <h1 className="hero__title glass-title">
              Debug your limits.<br />
              Build reality.<br />
              <span className="glass-accent">Welcome to the Club.</span>
            </h1>
            <p className="hero__subtitle glass-sub">
              MEC Computer Club is where students compete in ICPC, build
              production software, and grow as developers.
            </p>
            <div className="hero__actions">
              <Button href="/join" size="lg" style={{ borderRadius: '100px' }}>Apply to join</Button>
            </div>
            <div className="glass-stats">
              <div className="g-stat"><strong>70+</strong> Members</div>
              <div className="g-stat"><strong>4</strong> Departments</div>
              <div className="g-stat"><strong>12+</strong> Events</div>
            </div>
          </div>
        </div>
      </div>

      {/* Variation 5: Retro Windows / Classic UI */}
      <div className="sample-wrapper">
        <h2 className="sample-label">Option 5: Retro OS / Win95 Style</h2>
        <div className="hero-sample retro-hero">
          <div className="retro-window">
            <div className="retro-titlebar">
              <span className="retro-titletext">System Properties - MEC_Club.exe</span>
              <div className="retro-controls">
                <span className="retro-btn">_</span>
                <span className="retro-btn">□</span>
                <span className="retro-btn">X</span>
              </div>
            </div>
            <div className="retro-content">
              <h1 className="hero__title retro-title">
                Debug your limits.<br />
                Build reality.
              </h1>
              <p className="hero__subtitle retro-sub">
                MEC Computer Club is where students compete in ICPC, build
                production software, and grow as developers.
              </p>
              <div className="retro-divider"></div>
              <div className="hero__actions retro-actions">
                <button className="retro-button">Apply to join</button>
                <button className="retro-button">See events</button>
              </div>
              <fieldset className="retro-stats">
                <legend>Club Statistics</legend>
                <ul>
                  <li><strong>70+</strong> Members Active</li>
                  <li><strong>04</strong> Core Departments</li>
                  <li><strong>12+</strong> Events Hosted</li>
                </ul>
              </fieldset>
            </div>
          </div>
        </div>
      </div>

      {/* Variation 6: Newspaper / Editorial Brutalism */}
      <div className="sample-wrapper">
        <h2 className="sample-label">Option 6: Editorial / Newspaper Brutalism</h2>
        <div className="hero-sample news-hero">
          <div className="news-header">
            <span>VOL. 1 — ISSUE No. 42</span>
            <span>MEC COMPUTER CLUB</span>
            <span>PUBLISHED TODAY</span>
          </div>
          <div className="news-content">
            <h1 className="news-title">DEBUG YOUR LIMITS. BUILD REALITY.</h1>
            <div className="news-grid">
              <div className="news-left">
                <p className="news-sub">
                  MEC Computer Club is where students compete in ICPC, build production software, and grow as developers — not just attend meetings. 
                  <span className="news-highlight">WELCOME TO THE CLUB.</span>
                </p>
                <div className="hero__actions">
                  <Button href="/join" size="lg" className="news-btn">APPLY TO JOIN ↗</Button>
                </div>
              </div>
              <div className="news-right">
                <div className="news-stat">
                  <span className="n-num">70+</span>
                  <span className="n-lbl">MEMBERS</span>
                </div>
                <div className="news-stat">
                  <span className="n-num">4</span>
                  <span className="n-lbl">DEPTS</span>
                </div>
                <div className="news-stat">
                  <span className="n-num">12+</span>
                  <span className="n-lbl">EVENTS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
