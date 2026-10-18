import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { QuoteBanner } from "@/components/common/QuoteBanner";
import { ResumeContent } from "./ResumeContent";

export const metadata: Metadata = {
  title: "在线简历",
  description: `${siteConfig.name}的在线简历`,
  openGraph: {
    locale: "zh_CN",
  },
};

export default function ResumePage() {
  return (
    <>
      <ResumeContent />
      <QuoteBanner text="Grow through what you go through." />
    </>
  );
}
