import Link from "next/link";
import Image from "next/image";
import { Badge } from "./Badge";
import "./Card.css";

/* ===== Event Card ===== */
interface EventCardProps {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: string;
  status: "upcoming" | "ongoing" | "past";
  image: string;
  slug: string;
  attendeeCount?: number;
}

export function EventCard({
  title,
  description,
  date,
  time,
  location,
  type,
  status,
  image,
  slug,
  attendeeCount,
}: EventCardProps) {
  const eventDate = new Date(date);
  const month = eventDate.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
  const day = eventDate.getDate();

  return (
    <Link href={`/events/${slug}`} className="card card--event" id={`event-${slug}`}>
      <div className="card__visual">
        <div className="card__placeholder" style={{ background: getEventGradient(type) }}>
          <span className="card__icon-large">{getEventIcon(type)}</span>
        </div>
        <Badge variant={status === "upcoming" ? "upcoming" : "past"} className="card__badge">
          {status}
        </Badge>
      </div>
      <div className="card__body">
        <div className="card__accent-column" style={{ color: getEventAccentColor(type) }}>
          <span className="card__accent-top">{month}</span>
          <span className="card__accent-bottom">{day}</span>
        </div>
        
        <div className="card__divider" />
        
        <div className="card__content-column">
          <div className="card__meta-line">
            <span className="card__meta-icon">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            </span>
            {location}
          </div>
          <h3 className="card__title" style={{ color: getEventAccentColor(type) }}>{title}</h3>
          <p className="card__description">{description}</p>
          <div className="card__footer">
            <div className="card__footer-pill">
              {time} {attendeeCount ? `· ${attendeeCount} attending` : ""}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ===== Project Card ===== */
interface ProjectCardProps {
  title: string;
  description: string;
  department: string;
  techStack: string[];
  status: "in-progress" | "completed" | "archived";
  slug: string;
  image: string;
  liveUrl?: string;
}

export function ProjectCard({
  title,
  description,
  department,
  techStack,
  status,
  slug,
  liveUrl,
}: ProjectCardProps) {
  return (
    <Link href={`/projects/${slug}`} className="card card--project" id={`project-${slug}`}>
      <div className="card__visual">
        <div className="card__placeholder" style={{ background: getDeptGradient(department) }}>
          <span className="card__icon-large">{getDeptIcon(department)}</span>
        </div>
        <Badge variant={status === "completed" ? "completed" : "pending"} className="card__badge">
          {status === "in-progress" ? "In Progress" : status}
        </Badge>
      </div>
      <div className="card__body">
        <div className="card__accent-column" style={{ color: "var(--accent-primary)" }}>
          <span className="card__accent-top" style={{ fontSize: '1.25rem', lineHeight: 1 }}>{getDeptIcon(department)}</span>
          <span className="card__accent-bottom">{formatDeptShort(department)}</span>
        </div>
        
        <div className="card__divider" />
        
        <div className="card__content-column">
          <div className="card__meta-line">
            <span className="card__meta-icon">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
            </span>
            {techStack[0]}
          </div>
          <h3 className="card__title">{title}</h3>
          <p className="card__description">{description}</p>
          <div className="card__footer">
            <div className="card__tags">
              {techStack.slice(0, 3).map((tech) => (
                <span key={tech} className="card__tag">
                  {tech}
                </span>
              ))}
              {techStack.length > 3 && (
                <span className="card__tag card__tag--more">+{techStack.length - 3}</span>
              )}
            </div>
            {liveUrl && <span className="card__link-glyph">↗</span>}
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ===== Blog Card ===== */
interface BlogCardProps {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: number;
  tags: string[];
  slug: string;
}

export function BlogCard({
  title,
  excerpt,
  author,
  date,
  readTime,
  tags,
  slug,
}: BlogCardProps) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Link href={`/blog/${slug}`} className="card card--blog" id={`blog-${slug}`}>
      <div className="card__content">
        <div className="card__meta">
          <span className="card__author">{author}</span>
          <span className="card__separator">·</span>
          <time className="card__date">{formattedDate}</time>
          <span className="card__separator">·</span>
          <span className="card__read-time">{readTime} min read</span>
        </div>
        <h3 className="card__title">{title}</h3>
        <p className="card__description">{excerpt}</p>
        <div className="card__tags">
          {tags.slice(0, 3).map((tag) => (
            <span key={tag} className="card__tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

/* ===== Team Member Card ===== */
interface TeamCardProps {
  name: string;
  role: string;
  image: string;
  bio?: string;
  socials?: {
    github?: string;
    linkedin?: string;
    codeforces?: string;
  };
}

export function TeamCard({ name, role, image, bio, socials }: TeamCardProps) {
  return (
    <div className="card card--team">
      <div className="card__avatar">
        <div className="card__avatar-placeholder">
          <span>{name.split(" ").map(n => n[0]).join("")}</span>
        </div>
      </div>
      <div className="card__content">
        <h4 className="card__name">{name}</h4>
        <p className="card__role">{role}</p>
        {bio && <p className="card__bio">{bio}</p>}
        {socials && (
          <div className="card__socials">
            {socials.github && (
              <a href={socials.github} target="_blank" rel="noopener noreferrer" aria-label={`${name}'s GitHub`}>
                GH
              </a>
            )}
            {socials.linkedin && (
              <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${name}'s LinkedIn`}>
                LI
              </a>
            )}
            {socials.codeforces && (
              <a href={socials.codeforces} target="_blank" rel="noopener noreferrer" aria-label={`${name}'s Codeforces`}>
                CF
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* Helpers */
function getEventGradient(type: string): string {
  const gradients: Record<string, string> = {
    workshop: "linear-gradient(135deg, var(--accent-primary-light) 0%, var(--surface-primary) 100%)",
    contest: "linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-primary-light) 100%)",
    seminar: "linear-gradient(135deg, var(--surface-elevated) 0%, var(--surface-secondary) 100%)",
    social: "linear-gradient(135deg, var(--surface-elevated) 0%, var(--surface-primary) 100%)",
    hackathon: "linear-gradient(135deg, var(--accent-primary-hover) 0%, var(--accent-primary-light) 100%)",
  };
  return gradients[type] || gradients.workshop;
}

function getEventIcon(type: string): string {
  const icons: Record<string, string> = {
    workshop: "🛠️",
    contest: "🏆",
    seminar: "🎤",
    social: "🎉",
    hackathon: "💻",
  };
  return icons[type] || "📅";
}

function getDeptGradient(dept: string): string {
  const gradients: Record<string, string> = {
    cp: "linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-primary-light) 100%)",
    webdev: "linear-gradient(135deg, var(--accent-primary-light) 0%, var(--surface-primary) 100%)",
    ml: "linear-gradient(135deg, var(--surface-elevated) 0%, var(--surface-secondary) 100%)",
    cybersec: "linear-gradient(135deg, var(--surface-secondary) 0%, var(--surface-primary) 100%)",
  };
  return gradients[dept] || gradients.webdev;
}

function getDeptIcon(dept: string): string {
  const icons: Record<string, string> = {
    cp: "⚡",
    webdev: "🌐",
    ml: "🧠",
    cybersec: "🔒",
  };
  return icons[dept] || "💻";
}

function formatDept(dept: string): string {
  const names: Record<string, string> = {
    cp: "Competitive Programming",
    webdev: "Web Development",
    ml: "Machine Learning",
    cybersec: "Cybersecurity",
  };
  return names[dept] || dept;
}

function formatDeptShort(dept: string): string {
  const short: Record<string, string> = {
    cp: "CP",
    webdev: "WEB",
    ml: "AI",
    cybersec: "CYBER",
  };
  return short[dept] || dept.toUpperCase().slice(0, 4);
}

function getEventAccentColor(type: string): string {
  if (type === "contest") return "var(--accent-primary)";
  if (type === "workshop") return "var(--accent-primary-hover)";
  if (type === "hackathon") return "#F59E0B"; // Warm unique hue
  return "var(--text-primary)";
}
