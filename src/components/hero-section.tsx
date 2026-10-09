import Image from "next/image";
import Link from "next/link";

import { ArrowUpRight } from "@/components/site-icon";

import portrait from "../../public/img/hero.jpg";

export function HeroSection() {
  return (
    <section className="author-intro container" aria-labelledby="intro-title">
      <div className="intro-copy">
        <h1 id="intro-title">
          Bruno Fernandes<span aria-hidden="true">.</span>
        </h1>
        <p>
          Software developer in Belo Horizonte, Brazil.
          <br className="intro-break" /> I write about web development and my
          projects.
        </p>
        <Link href="/about" className="text-link intro-about">
          More about me <ArrowUpRight size={18} />
        </Link>
      </div>
      <div className="portrait-composition">
        <div className="portrait-outline" aria-hidden="true" />
        <Image
          src={portrait}
          alt="Bruno Fernandes"
          width={160}
          height={160}
          sizes="(max-width: 700px) 88px, 160px"
          className="author-portrait"
          draggable={false}
          preload
        />
      </div>
    </section>
  );
}
