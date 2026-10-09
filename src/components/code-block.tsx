import SyntaxHighlighter from "react-syntax-highlighter";

import { ClipboardCopyButton } from "@/components/clipboard-copy-button";

export function CodeBlock({
  children,
  language,
}: {
  children: string;
  language: string;
}) {
  return (
    <div className="code-block not-prose">
      <div className="code-toolbar">
        <span>{language}</span>
        <ClipboardCopyButton text={children} />
      </div>
      <SyntaxHighlighter
        language={language}
        useInlineStyles={false}
        showLineNumbers
        lineNumberStyle={{
          color: "var(--color-quiet)",
          minWidth: "2.5em",
          paddingRight: "1em",
          userSelect: "none",
        }}
        customStyle={{
          margin: 0,
          padding: "20px",
          background: "transparent",
          color: "inherit",
        }}
      >
        {children.replace(/\r?\n$/, "")}
      </SyntaxHighlighter>
    </div>
  );
}
