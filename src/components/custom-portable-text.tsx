import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents,
} from "next-sanity";
import SyntaxHighlighter from "react-syntax-highlighter";
import type { Image } from "sanity";

import ImageBox from "@/components/image-box";

export function CustomPortableText({
  paragraphClasses,
  value,
}: {
  paragraphClasses?: string;
  value: PortableTextBlock[];
}) {
  const components: PortableTextComponents = {
    block: {
      normal: ({ children }) => {
        return <p className={paragraphClasses}>{children}</p>;
      },
    },
    marks: {
      link: ({ children, value }) => {
        return (
          <a
            className="underline transition hover:opacity-50"
            href={value?.href}
            rel="noreferrer noopener"
          >
            {children}
          </a>
        );
      },
      inlineCode: ({ children }) => {
        return (
          <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-950 dark:text-gray-100">
            {children}
          </code>
        );
      },
    },
    types: {
      image: ({
        value,
      }: {
        value: Image & { alt?: string; caption?: string };
      }) => {
        return (
          <div className="my-6">
            <ImageBox
              image={value}
              alt={value.alt}
              classesWrapper="relative aspect-[1/1] sm:aspect-[16/9] md:aspect-[4/3]"
            />
            {value?.caption && (
              <div className="font-sans text-sm text-gray-600">
                {value.caption}
              </div>
            )}
          </div>
        );
      },
      code: ({ value, isInline }) => {
        const { code, language } = value;

        if (isInline) {
          return (
            <code
              className="rounded px-1 py-0.5"
              style={{ whiteSpace: "pre-wrap" }}
            >
              {code}
            </code>
          );
        }

        return (
          <div className="dark:invert">
            <SyntaxHighlighter
              showLineNumbers
              showInlineLineNumbers
              language={language}
              customStyle={{
                padding: "1em",
                marginBottom: "2em",
              }}
            >
              {code}
            </SyntaxHighlighter>
          </div>
        );
      },
    },
  };

  return <PortableText components={components} value={value} />;
}
