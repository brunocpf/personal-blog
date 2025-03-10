import { Link } from "next-view-transitions";

import { MainNav } from "@/components/main-nav";
import { MobileNav } from "@/components/mobile-nav";

export function PageHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-border/40 bg-card/95 backdrop-blur-sm supports-backdrop-filter:bg-card/60">
      <div className="container flex h-14 max-w-(--breakpoint-xl) items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg font-bold">bruno-fernandes.dev</span>
        </Link>
        <div className="flex">
          <MainNav />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
