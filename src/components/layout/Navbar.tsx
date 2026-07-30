"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useAccent } from "@/components/AccentProvider";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { VibeSwitcher } from "@/components/VibeSwitcher";
import "./Navbar.css";

const navItems = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Our Story", href: "/about" },
      { label: "Departments", href: "/about#departments" },
      { label: "Team", href: "/about#team" },
      { label: "Alumni", href: "/alumni" },
    ],
  },
  { label: "Events", href: "/events" },
  { label: "CP Hub", href: "/cp-hub" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header className={`navbar ${isScrolled ? "navbar--scrolled" : ""}`} role="banner">
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
              key={item.href}
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
                <ul className="navbar__dropdown" role="menu">
                  {item.children.map((child) => (
                    <li key={child.href} role="none">
                      <Link href={child.href} className="navbar__dropdown-link" role="menuitem">
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        {/* Right side — CTA + Login */}
        <div className="navbar__actions">
          <ThemeToggle />
          <Link href="/login" className="navbar__login" id="nav-member-login">
            Member Login
          </Link>
          <Button href="/join" size="sm" id="nav-join-cta">
            Join Us
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className={`navbar__hamburger ${isOpen ? "navbar__hamburger--open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          id="nav-mobile-toggle"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile menu — full-screen overlay (§5) */}
      {isOpen && (
        <div className="navbar__mobile-overlay" role="dialog" aria-modal="true" aria-label="Navigation menu">
          <nav className="navbar__mobile-menu">
            <ul className="navbar__mobile-links">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`navbar__mobile-link ${pathname === item.href ? "navbar__mobile-link--active" : ""}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <ul className="navbar__mobile-sub">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="navbar__mobile-sub-link"
                            onClick={() => setIsOpen(false)}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            <div className="navbar__mobile-actions">
              <div style={{ marginBottom: '1rem' }}>
                <ThemeToggle />
              </div>
              <Button href="/join" fullWidth id="mobile-join-cta">
                Apply to Join
              </Button>
              <Link href="/login" className="navbar__mobile-login" onClick={() => setIsOpen(false)}>
                Member Login →
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
