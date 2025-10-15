import { groq, PortableTextBlock, toPlainText } from "next-sanity";
import type { Image } from "sanity";

import client from "@/client";
import { PostSummaryCard } from "@/components/post-summary-card";

export interface PostListProps {
  category?: string;
  pageSize?: number;
  page?: number;
}

export async function PostList({
  category,
  pageSize,
  page = 1,
}: PostListProps) {
  const start = pageSize ? pageSize * (page - 1) : 0;
  const end = pageSize ? start + pageSize - 1 : undefined;
  const slice = pageSize ? `[${start}..${end}]` : "";
  const posts = await client.fetch<
    {
      title: string;
      author: { name: string };
      publishedAt: string;
      summary: PortableTextBlock[];
      slug: string;
      categories: { title: string }[];
      mainImage: Image;
    }[]
  >(
    groq`
      *[_type == "post" ${category ? `&& $category in categories[]->title` : ""}] | order(publishedAt desc) ${slice}{
        title,
        author->{
          name
        },
        publishedAt,
        summary,
        "slug": slug.current,
        categories[]->{
          title
        },
      }
    `,
    category ? { category } : {},
  );

  return (
    <div className="container grid grid-cols-1 gap-8 py-8 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostSummaryCard
          key={post.slug}
          title={post.title}
          author={post.author.name}
          publishedAt={new Date(post.publishedAt)}
          slug={post.slug}
          summary={toPlainText(post.summary)}
          categories={post.categories.map((category) => category.title)}
        />
      ))}
    </div>
  );
}
