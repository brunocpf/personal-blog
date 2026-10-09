import { ProseSkeleton } from "@/components/content-skeleton";

// This standalone page intentionally reads uncached CMS content.
export default function Loading() {
  return (
    <div className="container">
      <ProseSkeleton />
    </div>
  );
}
