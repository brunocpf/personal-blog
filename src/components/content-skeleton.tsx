export function TextSkeleton({ label }: { label: string }) {
  return (
    <span
      className="skeleton-line skeleton-label"
      role="status"
      aria-label={label}
    />
  );
}

export function ProseSkeleton() {
  return (
    <div className="prose-skeleton" role="status" aria-label="Loading text">
      <div aria-hidden="true">
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            className={
              i % 3 === 2 ? "skeleton-line skeleton-short" : "skeleton-line"
            }
          />
        ))}
      </div>
    </div>
  );
}

export function PostListSkeleton() {
  return (
    <div
      className="post-list-skeleton"
      role="status"
      aria-label="Loading posts"
    >
      {[0, 1, 2].map((i) => (
        <div key={i} className="post-entry" aria-hidden="true">
          <div className="post-date">
            <div className="skeleton-line skeleton-short" />
          </div>
          <div>
            <div className="skeleton-line skeleton-post-title" />
            <div className="skeleton-line" />
            <div className="skeleton-line skeleton-short" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ArticleSkeleton() {
  return (
    <div
      className="article-header container"
      role="status"
      aria-label="Loading article"
    >
      <div aria-hidden="true">
        <div className="article-meta">
          <div className="skeleton-line skeleton-label" />
        </div>
        <div className="skeleton-line skeleton-heading" />
        <div className="skeleton-line" />
        <div className="skeleton-line skeleton-short" />
      </div>
    </div>
  );
}
