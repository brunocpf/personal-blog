"use client";

import * as SwitchPrimitives from "@radix-ui/react-switch";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";
import { Display as DisplayIcon } from "@geist-ui/icons";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Toggle } from "@/components/ui/toggle";

export function ThemeToggler() {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-12 w-[113px] p-2" />;
  }

  return (
    <TooltipProvider>
      <div className="flex items-center justify-center sm:h-12 gap-2 w-fit p-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <Toggle
                variant="outline"
                className="rounded-full p-2 h-fit"
                pressed={!mounted ? true : theme === "system"}
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

        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex">
              <SwitchPrimitives.Root
                suppressHydrationWarning
                checked={!mounted ? false : resolvedTheme === "dark"}
                onCheckedChange={(checked) =>
                  void setTheme(checked ? "dark" : "light")
                }
                className="peer inline-flex h-7 w-14 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
              >
                <SwitchPrimitives.Thumb
                  suppressHydrationWarning
                  className="group pointer-events-none block h-6 w-6 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-7 data-[state=unchecked]:translate-x-0 p-1 relative"
                >
                  <SunIcon className="absolute left-0 right-0 mx-auto w-fit transition-none group-data-[state=checked]:opacity-0" />
                  <MoonIcon className="absolute left-0 right-0 mx-auto w-fit transition-none opacity-0 group-data-[state=checked]:opacity-100" />
                </SwitchPrimitives.Thumb>
              </SwitchPrimitives.Root>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Toggle light/dark mode</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
