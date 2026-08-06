"use client";

import Image from "next/image";
import Link from "next/link";
import "./ProfileCard.css";

/* ============================================================
   Type Definitions
   ============================================================ */

export type ProfileCategory = "member" | "executive" | "alumni" | "advisor";

export interface ProfileSocials {
  linkedin?: string;
  github?: string;
  email?: string;
  facebook?: string;
  codeforces?: string;
}

export interface ProfileCardProps {
  /** Unique slug for the /profiles/[slug] route */
  slug: string;
  name: string;
  /** e.g. "General Member" / "President" / "SWE @ Google" / "Asst. Professor, CSE" */
  role: string;
  /**
   * Sublabel shown after the category separator "·"
   * e.g. "BATCH 27" / "PRESIDENT" / "BATCH 21" / "FACULTY"
   */
  sublabel: string;
  category: ProfileCategory;
  /** URL to the photo. Omit → show initial letter placeholder. */
  image?: string;
  socials?: ProfileSocials;
  /** Open a modal instead of navigating (optional callback) */
  onCardClick?: (slug: string) => void;
}

/* Category label lookup — styling is fully token-driven via CSS */
const CATEGORY_LABEL: Record<ProfileCategory, string> = {
  member:    "MEMBER",
  executive: "EXECUTIVE",
  alumni:    "ALUMNI",
  advisor:   "ADVISOR",
};

/* ============================================================
   Social icon SVGs  (inline, no extra dependency)
   ============================================================ */

const IconGitHub = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const IconLinkedIn = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const IconCodeforces = () => (
  /* Codeforces "CF" logotype as a minimal SVG glyph */
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <rect x="2" y="10" width="4" height="12" rx="1" />
    <rect x="10" y="4" width="4" height="18" rx="1" />
    <rect x="18" y="7" width="4" height="15" rx="1" />
  </svg>
);

const IconEmail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
  </svg>
);

const IconFacebook = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

/* ============================================================
   Dynamic social link builder — renders only provided links
   ============================================================ */

interface SocialLink {
  href: string;
  label: string;
  icon: React.ReactNode;
}

function buildSocialLinks(
  socials: ProfileSocials | undefined,
  name: string,
): SocialLink[] {
  if (!socials) return [];
  const links: SocialLink[] = [];

  if (socials.linkedin)
    links.push({ href: socials.linkedin, label: `${name}'s LinkedIn`, icon: <IconLinkedIn /> });
  if (socials.github)
    links.push({ href: socials.github, label: `${name}'s GitHub`, icon: <IconGitHub /> });
  if (socials.email)
    links.push({ href: `mailto:${socials.email}`, label: `Email ${name}`, icon: <IconEmail /> });
  if (socials.facebook)
    links.push({ href: socials.facebook, label: `${name}'s Facebook`, icon: <IconFacebook /> });
  if (socials.codeforces)
    links.push({ href: socials.codeforces, label: `${name}'s Codeforces`, icon: <IconCodeforces /> });

  return links;
}

/* ============================================================
   ProfileCard component
   ============================================================ */

export function ProfileCard({
  slug,
  name,
  role,
  sublabel,
  category,
  image,
  socials,
  onCardClick,
}: ProfileCardProps) {
  /* First initial for placeholder */
  const initial = name.trim().charAt(0).toUpperCase();

  /* Category label row */
  const categoryLabel = `${CATEGORY_LABEL[category]} · ${sublabel}`;

  /* Social row links */
  const socialLinks = buildSocialLinks(socials, name);

  /* ── Render ── */
  const CardWrapper = onCardClick
    ? ({ children }: { children: React.ReactNode }) => (
        <div
          className="profile-card"
          id={`profile-${slug}`}
          role="button"
          tabIndex={0}
          onClick={() => onCardClick(slug)}
          onKeyDown={(e) => e.key === "Enter" && onCardClick(slug)}
          aria-label={`View profile: ${name}`}
        >
          {children}
        </div>
      )
    : ({ children }: { children: React.ReactNode }) => (
        <Link
          href={`/profiles/${slug}`}
          className="profile-card"
          id={`profile-${slug}`}
          aria-label={`View profile: ${name}`}
        >
          {children}
        </Link>
      );

  return (
    <CardWrapper>
      {/* 1. Photo block */}
      <div className="profile-card__photo">
        {image ? (
          <Image
            src={image}
            alt={`${name}'s photo`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 220px"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <div className="profile-card__photo-placeholder" aria-hidden="true">
            {initial}
          </div>
        )}
      </div>

      {/* 2. Content block */}
      <div className="profile-card__content">
        {/* a. Category label */}
        <span className="profile-card__category" title={categoryLabel}>
          {categoryLabel}
        </span>

        {/* b. Name */}
        <h3 className="profile-card__name">{name}</h3>

        {/* c. Role */}
        <p className="profile-card__role" title={role}>{role}</p>

        {/* Spacer */}
        <div className="profile-card__social-spacer" />

        {/* 3. Social icon row — only rendered if at least one link exists */}
        {socialLinks.length > 0 && (
          <div className="profile-card__socials" role="group" aria-label="Social links">
            {socialLinks.map(({ href, label, icon }) => (
              <a
                key={label}
                href={href}
                className="profile-card__social-btn"
                aria-label={label}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                onClick={(e) => e.stopPropagation()}
              >
                {icon}
              </a>
            ))}
          </div>
        )}
      </div>
    </CardWrapper>
  );
}

/* ============================================================
   ProfileGrid — responsive grid wrapper
   ============================================================ */

interface ProfileGridProps {
  children: React.ReactNode;
  className?: string;
}

export function ProfileGrid({ children, className = "" }: ProfileGridProps) {
  return (
    <div className={`profile-grid ${className}`.trim()}>
      {children}
    </div>
  );
}
