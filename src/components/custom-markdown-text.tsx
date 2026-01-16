import { MDXRemote } from "next-mdx-remote-client/rsc";
import type {
  MDXRemoteOptions,
  MDXComponents,
} from "next-mdx-remote-client/rsc";
import Image from "next/image";
import SyntaxHighlighter from "react-syntax-highlighter";

import { ClipboardCopyButton } from "@/components/clipboard-copy-button";

const components: MDXComponents = {
  a: (props) => {
    return (
      <a
        className="underline transition hover:opacity-50"
        {...props}
        rel="noreferrer noopener"
        target={props.href?.startsWith("/") ? undefined : "_blank"}
      >
        {props.children}
      </a>
    );
  },
  pre: (props) => {
    return <pre {...props} className="not-prose" />;
  },
  blockquote: (props) => {
    return (
      <blockquote
        {...props}
        className="[&>p]:not-italic [&>p]:before:content-none"
      />
    );
  },
  code: ({ children, className, ...rest }) => {
    const language = className?.replace(/language-/, "");

    if (language) {
      return (
        <span className="relative block dark:invert">
          <div className="absolute top-2 right-2 z-10">
            <ClipboardCopyButton text={children} className="dark:invert" />
          </div>

          <SyntaxHighlighter
            showLineNumbers
            showInlineLineNumbers
            language={language}
            wrapLines={false}
            wrapLongLines={false}
            customStyle={{
              padding: "1em",
              marginBottom: "2em",
            }}
            {...rest}
          >
            {children.replace(/\r?\n$/, "")}
          </SyntaxHighlighter>
        </span>
      );
    } else {
      return (
        <code
          className="rounded bg-gray-100 px-1 py-0.5 whitespace-pre-wrap text-current dark:bg-black"
          {...rest}
        >
          {children}
        </code>
      );
    }
  },
  img: ({ title, src, alt, ...rest }) => {
    return (
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
        {title && (
          <figcaption className="font-sans text-sm text-gray-600">
            {title}
          </figcaption>
        )}
      </figure>
    );
  },
};

export async function CustomMarkdownText({ value }: { value: string }) {
  const options: MDXRemoteOptions = {};

  return <MDXRemote source={value} options={options} components={components} />;
}
