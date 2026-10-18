import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedPosts } from "@/components/home/FeaturedPosts";
import { QuoteBanner } from "@/components/common/QuoteBanner";
import { getAllPosts } from "@/lib/mdx";

export default function HomePage() {
  return (
    <div className="relative z-10 mx-auto w-full max-w-6xl px-4">
      <HeroSection postCount={getAllPosts().length} />
      <FeaturedPosts />
      <QuoteBanner text="Focus on the journey, not the destination." />
    </div>
  );
}
