import type { Metadata } from "next";
import { ORGANIZATION_ID, SITE_NAME, WEBSITE_ID, absoluteUrl } from "@/lib/site";

export const OG_IMAGE = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: `${SITE_NAME}: learn first, grow into earning opportunities`
};

type PageMetadataInput = {
  /** Page title; the root layout template appends the site name. */
  title: string;
  description: string;
  /** Route path, e.g. "/internships". Used for the canonical and og:url. */
  path: string;
  /** Use the title as-is instead of applying the layout template. */
  absoluteTitle?: boolean;
  robots?: Metadata["robots"];
};

/**
 * Builds per-page metadata: unique title and description, a self-referencing
 * canonical and matching Open Graph / Twitter fields. A child openGraph object
 * replaces the parent's instead of merging, so the share image is set here too.
 */
export function pageMetadata({ title, description, path, absoluteTitle, robots }: PageMetadataInput): Metadata {
  const socialTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "en_US",
      url: path,
      title: socialTitle,
      description,
      images: [OG_IMAGE]
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [OG_IMAGE.url]
    },
    ...(robots ? { robots } : {})
  };
}

/** Search results cut titles at roughly 60 characters. */
export const TITLE_MAX_LENGTH = 60;

/** Returns the first candidate title that fits, or the last one when none does. */
export function fitTitle(candidates: string[], max = TITLE_MAX_LENGTH) {
  return candidates.find((candidate) => candidate.length <= max) ?? candidates[candidates.length - 1];
}

/** Shortens text to at most `max` characters on a word boundary. */
export function truncateDescription(text: string, max = 155) {
  const normalized = text
    .replace(/\s+/g, " ")
    .replace(/ ([,.;:!?])/g, "$1")
    .trim();
  if (normalized.length <= max) return normalized;
  const cut = normalized.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 80 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:.\-]+$/, "")}…`;
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path)
    }))
  };
}

export function webPageJsonLd({
  name,
  description,
  path,
  type = "WebPage"
}: {
  name: string;
  description: string;
  path: string;
  type?: string;
}) {
  return {
    "@type": type,
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name,
    description,
    inLanguage: "en",
    isPartOf: { "@id": WEBSITE_ID },
    publisher: { "@id": ORGANIZATION_ID }
  };
}

/** Wraps nodes in a single schema.org @graph. */
export function jsonLdGraph(...nodes: object[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes
  };
}
