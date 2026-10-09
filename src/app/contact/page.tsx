import type { Metadata } from "next";
import { toPlainText } from "next-sanity";
import { cache } from "react";

import { CustomPortableText } from "@/components/custom-portable-text";
import { ArrowUpRight } from "@/components/site-icon";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Bruno Fernandes.",
};
const defaultLinks = [
  {
    label: "Email",
    detail: "brunocpf@outlook.com",
    href: "mailto:brunocpf@outlook.com",
  },
  {
    label: "GitHub",
    detail: "@brunocpf",
    href: "https://github.com/brunocpf",
  },
  {
    label: "LinkedIn",
    detail: "Bruno Fernandes",
    href: "https://www.linkedin.com/in/brunofernandes-/",
  },
];
const getContact = cache(async () => {
  const content = await getContent("contact");
  // Keep CMS-managed contact destinations while presenting each destination once.
  const linkedBlocks =
    content?.body.filter(
      (block) =>
        block._type === "block" &&
        block.listItem &&
        block.markDefs?.some((mark) => mark._type === "link"),
    ) ?? [];
  const extraLinks = linkedBlocks
    .flatMap((block) =>
      (block.markDefs ?? [])
        .filter(
          (mark) => mark._type === "link" && typeof mark.href === "string",
        )
        .map((mark) => ({
          label: toPlainText([block]),
          detail: "View profile",
          href: mark.href as string,
        })),
    )
    .filter(
      (link) =>
        !defaultLinks.some(
          (existing) =>
            existing.label.toLowerCase() === link.label.toLowerCase(),
        ),
    );
  const prose =
    content?.body.filter(
      (block) =>
        !linkedBlocks.includes(block) &&
        !(
          block._type === "block" &&
          toPlainText([block]).trim().toLowerCase() === "contact"
        ),
    ) ?? [];
  return { prose, extraLinks };
});

function ContactLink({ link }: { link: (typeof defaultLinks)[number] }) {
  return (
    <a
      href={link.href}
      target={link.href.startsWith("https") ? "_blank" : undefined}
      rel={link.href.startsWith("https") ? "noopener noreferrer" : undefined}
    >
      <span>{link.label}</span>
      <span>{link.detail}</span>
      <ArrowUpRight aria-hidden="true" />
    </a>
  );
}

async function ContactCopy() {
  const { prose } = await getContact();
  return prose.length > 0 ? (
    <div className="prose contact-copy">
      <CustomPortableText demoteHeadings value={prose} />
    </div>
  ) : null;
}

async function ExtraContacts() {
  const { extraLinks } = await getContact();
  return (
    <>
      {extraLinks.map((link) => (
        <ContactLink key={link.href} link={link} />
      ))}
    </>
  );
}

export default function Contact() {
  return (
    <section className="contact-page container">
      <header className="inner-page-heading">
        <h1>Contact</h1>
      </header>
      <ContactCopy />
      <div className="contact-options">
        {defaultLinks.map((link) => (
          <ContactLink key={link.href} link={link} />
        ))}
        <ExtraContacts />
      </div>
    </section>
  );
}
