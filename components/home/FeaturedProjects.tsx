"use client";

import { clickAttributes, viewAttributes } from "@/lib/analytics/events";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site-config";

function getCategoryLabel(key: string) {
  return siteConfig.projectCategories.find((c) => c.key === key)?.label ?? key;
}

export function FeaturedProjects() {
  if (siteConfig.projects.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-12"
    >
      <div className="mb-8 flex flex-col justify-between gap-4 border-b border-[var(--card-border)]/20 pb-4 md:flex-row md:items-end">
        <div>
          <span className="font-caps text-xs uppercase tracking-widest text-[var(--accent)]">
            Featured Creations
          </span>
          <h2 className="font-display mt-1 text-2xl font-bold text-[var(--foreground)]">
            Refined Explorations &amp; Logic
          </h2>
        </div>
        <p className="max-w-md text-sm text-[var(--muted)]">
          Synthesizing high-performance interfaces with creative engineering, generative
          graphics, and minimalist systems.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {siteConfig.projects.map((project, index) => (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            {...viewAttributes("project_impression", {
              project_id: project.id,
              category: project.category,
            })}
            className={`glass-card group flex flex-col justify-between rounded-3xl p-7 ${
              index === 0 ? "md:col-span-2" : ""
            }`}
          >
            <div className="flex items-start justify-between">
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--card-border)] bg-[var(--accent-light)]/60 px-3 py-1 text-xs font-medium text-[var(--accent)]">
                {getCategoryLabel(project.category)}
                {project.tags.length > 0 && ` · ${project.tags.join(" · ")}`}
              </span>
            </div>

            <div className="my-8">
              <h3 className="font-display mb-2 text-xl font-semibold text-[var(--foreground)]">
                {project.name}
              </h3>
              <p className="max-w-lg text-[var(--muted)]">{project.description}</p>
            </div>

            <div className="flex items-center gap-4 pt-2">
              {project.link && (
                <a
                  href={project.link}
                  {...clickAttributes("project_click", {
                    project_id: project.id,
                    category: project.category,
                    destination: "demo",
                    placement: "home_projects",
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent)] hover:underline"
                >
                  View Live Prototype
                  <span aria-hidden="true">→</span>
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  {...clickAttributes("project_click", {
                    project_id: project.id,
                    category: project.category,
                    destination: "github",
                    placement: "home_projects",
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
                >
                  GitHub
                </a>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}
