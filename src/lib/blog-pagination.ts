import { groq } from "next-sanity";
import { cacheLife, cacheTag } from "next/cache";

import client from "@/client";

export const PAGE_SIZE = 6;
export async function getPaginationTotals(category?: string) {
  "use cache";
  cacheLife("hours");
  cacheTag("blog-content");
  const totalPosts = await client.fetch<number>(
    groq`count(*[_type == "post" && defined(slug.current) && (!defined($category) || $category in categories[]->title)])`,
    { category: category ?? null },
  );
  return { totalPosts, totalPages: Math.ceil(totalPosts / PAGE_SIZE) };
}
