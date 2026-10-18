import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { QuoteBanner } from "@/components/common/QuoteBanner";
import { AboutContent } from "./AboutContent";

export const metadata: Metadata = {
  title: "About",
  description: `More about ${siteConfig.nameEn}`,
};

export default function AboutPage() {
  return (
    <>
      <AboutContent />
      <QuoteBanner text="Work in silence, let success make the noise." />
    </>
  );
}
