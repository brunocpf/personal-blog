"use client";

import { Display as DisplayIcon } from "@geist-ui/icons";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

import { Toggle } from "@/components/ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const subscribeToHydration = () => () => {};

export function ThemeToggler() {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false,
  );

  return (
    <TooltipProvider>
      <div className="flex w-fit items-center justify-center gap-2 p-2 sm:h-12">
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              suppressHydrationWarning
              className={cn({
                "transition-opacity duration-75": true,
                "opacity-0": !mounted,
                "opacity-100": mounted,
              })}
            >
              <Toggle
                suppressHydrationWarning
                variant="outline"
                className="h-fit cursor-pointer rounded-full p-2"
                pressed={mounted && theme === "system"}
                aria-label="Toggle automatic light/dark mode"
                onPressedChange={() =>
                  void setTheme(theme === "system" ? resolvedTheme! : "system")
                }
              >
                <DisplayIcon className="p-1" />
              </Toggle>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Automatic light/dark mode</p>
          </TooltipContent>
        </Tooltip>
        {mounted ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex">
                <SwitchPrimitives.Root
                  suppressHydrationWarning
                  checked={resolvedTheme === "dark"}
                  onCheckedChange={(checked) =>
                    void setTheme(checked ? "dark" : "light")
                  }
                  className="peer focus-visible:ring-ring focus-visible:ring-offset-background data-[state=checked]:bg-primary data-[state=unchecked]:bg-input inline-flex h-7 w-14 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-xs transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <SwitchPrimitives.Thumb
                    suppressHydrationWarning
                    className="group bg-background pointer-events-none relative block h-6 w-6 rounded-full p-1 ring-0 shadow-lg transition-transform data-[state=checked]:translate-x-7 data-[state=unchecked]:translate-x-0"
                    aria-label="Toggle light/dark mode"
                  >
                    <SunIcon className="absolute right-0 left-0 mx-auto w-fit transition-none group-data-[state=checked]:opacity-0" />
                    <MoonIcon className="absolute right-0 left-0 mx-auto w-fit opacity-0 transition-none group-data-[state=checked]:opacity-100" />
                  </SwitchPrimitives.Thumb>
                </SwitchPrimitives.Root>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle light/dark mode</p>
            </TooltipContent>
          </Tooltip>
        ) : (
          <>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <div className="flex dark:hidden">
                    <SwitchPrimitives.Root
                      suppressHydrationWarning
                      checked={false}
                      className="peer focus-visible:ring-ring focus-visible:ring-offset-background data-[state=checked]:bg-primary data-[state=unchecked]:bg-input inline-flex h-7 w-14 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-xs transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <SwitchPrimitives.Thumb
                        suppressHydrationWarning
                        className="group bg-background pointer-events-none relative block h-6 w-6 rounded-full p-1 ring-0 shadow-lg transition-transform data-[state=checked]:translate-x-7 data-[state=unchecked]:translate-x-0"
                        aria-label="Toggle light/dark mode"
                      >
                        <SunIcon className="absolute right-0 left-0 mx-auto w-fit transition-none group-data-[state=checked]:opacity-0" />
                        <MoonIcon className="absolute right-0 left-0 mx-auto w-fit opacity-0 transition-none group-data-[state=checked]:opacity-100" />
                      </SwitchPrimitives.Thumb>
                    </SwitchPrimitives.Root>
                  </div>
                  <div className="hidden dark:flex">
                    <SwitchPrimitives.Root
                      suppressHydrationWarning
                      checked
                      className="peer focus-visible:ring-ring focus-visible:ring-offset-background data-[state=checked]:bg-primary data-[state=unchecked]:bg-input inline-flex h-7 w-14 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-xs transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <SwitchPrimitives.Thumb
                        suppressHydrationWarning
                        className="group bg-background pointer-events-none relative block h-6 w-6 rounded-full p-1 ring-0 shadow-lg transition-transform data-[state=checked]:translate-x-7 data-[state=unchecked]:translate-x-0"
                        aria-label="Toggle light/dark mode"
                      >
                        <SunIcon className="absolute right-0 left-0 mx-auto w-fit transition-none group-data-[state=checked]:opacity-0" />
                        <MoonIcon className="absolute right-0 left-0 mx-auto w-fit opacity-0 transition-none group-data-[state=checked]:opacity-100" />
                      </SwitchPrimitives.Thumb>
                    </SwitchPrimitives.Root>
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle light/dark mode</p>
              </TooltipContent>
            </Tooltip>
          </>
        )}
      </div>
    </TooltipProvider>
  );
}
