import Link from "next/link";
import { FiFileText, FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import { getAllPosts } from "@/lib/mdx";

export function FeaturedPosts() {
  const posts = getAllPosts().slice(0, 2);
  if (posts.length === 0) return null;

  return (
    <section className="py-12">
      <div className="mb-8 flex flex-col justify-between gap-4 border-b border-[var(--card-border)]/20 pb-4 md:flex-row md:items-end">
        <div>
          <span className="font-caps text-xs uppercase tracking-widest text-[var(--accent)]">
            FEATURED POSTS
          </span>
          <h2 className="font-display mt-1 text-2xl font-bold text-[var(--foreground)]">
            Thoughts &amp; Technical Writing
          </h2>
        </div>
        <div className="flex flex-col items-start gap-2 md:items-end">
          <p className="max-w-md text-sm text-[var(--muted)] md:text-right">
            Reflections on modern full-stack architecture, developer tooling, and engineering
            craft.
          </p>
          <Link
            href="/blog"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent)] hover:underline"
          >
            View All Posts
            <FiArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="glass-card group flex flex-col justify-between rounded-3xl p-7 sm:p-8"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-[var(--muted)]">
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--card-border)] bg-[var(--accent-light)]/60 px-3 py-1 text-xs font-medium text-[var(--accent)]">
                  <FiFileText size={12} />
                  {post.tags[0]} · {new Date(post.date).getFullYear()}
                </span>
                <span className="font-mono text-xs">{post.readingTime}</span>
              </div>
              <div>
                <h3 className="font-display mb-2 text-xl font-semibold text-[var(--foreground)] transition-colors group-hover:text-[var(--accent)]">
                  {post.title}
                </h3>
                <p className="line-clamp-3 text-sm leading-relaxed text-[var(--muted)]">
                  {post.description}
                </p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-[var(--card-border)]/20 pt-6">
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent)] group-hover:underline">
                Read Post
                <FiArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </span>
              <FiArrowUpRight
                size={16}
                aria-hidden="true"
                className="text-[var(--muted)]/60 transition-colors group-hover:text-[var(--accent)]"
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
