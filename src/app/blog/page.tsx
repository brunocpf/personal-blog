import {
  ArrowLeft as ArrowLeftIcon,
  ArrowRight as ArrowRightIcon,
} from "@geist-ui/icons";
import { Metadata } from "next";
import { groq } from "next-sanity";
import { Link } from "next-view-transitions";
import { notFound } from "next/navigation";

import client from "@/client";
import { PostList } from "@/components/post-list";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog | bruno-fernandes.dev",
  description: "Bruno's blog",
};

interface BlogPostProps {
  searchParams: Promise<{
    category?: string;
    page?: string;
  }>;
}

export default async function Blog(props: BlogPostProps) {
  const searchParams = await props.searchParams;

  const { category, page } = searchParams;
  const pageNumber = page ? parseInt(page, 10) : 1;

  if (page && (isNaN(pageNumber) || pageNumber < 1)) {
    notFound();
  }

  const categories = await client.fetch<{ title: string }[]>(
    groq`
    *[_type == "category"]{
        title
    }`,
  );

  const pageSize = 6;

  const totalPosts = await client.fetch<number>(
    groq`count(*[_type == "post" ${category ? `&& $category in categories[]->title` : ""}])`,
    category ? { category } : {},
  );

  const isLastPage = pageNumber * pageSize >= totalPosts;

  return (
    <div className="min-h-screen bg-card">
      <div className="container pt-2">
        <div className="prose flex min-w-full flex-wrap gap-2 rounded-xl bg-background p-2">
          <Link
            href="/blog"
            className={cn({
              "font-bold underline": !category,
            })}
          >
            All
          </Link>
          {categories.map((c) => (
            <Link
              key={c.title}
              href={`/blog?category=${c.title}`}
              className={cn({
                "font-bold underline": c.title === category,
              })}
            >
              #{c.title}
            </Link>
          ))}
        </div>
      </div>
      <TooltipProvider>
        <div className="flex container gap-2 pt-8 justify-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="link"
                className="h-fit w-fit rounded-full p-2 text-primary hover:bg-accent focus-visible:bg-accent aria-disabled:pointer-events-none aria-disabled:opacity-50"
                asChild
                disabled={pageNumber === 1}
                aria-disabled={pageNumber === 1}
                aria-label="Previous page"
              >
                <Link
                  href={
                    category
                      ? `/blog?category=${category}&page=${pageNumber - 1}`
                      : `/blog?page=${pageNumber - 1}`
                  }
                >
                  <ArrowLeftIcon className="w-6 h-6" />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Previous page</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="link"
                className="h-fit w-fit rounded-full p-2 text-primary hover:bg-accent focus-visible:bg-accent aria-disabled:pointer-events-none aria-disabled:opacity-50"
                asChild
                disabled={isLastPage}
                aria-disabled={isLastPage}
                aria-label="Next page"
              >
                <Link
                  href={
                    category
                      ? `/blog?category=${category}&page=${pageNumber + 1}`
                      : `/blog?page=${pageNumber + 1}`
                  }
                >
                  <ArrowRightIcon className="w-6 h-6" />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Next page</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
      <PostList category={category} pageSize={pageSize} page={pageNumber} />
    </div>
  );
}
