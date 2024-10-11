import Image from "next/image";
import { ContactLinks } from "@/components/contact-links";

const bio = `I'm a software developer located in Belo Horizonte (MG), Brazil. I currently work full time as a web developer, but I'm always open to taking on new exciting projects. This is my space on the internet, where I share my projects, experiences and discoveries, both as a developer and in my personal life.`;

export function HeroSection() {
  return (
    <div className="container py-8 flex flex-wrap">
      <div className="flex-grow-0 basis-1/3 max-w-60">
        <div className="w-full h-0 pb-[100%] rounded-full relative overflow-hidden">
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
      <div className="flex-1 ml-8">
        <header>
          <h1 className="text-xl font-semibold">Bruno Fernandes</h1>
          <p>Software Engineer, Web Developer, App Developer</p>
        </header>
        <p className="mt-8 hidden sm:block">{bio}</p>
        <div className="hidden sm:block my-1 w-fit">
          <ContactLinks size="md" />
        </div>
      </div>
      <p className="mt-8 block sm:hidden">{bio}</p>
      <div className="block sm:hidden my-1 w-fit">
        <ContactLinks size="md" />
      </div>
    </div>
  );
}
