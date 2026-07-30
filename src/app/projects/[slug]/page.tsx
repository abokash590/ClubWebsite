import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { projects, getProjectBySlug } from "@/data/projects";
import "./project-detail.css";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };
  return { title: project.title, description: project.description };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <article className="project-detail">
      <div className="container container--narrow">
        <Badge variant={project.status === "completed" ? "completed" : "pending"} size="md">
          {project.status === "in-progress" ? "In Progress" : project.status}
        </Badge>
        <h1>{project.title}</h1>
        <p className="project-detail__desc">{project.longDescription || project.description}</p>

        <div className="project-detail__info">
          <div className="project-detail__info-item">
            <h4>Tech Stack</h4>
            <div className="project-detail__tags">
              {project.techStack.map((t) => (
                <span key={t} className="project-detail__tag">{t}</span>
              ))}
            </div>
          </div>
          <div className="project-detail__info-item">
            <h4>Team</h4>
            <ul className="project-detail__team">
              {project.team.map((m) => <li key={m}>{m}</li>)}
            </ul>
          </div>
          {(project.liveUrl || project.repoUrl) && (
            <div className="project-detail__info-item">
              <h4>Links</h4>
              <div className="project-detail__links">
                {project.liveUrl && <Button href={project.liveUrl} size="sm">Live Demo ↗</Button>}
                {project.repoUrl && <Button href={project.repoUrl} variant="secondary" size="sm">GitHub ↗</Button>}
              </div>
            </div>
          )}
        </div>

        <div className="project-detail__back">
          <Button href="/projects" variant="ghost">← Back to projects</Button>
        </div>
      </div>
    </article>
  );
}
