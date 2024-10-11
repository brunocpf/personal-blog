import { groq, PortableTextBlock } from "next-sanity";
import { Metadata } from "next";
import { CustomPortableText } from "@/components/custom-portable-text";
import client from "@/client";

export const metadata: Metadata = {
  title: "About | bruno-fernandes.dev",
  description: "About Bruno",
};

export default async function About() {
  const content = await client.fetch<{
    title: string;
    body: PortableTextBlock[];
  }>(
    groq`
        *[_type == "content" && slug.current == "about"][0]{
            title,
            body
        }`,
  );

  return (
    <div className="bg-card min-h-screen">
      <div className="container py-8">
        <article className="rounded bg-card shadow-lg dark:border-2">
          <div className="p-4 prose min-w-full">
            <CustomPortableText value={content.body} />
          </div>
        </article>
      </div>
    </div>
  );
}
