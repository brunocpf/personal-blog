import { toPlainText } from "next-sanity";

import { PostSummaryCard } from "@/components/post-summary-card";
import { getPosts } from "@/lib/content";

export interface PostListProps {
  category?: string;
  pageSize?: number;
  page?: number;
  featured?: boolean;
}

export async function PostList({
  category,
  pageSize = 6,
  page = 1,
  featured = false,
}: PostListProps) {
  const posts = await getPosts(category, page, pageSize);
  return (
    <div className="post-list">
      {posts.length === 0 && (
        <p className="empty-state">
          No posts in this category yet. Try another topic.
        </p>
      )}
      {posts.map((post, index) => (
        <PostSummaryCard
          key={post.slug}
          featured={featured && index === 0}
          isDraft={post._originalId?.startsWith("drafts.") ?? false}
          title={post.title}
          author={post.author?.name ?? "Bruno Fernandes"}
          publishedAt={new Date(post.publishedAt)}
          slug={post.slug}
          summary={toPlainText(post.summary ?? [])}
          categories={post.categories?.map((c) => c.title) ?? []}
        />
      ))}
    </div>
  );
}
