import {
  Github as GithubIcon,
  Linkedin as LinkedinIcon,
  Mail as MailIcon,
} from "@geist-ui/icons";
import { Button } from "@/components/ui/button";

export interface ContactLinksProps {
  size?: "sm" | "md" | "lg";
}

const classesForSize = {
  sm: "w-6 h-6",
  md: "w-8 h-8",
  lg: "w-10 h-10",
} as const;

export function ContactLinks({ size = "sm" }: ContactLinksProps) {
  return (
    <div className="flex justify-center gap-1">
      <Button
        variant="link"
        className="hover:bg-accent focus-visible:bg-accent rounded-full text-primary p-2 h-fit w-fit"
        asChild
      >
        <a
          href="https://github.com/brunocpf"
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub"
        >
          <GithubIcon className={classesForSize[size]} />
        </a>
      </Button>
      <Button
        variant="link"
        className="hover:bg-accent focus-visible:bg-accent rounded-full text-primary p-2 h-fit w-fit"
        asChild
      >
        <a
          href="https://www.linkedin.com/in/bruno-cesar-pimenta-fernandes-72a2a6139/"
          target="_blank"
          rel="noopener noreferrer"
          title="LinkedIn"
        >
          <LinkedinIcon className={classesForSize[size]} />
        </a>
      </Button>

      <Button
        variant="link"
        className="hover:bg-accent focus-visible:bg-accent rounded-full text-primary p-2 h-fit w-fit"
        asChild
        title="Email"
      >
        <a
          href="mailto:brunocpf@outlook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <MailIcon className={classesForSize[size]} />
        </a>
      </Button>
    </div>
  );
}
