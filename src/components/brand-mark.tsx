import { brandMonogram, brandSquircle } from "@/lib/brand";

export function BrandMark() {
  return (
    <svg
      className="brand-symbol"
      viewBox="0 0 64 64"
      aria-hidden="true"
      focusable="false"
    >
      <path d={brandSquircle} fill="currentColor" />
      <path
        d={brandMonogram}
        fill="none"
        stroke="hsl(var(--secondary-foreground))"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
