"use client";

import { Display as DisplayIcon } from "@geist-ui/icons";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Toggle } from "@/components/ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function ThemeToggler() {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <TooltipProvider>
      <div className="flex w-fit items-center justify-center gap-2 p-2 sm:h-12">
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <Toggle
                suppressHydrationWarning
                variant="outline"
                className="h-fit rounded-full p-2 cursor-pointer"
                pressed={mounted && theme === "system"}
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
                  className="peer inline-flex h-7 w-14 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-xs transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
                >
                  <SwitchPrimitives.Thumb
                    suppressHydrationWarning
                    className="group pointer-events-none relative block h-6 w-6 rounded-full bg-background p-1 shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-7 data-[state=unchecked]:translate-x-0"
                  >
                    <SunIcon className="absolute left-0 right-0 mx-auto w-fit transition-none group-data-[state=checked]:opacity-0" />
                    <MoonIcon className="absolute left-0 right-0 mx-auto w-fit opacity-0 transition-none group-data-[state=checked]:opacity-100" />
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
            <div className="dark:hidden block">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex">
                    <SwitchPrimitives.Root
                      suppressHydrationWarning
                      checked={false}
                      className="peer inline-flex h-7 w-14 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-xs transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
                    >
                      <SwitchPrimitives.Thumb
                        suppressHydrationWarning
                        className="group pointer-events-none relative block h-6 w-6 rounded-full bg-background p-1 shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-7 data-[state=unchecked]:translate-x-0"
                      >
                        <SunIcon className="absolute left-0 right-0 mx-auto w-fit transition-none group-data-[state=checked]:opacity-0" />
                        <MoonIcon className="absolute left-0 right-0 mx-auto w-fit opacity-0 transition-none group-data-[state=checked]:opacity-100" />
                      </SwitchPrimitives.Thumb>
                    </SwitchPrimitives.Root>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Toggle light/dark mode</p>
                </TooltipContent>
              </Tooltip>
            </div>

            <div className="dark:block hidden">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex">
                    <SwitchPrimitives.Root
                      suppressHydrationWarning
                      checked
                      className="peer inline-flex h-7 w-14 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-xs transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
                    >
                      <SwitchPrimitives.Thumb
                        suppressHydrationWarning
                        className="group pointer-events-none relative block h-6 w-6 rounded-full bg-background p-1 shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-7 data-[state=unchecked]:translate-x-0"
                      >
                        <SunIcon className="absolute left-0 right-0 mx-auto w-fit transition-none group-data-[state=checked]:opacity-0" />
                        <MoonIcon className="absolute left-0 right-0 mx-auto w-fit opacity-0 transition-none group-data-[state=checked]:opacity-100" />
                      </SwitchPrimitives.Thumb>
                    </SwitchPrimitives.Root>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Toggle light/dark mode</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </>
        )}
      </div>
    </TooltipProvider>
  );
}
