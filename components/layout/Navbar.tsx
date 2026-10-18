"use client";

import { trackEvent } from "@/lib/analytics/client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { siteConfig } from "@/lib/site-config";

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-4 left-1/2 z-50 w-[92%] max-w-6xl -translate-x-1/2 rounded-full nav-pill shadow-sm">
      <nav className="flex items-center justify-between px-4 sm:px-6 py-2.5">
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

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden md:hidden"
          >
            <div className="space-y-1 px-4 pb-3 pt-1">
              {siteConfig.nav.map((item) => {
                const isActive =
                  item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block rounded-full px-4 py-2 text-sm transition-colors ${
                      isActive
                        ? "bg-[var(--accent-light)] font-semibold text-[var(--accent)]"
                        : "text-[var(--muted)] hover:bg-[var(--accent-light)]/40 hover:text-[var(--foreground)]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
