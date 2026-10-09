import Link from "next/link";
import { notFound } from "next/navigation";
import { cache, Suspense } from "react";

import { ArchiveTitle, TopicLink } from "@/components/archive-location";
import { PostListSkeleton, TextSkeleton } from "@/components/content-skeleton";
import { PostList } from "@/components/post-list";
import { ArrowLeft, ArrowRight } from "@/components/site-icon";
import { getCategories } from "@/lib/blog-categories";
import { getPaginationTotals, PAGE_SIZE } from "@/lib/blog-pagination";

type ArchiveParams = Promise<{ page: string; category?: string }>;

// Reuse validation and totals across the independent count and results regions.
const resolveArchive = cache(async (params: ArchiveParams) => {
  const { category, page } = await params;
  const pageNum = Number(page);
  if (!Number.isInteger(pageNum) || pageNum < 1) notFound();
  const [categories, totals] = await Promise.all([
    getCategories(),
    getPaginationTotals(category),
  ]);
  if (
    (category && !categories.includes(category)) ||
    pageNum > Math.max(totals.totalPages, 1)
  )
    notFound();
  return { category, page: pageNum, ...totals };
});

async function PostCount({ params }: { params: ArchiveParams }) {
  const { totalPosts } = await resolveArchive(params);
  return (
    <p>
      {totalPosts} {totalPosts === 1 ? "post" : "posts"}
    </p>
  );
}

async function Topics() {
  const categories = await getCategories();
  return (
    <>
      {categories.sort().map((category) => (
        <TopicLink key={category} category={category}>
          {category}
        </TopicLink>
      ))}
    </>
  );
}

async function ArchiveResults({ params }: { params: ArchiveParams }) {
  const { category, page, totalPosts, totalPages } =
    await resolveArchive(params);
  const pageLink = (n: number) =>
    category
      ? `/blog/categories/${encodeURIComponent(category)}/${n}`
      : `/blog/pages/${n}`;
  return (
    <>
      <h2 className="sr-only">
        {category ? `${category} posts` : "All posts"}
      </h2>
      <PostList category={category} pageSize={PAGE_SIZE} page={page} />
      <nav className="pagination" aria-label="Article pages">
        {page > 1 ? (
          <Link prefetch={true} className="text-link" href={pageLink(page - 1)}>
            <ArrowLeft size={18} aria-hidden="true" /> Newer posts
          </Link>
        ) : (
          <span className="disabled-page" aria-disabled="true">
            <ArrowLeft size={18} aria-hidden="true" /> Newer posts
          </span>
        )}
        <span>
          Page {page} of {Math.max(totalPages, 1)}
        </span>
        {page * PAGE_SIZE < totalPosts ? (
          <Link prefetch={true} className="text-link" href={pageLink(page + 1)}>
            Older posts <ArrowRight size={18} aria-hidden="true" />
          </Link>
        ) : (
          <span className="disabled-page" aria-disabled="true">
            Older posts <ArrowRight size={18} aria-hidden="true" />
          </span>
        )}
      </nav>
    </>
  );
}

export default function Blog({
  params,
  categoryPage = false,
}: {
  params: ArchiveParams;
  categoryPage?: boolean;
}) {
  return (
    <section className="archive-page container">
      <div className="archive-heading">
        {categoryPage ? (
          <Suspense fallback={<h1>Writing</h1>}>
            <ArchiveTitle />
          </Suspense>
        ) : (
          <h1>Writing</h1>
        )}
        <Suspense fallback={<TextSkeleton label="Loading post count" />}>
          <PostCount params={params} />
        </Suspense>
      </div>
      <nav className="topic-filter" aria-label="Filter writing by topic">
        <Suspense fallback={<Link href="/blog">All posts</Link>}>
          <TopicLink>All posts</TopicLink>
        </Suspense>
        <Suspense fallback={<TextSkeleton label="Loading topics" />}>
          <Topics />
        </Suspense>
      </nav>
      <Suspense fallback={<PostListSkeleton />}>
        <ArchiveResults params={params} />
      </Suspense>
    </section>
  );
}
