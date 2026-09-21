import type { Metadata } from "next";
import AboutView from "./AboutView";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About | Naeun Oh",
  description:
    "12년간 Product Planning과 PM으로 쌓아온 경력, 리더십, 제품 도메인, 글로벌 프로젝트 경험을 소개합니다.",
  path: "/about",
});

export default function Page() {
  return <AboutView />;
}
