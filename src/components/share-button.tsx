"use client";

import { useState } from "react";

import { Check, Share2 } from "@/components/site-icon";

export interface ShareButtonProps {
  url: string;
  title: string;
  text: string;
}
export function ShareButton({ title, url, text }: ShareButtonProps) {
  const [status, setStatus] = useState("");
  async function share() {
    try {
      if (navigator.share) await navigator.share({ title, url, text });
      else {
        await navigator.clipboard.writeText(url);
        setStatus("Link copied");
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setStatus("Couldn’t share. Copy the address from your browser.");
    }
  }
  return (
    <div className="share-control">
      <button className="text-link" onClick={share}>
        {status === "Link copied" ? (
          <Check size={17} aria-hidden="true" />
        ) : (
          <Share2 size={17} aria-hidden="true" />
        )}{" "}
        Share post
      </button>
      <span role="status">{status}</span>
    </div>
  );
}
