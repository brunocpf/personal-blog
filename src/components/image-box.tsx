import Image from "next/image";
import type { Image as ImageType } from "sanity";

import { urlForImage } from "@/lib/sanity-utils";

interface ImageBoxProps {
  image?: ImageType;
  alt?: string;
  width?: number;
  height?: number;
  size?: string;
  classesWrapper?: string;
  "data-sanity"?: string;
}

export default function ImageBox({
  image,
  alt = "Image",
  width,
  height,
  size = "50vw",
  classesWrapper,
  ...props
}: ImageBoxProps) {
  let imageUrlBuilder = image && urlForImage(image);

  if (height) imageUrlBuilder = imageUrlBuilder?.height(height);
  if (width) imageUrlBuilder = imageUrlBuilder?.width(width);
  const imageUrl = imageUrlBuilder
    ?.fit(!width && !height ? "max" : "crop")
    .url();

  return (
    <div
      className={`relative overflow-hidden bg-gray-50 dark:bg-gray-900 ${width ? "h-fit" : "w-full aspect-[1/1] sm:aspect-[16/9] md:aspect-[4/3] rounded-2xl"} ${classesWrapper}`}
      data-sanity={props["data-sanity"]}
      style={
        width
          ? {
              width: `${width}px`,
              height: `${height}px`,
            }
          : {}
      }
    >
      {imageUrl && (
        <Image
          className={`absolute m-0 ${width ? "" : "w-full h-full object-contain py-2"}`}
          alt={alt}
          width={width}
          height={height}
          sizes={size}
          fill={!width && !height}
          src={imageUrl}
          priority
        />
      )}
    </div>
  );
}
