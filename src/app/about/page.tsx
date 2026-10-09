import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

import { ProseSkeleton } from "@/components/content-skeleton";
import { CustomPortableText } from "@/components/custom-portable-text";
import { ArrowUpRight } from "@/components/site-icon";
import { getContent } from "@/lib/content";

import portrait from "../../../public/img/hero.jpg";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Bruno Fernandes, a software developer in Belo Horizonte, Brazil.",
};
export default function About() {
  return (
    <section className="about-page container">
      <header className="inner-page-heading">
        <h1>About</h1>
        <p>Bruno Fernandes · Belo Horizonte, Brazil</p>
      </header>
      <div className="about-layout">
        <figure>
          <Image
            src={portrait}
            alt="Bruno Fernandes"
            sizes="(max-width: 700px) 90vw, 360px"
            className="about-portrait"
            draggable={false}
          />
        </figure>
        <div>
          <div className="prose about-copy">
            <Suspense fallback={<ProseSkeleton />}>
              <AboutCopy />
            </Suspense>
          </div>
          <Link className="text-link" href="/contact">
            Contact me <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

async function AboutCopy() {
  const content = await getContent("about");
  return (
    <>
      {content ? (
        <CustomPortableText demoteHeadings value={content.body} />
      ) : (
        <p>
          I’m a software developer in Belo Horizonte, Brazil. This is where I
          share my projects, experiences, and discoveries, both as a developer
          and in my personal life.
        </p>
      )}
    </>
  );
}
