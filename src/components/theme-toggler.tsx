"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

import { Monitor, Moon, Sun } from "@/components/site-icon";

const subscribe = () => () => {};
const themes = ["system", "light", "dark"] as const;
export function ThemeToggler() {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const current = mounted ? (theme ?? "system") : "system";
  return (
    <div className="theme-control">
      <button
        className="icon-button theme-button"
        aria-label={`Color theme: ${current}. Switch to ${themes[(themes.indexOf(current as (typeof themes)[number]) + 1) % themes.length]}.`}
        title={`Theme: ${current}`}
        onClick={() =>
          setTheme(
            themes[
              (themes.indexOf(current as (typeof themes)[number]) + 1) %
                themes.length
            ],
          )
        }
      >
        {current === "dark" ? (
          <Moon size={19} aria-hidden="true" />
        ) : current === "light" ? (
          <Sun size={19} aria-hidden="true" />
        ) : (
          <Monitor size={19} aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
