"use client";

import {
  ColorOutput,
  getNearestTailwindColors,
  type GetNearestTailwindColorsConfig,
} from "nearest-tailwind-colors";
import { memo, startTransition, useCallback, useMemo, useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function NearestTailwindColorsCard() {
  const [color, setColor] = useState("#000000");
  const [colorSpace, setColorSpace] =
    useState<GetNearestTailwindColorsConfig["space"]>("lab");

  const nearestTailwindColors = useMemo(
    () => getNearestTailwindColors(color, { n: 4, space: colorSpace }),
    [color, colorSpace],
  );

  const handleChangeColor = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      startTransition(() => {
        setColor(e.target.value);
      });
    },
    [],
  );

  return (
    <div className="bg-card rounded shadow-md w-96 h-96 flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold">Nearest Tailwind Colors</h1>
      <div className="mt-4 w-full flex flex-col items-center justify-between">
        <p>{color}</p>
        <input
          type="color"
          value={color}
          onChange={handleChangeColor}
          className="w-12 h-12 rounded shadow-lg border-2 border-gray-200 cursor-copy"
        />
        <Select
          value={colorSpace}
          onValueChange={(value) =>
            setColorSpace(value as GetNearestTailwindColorsConfig["space"])
          }
        >
          <SelectTrigger className="w-[100px] mt-2">
            <SelectValue placeholder="Select a color space" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Color Spaces</SelectLabel>
              {[
                "cmyk",
                "gl",
                "hcg",
                "hcl",
                "hsi",
                "hsl",
                "hsv",
                "lab",
                "lch",
                "oklab",
                "oklch",
                "rgb",
              ].map((space) => (
                <SelectItem key={space} value={space}>
                  {space}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="mt-4 text-lg flex w-full">
        {nearestTailwindColors.map((color) => (
          <MemoizedColorDisplay
            key={`${color.color}-${color.value}`}
            color={color}
          />
        ))}
      </div>
    </div>
  );
}

const MemoizedColorDisplay = memo(function ColorDisplay({
  color,
}: {
  color: ColorOutput;
}) {
  return (
    <div
      key={color.color}
      className="flex flex-col items-center flex-1 cursor-pointer rounded hover:shadow-lg p-2 hover:bg-accent transition-all whitespace-nowrap"
      title={`${color.color} (${color.value}) - ${color.distance.toFixed(2)}`}
      onClick={() => {
        try {
          navigator.clipboard.writeText(color.color);
          alert("Copied to clipboard!");
        } catch {
          // noop
        }
      }}
    >
      <div
        className="w-10 h-10 rounded shadow-lg border-2 border-gray-200"
        style={{ backgroundColor: color.value }}
      />
      <div className="text-sm font-bold">{color.color}</div>
      <div className="text-sm">{`(${color.distance.toFixed(2)})`}</div>
    </div>
  );
});
