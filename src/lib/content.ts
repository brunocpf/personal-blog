import { groq, type PortableTextBlock } from "next-sanity";
import { cacheLife, cacheTag } from "next/cache";
import type { Image } from "sanity";
import "server-only";

import client from "@/client";

export interface Post {
  _id: string;
  _originalId?: string | null;
  title: string;
  author?: { name: string };
  publishedAt: string;
  summary: PortableTextBlock[];
  slug: string;
  categories?: { title: string }[];
  bodyMd: string;
}

// Cache the CMS boundary so pages, metadata, and prefetched routes share data.
// Development revalidates quickly while retaining a prefetchable cache entry.
// Next excludes stale < 30s or expire < 300s from prerendered navigation.
function contentCache() {
  if (process.env.NODE_ENV === "development")
    cacheLife({ stale: 300, revalidate: 1, expire: 300 });
  else cacheLife("hours");
  cacheTag("blog-content");
}

export async function getPosts(category?: string, page = 1, pageSize = 6) {
  "use cache";
  contentCache();
  const start = (page - 1) * pageSize;
  return client.fetch<Post[]>(
    groq`*[_type == "post" && defined(slug.current) && (!defined($category) || $category in categories[]->title)] | order(publishedAt desc) [$start...$end] { _id, _originalId, title, author->{name}, publishedAt, summary, "slug": slug.current, categories[]->{title} }`,
    { category: category ?? null, start, end: start + pageSize },
  );
}

export async function getPost(slug: string) {
  "use cache";
  contentCache();
  return client.fetch<Post | null>(
    groq`*[_type == "post" && slug.current == $slug][0]{ _id, title, bodyMd, publishedAt, summary, "slug": slug.current, author->{name}, categories[]->{title} }`,
    { slug },
  );
}

export async function getPostSlugs() {
  "use cache";
  contentCache();
  return client.fetch<string[]>(
    groq`*[_type == "post" && defined(slug.current)][].slug.current`,
  );
}

export async function getContent(slug: string) {
  "use cache";
  contentCache();
  return client.fetch<{
    title: string;
    body: PortableTextBlock[];
    mainImage?: Image;
  } | null>(
    groq`*[_type == "content" && slug.current == $slug][0]{ title, body, mainImage }`,
    { slug },
  );
}
