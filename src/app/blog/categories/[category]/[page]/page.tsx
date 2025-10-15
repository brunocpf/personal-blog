import { notFound } from "next/navigation";

import Blog from "@/components/blog";
import { getCategories } from "@/lib/blog-categories";
import { getPaginationTotals } from "@/lib/blog-pagination";

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string; category: string }>;
}) {
  const { page, category } = await params;

  const pageNum = Number(page);
  return {
    title:
      pageNum === 1
        ? "Blog | bruno-fernandes.dev"
        : `Blog – Page ${pageNum} - #${category} | bruno-fernandes.dev`,
    description: "Bruno's blog",
    alternates: {
      canonical:
        pageNum === 1
          ? "/blog/categories/1"
          : `/blog/categories/${category}/${pageNum}`,
    },
  };
}

export async function generateStaticParams() {
  const categories = await getCategories();
  const params: { category: string; page: string }[] = [];

  for (const category of categories) {
    const { totalPages } = await getPaginationTotals(category);
    params.push(
      ...Array.from({ length: totalPages }, (_, i) => ({
        category,
        page: String(i + 1),
      })),
    );
  }

  return params;
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ page: string; category: string }>;
}) {
  const { page, category } = await params;

  const categories = await getCategories();

  if (!categories.includes(category)) {
    notFound();
  }

  const pageNum = Number(page);
  const { totalPages } = await getPaginationTotals(category);

  if (!Number.isInteger(pageNum) || pageNum < 1 || pageNum > totalPages) {
    notFound();
  }

  return <Blog page={pageNum} category={category} />;
}
