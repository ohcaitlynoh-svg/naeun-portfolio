import type { Metadata } from "next";
import HowIWorkView from "./HowIWorkView";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "How I Work | Naeun Oh",
  description:
    "고객 요구와 제약을 구조화하고, 우선순위와 범위를 결정해 실제 제품과 운영 결과로 연결하는 업무 방식을 소개합니다.",
  path: "/how-i-work",
});

export default function Page() {
  return <HowIWorkView />;
}
