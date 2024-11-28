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
      className={`w-full overflow-hidden rounded-2xl bg-gray-50 dark:bg-gray-900 ${classesWrapper}`}
      data-sanity={props["data-sanity"]}
    >
      {imageUrl && (
        <Image
          className="absolute m-0 h-full w-full object-contain py-2"
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
