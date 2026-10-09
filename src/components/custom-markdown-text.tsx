import { MDXRemote } from "next-mdx-remote-client/rsc";
import type {
  MDXRemoteOptions,
  MDXComponents,
} from "next-mdx-remote-client/rsc";

import { CodeBlock } from "@/components/code-block";
import { ExpandableImage } from "@/components/expandable-image";

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
  pre: ({ children }) => <div className="not-prose">{children}</div>,
  blockquote: (props) => {
    return (
      <blockquote
        {...props}
        className="[&>p]:not-italic [&>p]:before:content-none"
      />
    );
  },
  code: ({ children, className }) => {
    const language = className?.replace(/language-/, "");
    return language ? (
      <CodeBlock language={language}>{children}</CodeBlock>
    ) : (
      <code className="inline-code">{children}</code>
    );
  },
  img: ({ title, src, alt, ...rest }) => {
    if (typeof src !== "string" || src.length === 0) return null;

    return <ExpandableImage src={src} alt={alt} title={title} {...rest} />;
  },
};

export async function CustomMarkdownText({ value }: { value: string }) {
  const options: MDXRemoteOptions = {};

  return <MDXRemote source={value} options={options} components={components} />;
}
