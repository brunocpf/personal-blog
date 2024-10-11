import { groq } from "next-sanity";
import { Metadata } from "next";
import Link from "next/link";
import { PostList } from "@/components/post-list";
import { cn } from "@/lib/utils";
import client from "@/client";

export const metadata: Metadata = {
  title: "Blog | bruno-fernandes.dev",
  description: "Bruno's blog",
};

export const revalidate = 3600 * 24;

interface BlogPostProps {
  searchParams: {
    category?: string;
  };
}

export default async function Blog({
  searchParams: { category },
}: BlogPostProps) {
  const categories = await client.fetch<{ title: string }[]>(
    groq`
    *[_type == "category"]{
        title
    }`,
  );

  return (
    <div className="bg-card min-h-screen">
      <div className="container pt-2">
        <div className="flex gap-2 flex-wrap bg-background prose min-w-full rounded-xl p-2">
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
      <PostList category={category} />
    </div>
  );
}
