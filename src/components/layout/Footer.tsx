import Link from "next/link";
import "./Footer.css";

const footerLinks = {
  explore: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Alumni", href: "/alumni" },
    { label: "Events", href: "/events" },
    { label: "Projects", href: "/projects" },
  ],
  resources: [
    { label: "CP Hub", href: "/cp-hub" },
    { label: "Blog", href: "/blog" },
    { label: "Join Us", href: "/join" },
    { label: "Contact", href: "/contact" },
  ],
  connect: [
    { label: "GitHub", href: "https://github.com", external: true },
    { label: "Facebook", href: "https://facebook.com", external: true },
    { label: "Discord", href: "https://discord.gg", external: true },
    { label: "LinkedIn", href: "https://linkedin.com", external: true },
  ],
};

export function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer__grid">
          {/* Brand column */}
          <div className="footer__brand">
            <Link href="/" className="footer__brand-link" aria-label="MEC Computer Club">
            <div className="footer__logo-mask" />
          </Link>
            <p className="footer__tagline">
              Weekly CP practice, real projects, one club.
              Building the next generation of developers at MEC.
            </p>
            <div className="footer__socials">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="footer__social-link">
                GH
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="footer__social-link">
                FB
              </a>
              <a href="https://discord.gg" target="_blank" rel="noopener noreferrer" aria-label="Discord" className="footer__social-link">
                DC
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="footer__social-link">
                LI
              </a>
            </div>
          </div>

          {/* Link columns */}
          <div className="footer__column">
            <h4 className="footer__heading">Explore</h4>
            <ul className="footer__list">
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer__link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__column">
            <h4 className="footer__heading">Resources</h4>
            <ul className="footer__list">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer__link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__column">
            <h4 className="footer__heading">Connect</h4>
            <ul className="footer__list">
              {footerLinks.connect.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="footer__link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © {new Date().getFullYear()} MEC Computer Club. All rights reserved.
          </p>
          <p className="footer__built">
            Built with Next.js by the Web Dev panel.
          </p>
        </div>
      </div>
    </footer>
  );
}
