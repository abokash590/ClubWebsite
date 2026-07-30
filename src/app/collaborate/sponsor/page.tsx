import { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import "./sponsor.css";

export const metadata: Metadata = {
  title: "Corporate Sponsorship | MEC Computer Club",
  description: "Acquire top engineering talent and boost brand visibility by partnering with Mymensingh Engineering College's premier tech community.",
};

export default function SponsorPage() {
  return (
    <main>
      {/* Hero */}
      <section className="section text-center">
        <div className="container">
          <span className="kicker">Corporate Partnerships</span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginBottom: 'var(--space-4)', lineHeight: 1.1 }}>
            Acquire Top Tech Talent
          </h1>
          <p style={{ fontSize: 'var(--text-xl)', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto var(--space-6)' }}>
            Gain direct access to the most highly-skilled, pre-vetted engineering students at Mymensingh Engineering College before they hit the job market.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center' }}>
            <Button href="mailto:sponsors@meccomputerclub.org" variant="primary">
              Contact for Pitch Deck
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section section--alt">
        <div className="container">
          <div className="grid grid--4 text-center stagger-children">
            <div className="card card--hoverable" style={{ padding: 'var(--space-5)' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--accent-primary-hover)', fontFamily: 'var(--font-heading)' }}>150+</div>
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>Active Members</div>
            </div>
            <div className="card card--hoverable" style={{ padding: 'var(--space-5)' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--accent-primary-hover)', fontFamily: 'var(--font-heading)' }}>20+</div>
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>Yearly Events</div>
            </div>
            <div className="card card--hoverable" style={{ padding: 'var(--space-5)' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--accent-primary-hover)', fontFamily: 'var(--font-heading)' }}>500+</div>
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>Participants</div>
            </div>
            <div className="card card--hoverable" style={{ padding: 'var(--space-5)' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--accent-primary-hover)', fontFamily: 'var(--font-heading)' }}>15+</div>
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>Sponsors</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Sponsor */}
      <section className="section">
        <div className="container">
          <div className="section-header text-center">
            <span className="kicker">The Value</span>
            <h2>Why Partner With Us?</h2>
          </div>
          <div className="grid grid--2 stagger-children">
            <div className="card card--hoverable">
              <div className="card__content">
                <h3 className="card__title card__title--large">Direct Recruitment</h3>
                <p className="card__description" style={{ WebkitLineClamp: 10 }}>Skip the expensive screening process. Hire battle-tested engineers straight from our competitive programming and web development panels for your internships and full-time roles.</p>
              </div>
            </div>
            <div className="card card--hoverable">
              <div className="card__content">
                <h3 className="card__title card__title--large">Brand Authority</h3>
                <p className="card__description" style={{ WebkitLineClamp: 10 }}>Position your company as an industry leader. We put your logo on our physical banners, website, and exclusive merchandise seen by hundreds of prospective tech professionals.</p>
              </div>
            </div>
            <div className="card card--hoverable">
              <div className="card__content">
                <h3 className="card__title card__title--large">Product Adoption</h3>
                <p className="card__description" style={{ WebkitLineClamp: 10 }}>Introduce your APIs, cloud platforms, and dev tools directly into our hackathons and project workshops, creating loyal users early in their careers.</p>
              </div>
            </div>
            <div className="card card--hoverable">
              <div className="card__content">
                <h3 className="card__title card__title--large">CSR Impact</h3>
                <p className="card__description" style={{ WebkitLineClamp: 10 }}>Fulfill your Corporate Social Responsibility (CSR) goals by actively funding student education, tech literacy, and nationwide technology initiatives.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section className="section section--alt">
        <div className="container">
          <div className="section-header text-center">
            <span className="kicker">Packages</span>
            <h2>Sponsorship Tiers</h2>
          </div>
          <div className="grid grid--4 stagger-children">
            {/* Bronze */}
            <div className="card card--hoverable">
              <div className="card__content">
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Bronze</div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', fontFamily: 'var(--font-heading)', margin: 'var(--space-2) 0' }}>৳10k+</div>
                <hr style={{ border: 'none', borderTop: '1px solid var(--border-default)', margin: 'var(--space-3) 0' }} />
                <ul style={{ paddingLeft: 'var(--space-4)', color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  <li>Logo on event banners</li>
                  <li>Social media mentions</li>
                  <li>Digital certificate</li>
                </ul>
              </div>
            </div>

            {/* Silver */}
            <div className="card card--hoverable">
              <div className="card__content">
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Silver</div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', fontFamily: 'var(--font-heading)', margin: 'var(--space-2) 0' }}>৳25k+</div>
                <hr style={{ border: 'none', borderTop: '1px solid var(--border-default)', margin: 'var(--space-3) 0' }} />
                <ul style={{ paddingLeft: 'var(--space-4)', color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  <li><strong>All Bronze benefits</strong></li>
                  <li>Physical booth at events</li>
                  <li>5-min Keynote speech</li>
                  <li>Permanent logo on website</li>
                </ul>
              </div>
            </div>

            {/* Gold (Featured) */}
            <div className="card card--hoverable" style={{ backgroundColor: 'var(--accent-primary)', color: 'var(--accent-primary-text)' }}>
              <div className="card__content">
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', opacity: 0.9, textTransform: 'uppercase' }}>Gold (Featured)</div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', fontFamily: 'var(--font-heading)', margin: 'var(--space-2) 0' }}>৳50k+</div>
                <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.3)', margin: 'var(--space-3) 0' }} />
                <ul style={{ paddingLeft: 'var(--space-4)', fontSize: 'var(--text-sm)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  <li><strong>All Silver benefits</strong></li>
                  <li>Sponsor a tech workshop</li>
                  <li>15-min exclusive Keynote</li>
                  <li>Access to resume database</li>
                </ul>
              </div>
            </div>

            {/* Platinum */}
            <div className="card card--hoverable">
              <div className="card__content">
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Platinum</div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', fontFamily: 'var(--font-heading)', margin: 'var(--space-2) 0' }}>৳100k+</div>
                <hr style={{ border: 'none', borderTop: '1px solid var(--border-default)', margin: 'var(--space-3) 0' }} />
                <ul style={{ paddingLeft: 'var(--space-4)', color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  <li><strong>All Gold benefits</strong></li>
                  <li>Flagship event naming rights</li>
                  <li>Joint workshop series</li>
                  <li>Custom software collaboration</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Onboarding & FAQ */}
      <section className="section">
        <div className="container">
          <div className="grid grid--2 stagger-children">
            
            <div>
              <div className="section-header">
                <h2>How It Works</h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <div className="card card--hoverable">
                  <div className="card__content" style={{ flexDirection: 'row', alignItems: 'center', gap: 'var(--space-4)' }}>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--accent-primary-hover)', fontWeight: 'bold' }}>01</div>
                    <div>
                      <h4 style={{ margin: '0 0 4px', fontSize: 'var(--text-lg)' }}>Reach Out</h4>
                      <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>Contact our corporate relations team to request a customized pitch deck.</p>
                    </div>
                  </div>
                </div>
                <div className="card card--hoverable">
                  <div className="card__content" style={{ flexDirection: 'row', alignItems: 'center', gap: 'var(--space-4)' }}>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--accent-primary-hover)', fontWeight: 'bold' }}>02</div>
                    <div>
                      <h4 style={{ margin: '0 0 4px', fontSize: 'var(--text-lg)' }}>Discuss & Plan</h4>
                      <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>We align on goals and customize a tier tailored to your ROI targets.</p>
                    </div>
                  </div>
                </div>
                <div className="card card--hoverable">
                  <div className="card__content" style={{ flexDirection: 'row', alignItems: 'center', gap: 'var(--space-4)' }}>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--accent-primary-hover)', fontWeight: 'bold' }}>03</div>
                    <div>
                      <h4 style={{ margin: '0 0 4px', fontSize: 'var(--text-lg)' }}>Agreement</h4>
                      <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>Sign the formal MoU to officially lock in the deliverables.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="section-header">
                <h2>Track Record</h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <div className="card card--hoverable" style={{ borderLeft: '4px solid var(--accent-primary)' }}>
                  <div className="card__content">
                    <p style={{ fontStyle: 'italic', marginBottom: 'var(--space-3)' }}>
                      "Partnering with MEC Computer Club drastically improved our talent pipeline. The students we recruited are now our core engineers."
                    </p>
                    <div style={{ fontSize: 'var(--text-sm)', fontWeight: 'bold' }}>CEO, Tech Solutions BD</div>
                  </div>
                </div>
                <div className="card card--hoverable" style={{ borderLeft: '4px solid var(--accent-primary)' }}>
                  <div className="card__content">
                    <p style={{ fontStyle: 'italic', marginBottom: 'var(--space-3)' }}>
                      "Their professionalism and the scale of their technical events are unmatched in the region. Sponsoring their contest was a massive brand win for us."
                    </p>
                    <div style={{ fontSize: 'var(--text-sm)', fontWeight: 'bold' }}>HR Manager, Digital Innovations Ltd.</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="section section--alt text-center">
        <div className="container container--narrow">
          <h2 style={{ marginBottom: 'var(--space-4)' }}>Ready to collaborate?</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-6)', fontSize: 'var(--text-lg)' }}>
            Reach out to our corporate relations team to secure your brand's position at the forefront of Mymensingh's top engineering community.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button href="mailto:sponsors@meccomputerclub.org" variant="primary">
              Email Us
            </Button>
            <Button href="tel:+8801700000000" variant="secondary">
              +880 1700 000000
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
