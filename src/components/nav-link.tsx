"use client";

import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

export interface NavLinkProps extends PropsWithChildren {
  href: string;
}

export function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();

  const isCurrent =
    href === "/" ? pathname === "/" || !pathname : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={cn(
        "after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-0.5 after:origin-left after:-scale-x-0 after:bg-current after:transition-transform after:ease-in-out after:content-[''] hover:after:scale-x-75 focus:after:scale-x-100 active:after:scale-x-100",
        "relative transition-colors hover:text-foreground/80",
        isCurrent
          ? "text-foreground after:scale-x-100"
          : "text-foreground/60 after:scale-x-0",
      )}
    >
      {children}
    </Link>
  );
}
