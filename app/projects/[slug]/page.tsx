import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import ProjectDetailView from "./ProjectDetailView";
import { buildMetadata, type OgImage } from "@/lib/seo";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

const PROJECT_SEO: Record<string, { title: string; description: string; image: OgImage }> = {
  exem: {
    title: "EXEM ONE | Enterprise Observability Case Study",
    description:
      "대규모 Enterprise Observability 제품을 기획하고 구현 프로세스를 주도해 6개월 MVP, 4개 프로그램 GS 인증, 주요 프로젝트 약 40억 원 매출 성과로 연결한 사례.",
    image: {
      url: "/exem/exem-network-performance-dashboard.png",
      width: 1672,
      height: 941,
      alt: "EXEM unified Enterprise Observability monitoring dashboard",
    },
  },
  "flor-momento": {
    title: "Flor Momento | 0→1 Operations Automation Case Study",
    description:
      "1인 사업자의 6단계 수작업 운영과 반복 일정을 플랫폼으로 자동화하고 B2B까지 확장한 0→1 제품 사례.",
    image: {
      url: "/flor/flor-final-product-home.png",
      width: 874,
      height: 882,
      alt: "Flor Momento subscription product home screen",
    },
  },
  readykorea: {
    title: "ReadyKorea | Global Trade System Localization Case Study",
    description:
      "양국 정부기관과 국가 단위 통관·관세 업무를 분석하고 현지 정책·프로세스로 재설계한 2.5년 글로벌 PM 프로젝트.",
    image: {
      url: "/readykorea/readykorea-worldbank-npts-cover.png",
      width: 991,
      height: 464,
      alt: "World Bank / Belarus NPTS Technical Assistance final presentation title slide",
    },
  },
};

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const seo = PROJECT_SEO[params.slug];
  const path = `/projects/${params.slug}`;
  if (!seo) {
    const project = projects.find((p) => p.slug === params.slug);
    return buildMetadata({
      title: project ? `${project.name} | Naeun Oh` : "Project | Naeun Oh",
      description: project?.oneLiner.replace(/\n/g, " ") ?? "",
      path,
    });
  }
  return buildMetadata({
    title: seo.title,
    description: seo.description,
    path,
    image: seo.image,
  });
}

export default function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  return <ProjectDetailView slug={params.slug} />;
}
