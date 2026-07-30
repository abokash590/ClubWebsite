import type { Metadata } from "next";
import { BlogCard } from "@/components/ui/Card";
import { blogPosts } from "@/data/blog";
import "./blog.css";

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles, tutorials, and post-mortems from MEC Computer Club members.",
};

export default function BlogPage() {
  return (
    <>
      <section className="section blog-hero">
        <div className="container">
          <span className="kicker">Blog & Resources</span>
          <h1>System Logs (Blog)</h1>
          <p className="blog-hero__subtitle">
            Tutorials, post-mortems, and thought leadership from our members.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="blog-grid">
            {blogPosts.map((post) => (
              <BlogCard key={post.id} {...post} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
