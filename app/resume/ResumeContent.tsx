"use client";

import { trackEvent } from "@/lib/analytics/client";
import { clickAttributes } from "@/lib/analytics/events";
import { Fragment, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUser,
  FiBook,
  FiTool,
  FiBriefcase,
  FiFolder,
  FiMail,
  FiGithub,
  FiGlobe,
  FiExternalLink,
} from "react-icons/fi";

import { resumeVersions } from "@/content/profile/resume";
import { siteConfig } from "@/lib/site-config";

export function ResumeContent() {
  const visibleVersions = resumeVersions.filter((v) => !v.hidden);
  const [activeVersion, setActiveVersion] = useState(visibleVersions[0].key);
  const version = visibleVersions.find((v) => v.key === activeVersion)!;
  const v = version.sections;
  const h = version.header;

  return (
    <div className="mx-auto max-w-6xl px-4 pt-10 pb-12 sm:px-6">
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
        {/* 左侧：版本历史 + 求职意向 */}
        <aside className="space-y-6 lg:sticky lg:top-28 lg:col-span-3">
          <div className="glass-card rounded-2xl p-5">
            <div className="mb-4 flex items-center justify-between border-b border-[var(--card-border)] pb-3">
              <h2 className="font-caps text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                版本历史
              </h2>
            </div>

            {/* 纵向时间线 */}
            <div className="relative space-y-7 pl-5 before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-[1.5px] before:bg-[var(--card-border)]">
              {visibleVersions.map((ver) => {
                const isActive = ver.key === activeVersion;
                return (
                  <button
                    key={ver.key}
                    onClick={() => {
                      if (ver.key === activeVersion) return;
                      trackEvent("resume_version_change", {
                        from_version: activeVersion,
                        to_version: ver.key,
                      });
                      setActiveVersion(ver.key);
                    }}
                    className="group relative w-full cursor-pointer text-left"
                  >
                    <span
                      className={`absolute -left-5 top-1 h-3.5 w-3.5 rounded-full transition-all ${
                        isActive
                          ? "bg-[var(--accent)] ring-4 ring-[var(--accent-light)]"
                          : "border-2 border-[var(--card-border)] bg-[var(--background)] group-hover:border-[var(--accent)]"
                      }`}
                    />
                    <span className="flex flex-col">
                      <span
                        className={`text-sm transition-colors ${
                          isActive
                            ? "font-semibold text-[var(--accent)]"
                            : "font-medium text-[var(--muted)] group-hover:text-[var(--foreground)]"
                        }`}
                      >
                        {ver.label}
                      </span>
                      <span className="mt-0.5 font-mono text-xs text-[var(--muted)]">
                        {ver.date}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 求职意向 */}
          {version.intent && (
            <div className="glass-card rounded-2xl p-4 text-[11px] leading-relaxed text-[var(--muted)]">
              <div className="mb-1.5 flex items-center gap-2 font-semibold text-[var(--foreground)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                求职意向：{version.intent.role}
              </div>
              {version.intent.note}
            </div>
          )}
        </aside>

        {/* 右侧：简历主体 */}
        <section className="min-w-0 lg:col-span-9">
          <AnimatePresence mode="wait">
            <motion.article
              key={activeVersion}
              data-analytics-resume-version={activeVersion}
              data-analytics-links="resume_body"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="glass-card rounded-3xl border p-6 shadow-sm sm:p-10 lg:p-12"
            >
              {/* 头部：头像 + 姓名 + 联系方式 + 简介 */}
              <div className="mb-7 border-b border-[var(--accent)]/20 pb-6">
                <div className="mb-4 flex items-center gap-5">
                  <Image
                    src={siteConfig.avatar}
                    alt={h.name}
                    width={80}
                    height={80}
                    className="h-16 w-16 rounded-full object-cover ring-2 ring-[var(--accent)]/20 sm:h-20 sm:w-20"
                    priority
                    unoptimized
                  />
                  <h1 className="text-3xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-4xl">
                    {h.name}
                  </h1>
                </div>
                <div className="mb-4 flex flex-wrap items-center gap-y-2.5 gap-x-6 text-sm text-[var(--muted)]">
                  {h.email && (
                    <a
                      href={`mailto:${h.email}`}
                      {...clickAttributes("contact_click", {
                        channel: "email",
                        placement: "resume_header",
                        resume_version: activeVersion,
                      })}
                      className="inline-flex items-center gap-1.5 transition-colors hover:text-[var(--accent)]"
                    >
                      <FiMail size={14} className="text-[var(--muted)]" />
                      {h.email}
                    </a>
                  )}
                  <a
                    href={`https://github.com/${h.github}`}
                    {...clickAttributes("contact_click", {
                      channel: "github",
                      placement: "resume_header",
                      resume_version: activeVersion,
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 transition-colors hover:text-[var(--accent)]"
                  >
                    <FiGithub size={14} className="text-[var(--muted)]" />
                    {h.github}
                  </a>
                  {h.blog && (
                    <a
                      href={`https://${h.blog}`}
                      {...clickAttributes("contact_click", {
                        channel: "blog",
                        placement: "resume_header",
                        resume_version: activeVersion,
                      })}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 transition-colors hover:text-[var(--accent)]"
                    >
                      <FiGlobe size={14} className="text-[var(--muted)]" />
                      {h.blog}
                    </a>
                  )}
                </div>
                <p className="max-w-4xl text-sm leading-relaxed text-[var(--muted)] sm:text-[15px]">
                  {formatResumeText(v.summary)}
                </p>
              </div>

              {/* 教育背景 */}
              <ResumeSection icon={FiBook} title="教育背景">
                {v.education.map((edu) => (
                  <div key={edu.school} className="mb-3 last:mb-0">
                    <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-base font-bold text-[var(--foreground)]">
                          {edu.school}
                        </span>
                        {edu.degree && (
                          <span className="rounded border border-[var(--card-border)] bg-[var(--accent-light)] px-2 py-0.5 text-xs font-medium text-[var(--accent)]">
                            {edu.degree}
                          </span>
                        )}
                        {edu.gpa && <span className="text-[var(--muted)]">{edu.gpa}</span>}
                      </div>
                      <span className="font-mono text-xs text-[var(--muted)] sm:text-sm">
                        {edu.period}
                      </span>
                    </div>
                    {edu.details.length > 0 && (
                      <ul className="mt-2 space-y-1 pl-1 text-sm text-[var(--muted)]">
                        {edu.details.map((d, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                            <span>{formatResumeText(d)}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </ResumeSection>

              {/* 专业技能 */}
              <ResumeSection icon={FiTool} title="专业技能">
                <ul className="space-y-2.5 text-sm leading-relaxed text-[var(--muted)] sm:text-[14.5px]">
                  {v.skills.map((skill, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                      <span>{formatResumeText(skill)}</span>
                    </li>
                  ))}
                </ul>
              </ResumeSection>

              {/* 实习经历 */}
              {v.experience.length > 0 && (
                <ResumeSection icon={FiBriefcase} title="实习经历">
                  {v.experience.map((exp) => (
                    <div key={exp.title} className="mb-4 last:mb-0">
                      <div className="flex flex-wrap items-start justify-between gap-1">
                        <div className="flex items-center gap-1.5">
                          {exp.companyIcon && (
                            <exp.companyIcon size={15} className="text-[var(--accent)]" />
                          )}
                          <span className="font-medium">{exp.company}</span>
                          <span className="mx-1 text-[var(--muted)]">{exp.title}</span>
                        </div>
                        <span className="text-sm text-[var(--muted)]">{exp.period}</span>
                      </div>
                      {exp.summary && (
                        <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">
                          {formatResumeText(exp.summary)}
                        </p>
                      )}
                      <ul className="mt-2 space-y-1 text-sm text-[var(--muted)]">
                        {exp.points.map((p, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                            <span>{formatResumeText(p)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </ResumeSection>
              )}

              {/* 项目经历 */}
              {v.projects.length > 0 && (
                <ResumeSection icon={FiFolder} title="项目经历">
                  {v.projects.map((proj) => (
                    <div key={proj.name} className="mb-4 last:mb-0">
                      <div className="flex flex-col justify-between gap-2 lg:flex-row lg:items-baseline">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <h4 className="text-base font-bold tracking-tight text-[var(--foreground)]">
                            {proj.name}
                          </h4>
                          <span className="rounded-md border border-[var(--card-border)] bg-[var(--accent-light)]/60 px-2 py-0.5 text-xs text-[var(--accent)]">
                            {proj.tech}
                          </span>
                        </div>
                      </div>

                      {(proj.github || proj.period) && (
                        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[var(--muted)] sm:text-sm">
                          {proj.github && (
                            <div className="flex items-center gap-1.5">
                              <span className="font-medium text-[var(--muted)]">GitHub:</span>
                              <a
                                href={proj.github}
                                {...clickAttributes("project_click", {
                                  project_id: proj.name,
                                  destination: "github",
                                  placement: "resume",
                                })}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-0.5 text-[var(--accent)] hover:underline"
                              >
                                {proj.github}
                                <FiExternalLink size={13} className="opacity-70" />
                              </a>
                            </div>
                          )}
                          {proj.period && (
                            <>
                              <span className="text-[var(--card-border)]">|</span>
                              <span className="text-[var(--muted)]">{proj.period}</span>
                            </>
                          )}
                        </div>
                      )}

                      {proj.summary && (
                        <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                          {formatResumeText(proj.summary)}
                        </p>
                      )}
                      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[var(--muted)] sm:text-[14.5px]">
                        {proj.points.map((p, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                            <span>{formatResumeText(p)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </ResumeSection>
              )}

              {/* 开源贡献 */}
              {v.openSource && v.openSource.length > 0 && (
                <ResumeSection icon={FiGithub} title="开源贡献">
                  {v.openSource.map((project) => (
                    <div key={project.name} className="mb-4 last:mb-0">
                      <div className="flex flex-wrap items-baseline gap-2">
                        <h4 className="font-medium">{project.name}</h4>
                        <span className="text-xs text-[var(--accent)]">{project.tech}</span>
                      </div>
                      <ul className="mt-2 space-y-1 text-sm text-[var(--muted)]">
                        {project.points.map((point, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                            <span>{formatResumeText(point)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </ResumeSection>
              )}

              {/* 个人评价 */}
              {v.personalEvaluation && v.personalEvaluation.length > 0 && (
                <ResumeSection icon={FiUser} title="个人评价">
                  <ul className="space-y-1.5 text-sm">
                    {v.personalEvaluation.map((line, i) => (
                      <li key={i} className="flex items-start gap-2 text-[var(--muted)]">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                        <span>{formatResumeText(line)}</span>
                      </li>
                    ))}
                  </ul>
                </ResumeSection>
              )}
            </motion.article>
          </AnimatePresence>
        </section>
      </div>
    </div>
  );
}

function formatResumeText(content: string) {
  return (
    <>
      {content.split(/(\*\*.+?\*\*)/).map((part, index) => {
        const isEmphasized = part.startsWith("**") && part.endsWith("**");
        const text = isEmphasized ? part.slice(2, -2) : part;

        return (
          <Fragment key={index}>
            {isEmphasized ? (
              <strong className="font-semibold text-[var(--foreground)]">
                {formatResumeLinks(text)}
              </strong>
            ) : (
              formatResumeLinks(text)
            )}
          </Fragment>
        );
      })}
    </>
  );
}

function formatResumeLinks(content: string) {
  return content.split(/(https?:\/\/[^\s|，。；、！？）】》]+)/g).map((part, index) => {
    if (!part.startsWith("http://") && !part.startsWith("https://")) {
      return part;
    }

    return (
      <a
        key={`${part}-${index}`}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        className="break-all text-[var(--accent)] underline decoration-[var(--accent)]/40 underline-offset-2 transition-colors hover:decoration-[var(--accent)]"
      >
        {part}
      </a>
    );
  });
}

function ResumeSection({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10 last:mb-0">
      <h3 className="mb-4 flex items-center gap-2 border-b border-[var(--card-border)]/60 pb-2 text-lg font-bold tracking-tight text-[var(--foreground)]">
        <Icon size={18} className="text-[var(--accent)]" />
        {title}
      </h3>
      {children}
    </section>
  );
}
