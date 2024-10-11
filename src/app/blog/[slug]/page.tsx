import { groq, PortableTextBlock, toPlainText } from "next-sanity";
import { notFound } from "next/navigation";
import { ResolvingMetadata } from "next";
import Link from "next/link";
import { CustomPortableText } from "@/components/custom-portable-text";
import { dateFormatter } from "@/lib/utils";
import client from "@/client";
interface BlogPostProps {
  params: {
    slug: string;
  };
}

export default async function BlogPost({ params: { slug } }: BlogPostProps) {
  const post = await client.fetch<
    | {
        title: string;
        body: PortableTextBlock[];
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
        author->{
          name
        },
        categories[]->{
            title
        }
    }`,
    { slug },
    { cache: "no-cache" },
  );

  if (!post) {
    notFound();
  }

  const formattedDate = dateFormatter.format(new Date(post.publishedAt));

  return (
    <div className="bg-card min-h-screen">
      <div className="container py-8">
        <article className="rounded bg-card shadow-lg dark:border-2">
          <div className="bg-background pt-10 px-2 flex justify-between">
            <span>{formattedDate}</span>
            <span>{post.author.name}</span>
          </div>
          <div className="p-4 prose min-w-fit">
            <CustomPortableText value={post.body} />
          </div>
          <aside className="bg-background py-4 px-2 flex gap-2 flex-wrap prose min-w-full">
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
  { params: { slug } }: BlogPostProps,
  parent: ResolvingMetadata,
) {
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
