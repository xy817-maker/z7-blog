import type { Metadata } from "next";

export const metadata: Metadata = {
  openGraph: {
    locale: "zh_CN",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}
