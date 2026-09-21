import type { Metadata } from "next";
import type { ReactNode } from "react";
import Navigation from "@/components/Navigation";
import { SiteProviders } from "@/components/SiteProviders";
import "./globals.css";

export const metadata: Metadata = {
  title: "오나은 · Naeun Oh — Senior Product Manager",
  description:
    "Senior Product Manager portfolio — the problems tackled, the decision criteria used, and how complex B2B/Enterprise products get shaped.",
  // Filename itself changes on every favicon swap (not a fixed app/icon.png)
  // so a fresh image reliably busts browser favicon caches.
  icons: {
    icon: "/favicon/favicon-profile-v2.png",
  },
};

// Runs before hydration so the stored/system theme and language apply
// immediately, with no flash and no client/server render mismatch.
const bootScript = `
(function () {
  try {
    var theme = localStorage.getItem("site-theme");
    if (theme !== "light" && theme !== "dark") {
      theme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    document.documentElement.setAttribute("data-theme", theme);

    var lang = localStorage.getItem("site-language");
    if (lang !== "ko" && lang !== "en") {
      lang = "ko";
    }
    document.documentElement.setAttribute("lang", lang);
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <SiteProviders>
          <Navigation />
          <main>{children}</main>
        </SiteProviders>
      </body>
    </html>
  );
}
