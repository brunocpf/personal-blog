"use client";

import { Button } from "./ui/button";
import { Share2Icon } from "@radix-ui/react-icons";

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
        console.error("Error sharing:", error);
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
