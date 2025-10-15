import {
  ArrowLeft as ArrowLeftIcon,
  ArrowRight as ArrowRightIcon,
} from "@geist-ui/icons";
import { Link } from "next-view-transitions";

import { PostList } from "@/components/post-list";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getCategories } from "@/lib/blog-categories";
import { getPaginationTotals, PAGE_SIZE } from "@/lib/blog-pagination";
import { cn } from "@/lib/utils";

interface BlogPostProps {
  category?: string;
  page?: number;
}

export default async function Blog({ category, page = 1 }: BlogPostProps) {
  const categories = await getCategories();
  const { totalPosts } = await getPaginationTotals(category);

  const isLastPage = page * PAGE_SIZE >= totalPosts;

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
              key={c}
              href={`/blog/categories/${c}`}
              className={cn({
                "font-bold underline": c === category,
              })}
            >
              #{c}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex flex-col md:flex-col-reverse">
        <PostList category={category} pageSize={PAGE_SIZE} page={page} />
        <TooltipProvider>
          <div className="flex container gap-2 pb-8 md:pb-0 md:pt-8 justify-center">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="link"
                  className="h-fit w-fit rounded-full p-2 text-primary hover:bg-accent focus-visible:bg-accent aria-disabled:pointer-events-none aria-disabled:opacity-50"
                  asChild
                  disabled={page === 1}
                  aria-disabled={page === 1}
                  aria-label="Previous page"
                >
                  <Link
                    href={
                      page === 1
                        ? ""
                        : category
                          ? `/blog/categories/${category}/${page - 1}`
                          : `/blog/pages/${page - 1}`
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
                      isLastPage
                        ? ""
                        : category
                          ? `/blog/categories/${category}/${page + 1}`
                          : `/blog/pages/${page + 1}`
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
      </div>
    </div>
  );
}
