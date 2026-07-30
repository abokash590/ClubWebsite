"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";
import "./Sidebar.css";

interface SidebarProps {
  type: "user" | "admin";
}

const userLinks = [
  { href: "/dashboard", label: "Overview", icon: "📊" },
  { href: "/dashboard/cp-profile", label: "CP Profile", icon: "🏆" },
  { href: "/dashboard/events", label: "My Events", icon: "📅" },
  { href: "/dashboard/settings", label: "Settings", icon: "⚙️" },
];

const adminLinks = [
  { href: "/admin", label: "Overview", icon: "📈" },
  { href: "/admin/applications", label: "Applications", icon: "📥" },
  { href: "/admin/members", label: "Members", icon: "👥" },
  { href: "/admin/events", label: "Manage Events", icon: "🎫" },
];

export function Sidebar({ type }: SidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const links = type === "admin" ? adminLinks : userLinks;

  // Close sidebar on navigation on mobile
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <button 
        className="sidebar-toggle" 
        onClick={() => setIsOpen(true)}
        aria-label="Open sidebar"
        style={{ position: 'fixed', top: '16px', left: '16px', zIndex: 999 }}
      >
        ☰
      </button>

      {isOpen && (
        <div 
          className="sidebar-overlay sidebar-overlay--open" 
          onClick={() => setIsOpen(false)} 
        />
      )}

      <aside className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>
        <div className="sidebar__header">
          <Link href="/" className="sidebar__logo">
            MEC CC {type === "admin" && <span className="sidebar__badge">ADMIN</span>}
          </Link>
        </div>

        <nav className="sidebar__nav">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`sidebar__link ${pathname === link.href ? "sidebar__link--active" : ""}`}
            >
              <span>{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="sidebar__footer">
          <div className="sidebar__user">
            <div className="sidebar__avatar">
              {type === "admin" ? "AD" : "US"}
            </div>
            <div className="sidebar__user-info">
              <span className="sidebar__user-name">
                {type === "admin" ? "Admin User" : "Farhan Ahmed"}
              </span>
              <span className="sidebar__user-role">
                {type === "admin" ? "Executive" : "Member"}
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <ThemeToggle />
            <Link href="/" className="sidebar__link" style={{ padding: '4px 8px', fontSize: '12px' }}>
              Logout
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
