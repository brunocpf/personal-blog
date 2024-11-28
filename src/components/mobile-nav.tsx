"use client";

import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useState } from "react";

import { NavLink } from "@/components/nav-link";
import { ThemeToggler } from "@/components/theme-toggler";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base opacity-70 transition-opacity hover:bg-transparent hover:opacity-100 focus-visible:bg-transparent md:hidden"
        >
          <HamburgerMenuIcon className="h-8 w-8" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="mt-10">
          <SheetTitle className="sr-only cursor-default">
            bruno-fernandes.dev
          </SheetTitle>
          <SheetDescription className="sr-only">Nav</SheetDescription>
          <div className="flex w-full justify-center">
            <ThemeToggler />
          </div>
        </SheetHeader>
        <nav className="my-4 flex flex-col gap-3">
          <div>
            <NavLink href="/">Home</NavLink>
          </div>
          <div>
            <NavLink href="/blog">Blog</NavLink>
          </div>
          <div>
            <NavLink href="/about">About</NavLink>
          </div>
          <div>
            <NavLink href="/contact">Contact</NavLink>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
