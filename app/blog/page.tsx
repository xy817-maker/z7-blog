import type { Metadata } from "next";
import { getAllPosts, getAllTags } from "@/lib/mdx";
import { BlogList } from "./BlogList";
import { QuoteBanner } from "@/components/common/QuoteBanner";

export const metadata: Metadata = {
  title: "Blog",
  description: "Technical articles and notes",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <div className="mx-auto max-w-4xl px-5 pt-8 sm:px-8 sm:pt-10">
      <BlogList posts={posts} tags={tags} />
      <div className="mt-12">
        <QuoteBanner text="Chase progress, not perfection." />
      </div>
    </div>
  );
}
