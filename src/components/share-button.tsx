"use client";

import { Share2Icon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";

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
        if (error instanceof Error && error.name === "AbortError") {
          console.warn("Sharing aborted:", error);
          return;
        } else {
          console.error("Error sharing:", error);
        }
      }
    }
  };

  return (
    <Button
      variant="ghost"
      className="h-fit rounded-full p-2"
      onClick={handleShare}
    >
      <Share2Icon />
    </Button>
  );
}
