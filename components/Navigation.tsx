"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage, useTheme } from "@/components/SiteProviders";
import { HomeIcon } from "@/components/icons/HomeIcons";
import styles from "./Navigation.module.css";

const navItems = [
  { href: "/projects", label: "Core Projects" },
  { href: "/how-i-work", label: "How I Work" },
  { href: "/about", label: "About" },
  { href: "/ai-labs", label: "AI Labs" },
];

export default function Navigation() {
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand} aria-label="Go to home">
          <HomeIcon className={styles.brandIcon} />
          <span className={styles.brandName}>오나은 Naeun Oh</span>
        </Link>

        <ul className={styles.links}>
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={isActive ? styles.current : undefined}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className={styles.controls}>
          <div className={styles.segmented} role="group" aria-label="Language">
            <button
              type="button"
              className={language === "ko" ? styles.segmentCurrent : styles.segment}
              onClick={() => setLanguage("ko")}
              aria-pressed={language === "ko"}
            >
              KR
            </button>
            <button
              type="button"
              className={language === "en" ? styles.segmentCurrent : styles.segment}
              onClick={() => setLanguage("en")}
              aria-pressed={language === "en"}
            >
              EN
            </button>
          </div>

          <div className={styles.segmented} role="group" aria-label="Theme">
            <button
              type="button"
              className={theme === "light" ? styles.segmentCurrent : styles.segment}
              onClick={() => setTheme("light")}
              aria-pressed={theme === "light"}
              aria-label="Light mode"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <circle cx="12" cy="12" r="4.5" />
                <path d="M12 2.5v2.5M12 19v2.5M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2.5 12H5M19 12h2.5M4.2 19.8L6 18M18 6l1.8-1.8" />
              </svg>
            </button>
            <button
              type="button"
              className={theme === "dark" ? styles.segmentCurrent : styles.segment}
              onClick={() => setTheme("dark")}
              aria-pressed={theme === "dark"}
              aria-label="Dark mode"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
