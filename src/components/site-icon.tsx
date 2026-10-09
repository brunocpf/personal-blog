import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };
const paths = {
  ArrowUpRight: "M6 18 18 6M7 6h11v11",
  ArrowLeft: "M19 12H5m6-6-6 6 6 6",
  ArrowRight: "M5 12h14m-6-6 6 6-6 6",
  ArrowUp: "M12 19V5m-6 6 6-6 6 6",
  Menu: "M5 8h14M5 16h14",
  X: "m6 6 12 12M6 18 18 6",
  Check: "m5 12 4.5 4.5L19 7",
  Copy: "M8 7V5q0-2 2-2h8q2 0 2 2v10q0 2-2 2h-1M6 7h7q3 0 3 3v8q0 3-3 3H6q-3 0-3-3v-8q0-3 3-3Z",
  Share2:
    "M12 15V3m-4 4 4-4 4 4M7 10H6q-3 0-3 3v5q0 3 3 3h12q3 0 3-3v-5q0-3-3-3h-1",
  Expand: "M9 4H4v5m11-5h5v5M4 15v5h5m11-5v5h-5",
  Moon: "M19.8 15.7A8.8 8.8 0 0 1 8.3 4.2 8.8 8.8 0 1 0 19.8 15.7Z",
  Sun: "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4",
  Monitor: "M7 4h10q4 0 4 4v6q0 4-4 4H7q-4 0-4-4V8q0-4 4-4Zm5 14v3m-4 0h8",
};

// A single optical weight and softly squared geometry for all site controls.
function icon(name: keyof typeof paths) {
  return function Icon({ size = 24, ...props }: IconProps) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
        {...props}
      >
        <path d={paths[name]} />
      </svg>
    );
  };
}
export const ArrowUpRight = icon("ArrowUpRight");
export const ArrowLeft = icon("ArrowLeft");
export const ArrowRight = icon("ArrowRight");
export const ArrowUp = icon("ArrowUp");
export const Menu = icon("Menu");
export const X = icon("X");
export const Check = icon("Check");
export const Copy = icon("Copy");
export const Share2 = icon("Share2");
export const Expand = icon("Expand");
export const Moon = icon("Moon");
export const Sun = icon("Sun");
export const Monitor = icon("Monitor");
