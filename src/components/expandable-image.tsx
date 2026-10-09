"use client";

import Image from "next/image";
import { ComponentProps, useId, useRef } from "react";

import { Expand, X } from "@/components/site-icon";

type ExpandableImageProps = {
  src: string;
  alt?: string;
  title?: string;
} & Omit<ComponentProps<typeof Image>, "src" | "alt">;

export function ExpandableImage({
  src,
  alt,
  title,
  ...rest
}: ExpandableImageProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const label = alt || title || "Image";
  return (
    <>
      <figure className="article-image">
        <div className="article-image-frame">
          <Image
            {...rest}
            src={src}
            alt={label}
            fill
            loading="lazy"
            sizes="(max-width: 700px) calc(100vw - 40px), 740px"
            className="object-contain"
          />
          <button
            className="icon-button image-expand"
            aria-label="Expand image"
            onClick={() => dialog.current?.showModal()}
          >
            <Expand size={20} aria-hidden="true" />
          </button>
        </div>
        {title && <figcaption>{title}</figcaption>}
      </figure>
      <dialog ref={dialog} className="image-dialog" aria-labelledby={titleId}>
        <div className="image-dialog-header">
          <h2 id={titleId}>{label}</h2>
          <form method="dialog">
            <button className="icon-button" aria-label="Close image">
              <X size={22} aria-hidden="true" />
            </button>
          </form>
        </div>
        <div className="image-dialog-view">
          <Image
            src={src}
            alt={label}
            fill
            sizes="95vw"
            className="object-contain"
          />
        </div>
      </dialog>
    </>
  );
}
