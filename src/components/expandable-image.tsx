"use client";

import {
  FullScreen as FullScreenIcon,
  FullScreenClose as FullScreenCloseIcon,
} from "@geist-ui/icons";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import Image from "next/image";
import { ComponentProps } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
  const label = alt || title || "Image";

  return (
    <TooltipProvider>
      <DialogPrimitive.Root>
        <figure className="relative my-6 h-96 w-full overflow-hidden bg-gray-50 dark:bg-gray-900">
          <Image
            src={src}
            alt={alt || "Image"}
            fill
            className="not-prose m-0 object-contain py-2"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            {...rest}
          />

          <Tooltip>
            <TooltipTrigger asChild>
              <DialogPrimitive.Trigger asChild>
                <Button
                  className="text-primary hover:bg-accent focus-visible:bg-accent absolute top-2 right-2 block h-fit w-fit cursor-pointer rounded-full p-2 px-2 py-1"
                  aria-label="Expand image"
                  variant="outline"
                >
                  <FullScreenIcon className="h-4 w-4" />
                </Button>
              </DialogPrimitive.Trigger>
            </TooltipTrigger>
            <TooltipContent>
              <p className="not-prose">Expand Image</p>
            </TooltipContent>
          </Tooltip>

          {title && (
            <figcaption className="relative font-sans text-sm text-gray-600">
              {title}
            </figcaption>
          )}
        </figure>

        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80" />

          <DialogPrimitive.Content className="bg-background fixed top-1/2 left-1/2 z-50 flex h-[95vh] w-[95vw] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-md p-2">
            <DialogPrimitive.Description className="sr-only">
              {label}
            </DialogPrimitive.Description>
            <DialogPrimitive.Title className="p-2">
              {label}
            </DialogPrimitive.Title>
            <div className="absolute top-2 right-2 z-10">
              <Tooltip>
                <TooltipTrigger asChild>
                  <DialogPrimitive.Close asChild>
                    <Button
                      className="text-primary hover:bg-accent focus-visible:bg-accent block h-fit w-fit cursor-pointer rounded-full p-2 px-2 py-1"
                      aria-label="Close image"
                      variant="outline"
                    >
                      <FullScreenCloseIcon className="h-4 w-4" />
                    </Button>
                  </DialogPrimitive.Close>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="not-prose">Close Image</p>
                </TooltipContent>
              </Tooltip>
            </div>

            <div className="flex-1">
              <ScrollArea className="h-full w-full" type="always">
                <div className="absolute inset-0 p-4">
                  <Image
                    src={src}
                    alt={alt || "Image"}
                    fill
                    sizes="100vw"
                    className="object-contain"
                    priority
                  />
                </div>
              </ScrollArea>
            </div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </TooltipProvider>
  );
}
