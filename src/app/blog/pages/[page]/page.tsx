import { notFound } from "next/navigation";

import Blog from "@/components/blog";
import { getPaginationTotals } from "@/lib/blog-pagination";

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;

  const pageNum = Number(page);
  return {
    title:
      pageNum === 1
        ? "Blog | bruno-fernandes.dev"
        : `Blog – Page ${pageNum} | bruno-fernandes.dev`,
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

export default async function BlogPage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;

  const pageNum = Number(page);
  const { totalPages } = await getPaginationTotals();

  if (!Number.isInteger(pageNum) || pageNum < 1 || pageNum > totalPages) {
    notFound();
  }

  return <Blog page={pageNum} />;
}
