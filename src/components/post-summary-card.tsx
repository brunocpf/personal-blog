import { MoreHorizontal as MoreIcon } from "@geist-ui/icons";
import { Link } from "next-view-transitions";

import { Button } from "@/components/ui/button";
import { dateFormatter } from "@/lib/utils";

export interface PostSummaryCardProps {
  slug: string;
  title: string;
  author: string;
  publishedAt: Date;
  categories: string[];
  summary: string;
}

export function PostSummaryCard({
  slug,
  title,
  author,
  publishedAt,
  categories,
  summary,
}: PostSummaryCardProps) {
  const formattedDate = dateFormatter.format(publishedAt);

  return (
    <div>
      <div
        className="min-w-48 rounded bg-card shadow-lg dark:border-2"
        style={{
          viewTransitionName: `article-view-${slug}`,
        }}
      >
        <div className="flex justify-between bg-background px-2 pt-6">
          <span>{formattedDate}</span>
          <span>{author}</span>
        </div>
        <div className="prose min-h-28 p-2">
          <h3>
            <Link href={`/blog/${slug}`}>{title}</Link>
          </h3>
          <span className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/blog?category=${category}`}
              >{`#${category}`}</Link>
            ))}
          </span>
          <p>{summary}</p>
        </div>
        <div className="flex justify-center px-2 py-2">
          <Button
            variant="link"
            className="h-fit w-fit rounded-full p-2 text-primary hover:bg-accent focus-visible:bg-accent"
            asChild
            title="More"
          >
            <Link href={`/blog/${slug}`}>
              <MoreIcon className="h-6 w-6" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
