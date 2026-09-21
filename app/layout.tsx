import type { Metadata } from "next";
import type { ReactNode } from "react";
import Navigation from "@/components/Navigation";
import { SiteProviders } from "@/components/SiteProviders";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import "./globals.css";

const title = "Naeun Oh | Product Planner · Product Manager";
const description =
  "복잡한 고객 요구와 운영 문제를 제품 관점으로 구조화하고, 0→1 제품부터 Enterprise B2B까지 실제 출시와 운영으로 연결해온 Product Planner · Product Manager 포트폴리오.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...buildMetadata({ title, description, path: "/" }),
  // Filename itself changes on every favicon swap (not a fixed app/icon.png)
  // so a fresh image reliably busts browser favicon caches.
  icons: {
    icon: [
      { url: "/favicon/favicon-profile-v2-optimized-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-profile-v2-optimized-48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: "/favicon/favicon-profile-v2-optimized-180.png",
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
