import createImageUrlBuilder from "@sanity/image-url";
import { sanityConfig } from "@/client";
import type { Image } from "sanity";

const imageBuilder = createImageUrlBuilder({
  projectId: sanityConfig.projectId ?? "",
  dataset: sanityConfig.dataset ?? "",
});

export const urlForImage = (source: Image | undefined) => {
  if (!source?.asset?._ref) {
    return undefined;
  }

  return imageBuilder?.image(source).auto("format").fit("max");
};

export function urlForOpenGraphImage(image: Image | undefined) {
  return urlForImage(image)?.width(1200).height(627).fit("crop").url();
}
