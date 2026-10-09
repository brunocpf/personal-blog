import Link from "next/link";

import { BrandMark } from "@/components/brand-mark";
import { MainNav } from "@/components/main-nav";
import { MobileNav } from "@/components/mobile-nav";

export function PageHeader() {
  return (
    <header className="site-header">
      <div className="header-inner container">
        <Link href="/" className="wordmark" aria-label="Bruno Fernandes — home">
          <BrandMark />
          <span>
            bruno-fernandes<span className="domain-end">.dev</span>
          </span>
        </Link>
        <MainNav />
        <MobileNav />
      </div>
    </header>
  );
}
