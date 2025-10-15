"use client";

import { Share2Icon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

export interface ShareButtonProps {
  url: string;
  title: string;
  text: string;
}

export function ShareButton({ title, url, text }: ShareButtonProps) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url,
          text,
        });
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          console.warn("Sharing aborted:", error);
          return;
        } else if (
          error instanceof DOMException &&
          error.name === "InvalidStateError"
        ) {
          console.warn("Sharing failed: Invalid state", error);
        } else {
          console.error("Error sharing:", error);
        }
      }
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="link"
            className="h-fit w-fit rounded-full p-2 text-primary hover:bg-accent focus-visible:bg-accent cursor-pointer"
            onClick={handleShare}
            aria-label="Share this post"
          >
            <Share2Icon />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="m-0!">Share this post</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
