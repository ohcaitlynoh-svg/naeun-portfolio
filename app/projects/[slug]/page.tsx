import { projects } from "@/lib/projects";
import ProjectDetailView from "./ProjectDetailView";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  return <ProjectDetailView slug={params.slug} />;
}
