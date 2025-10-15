import { Link } from "next-view-transitions";

import { HeroSection } from "@/components/hero-section";
import { PostList } from "@/components/post-list";
import { Button } from "@/components/ui/button";

export const revalidate = 3600;

export default function Home() {
  return (
    <div>
      <HeroSection />
      <div className="bg-card">
        <PostList pageSize={6} />
        <div className="flex justify-center">
          <Button variant="link" size="lg" className="mx-auto mb-10" asChild>
            <Link href="/blog">View all posts</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
