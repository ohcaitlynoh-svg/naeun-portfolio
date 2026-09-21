import type { Metadata } from "next";
import HomeView from "./HomeView";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Naeun Oh | Product Planner · Product Manager",
  description:
    "복잡한 고객 요구와 운영 문제를 제품 관점으로 구조화하고, 0→1 제품부터 Enterprise B2B까지 실제 출시와 운영으로 연결해온 포트폴리오.",
  path: "/",
});

export default function Page() {
  return <HomeView />;
}
