import { ResolvingMetadata } from "next";
import { groq, PortableTextBlock, toPlainText } from "next-sanity";
import { Link } from "next-view-transitions";
import { notFound } from "next/navigation";

import client from "@/client";
import { CustomPortableText } from "@/components/custom-portable-text";
import { ShareButton } from "@/components/share-button";
import { dateFormatter } from "@/lib/utils";

interface BlogPostProps {
  params: Promise<{
    slug: string;
  }>;
}

export const revalidate = 3600;

export default async function BlogPost(props: BlogPostProps) {
  const params = await props.params;

  const { slug } = params;

  const post = await client.fetch<
    | {
        title: string;
        body: PortableTextBlock[];
        summary: PortableTextBlock[];
        publishedAt: string;
        author: { name: string };
        categories: { title: string }[];
      }
    | undefined
  >(
    groq`
    *[_type == "post" && slug.current == $slug][0]{
        title,
        body,
        publishedAt,
        summary,
        author->{
          name
        },
        categories[]->{
            title
        }
    }`,
    { slug },
  );

  if (!post) {
    notFound();
  }

  const formattedDate = dateFormatter.format(new Date(post.publishedAt));

  return (
    <div className="min-h-screen bg-card">
      <div className="container py-8">
        <article
          className="article-view rounded bg-card shadow-lg dark:border-2"
          style={{
            viewTransitionName: `article-view-${slug}`,
          }}
        >
          <div
            className="flex justify-between bg-background px-2 pt-10"
            style={{
              viewTransitionName: `article-view-header-${slug}`,
            }}
          >
            <span
              style={{
                viewTransitionName: `article-view-timestamp-${slug}`,
              }}
            >
              {formattedDate}
            </span>
            <span
              style={{
                viewTransitionName: `article-view-author-${slug}`,
              }}
            >
              {post.author.name}
            </span>
          </div>
          <div
            className="prose min-w-full p-4"
            style={{
              viewTransitionName: `article-view-content-${slug}`,
            }}
          >
            <CustomPortableText value={post.body} />
          </div>
          <aside className="prose flex min-w-full flex-wrap gap-2 bg-background px-2 py-4">
            <ShareButton
              title={post.title}
              url={`https://bruno-fernandes.dev/blog/${slug}`}
              text={`"${toPlainText(post.summary)}"`}
            />
            {post.categories.map((category) => (
              <Link
                key={category.title}
                href={`/blog?category=${category.title}`}
              >{`#${category.title}`}</Link>
            ))}
          </aside>
        </article>
      </div>
    </div>
  );
}

export async function generateMetadata(
  props: BlogPostProps,
  parent: ResolvingMetadata,
) {
  const params = await props.params;

  const { slug } = params;

  const post = await client.fetch<
    | {
        title: string;
        summary: PortableTextBlock[];
      }
    | undefined
  >(
    groq`
    *[_type == "post" && slug.current == $slug][0]{
        title,
        summary
    }`,
    { slug },
  );

  return {
    title: `${post?.title ?? (await parent).title} | bruno-fernandes.dev`,
    description: post?.summary
      ? toPlainText(post?.summary)
      : (await parent).description,
  };
}

export async function generateStaticParams() {
  const paths = await client.fetch<string[]>(
    groq`
    *[_type == "post" && defined(slug.current)][].slug.current`,
  );

  return paths.map((path) => ({
    slug: path,
  }));
}
