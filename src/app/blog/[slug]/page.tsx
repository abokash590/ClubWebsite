import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { blogPosts, getBlogBySlug } from "@/data/blog";
import "./post-detail.css";

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) notFound();

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="post-detail">
      <div className="container container--narrow">
        <header className="post-detail__header">
          <div className="post-detail__meta">
            <span className="post-detail__author">{post.author}</span>
            <span className="post-detail__separator">·</span>
            <time className="post-detail__date">{formattedDate}</time>
            <span className="post-detail__separator">·</span>
            <span className="post-detail__read-time">{post.readTime} min read</span>
          </div>
          <h1>{post.title}</h1>
          <div className="post-detail__tags">
            {post.tags.map((tag) => (
              <span key={tag} className="post-detail__tag">{tag}</span>
            ))}
          </div>
        </header>

        <div className="post-detail__content">
          {/* We're using a simple pre-line rendering for the markdown content since we aren't using a markdown parser library yet */}
          {post.content.split("\n\n").map((paragraph, index) => {
            if (paragraph.startsWith("## ")) {
              return <h2 key={index}>{paragraph.replace("## ", "")}</h2>;
            }
            if (paragraph.startsWith("- ")) {
              const items = paragraph.split("\n").map(item => item.replace("- ", ""));
              return (
                <ul key={index}>
                  {items.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              );
            }
            if (paragraph.startsWith("1. ")) {
                const items = paragraph.split("\n").map(item => item.replace(/^\d+\.\s/, ""));
                return (
                  <ol key={index}>
                    {items.map((item, i) => <li key={i}>{item}</li>)}
                  </ol>
                );
              }
            return <p key={index}>{paragraph.replace(/\*\*(.*?)\*\*/g, "$1")}</p>; // Strip bold markdown for simple rendering
          })}
        </div>

        <div className="post-detail__footer">
          <div className="post-detail__author-box">
            <div className="post-detail__author-avatar">
              {post.author.split(" ").map(n => n[0]).join("")}
            </div>
            <div>
              <strong>Written by {post.author}</strong>
              <p>MEC Computer Club Member</p>
            </div>
          </div>
          <Button href="/blog" variant="ghost">← Back to all posts</Button>
        </div>
      </div>
    </article>
  );
}
