import Link from "next/link";
import { Suspense } from "react";

import { PostListSkeleton } from "@/components/content-skeleton";
import { HeroSection } from "@/components/hero-section";
import { PostList } from "@/components/post-list";
import { ArrowUpRight } from "@/components/site-icon";

export default function Home() {
  return (
    <>
      <HeroSection />
      <section
        id="writing"
        className="writing-section container"
        aria-labelledby="writing-title"
      >
        <div className="section-heading">
          <h2 id="writing-title">Latest posts</h2>
          <Link prefetch={true} className="text-link" href="/blog">
            All posts <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <Suspense fallback={<PostListSkeleton />}>
          <PostList pageSize={6} featured />
        </Suspense>
        <div className="archive-link">
          <Link prefetch={true} className="text-link" href="/blog">
            All posts <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
