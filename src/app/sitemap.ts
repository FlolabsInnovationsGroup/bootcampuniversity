import type { MetadataRoute } from "next";
import { resources } from "@/content/site-content";
import { getAllInternships } from "@/lib/strapi";
import { SITE_URL } from "@/lib/site";

export const revalidate = 3600;

const staticRoutes: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/internships", changeFrequency: "daily", priority: 0.9 },
  { path: "/projects", changeFrequency: "weekly", priority: 0.8 },
  { path: "/resources", changeFrequency: "monthly", priority: 0.8 },
  { path: "/company", changeFrequency: "monthly", priority: 0.7 },
  { path: "/company/contact", changeFrequency: "monthly", priority: 0.6 },
  { path: "/company/press", changeFrequency: "monthly", priority: 0.5 },
  { path: "/legal/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/legal/terms-of-service", changeFrequency: "yearly", priority: 0.3 },
  { path: "/legal/cookie-policy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/legal/accessibility", changeFrequency: "yearly", priority: 0.3 }
];

function toAbsoluteUrl(path: string) {
  return new URL(path, `${SITE_URL}/`).toString();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const internships = await getAllInternships();
  const lastModified = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: toAbsoluteUrl(route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority
  }));

  const resourceEntries: MetadataRoute.Sitemap = resources.map((resource) => ({
    url: toAbsoluteUrl(`/resources/${resource.slug}`),
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7
  }));

  const internshipEntries: MetadataRoute.Sitemap = internships
    .filter((internship) => internship.slug)
    .map((internship) => ({
      url: toAbsoluteUrl(`/internships/${internship.slug}`),
      lastModified,
      changeFrequency: "weekly",
      priority: internship.status === "Open" ? 0.8 : 0.4
    }));

  return [...staticEntries, ...resourceEntries, ...internshipEntries];
}
