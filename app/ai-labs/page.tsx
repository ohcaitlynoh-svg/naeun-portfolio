import type { Metadata } from "next";
import AiLabsView from "./AiLabsView";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "AI Labs | Naeun Oh",
  description:
    "AI 코딩, 경력 번역, 콘텐츠 제작 등 다양한 AI 도구를 실제 제품과 운영 workflow에 적용한 실험을 소개합니다.",
  path: "/ai-labs",
});

export default function Page() {
  return <AiLabsView />;
}
