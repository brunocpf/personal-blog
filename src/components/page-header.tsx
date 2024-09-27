import Link from "next/link";
import { MobileNav } from "@/components/mobile-nav";
import { MainNav } from "@/components/main-nav";

export function PageHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-border/40 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-14 max-w-screen-xl items-center justify-between">
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
