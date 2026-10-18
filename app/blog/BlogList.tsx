"use client";

import { clickAttributes } from "@/lib/analytics/events";
import { trackEvent } from "@/lib/analytics/client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiArrowRight,
  FiBookOpen,
  FiCalendar,
  FiChevronLeft,
  FiChevronRight,
  FiClock,
  FiCode,
  FiCpu,
  FiSearch,
  FiTerminal,
} from "react-icons/fi";
import type { PostMeta } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";

const POSTS_PER_PAGE = 4;

const tagIcons: Record<string, typeof FiCode> = {
  大前端: FiCode,
  agent: FiCpu,
  学生思维: FiBookOpen,
  服务端: FiTerminal,
};

interface BlogListProps {
  posts: PostMeta[];
  tags: string[];
}

export function BlogList({ posts, tags }: BlogListProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const tag of tags) {
      counts[tag] = posts.filter((p) => p.tags.includes(tag)).length;
    }
    return counts;
  }, [posts, tags]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      if (activeTag && !p.tags.includes(activeTag)) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [posts, activeTag, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const changeTag = (tag: string | null) => {
    if (tag === activeTag) return;
    trackEvent("blog_filter_change", {
      from_tag: activeTag ?? "all",
      to_tag: tag ?? "all",
      result_count: tag ? posts.filter((post) => post.tags.includes(tag)).length : posts.length,
    });
    setActiveTag(tag);
    setPage(1);
  };

  const pillBase =
    "inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium shadow-sm transition-all active:scale-95";
  const pillActive = "bg-[var(--accent)] text-white";
  const pillIdle =
    "border border-[var(--card-border)] bg-[var(--card)] text-[var(--muted)] backdrop-blur-sm transition-all hover:text-[var(--foreground)]";
  const countActive = "rounded-full bg-white/20 px-1.5 py-0.2 text-[0.7rem] text-white";
  const countIdle =
    "rounded-full bg-[var(--accent-light)] px-1.5 py-0.2 text-[0.7rem] text-[var(--muted)]";

  return (
    <>
      {/* 页头：徽标 + 标题 + 描述 + 搜索 */}
      <div className="mb-10 flex flex-col justify-between gap-6 border-b border-[var(--card-border)]/20 pb-8 md:flex-row md:items-end">
        <div>
          <div className="mb-3.5 inline-flex items-center gap-2 rounded-full border border-[var(--card-border)] bg-[var(--accent-light)]/40 px-3 py-1 text-[var(--accent)]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--accent)]" />
            <span className="font-caps text-[0.7rem] font-semibold uppercase tracking-widest">
              Technical Log &amp; Notes
            </span>
          </div>
          <h1 className="font-display text-[2.75rem] font-extrabold leading-[1.1] tracking-[-0.04em] text-[var(--foreground)] sm:text-[4rem]">
            Posts
          </h1>
          <p className="mt-2 max-w-xl text-lg text-[var(--muted)]">
            Thoughts on full-stack engineering, AI agents, backend architecture, and lifelong
            learning.
          </p>
        </div>

        <div className="w-full md:w-80">
          <div className="group relative">
            <FiSearch
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--muted)] transition-colors group-focus-within:text-[var(--accent)]"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search articles, tags..."
              className="w-full rounded-full border border-[var(--card-border)] bg-[var(--card)] py-2.5 pl-10 pr-24 text-sm text-[var(--foreground)] shadow-sm backdrop-blur-md transition-all placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            />
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
              <span className="rounded-full bg-[var(--accent-light)]/70 px-2 py-0.5 text-xs font-medium text-[var(--muted)]">
                {filtered.length} {filtered.length === 1 ? "article" : "articles"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 分类筛选（带计数） */}
      <div className="mb-8 flex items-center gap-2.5 overflow-x-auto pb-4">
        <button
          onClick={() => changeTag(null)}
          className={`${pillBase} ${activeTag === null ? pillActive : pillIdle}`}
        >
          All
          <span className={activeTag === null ? countActive : countIdle}>{posts.length}</span>
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => changeTag(tag)}
            className={`${pillBase} ${activeTag === tag ? pillActive : pillIdle}`}
          >
            {tag}
            <span className={activeTag === tag ? countActive : countIdle}>{tagCounts[tag]}</span>
          </button>
        ))}
      </div>

      {/* 文章卡片流 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeTag ?? "all"}-${query}-${currentPage}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-4"
        >
          {visible.length === 0 ? (
            <p className="py-12 text-center text-[var(--muted)]">
              {posts.length === 0
                ? "No posts yet. Add an .mdx file under content/posts/."
                : "No articles match your search."}
            </p>
          ) : (
            visible.map((post, i) => {
              const TagIcon = post.tags[0] ? tagIcons[post.tags[0]] : null;
              return (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group relative rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-6 shadow-[0_4px_20px_rgba(67,56,202,0.03)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/30 hover:shadow-[0_12px_32px_rgba(79,70,229,0.08)] sm:p-7"
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    {...clickAttributes("article_open_click", {
                      article_slug: post.slug,
                      position: (currentPage - 1) * POSTS_PER_PAGE + i + 1,
                      active_tag: activeTag ?? "all",
                      placement: "blog_list",
                    })}
                    className="block"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h2 className="font-display text-[1.75rem] font-semibold leading-[1.3] tracking-[-0.02em] text-[var(--foreground)] transition-colors group-hover:text-[var(--accent)]">
                        {post.title}
                      </h2>
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--accent-light)]/50 transition-colors group-hover:bg-[var(--accent-light)]">
                        <FiArrowRight
                          size={16}
                          className="text-[var(--muted)] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-[var(--accent)]"
                        />
                      </div>
                    </div>

                    {post.description && (
                      <p className="mt-3 line-clamp-2 leading-relaxed text-[var(--muted)]">
                        {post.description}
                      </p>
                    )}

                    <div className="mt-5 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-medium text-[var(--muted)]">
                      <span className="flex items-center gap-1.5">
                        <FiCalendar size={14} />
                        {formatDate(post.date)}
                      </span>
                      <span aria-hidden="true">•</span>
                      <span className="flex items-center gap-1.5">
                        <FiClock size={14} />
                        {post.readingTime}
                      </span>
                      {post.tags.length > 0 && (
                        <>
                          <span aria-hidden="true">•</span>
                          <span className="inline-flex items-center gap-1 rounded-full border border-[var(--card-border)] bg-[var(--accent-light)]/60 px-2.5 py-0.5 text-[var(--accent)]">
                            {TagIcon && <TagIcon size={12} />}
                            {post.tags[0]}
                          </span>
                        </>
                      )}
                    </div>
                  </Link>
                </motion.article>
              );
            })
          )}
        </motion.div>
      </AnimatePresence>

      {/* 分页胶囊 */}
      {totalPages > 1 && (
        <div className="mt-12 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--card-border)] bg-[var(--card)] p-1.5 shadow-sm backdrop-blur-md">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              aria-label="Previous page"
              className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--muted)] transition-colors hover:text-[var(--foreground)] disabled:opacity-40"
            >
              <FiChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                aria-current={p === currentPage ? "page" : undefined}
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium transition-colors ${
                  p === currentPage
                    ? "bg-[var(--accent)] font-semibold text-white shadow-sm"
                    : "text-[var(--muted)] hover:text-[var(--accent)]"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              aria-label="Next page"
              className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--muted)] transition-colors hover:text-[var(--foreground)] disabled:opacity-40"
            >
              <FiChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
