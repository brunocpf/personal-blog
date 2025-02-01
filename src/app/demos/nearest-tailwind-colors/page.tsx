import { Metadata } from "next";

import { NearestTailwindColorsCard } from "@/components/nearest-tailwind-colors-card";

export const metadata: Metadata = {
  title: "Nearest Tailwind Colors",
  description: "Find the nearest Tailwind CSS V4 OKLCH colors to a given color",
  keywords: ["tailwind", "tailwindcss", "colors", "nearest", "oklch"],
  openGraph: {
    title: "Nearest Tailwind Colors",
    description:
      "Find the nearest Tailwind CSS V4 OKLCH colors to a given color",
    type: "website",
  },
};

export default function NearestTailwindColors() {
  return (
    <div className="flex-1 grid place-items-center">
      <NearestTailwindColorsCard />
    </div>
  );
}
