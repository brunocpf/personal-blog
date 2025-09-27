"use client";

import {
  Clipboard as ClipboardIcon,
  Check as CheckIcon,
} from "@geist-ui/icons";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface ClipboardCopyButtonProps {
  text: string;
  className?: string;
}

export function ClipboardCopyButton({
  text,
  className,
}: ClipboardCopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleCopy = async () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      setCopied(false);
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      timeoutRef.current = setTimeout(() => setCopied(false), 1000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={handleCopy}
            className={`${className} px-2 py-1 h-fit w-fit cursor-pointer rounded-full p-2 text-primary hover:bg-accent focus-visible:bg-accent`}
            aria-label="Copy code to clipboard"
            variant="outline"
          >
            {copied ? (
              <CheckIcon className="w-4 h-4" />
            ) : (
              <ClipboardIcon className="w-4 h-4" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="m-0!">Copy to clipboard</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
