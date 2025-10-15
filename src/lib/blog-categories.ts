import { groq } from "next-sanity";
import { cache } from "react";

import client from "@/client";

export const getCategories = cache(async function () {
  const categories = await client.fetch<{ title: string }[]>(
    groq`
    *[_type == "category"]{
        title
    }`,
  );

  return categories.map((cat) => cat.title);
});
