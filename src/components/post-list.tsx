import { groq, PortableTextBlock, toPlainText } from "next-sanity";
import { PostSummaryCard } from "@/components/post-summary-card";
import type { Image } from "sanity";
import client from "@/client";

export interface PostListProps {
  category?: string;
  maxPosts?: number;
}

export async function PostList({ category, maxPosts }: PostListProps) {
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
  *[_type == "post" ${category ? `&& $category in categories[]->title` : ""}] | order(publishedAt desc) ${maxPosts ? `[0..${maxPosts - 1}]` : ""}{
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
    }`,
    category ? { category } : {},
    { cache: "no-cache" },
  );

  return (
    <div className="container py-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
