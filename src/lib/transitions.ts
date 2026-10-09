type ArticlePart = "surface" | "title" | "date" | "summary";

export const articleTransition = (slug: string, part: ArticlePart) =>
  `article-${part}-${slug.replace(/[^a-zA-Z0-9_-]/g, "-")}`;
