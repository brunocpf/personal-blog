import Image from "next/image";

import { ContactLinks } from "@/components/contact-links";

const bio = `I'm a software developer located in Belo Horizonte (MG), Brazil. I currently work full time as a web developer, but I'm always open to taking on new exciting projects. This is my space on the internet, where I share my projects, experiences and discoveries, both as a developer and in my personal life.`;

export function HeroSection() {
  return (
    <div className="container flex flex-wrap py-8">
      <div className="max-w-60 flex-grow-0 basis-1/3">
        <div className="relative h-0 w-full overflow-hidden rounded-full pb-[100%]">
          <Image
            src="/img/hero.png"
            alt="Hero Image"
            fill
            className="object-cover object-[80%_35%]"
            sizes="50vw"
            draggable={false}
          />
        </div>
      </div>
      <div className="ml-8 flex-1">
        <header>
          <h1 className="text-xl font-semibold">Bruno Fernandes</h1>
          <p>Software Engineer, Web Developer, App Developer</p>
        </header>
        <p className="mt-8 hidden sm:block">{bio}</p>
        <div className="my-1 hidden w-fit sm:block">
          <ContactLinks size="md" />
        </div>
      </div>
      <p className="mt-8 block sm:hidden">{bio}</p>
      <div className="my-1 block w-fit sm:hidden">
        <ContactLinks size="md" />
      </div>
    </div>
  );
}
