import type { Metadata } from "next";
import { toPlainText } from "next-sanity";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense, ViewTransition } from "react";

import { ArticleSkeleton } from "@/components/content-skeleton";
import { CustomMarkdownText } from "@/components/custom-markdown-text";
import { ShareButton } from "@/components/share-button";
import { ArrowLeft, ArrowUpRight } from "@/components/site-icon";
import { getPost, getPostSlugs } from "@/lib/content";
import { articleTransition } from "@/lib/transitions";

interface BlogPostProps {
  params: Promise<{ slug: string }>;
}
const dateFormat = new Intl.DateTimeFormat("en", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

async function BlogPostContent({ params }: BlogPostProps) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  const readingMinutes = Math.max(
    1,
    Math.ceil(post.bodyMd.split(/\s+/).length / 220),
  );
  // CMS markdown historically includes its own title; the page owns the single h1.
  const body = post.bodyMd.replace(/^\s*# [^\n]+\r?\n/, "");
  return (
    <>
      <ViewTransition
        name={articleTransition(slug, "surface")}
        default="none"
        share="article-surface"
      >
        <header className="article-header container">
          <div className="article-meta">
            <ViewTransition
              name={articleTransition(slug, "date")}
              default="none"
              share="article-date"
            >
              <time dateTime={post.publishedAt}>
                {dateFormat.format(new Date(post.publishedAt))}
              </time>
            </ViewTransition>
            <span>{readingMinutes} min read</span>
          </div>
          <ViewTransition
            name={articleTransition(slug, "title")}
            default="none"
            share="article-title"
          >
            <h1>{post.title}</h1>
          </ViewTransition>
          <ViewTransition
            name={articleTransition(slug, "summary")}
            default="none"
            share="article-summary"
          >
            <p className="article-deck">{toPlainText(post.summary ?? [])}</p>
          </ViewTransition>
          <div className="article-byline">
            <span>By {post.author?.name ?? "Bruno Fernandes"}</span>
            <ShareButton
              title={post.title}
              url={`https://bruno-fernandes.dev/blog/${slug}`}
              text={toPlainText(post.summary ?? [])}
            />
          </div>
        </header>
      </ViewTransition>
      <div className="article-content prose">
        <CustomMarkdownText value={body} />
      </div>
      <aside className="article-end">
        <p>Filed under</p>
        <div className="post-topics">
          {post.categories?.map((c) => (
            <Link
              prefetch={true}
              key={c.title}
              href={`/blog/categories/${encodeURIComponent(c.title)}`}
            >
              {c.title}
            </Link>
          ))}
        </div>
        <Link prefetch={true} className="text-link" href="/blog">
          All posts <ArrowUpRight size={18} aria-hidden="true" />
        </Link>
      </aside>
    </>
  );
}

export async function generateMetadata({
  params,
}: BlogPostProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Story not found" };
  return {
    title: post.title,
    description: toPlainText(post.summary ?? []),
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      publishedTime: post.publishedAt,
    },
  };
}

export async function generateStaticParams() {
  return (await getPostSlugs()).map((slug) => ({ slug }));
}

export default function BlogPost({ params }: BlogPostProps) {
  return (
    <article className="reading-page">
      <div className="reading-progress" aria-hidden="true" />
      <div className="article-navigation container">
        <Link prefetch={true} className="text-link subtle-link" href="/blog">
          <ArrowLeft size={18} aria-hidden="true" /> All posts
        </Link>
      </div>
      <Suspense fallback={<ArticleSkeleton />}>
        <BlogPostContent params={params} />
      </Suspense>
    </article>
  );
}
