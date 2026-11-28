import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, jsonLdGraph, pageMetadata, webPageJsonLd } from "@/lib/seo";

const title = "Contact Us";
const description =
  "Have questions about Innovation Bootcamp University's programs or cooperative education model? Get in touch or send us a message. Our team is ready to help.";

// The contact page is a client component, so its metadata lives in this layout.
export const metadata: Metadata = pageMetadata({ title, description, path: "/company/contact" });

const contactJsonLd = jsonLdGraph(
  webPageJsonLd({ name: title, description, path: "/company/contact", type: "ContactPage" }),
  breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "About", path: "/company" },
    { name: "Contact Us", path: "/company/contact" }
  ])
);

export default function ContactLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <JsonLd data={contactJsonLd} />
      {children}
    </>
  );
}
