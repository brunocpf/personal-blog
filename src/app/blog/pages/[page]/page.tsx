import Blog from "@/components/blog";
import { getPaginationTotals } from "@/lib/blog-pagination";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;

  const pageNum = Number(page);
  return {
    title: pageNum === 1 ? "Writing" : `Blog – Page ${pageNum}`,
    description: "Bruno's blog",
    alternates: {
      canonical: pageNum === 1 ? "/blog/pages/1" : `/blog/pages/${pageNum}`,
    },
  };
}

export async function generateStaticParams() {
  const { totalPages } = await getPaginationTotals();

  return Array.from({ length: totalPages }, (_, i) => ({
    page: String(i + 1),
  }));
}

export default function BlogPage({
  params,
}: {
  params: Promise<{ page: string; category?: string }>;
}) {
  return <Blog params={params} />;
}
