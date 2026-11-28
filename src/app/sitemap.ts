import type { MetadataRoute } from "next";
import { resources } from "@/content/site-content";
import { getAllInternshipsOrThrow, type Internship } from "@/lib/strapi";
import { SITE_URL } from "@/lib/site";

export const revalidate = 3600;

// lastModified is only set where a real date exists: the "Last updated" date
// shown on the legal pages and the Strapi updatedAt of each internship.
// /company/press is left out while it is noindex.
const LEGAL_LAST_UPDATED = new Date("2024-03-24");

const staticRoutes: Array<{ path: string; lastModified?: Date }> = [
  { path: "/" },
  { path: "/internships" },
  { path: "/projects" },
  { path: "/resources" },
  { path: "/company" },
  { path: "/company/contact" },
  { path: "/legal/privacy-policy", lastModified: LEGAL_LAST_UPDATED },
  { path: "/legal/terms-of-service", lastModified: LEGAL_LAST_UPDATED },
  { path: "/legal/cookie-policy", lastModified: LEGAL_LAST_UPDATED },
  { path: "/legal/accessibility", lastModified: LEGAL_LAST_UPDATED }
];

function toAbsoluteUrl(path: string) {
  return new URL(path, `${SITE_URL}/`).toString();
}

async function loadInternships(): Promise<Internship[]> {
  try {
    return await getAllInternshipsOrThrow();
  } catch (error) {
    // During a build there is no earlier sitemap to fall back on, so continue
    // without internships. At runtime, rethrow so ISR keeps serving the last
    // good sitemap instead of one that silently drops every internship URL.
    if (process.env.NEXT_PHASE === "phase-production-build") {
      console.error("Sitemap: failed to fetch internships during build:", error);
      return [];
    }
    throw error;
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const internships = await loadInternships();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: toAbsoluteUrl(route.path),
    ...(route.lastModified ? { lastModified: route.lastModified } : {})
  }));

  const resourceEntries: MetadataRoute.Sitemap = resources.map((resource) => ({
    url: toAbsoluteUrl(`/resources/${resource.slug}`)
  }));

  const internshipEntries: MetadataRoute.Sitemap = internships
    .filter((internship) => internship.slug)
    .map((internship) => {
      const updated = internship.updatedAt ? new Date(internship.updatedAt) : null;
      return {
        url: toAbsoluteUrl(`/internships/${internship.slug}`),
        ...(updated && !Number.isNaN(updated.getTime()) ? { lastModified: updated } : {})
      };
    });

  return [...staticEntries, ...resourceEntries, ...internshipEntries];
}
