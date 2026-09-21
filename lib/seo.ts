import type { Metadata } from "next";

export const SITE_URL = "https://naeun-portfolio.vercel.app";
export const SITE_NAME = "Naeun Oh Portfolio";

export type OgImage = {
  url: string;
  width: number;
  height: number;
  alt: string;
};

// EXEM's dashboard is the closest existing asset to a 1.91:1 OG ratio and
// the most representative Core Project visual, so it's the sitewide
// fallback for any page without its own case-study image.
export const DEFAULT_OG_IMAGE: OgImage = {
  url: "/exem/exem-network-performance-dashboard.png",
  width: 1672,
  height: 941,
  alt: "EXEM unified Enterprise Observability monitoring dashboard",
};

export function buildMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
}: {
  title: string;
  description: string;
  path: string;
  image?: OgImage;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "ko_KR",
      siteName: SITE_NAME,
      title,
      description,
      url: path,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
  };
}
