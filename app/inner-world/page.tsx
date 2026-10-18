import type { Metadata } from "next";
import { QuoteBanner } from "@/components/common/QuoteBanner";
import { InnerWorldContent } from "@/components/inner-world/InnerWorldContent";
import { readingStages } from "@/lib/reading";

export const metadata: Metadata = {
  title: "Inner World",
  description: "阅读记录与书架展示示例。",
  openGraph: {
    locale: "zh_CN",
  },
};

export default function InnerWorldPage() {
  return (
    <div className="inner-world">
      <InnerWorldContent stages={readingStages} />
      <QuoteBanner text="Master your inner world, and you master your life." />
    </div>
  );
}
