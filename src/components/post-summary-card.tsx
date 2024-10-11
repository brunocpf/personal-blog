import { MoreHorizontal as MoreIcon } from "@geist-ui/icons";
import Link from "next/link";
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
      <div className="rounded bg-card dark:border-2 shadow-lg min-w-48">
        <div className="bg-background pt-6 px-2 flex justify-between">
          <span>{formattedDate}</span>
          <span>{author}</span>
        </div>
        <div className="p-2 min-h-28 prose">
          <h3>
            <Link href={`/blog/${slug}`}>{title}</Link>
          </h3>
          <span className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/blog?category=${category}`}
              >{`#${category}`}</Link>
            ))}
          </span>
          <p>{summary}</p>
        </div>
        <div className="py-2 px-2 flex justify-center">
          <Button
            variant="link"
            className="hover:bg-accent focus-visible:bg-accent rounded-full text-primary p-2 h-fit w-fit"
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
