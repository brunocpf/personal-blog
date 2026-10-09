"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";

import { NavLink } from "@/components/nav-link";
import { Menu, X } from "@/components/site-icon";
import { ThemeToggler } from "@/components/theme-toggler";

export function MobileNav() {
  const pathname = usePathname();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;
  return (
    <div className="mobile-nav">
      <ThemeToggler />
      <button
        className="icon-button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpenPath(open ? null : pathname)}
      >
        {open ? (
          <X aria-hidden="true" size={22} />
        ) : (
          <Menu aria-hidden="true" size={22} />
        )}
      </button>
      {open && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          onClick={() => setOpenPath(null)}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setOpenPath(null);
              document
                .querySelector<HTMLButtonElement>(
                  '[aria-controls="mobile-navigation"]',
                )
                ?.focus();
            }
          }}
        >
          <NavLink href="/">Home</NavLink>
          <NavLink href="/blog">Writing</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </nav>
      )}
    </div>
  );
}
