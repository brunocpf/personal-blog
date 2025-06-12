import { Metadata } from "next";
import { groq, PortableTextBlock } from "next-sanity";
import { DotGothic16 } from "next/font/google";
import Image from "next/image";

import client from "@/client";
import { CustomPortableText } from "@/components/custom-portable-text";
import { HeartSpawner } from "@/components/heart-spawner";
import { urlForImage } from "@/lib/sanity-utils";

const pressStart2P = DotGothic16({
  variable: "--dot-gothic-16",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "❤️ | bruno-fernandes.dev",
  description: "❤️",
};

export default async function Special() {
  const content = await client.fetch<{
    title: string;
    body: PortableTextBlock[];
    mainImage: { asset: { _ref: string; _type: string } };
  }>(
    groq`
        *[_type == "content" && slug.current == "12912184-1dc3-4db8-9405-3d5f772d2753"][0]{
            body,
            title,
            mainImage
        }`,
    {},
    {
      cache: "no-store",
    },
  );

  return (
    <div className="bg-card min-h-screen">
      <div className="container py-8">
        <HeartSpawner />
        <article className="rounded bg-card shadow-lg dark:border-2">
          <div
            className={`p-4 prose min-w-fit ${pressStart2P.variable} [font-family:var(--dot-gothic-16)]`}
          >
            <CustomPortableText value={content.body} />
          </div>
          <div className="flex items-center justify-center p-4">
            <Image
              className="select-none [user-drag:none]"
              draggable={false}
              loading="eager"
              src={urlForImage(content.mainImage)?.url() ?? ""}
              alt="Us"
              width={100}
              height={100}
            />
          </div>
        </article>
      </div>
    </div>
  );
}
