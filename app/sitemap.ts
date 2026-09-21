import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["/", "/about", "/how-i-work", "/projects", "/ai-labs"];
  const projectPaths = projects.map((project) => `/projects/${project.slug}`);

  return [...staticPaths, ...projectPaths].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));
}
