import { groq } from "next-sanity";
import { cache } from "react";

import client from "@/client";

export const PAGE_SIZE = 6;

export const getPaginationTotals = cache(async (category?: string) => {
  const totalPosts = await client.fetch<number>(
    groq`count(*[_type == "post" ${category ? `&& $category in categories[]->title` : ""}])`,
    category ? { category } : {},
  );
  const totalPages = Math.ceil(totalPosts / PAGE_SIZE);

  return { totalPosts, totalPages };
});
