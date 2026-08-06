import { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { partners } from "@/data/partners";
import { Target, Shield, Zap, Check } from "lucide-react";
import "./sponsor.css";

export const metadata: Metadata = {
  title: "Corporate Sponsorship | MEC Computer Club",
  description: "Acquire top engineering talent and boost brand visibility by partnering with Mymensingh Engineering College's premier tech community.",
};

export default function SponsorPage() {
  return (
    <main>
      {/* 1. HERO */}
      <section className="section text-center">
        <div className="container" style={{ maxWidth: 'var(--max-width-narrow)' }}>
          <span className="kicker">Corporate Sponsorship</span>
          <h1 style={{ fontSize: 'var(--text-5xl)', fontFamily: 'var(--font-heading)', marginBottom: 'var(--space-4)', lineHeight: 1.1 }}>
            Acquire Top Tech Talent
          </h1>
          <p style={{ fontSize: 'var(--text-lg)', color: 'var(--text-secondary)', marginBottom: 'var(--space-6)' }}>
            150+ active members. Trusted by 15+ companies to deliver battle-tested engineering students before they hit the job market.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button href="mailto:sponsors@meccomputerclub.org" variant="primary">
              Get the Pitch Deck
            </Button>
            <Button href="#tiers" variant="secondary">
              View Sponsorship Tiers
            </Button>
          </div>
        </div>
      </section>

      {/* 2. TRUST STRIP */}
      <section className="section--sm" style={{ background: 'var(--surface-secondary)' }}>
        <div className="container">
          {/* A) Stats Row */}
          <div className="grid grid--4 text-center" style={{ marginBottom: 'var(--space-5)' }}>
            <div>
              <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 'bold' }}>150+</div>
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>Active Members</div>
            </div>
            <div>
              <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 'bold' }}>20+</div>
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>Yearly Events</div>
            </div>
            <div>
              <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 'bold' }}>500+</div>
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>Participants</div>
            </div>
            <div>
              <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 'bold' }}>15+</div>
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>Sponsors</div>
            </div>
          </div>

          {/* B) Sponsor Logo Row */}
          <div className="sponsor-logo-strip">
            {partners.slice(0, 5).map((partner, i) => (
              <div key={i} className="sponsor-logo-item" title={partner.name}>
                {partner.logoPlaceholder}
              </div>
            ))}
          </div>
          <div className="text-center" style={{ marginTop: 'var(--space-4)' }}>
            <a href="/collaborate/partners" style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', textDecoration: 'underline' }}>
              See all our partners &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* 3. WHY PARTNER WITH US */}
      <section className="section">
        <div className="container">
          <div className="section-header text-center">
            <h2>Why Partner With Us?</h2>
          </div>
          <div className="grid grid--3 stagger-children">
            <div className="card" style={{ padding: 'var(--space-5)' }}>
              <Target size={24} color="var(--accent-primary)" style={{ marginBottom: 'var(--space-3)' }} />
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-lg)', marginBottom: 'var(--space-2)' }}>Direct Recruitment</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', margin: 0 }}>
                Hire battle-tested engineers directly from our panels for your jobs and internships.
              </p>
            </div>
            <div className="card" style={{ padding: 'var(--space-5)' }}>
              <Shield size={24} color="var(--accent-primary)" style={{ marginBottom: 'var(--space-3)' }} />
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-lg)', marginBottom: 'var(--space-2)' }}>Brand Authority</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', margin: 0 }}>
                Get your logo featured prominently on physical banners, merchandise, and our website.
              </p>
            </div>
            <div className="card" style={{ padding: 'var(--space-5)' }}>
              <Zap size={24} color="var(--accent-primary)" style={{ marginBottom: 'var(--space-3)' }} />
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-lg)', marginBottom: 'var(--space-2)' }}>Product Adoption</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', margin: 0 }}>
                Introduce your APIs and products directly into our hackathons and member workshops.
              </p>
            </div>
          </div>
          <p className="text-center" style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', fontStyle: 'italic' }}>
            Note: Sponsorship also fulfills Corporate Social Responsibility (CSR) goals by funding nationwide tech education.
          </p>
        </div>
      </section>

      {/* 4. SPONSORSHIP TIERS */}
      <section id="tiers" className="section section--alt">
        <div className="container">
          <div className="section-header text-center">
            <h2>Sponsorship Tiers</h2>
          </div>
          <div className="grid grid--4 stagger-children">
            {/* Bronze */}
            <div className="card card--hoverable" style={{ display: 'flex', flexDirection: 'column', padding: 'var(--space-5)' }}>
              <div style={{ fontSize: 'var(--text-xl)', fontWeight: 'bold' }}>Bronze</div>
              <div style={{ fontSize: 'var(--text-2xl)', color: 'var(--accent-primary)', fontWeight: 'bold', margin: 'var(--space-2) 0' }}>৳10k+</div>
              <hr style={{ border: 'none', borderTop: '1px solid var(--border-default)', margin: 'var(--space-3) 0' }} />
              <ul style={{ padding: 0, margin: '0 0 var(--space-4) 0', listStyle: 'none', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', flex: 1 }}>
                <li style={{ display: 'flex', gap: '8px', alignItems: 'start' }}><Check size={16} color="var(--accent-primary)" style={{ flexShrink: 0, marginTop: '2px' }}/> Logo on event banners</li>
                <li style={{ display: 'flex', gap: '8px', alignItems: 'start' }}><Check size={16} color="var(--accent-primary)" style={{ flexShrink: 0, marginTop: '2px' }}/> Social media mentions</li>
                <li style={{ display: 'flex', gap: '8px', alignItems: 'start' }}><Check size={16} color="var(--accent-primary)" style={{ flexShrink: 0, marginTop: '2px' }}/> Digital certificate</li>
              </ul>
              <Button href="mailto:sponsors@meccomputerclub.org?subject=Bronze%20Sponsorship" variant="outline" style={{ width: '100%' }}>Choose Bronze</Button>
            </div>

            {/* Silver */}
            <div className="card card--hoverable" style={{ display: 'flex', flexDirection: 'column', padding: 'var(--space-5)' }}>
              <div style={{ fontSize: 'var(--text-xl)', fontWeight: 'bold' }}>Silver</div>
              <div style={{ fontSize: 'var(--text-2xl)', color: 'var(--accent-primary)', fontWeight: 'bold', margin: 'var(--space-2) 0' }}>৳25k+</div>
              <hr style={{ border: 'none', borderTop: '1px solid var(--border-default)', margin: 'var(--space-3) 0' }} />
              <ul style={{ padding: 0, margin: '0 0 var(--space-4) 0', listStyle: 'none', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', flex: 1 }}>
                <li style={{ display: 'flex', gap: '8px', alignItems: 'start', fontWeight: 'bold', color: 'var(--text-primary)' }}><Check size={16} color="var(--text-primary)" style={{ flexShrink: 0, marginTop: '2px' }}/> All Bronze benefits</li>
                <li style={{ display: 'flex', gap: '8px', alignItems: 'start' }}><Check size={16} color="var(--accent-primary)" style={{ flexShrink: 0, marginTop: '2px' }}/> Physical booth at events</li>
                <li style={{ display: 'flex', gap: '8px', alignItems: 'start' }}><Check size={16} color="var(--accent-primary)" style={{ flexShrink: 0, marginTop: '2px' }}/> 5-min Keynote speech</li>
                <li style={{ display: 'flex', gap: '8px', alignItems: 'start' }}><Check size={16} color="var(--accent-primary)" style={{ flexShrink: 0, marginTop: '2px' }}/> Permanent logo on website</li>
              </ul>
              <Button href="mailto:sponsors@meccomputerclub.org?subject=Silver%20Sponsorship" variant="outline" style={{ width: '100%' }}>Choose Silver</Button>
            </div>

            {/* Gold */}
            <div className="card card--hoverable gold-tier-card" style={{ display: 'flex', flexDirection: 'column', padding: 'var(--space-5)' }}>
              <div className="most-popular-ribbon">Most Popular</div>
              <div style={{ fontSize: 'var(--text-xl)', fontWeight: 'bold' }}>Gold</div>
              <div style={{ fontSize: 'var(--text-2xl)', color: 'var(--accent-primary)', fontWeight: 'bold', margin: 'var(--space-2) 0' }}>৳50k+</div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--accent-warning)', marginTop: '-8px' }}>Only 2 Gold slots left this cycle</div>
              <hr style={{ border: 'none', borderTop: '1px solid var(--border-default)', margin: 'var(--space-3) 0' }} />
              <ul style={{ padding: 0, margin: '0 0 var(--space-4) 0', listStyle: 'none', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', flex: 1 }}>
                <li style={{ display: 'flex', gap: '8px', alignItems: 'start', fontWeight: 'bold', color: 'var(--text-primary)' }}><Check size={16} color="var(--text-primary)" style={{ flexShrink: 0, marginTop: '2px' }}/> All Silver benefits</li>
                <li style={{ display: 'flex', gap: '8px', alignItems: 'start' }}><Check size={16} color="var(--accent-primary)" style={{ flexShrink: 0, marginTop: '2px' }}/> Sponsor a tech workshop</li>
                <li style={{ display: 'flex', gap: '8px', alignItems: 'start' }}><Check size={16} color="var(--accent-primary)" style={{ flexShrink: 0, marginTop: '2px' }}/> 15-min exclusive Keynote</li>
                <li style={{ display: 'flex', gap: '8px', alignItems: 'start' }}><Check size={16} color="var(--accent-primary)" style={{ flexShrink: 0, marginTop: '2px' }}/> Access to resume database</li>
              </ul>
              <Button href="mailto:sponsors@meccomputerclub.org?subject=Gold%20Sponsorship" variant="primary" style={{ width: '100%' }}>Choose Gold</Button>
            </div>

            {/* Platinum */}
            <div className="card card--hoverable" style={{ display: 'flex', flexDirection: 'column', padding: 'var(--space-5)' }}>
              <div style={{ fontSize: 'var(--text-xl)', fontWeight: 'bold' }}>Platinum</div>
              <div style={{ fontSize: 'var(--text-2xl)', color: 'var(--accent-primary)', fontWeight: 'bold', margin: 'var(--space-2) 0' }}>৳100k+</div>
              <hr style={{ border: 'none', borderTop: '1px solid var(--border-default)', margin: 'var(--space-3) 0' }} />
              <ul style={{ padding: 0, margin: '0 0 var(--space-4) 0', listStyle: 'none', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', flex: 1 }}>
                <li style={{ display: 'flex', gap: '8px', alignItems: 'start', fontWeight: 'bold', color: 'var(--text-primary)' }}><Check size={16} color="var(--text-primary)" style={{ flexShrink: 0, marginTop: '2px' }}/> All Gold benefits</li>
                <li style={{ display: 'flex', gap: '8px', alignItems: 'start' }}><Check size={16} color="var(--accent-primary)" style={{ flexShrink: 0, marginTop: '2px' }}/> Flagship event naming rights</li>
                <li style={{ display: 'flex', gap: '8px', alignItems: 'start' }}><Check size={16} color="var(--accent-primary)" style={{ flexShrink: 0, marginTop: '2px' }}/> Joint workshop series</li>
                <li style={{ display: 'flex', gap: '8px', alignItems: 'start' }}><Check size={16} color="var(--accent-primary)" style={{ flexShrink: 0, marginTop: '2px' }}/> Custom software collab</li>
              </ul>
              <Button href="mailto:sponsors@meccomputerclub.org?subject=Platinum%20Sponsorship" variant="outline" style={{ width: '100%' }}>Choose Platinum</Button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section className="section--sm">
        <div className="container">
          <div className="section-header text-center">
            <h2>How It Works</h2>
          </div>
          <div className="grid grid--3 stagger-children">
            <div>
              <div className="step-number">01</div>
              <h4 style={{ fontWeight: 'bold', marginBottom: 'var(--space-1)' }}>Reach Out</h4>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', margin: 0 }}>Contact our corporate relations team to request a customized pitch deck.</p>
            </div>
            <div>
              <div className="step-number">02</div>
              <h4 style={{ fontWeight: 'bold', marginBottom: 'var(--space-1)' }}>Discuss & Plan</h4>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', margin: 0 }}>We align on goals and customize a tier tailored to your ROI targets.</p>
            </div>
            <div>
              <div className="step-number">03</div>
              <h4 style={{ fontWeight: 'bold', marginBottom: 'var(--space-1)' }}>Agreement</h4>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', margin: 0 }}>Sign the formal MoU to officially lock in the deliverables.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="section section--alt">
        <div className="container" style={{ maxWidth: 'var(--max-width-narrow)' }}>
          <div className="section-header text-center">
            <h2>Track Record</h2>
          </div>
          <div className="grid grid--2 stagger-children">
            <div className="card" style={{ padding: 'var(--space-5)' }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 'bold', color: 'var(--text-tertiary)', fontSize: 'var(--text-xl)', marginBottom: 'var(--space-3)' }}>
                {/* Logo Placeholder */}
                TC
              </div>
              <blockquote style={{ fontSize: 'var(--text-lg)', fontStyle: 'italic', margin: '0 0 var(--space-4) 0', border: 'none', padding: 0 }}>
                "Partnering with MEC Computer Club drastically improved our talent pipeline. The students we recruited are now our core engineers."
              </blockquote>
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                <strong style={{ color: 'var(--text-primary)' }}>Ahmed Rahman</strong><br/>
                CEO, Tech Solutions BD
              </div>
            </div>
            <div className="card" style={{ padding: 'var(--space-5)' }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 'bold', color: 'var(--text-tertiary)', fontSize: 'var(--text-xl)', marginBottom: 'var(--space-3)' }}>
                {/* Logo Placeholder */}
                DI
              </div>
              <blockquote style={{ fontSize: 'var(--text-lg)', fontStyle: 'italic', margin: '0 0 var(--space-4) 0', border: 'none', padding: 0 }}>
                "Their professionalism and the scale of their technical events are unmatched in the region. Sponsoring their contest was a massive brand win for us."
              </blockquote>
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                <strong style={{ color: 'var(--text-primary)' }}>Nusrat Jahan</strong><br/>
                HR Manager, Digital Innovations Ltd.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. MINI FAQ */}
      <section className="section--sm">
        <div className="container" style={{ maxWidth: 'var(--max-width-narrow)' }}>
          <div className="section-header text-center">
            <h2>Frequently Asked Questions</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div className="card" style={{ padding: 'var(--space-4)' }}>
              <h4 style={{ marginBottom: 'var(--space-2)' }}>Can we choose a custom package outside these tiers?</h4>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', margin: 0 }}>Yes. We can tailor a custom package focusing on specific events, workshops, or merchandise depending on your marketing goals.</p>
            </div>
            <div className="card" style={{ padding: 'var(--space-4)' }}>
              <h4 style={{ marginBottom: 'var(--space-2)' }}>Is the amount negotiable for startups/early-stage companies?</h4>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', margin: 0 }}>We often provide in-kind sponsorship options (e.g., providing software credits or API access) for early-stage startups.</p>
            </div>
            <div className="card" style={{ padding: 'var(--space-4)' }}>
              <h4 style={{ marginBottom: 'var(--space-2)' }}>How is the sponsorship money used?</h4>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', margin: 0 }}>100% of the funds go directly into hosting events, printing merchandise, providing contest prizes, and maintaining our digital infrastructure.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CONTACT CTA FOOTER */}
      <section className="section sponsor-cta-gradient text-center">
        <div className="container" style={{ maxWidth: 'var(--max-width-narrow)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--accent-primary)', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 'var(--space-2)' }}>
            Sponsorship cycle closes Nov 30
          </div>
          <h2 style={{ marginBottom: 'var(--space-6)' }}>Ready to collaborate?</h2>
          <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button href="mailto:sponsors@meccomputerclub.org" variant="primary">
              Email Us
            </Button>
            <Button href="tel:+8801700000000" variant="secondary">
              Call Us
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
