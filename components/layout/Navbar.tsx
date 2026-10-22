"use client";

import { trackEvent } from "@/lib/analytics/client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { siteConfig } from "@/lib/site-config";

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Esc 关闭菜单
  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  return (
    <>
      {/* 菜单遮罩：点击空白处收起（导航胶囊保持在遮罩之上） */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu-scrim"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-40 bg-black/10 backdrop-blur-[2px] md:hidden"
          />
        )}
      </AnimatePresence>

      <header className="fixed top-4 left-1/2 z-50 w-[92%] max-w-6xl -translate-x-1/2">
        {/* 导航胶囊：保持原有透明玻璃样式 */}
        <nav className="nav-pill flex items-center justify-between rounded-full px-4 py-2.5 shadow-sm sm:px-6">
          <Link
            href="/"
            className="flex items-center gap-2.5 transition-transform duration-150 active:scale-95"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--card-border)] bg-[var(--accent-light)]/70">
              <Image
                src={siteConfig.avatar}
                alt={siteConfig.nameEn}
                width={36}
                height={36}
                className="h-full w-full rounded-full object-cover"
                priority
                unoptimized
              />
            </span>
            <span className="font-display text-lg font-bold tracking-tight text-[var(--accent)]">
              {siteConfig.nameEn}
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 md:flex">
            {siteConfig.nav.map((item) => {
              const isActive =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
                    isActive
                      ? "bg-[var(--accent-light)] font-semibold text-[var(--accent)]"
                      : "text-[var(--muted)] hover:bg-[var(--accent-light)]/40 hover:text-[var(--foreground)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <ThemeToggle />
          </div>

          {/* Mobile toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => {
                trackEvent("mobile_menu_toggle", { state: mobileOpen ? "closed" : "open" });
                setMobileOpen(!mobileOpen);
              }}
              className="rounded-full p-2 text-[var(--muted)] transition-colors hover:bg-[var(--accent-light)]/40 hover:text-[var(--foreground)]"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? <FiX size={18} /> : <FiMenu size={18} />}
            </button>
          </div>
        </nav>

        {/* 移动端菜单：导航下方的独立玻璃卡 */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              key="mobile-menu"
              id="mobile-menu"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="menu-glass origin-top mt-2 overflow-hidden rounded-3xl border border-[var(--card-border)] p-2.5 shadow-[0_24px_48px_-12px_rgba(67,56,202,0.18)] md:hidden"
            >
              <div className="space-y-1">
                {siteConfig.nav.map((item) => {
                  const isActive =
                    item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center justify-between rounded-2xl px-4 py-3 text-base transition-colors ${
                        isActive
                          ? "bg-[var(--accent-light)] font-semibold text-[var(--accent)]"
                          : "text-[var(--muted)] active:bg-[var(--accent-light)]/60"
                      }`}
                    >
                      <span>{item.label}</span>
                      {isActive && (
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
