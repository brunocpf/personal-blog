import { HeroSection } from "@/components/hero-section";
import { PostList } from "@/components/post-list";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <div className="bg-card">
        <PostList maxPosts={9} />
      </div>
    </div>
  );
}
