"use client";

import { clickAttributes } from "@/lib/analytics/events";
import { motion } from "framer-motion";
import { FiMail, FiFileText, FiCode } from "react-icons/fi";
import {
  SiGit,
  SiGithub,
  SiJavascript,
  SiNodedotjs,
  SiReact,
  SiVuedotjs,
} from "react-icons/si";
import { siteConfig } from "@/lib/site-config";

const socials = [
  {
    icon: SiGithub,
    href: `https://github.com/${siteConfig.github}`,
    label: "GitHub",
  },
  ...(siteConfig.email
    ? [{ icon: FiMail, href: `mailto:${siteConfig.email}`, label: "Email" }]
    : []),
  { icon: FiFileText, href: "/resume", label: "Resume" },
];

const techIcons = [
  { icon: SiGit, title: "Git" },
  { icon: SiJavascript, title: "JavaScript" },
  { icon: FiCode, title: "Code" },
  { icon: SiGithub, title: "GitHub" },
  { icon: SiNodedotjs, title: "Node.js" },
  { icon: SiReact, title: "React" },
  { icon: SiVuedotjs, title: "Vue.js" },
];

const headingChars = `Hi, I'm ${siteConfig.name}`.split("");

export function HeroSection({ postCount }: { postCount: number }) {
  return (
    <section className="flex min-h-[calc(100dvh-6rem)] flex-col px-4 pt-12 pb-4 sm:pt-16">
      <div className="flex flex-1 items-center">
        <div className="grid w-full max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* 左：自我介绍 */}
          <div className="flex flex-col items-start gap-4 text-left lg:col-span-6">
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="font-caps text-xs font-semibold uppercase tracking-[0.26em] text-[var(--muted)]"
            >
              {siteConfig.heroEyebrow}
            </motion.p>

            <h1 className="select-none font-display text-5xl font-extrabold leading-[1.08] tracking-tight text-[var(--foreground)] sm:text-6xl md:text-[4.25rem]">
              {headingChars.map((char, i) =>
                char === " " ? (
                  <span key={i}>{" "}</span>
                ) : (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 50, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.3 + i * 0.07,
                      type: "spring",
                      stiffness: 150,
                    }}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                )
              )}
            </h1>

            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              {siteConfig.heroRoles.map((role, i) => (
                <motion.span
                  key={role}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 + i * 0.12, duration: 0.4 }}
                  className="pill-badge rounded-full px-4 py-1.5 text-sm font-medium"
                >
                  {role}
                </motion.span>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.5 }}
              className="flex items-center gap-3 pt-4"
            >
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  {...(social.href.startsWith("http")
                    ? clickAttributes("contact_click", {
                        channel: social.label.toLowerCase(),
                        placement: "hero",
                      })
                    : {})}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={social.label}
                  className="glass-subcard flex h-11 w-11 items-center justify-center rounded-xl text-[var(--muted)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)]/40 hover:text-[var(--accent)] active:scale-95"
                >
                  <social.icon size={19} />
                </a>
              ))}
            </motion.div>
          </div>

          {/* 右：玻璃数据卡 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center lg:col-span-6 lg:justify-end"
          >
            <div className="glass-panel flex w-full max-w-[460px] flex-col gap-4 rounded-3xl p-6 sm:p-7">
              <div className="grid grid-cols-12 items-stretch gap-3">
                <a
                  href={`https://github.com/${siteConfig.github}`}
                  {...clickAttributes("contact_click", { channel: "github", placement: "hero" })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-subcard group col-span-8 flex items-center gap-3.5 rounded-2xl p-4 transition-all duration-200 hover:border-[var(--accent)]/30"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl text-[var(--foreground)] transition-colors group-hover:text-[var(--accent)]">
                    <SiGithub size={26} />
                  </span>
                  <span className="flex min-w-0 flex-col">
                    <span className="truncate text-base font-bold leading-tight tracking-tight text-[var(--foreground)] transition-colors group-hover:text-[var(--accent)] sm:text-lg">
                      {siteConfig.github}
                    </span>
                    <span className="mt-0.5 text-xs font-medium text-[var(--muted)]">GitHub</span>
                  </span>
                </a>

                <div className="glass-subcard col-span-4 flex items-center justify-center gap-3 rounded-2xl p-4 text-left">
                  <FiFileText size={24} className="text-[var(--accent)]/80" />
                  <span className="flex flex-col">
                    <span className="text-xl font-bold leading-none text-[var(--foreground)] sm:text-2xl">
                      {postCount}
                    </span>
                    <span className="mt-0.5 text-xs font-medium text-[var(--muted)]">Posts</span>
                  </span>
                </div>
              </div>

              {/* 技术栈图标排 */}
              <div className="glass-subcard flex items-center justify-between rounded-2xl px-5 py-3 text-[var(--muted)]/80">
                {techIcons.map((tech) => (
                  <span
                    key={tech.title}
                    title={tech.title}
                    className="cursor-pointer transition-colors hover:text-[var(--accent)]"
                  >
                    <tech.icon size={18} />
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll 指示器（贴住首屏底部） */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 0.8 }}
        className="flex select-none flex-col items-center gap-2 pt-8"
      >
        <span className="font-caps text-[0.68rem] tracking-[0.25em] text-[var(--muted)]/70">
          SCROLL
        </span>
        <div className="flex h-8 w-5 justify-center rounded-full border border-[var(--muted)]/40 bg-[var(--card)]/50 p-1 backdrop-blur-xs">
          <div className="animate-scroll-wheel h-2 w-1 rounded-full bg-[var(--accent)]/70" />
        </div>
      </motion.div>
    </section>
  );
}
