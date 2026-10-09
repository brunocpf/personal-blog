import { groq } from "next-sanity";
import { cacheLife, cacheTag } from "next/cache";

import client from "@/client";

export async function getCategories() {
  "use cache";
  cacheLife("hours");
  cacheTag("blog-content");
  const categories = await client.fetch<{ title: string }[]>(
    groq`*[_type == "category" && defined(title)]{title}`,
  );
  return categories.map((cat) => cat.title);
}
