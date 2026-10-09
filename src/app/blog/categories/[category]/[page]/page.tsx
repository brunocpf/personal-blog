import Blog from "@/components/blog";
import { getCategories } from "@/lib/blog-categories";
import { getPaginationTotals } from "@/lib/blog-pagination";

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
        ? `Blog - #${category}`
        : `Blog – Page ${pageNum} - #${category}`,
    description: "Bruno's blog",
    alternates: {
      canonical:
        pageNum === 1
          ? `/blog/categories/${encodeURIComponent(category)}/1`
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

export default function BlogPage({
  params,
}: {
  params: Promise<{ page: string; category?: string }>;
}) {
  return <Blog params={params} categoryPage />;
}
