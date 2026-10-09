"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import type { PropsWithChildren } from "react";

export function ArchiveTitle() {
  const { category } = useParams<{ category?: string }>();
  return <h1>{category ? <span>{category}</span> : "Writing"}</h1>;
}

export function TopicLink({
  category,
  children,
}: PropsWithChildren<{ category?: string }>) {
  const params = useParams<{ category?: string }>();
  return (
    <Link
      prefetch={true}
      href={
        category ? `/blog/categories/${encodeURIComponent(category)}` : "/blog"
      }
      aria-current={params.category === category ? "page" : undefined}
    >
      {children}
    </Link>
  );
}
