"use client";

import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggler } from "@/components/theme-toggler";
import { Button } from "@/components/ui/button";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="opacity-70 transition-opacity hover:opacity-100 mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <HamburgerMenuIcon className="w-8 h-8" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="mt-10">
          <SheetTitle>bruno-fernandes.dev</SheetTitle>
          <SheetDescription className="sr-only">Nav</SheetDescription>
          <ThemeToggler />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
