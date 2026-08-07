"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useAccent } from "@/components/AccentProvider";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ThemeToggle";
import type { SessionPayload } from "@/lib/auth";
import { logoutAction } from "@/app/logout/actions";
import "./Navbar.css";

const navItems = [
  {
    label: "About",
    href: "#",
    children: [
      { label: "About Us", href: "/about" },
      { label: "Constitution", href: "/constitution" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    label: "Our People",
    href: "#",
    children: [
      { label: "Advisor Panel", href: "/advisors" },
      { label: "Alumni", href: "/alumni" },
      { label: "Executive Panel", href: "/executives" },
      { label: "Members", href: "/members" },
    ],
  },
  {
    label: "Events",
    href: "/events",
    children: [
      { label: "Upcoming Event", href: "/events#upcoming" },
      { label: "Past Event", href: "/events#past" },
    ],
  },
  {
    label: "CP Hub",
    href: "#",
    children: [
      { label: "Roadmaps", href: "/cp-hub/roadmaps" },
      { label: "Resources", href: "/cp-hub/resources" },
      { label: "Problem Sets", href: "/cp-hub/problem-sets" },
      { label: "Sheet Tracker", href: "/cp-hub/sheet-tracker" },
      { label: "Contests", href: "/cp-hub/contests" },
      { label: "Leaderboard", href: "/cp-hub/leaderboard" },
      { label: "ICPC Preparation", href: "/cp-hub/icpc-preparation" },
      { label: "Achievements", href: "/cp-hub/achievements" },
    ],
  },
  {
    label: "Resources",
    href: "#",
    children: [
      { label: "Projects", href: "/projects" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    label: "Collaborate",
    href: "#",
    children: [
      { label: "Become a Sponsor", href: "/collaborate/sponsor" },
      { label: "Our Partners", href: "/collaborate/partners" },
    ],
  },
  { label: "Gallery", href: "/gallery" },
];

const VIBES = ["lime", "mint", "sky", "amber", "rose", "violet", "slate"];
const MODES = ["light", "dark"];

function LogoPreloader() {
  return (
    <div style={{ position: "absolute", opacity: 0, pointerEvents: "none", width: 0, height: 0, overflow: "hidden" }} aria-hidden="true">
      {VIBES.map((vibe) =>
        MODES.map((mode) => (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            key={`${vibe}-${mode}`}
            src={`/logo-${vibe}-${mode}.png`}
            alt=""
            width={160}
            height={40}
            loading="eager"
          />
        ))
      )}
    </div>
  );
}

export function Navbar({ user }: { user?: SessionPayload | null }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const { currentVibe } = useAccent();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  return (
    <header className={`navbar ${isScrolled ? "navbar--scrolled" : ""}`} role="banner">
      <LogoPreloader />
      <nav className="navbar__inner container" aria-label="Main navigation">
        {/* Logo */}
        <Link href="/" className="navbar__logo" aria-label="MEC Computer Club — Home">
          {mounted ? (
            <Image 
              src={`/logo-${currentVibe}-${resolvedTheme === 'dark' ? 'dark' : 'light'}.png`}
              alt="MEC Computer Club Logo" 
              width={160} 
              height={40} 
              priority
              className="navbar__logo-image"
            />
          ) : (
            <Image 
              src="/logo-lime-light.png"
              alt="MEC Computer Club Logo" 
              width={160} 
              height={40} 
              priority
              className="navbar__logo-image"
            />
          )}
        </Link>

        {/* Desktop nav */}
        <ul className="navbar__links" role="menubar">
          {navItems.map((item) => (
            <li
              key={item.label}
              className={`navbar__item ${item.children ? "navbar__item--has-dropdown" : ""}`}
              onMouseEnter={() => item.children && setActiveDropdown(item.label)}
              onMouseLeave={() => setActiveDropdown(null)}
              role="none"
            >
              <Link
                href={item.href}
                className={`navbar__link ${pathname === item.href ? "navbar__link--active" : ""}`}
                role="menuitem"
                aria-haspopup={item.children ? "true" : undefined}
                aria-expanded={item.children ? activeDropdown === item.label : undefined}
              >
                {item.label}
                {item.children && (
                  <svg className="navbar__chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </Link>
              {item.children && activeDropdown === item.label && (
                <div className="navbar__dropdown-wrapper">
                  <ul className="navbar__dropdown" role="menu">
                    {item.children.map((child) => (
                      <li key={child.href} role="none">
                        <Link href={child.href} className="navbar__dropdown-link" role="menuitem">
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Right side — CTA + Login */}
        <div className="navbar__actions">
          <ThemeToggle />
          {user ? (
            <>
              <Link href={user.role === 'admin' ? '/admin' : '/dashboard'} className="navbar__login">
                {user.role === 'admin' ? 'Admin Panel' : 'Dashboard'}
              </Link>
              <form action={logoutAction} style={{ display: 'inline' }}>
                <Button type="submit" size="sm" variant="outline">
                  Logout
                </Button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login" className="navbar__login" id="nav-member-login">
                Member Login
              </Link>
              <Button href="/join" size="sm" id="nav-join-cta">
                Join Club
              </Button>
            </>
          )}
        </div>

      </nav>
    </header>
  );
}
