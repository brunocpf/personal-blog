import { Metadata } from "next";
import { groq, PortableTextBlock } from "next-sanity";

import client from "@/client";
import { CustomPortableText } from "@/components/custom-portable-text";

export const metadata: Metadata = {
  title: "Contact | bruno-fernandes.dev",
  description: "About Bruno",
};

export default async function About() {
  const content = await client.fetch<{
    title: string;
    body: PortableTextBlock[];
  }>(
    groq`
        *[_type == "content" && slug.current == "contact"][0]{
            title,
            body
        }`,
  );

  return (
    <div className="min-h-screen bg-card">
      <div className="container py-8">
        <article className="rounded bg-card shadow-lg dark:border-2">
          <div className="prose min-w-full p-4">
            <CustomPortableText value={content.body} />
          </div>
        </article>
      </div>
    </div>
  );
}
