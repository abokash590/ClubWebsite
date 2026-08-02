"use client";

import Image from "next/image";
import "./mockups.css";

export default function MockupMemberCardsPage() {
  const dummyUser = {
    name: "Alex Dev",
    role: "President",
    id: "EXEC-2026",
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=AlexDev&backgroundColor=transparent",
  };

  return (
    <div className="container mockup-page">
      <div style={{ marginBottom: 'var(--space-8)' }}>
        <h1 style={{ fontSize: 'var(--text-4xl)', marginBottom: 'var(--space-2)' }}>Executive Panel Card Mockups</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Review the proposed creative designs at their exact sizes (3-column grid).</p>
      </div>

      {/* 1. Neo-Brutalist ID Card */}
      <section className="mockup-section">
        <h2 className="mockup-section__title">1. Neo-Brutalist ID Card</h2>
        <p className="mockup-section__desc">A high-contrast, physical ID badge feel with brutalist borders and shadows. Perfect for a developer/tech club aesthetic.</p>
        
        <div className="grid grid--3">
          <div className="card-brutalist">
            <div className="card-brutalist__header">
              <span className="card-brutalist__id">{dummyUser.id}</span>
              <span className="card-brutalist__barcode">||||||| | |||||</span>
            </div>
            
            <div className="card-brutalist__avatar-wrapper">
              <Image src={dummyUser.avatar} alt="avatar" fill style={{ objectFit: 'contain', padding: '10px' }} unoptimized />
            </div>
            
            <h3 className="card-brutalist__name">{dummyUser.name}</h3>
            <div>
              <span className="card-brutalist__role">{dummyUser.role}</span>
            </div>
            
            <div className="card-brutalist__socials">
              <a href="#" className="card-brutalist__social" aria-label="GitHub">GH</a>
              <a href="#" className="card-brutalist__social" aria-label="LinkedIn">LI</a>
              <a href="#" className="card-brutalist__social" aria-label="Codeforces">CF</a>
            </div>
          </div>
        </div>
      </section>


      {/* 2. Brutalist Ticket/Polaroid */}
      <section className="mockup-section">
        <h2 className="mockup-section__title">2. Brutalist Ticket</h2>
        <p className="mockup-section__desc">A dashed border design reminiscent of a ticket stub or polaroid frame.</p>
        
        <div className="grid grid--3">
          <div className="card-brutalist-ticket">
            <div className="card-ticket__avatar-wrapper">
              <Image src={dummyUser.avatar} alt="avatar" fill style={{ objectFit: 'contain' }} unoptimized />
            </div>
            
            <div className="card-ticket__details">
              <h3 className="card-ticket__name">{dummyUser.name}</h3>
              <div className="card-ticket__role">{dummyUser.role}</div>
              
              <div className="card-ticket__socials">
                <a href="#" className="card-ticket__social" aria-label="GitHub">GH</a>
                <a href="#" className="card-ticket__social" aria-label="LinkedIn">LI</a>
                <a href="#" className="card-ticket__social" aria-label="Codeforces">CF</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Brutalist Folder Tab */}
      <section className="mockup-section">
        <h2 className="mockup-section__title">3. Brutalist Folder Tab</h2>
        <p className="mockup-section__desc">A playful, file-folder design with a top tab indicating the role.</p>
        
        <div className="grid grid--3">
          <div className="card-folder-wrapper">
            <div className="card-folder-tab">{dummyUser.role}</div>
            
            <div className="card-folder">
              <div className="card-folder__avatar-wrapper">
                <Image src={dummyUser.avatar} alt="avatar" fill style={{ objectFit: 'contain' }} unoptimized />
              </div>
              
              <div className="card-folder__content">
                <h3 className="card-folder__name">{dummyUser.name}</h3>
                <div className="card-folder__role">{dummyUser.id}</div>
                
                <div className="card-folder__socials">
                  <a href="#" className="card-folder__social">GITHUB</a>
                  <a href="#" className="card-folder__social">LINKEDIN</a>
                  <a href="#" className="card-folder__social">CODEFORCES</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
