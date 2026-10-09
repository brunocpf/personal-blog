import Link from "next/link";
import { ViewTransition } from "react";

import { ArrowUpRight } from "@/components/site-icon";
import { articleTransition } from "@/lib/transitions";

export interface PostSummaryCardProps {
  slug: string;
  isDraft: boolean;
  title: string;
  author: string;
  publishedAt: Date;
  categories: string[];
  summary: string;
  featured?: boolean;
}

const dateFormat = new Intl.DateTimeFormat("en", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export function PostSummaryCard({
  slug,
  isDraft,
  title,
  publishedAt,
  categories,
  summary,
  featured = false,
}: PostSummaryCardProps) {
  return (
    <ViewTransition
      name={articleTransition(slug, "surface")}
      default="none"
      share="article-surface"
    >
      <article
        className={featured ? "post-entry featured-entry" : "post-entry"}
      >
        <div className="post-date">
          <ViewTransition
            name={articleTransition(slug, "date")}
            default="none"
            share="article-date"
          >
            <time dateTime={publishedAt.toISOString()}>
              {dateFormat.format(publishedAt)}
            </time>
          </ViewTransition>
        </div>
        <div className="post-entry-body">
          <ViewTransition
            name={articleTransition(slug, "title")}
            default="none"
            share="article-title"
          >
            <h3>
              <Link prefetch={true} href={`/blog/${slug}`}>
                {title}
                {isDraft && <small> (Draft)</small>}
                <ArrowUpRight className="post-arrow" aria-hidden="true" />
              </Link>
            </h3>
          </ViewTransition>
          <ViewTransition
            name={articleTransition(slug, "summary")}
            default="none"
            share="article-summary"
          >
            <p>{summary}</p>
          </ViewTransition>
          <div className="post-topics">
            {categories.map((category) => (
              <Link
                prefetch={true}
                key={category}
                href={`/blog/categories/${encodeURIComponent(category)}`}
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
        {featured && (
          <Link
            prefetch={true}
            className="featured-read"
            href={`/blog/${slug}`}
            aria-label={`Read ${title}`}
          >
            <ArrowUpRight aria-hidden="true" size={30} />
            <span>Read post</span>
          </Link>
        )}
      </article>
    </ViewTransition>
  );
}
