import Link from "next/link";
import { clickAttributes } from "@/lib/analytics/events";
import { FiMail, FiExternalLink } from "react-icons/fi";
import { BiLogoTiktok } from "react-icons/bi";
import { SiGithub } from "react-icons/si";
import { siteConfig } from "@/lib/site-config";

const contactIconMap = {
  github: SiGithub,
  email: FiMail,
  aweme: BiLogoTiktok,
  external: FiExternalLink,
} as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 px-4 pb-12 pt-6">
      {/* 玻璃页脚主体 */}
      <div className="glass-card mx-auto max-w-6xl rounded-3xl p-8 sm:p-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          {/* 身份 */}
          <div className="flex flex-col justify-between space-y-4 lg:col-span-4">
            <div>
              <div className="mb-3 flex items-center gap-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                <span className="font-display text-xl font-bold tracking-tight text-[var(--foreground)]">
                  {siteConfig.nameEn}
                </span>
              </div>
              <p className="mb-4 max-w-sm text-sm leading-relaxed text-[var(--muted)]">
                {siteConfig.footerBio}
              </p>
            </div>
            <div className="inline-flex items-center gap-2 text-xs text-[var(--muted)]/70">
              <span className="font-mono">&lt;/&gt;</span>
              <span>Crafted with Next.js, Tailwind &amp; Canvas</span>
            </div>
          </div>

          {/* 导航 */}
          <div className="flex flex-col space-y-3 lg:col-span-2">
            <h4 className="font-caps mb-1 text-xs font-semibold uppercase tracking-widest text-[var(--foreground)]">
              Navigate
            </h4>
            <nav className="flex flex-col space-y-2 text-sm text-[var(--muted)]">
              {siteConfig.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex items-center gap-1.5 py-0.5 transition-colors hover:text-[var(--accent)]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* 友链 */}
          <div className="flex flex-col space-y-3 lg:col-span-3">
            <h4 className="font-caps mb-1 text-xs font-semibold uppercase tracking-widest text-[var(--foreground)]">
              Friends
            </h4>
            <div className="flex flex-col space-y-2.5 text-sm">
              {siteConfig.footer.friendLinks.map((link, i) => {
                const host = (() => {
                  try {
                    return new URL(link.href).hostname;
                  } catch {
                    return link.href;
                  }
                })();
                return (
                  <a
                    key={`${link.label}-${i}`}
                    href={link.href}
                    {...clickAttributes("friend_link_click", {
                      target_id: host,
                      target_host: host,
                      placement: "footer",
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
                  >
                    <FiExternalLink size={12} />
                    {link.label}
                  </a>
                );
              })}
            </div>
          </div>

          {/* 联系 */}
          <div className="flex flex-col space-y-3 lg:col-span-3">
            <h4 className="font-caps mb-1 text-xs font-semibold uppercase tracking-widest text-[var(--foreground)]">
              Contact
            </h4>
            <div className="flex flex-col space-y-2 text-sm text-[var(--muted)]">
              {siteConfig.footer.contactLinks.map((link) => {
                const Icon = contactIconMap[link.type];
                const isExternal = !link.href.startsWith("mailto:");
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    {...clickAttributes("contact_click", {
                      channel: link.type,
                      placement: "footer",
                    })}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="group flex items-center gap-2.5 py-1 transition-colors hover:text-[var(--accent)]"
                  >
                    <Icon size={16} className="w-5 text-center" />
                    <span className="truncate">{link.label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* 底部状态栏 */}
        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-[var(--card-border)] pt-6 text-xs text-[var(--muted)]/75 sm:flex-row">
          <p>
            &copy; {year} {siteConfig.nameEn}. All rights reserved. Built with precision and care.
          </p>
          <div className="flex items-center gap-2 rounded-full border border-[var(--card-border)] bg-[var(--accent-light)]/50 px-3 py-1 text-[11px]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--accent)]/70" />
            <span>All systems nominal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
