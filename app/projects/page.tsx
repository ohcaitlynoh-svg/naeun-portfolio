import type { Metadata } from "next";
import ProjectsView from "./ProjectsView";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Projects | Naeun Oh",
  description:
    "Enterprise Observability, 0→1 플랫폼, 글로벌 전자무역 등 주요 Product Planning · PM 프로젝트를 소개합니다.",
  path: "/projects",
});

export default function Page() {
  return <ProjectsView />;
}
