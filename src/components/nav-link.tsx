"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

export function NavLink({
  href,
  children,
}: PropsWithChildren<{ href: string }>) {
  const pathname = usePathname();
  const current = href === "/" ? pathname === "/" : pathname.startsWith(href);
  return (
    <Link
      prefetch={true}
      href={href}
      className="nav-link"
      aria-current={current ? "page" : undefined}
    >
      {children}
    </Link>
  );
}
