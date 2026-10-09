"use client";

import { useState } from "react";

import { Check, Copy } from "@/components/site-icon";

export function ClipboardCopyButton({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const [status, setStatus] = useState("");
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("Copied");
    } catch {
      setStatus("Select the code to copy it manually.");
    }
  }
  return (
    <div className={`copy-control ${className}`}>
      <span role="status">{status}</span>
      <button
        className="icon-button"
        aria-label="Copy code to clipboard"
        onClick={copy}
      >
        {status === "Copied" ? (
          <Check size={18} aria-hidden="true" />
        ) : (
          <Copy size={18} aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
