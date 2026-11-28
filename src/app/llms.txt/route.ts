import { hero, projectsPage, resources } from "@/content/site-content";
import { SITE_NAME, absoluteUrl } from "@/lib/site";
import { getAllInternships } from "@/lib/strapi";

export const revalidate = 3600;

// Curated map of the site for AI agents (https://llmstxt.org). Built only from
// copy already published on the site and the live internship list.
export async function GET() {
  const internships = await getAllInternships();
  const openRoles = internships
    .filter((internship) => internship.slug && internship.status === "Open")
    .sort((a, b) => a.title.localeCompare(b.title));

  const lines = [
    `# ${SITE_NAME}`,
    "",
    `> ${hero.body}`,
    "",
    `${hero.title} ${hero.lead} Fully remote, open entry: no prior experience required.`,
    "",
    "## Program",
    "",
    `- [About](${absoluteUrl("/company")}): mission and core values`,
    ...resources.map(
      (resource) => `- [${resource.title}](${absoluteUrl(`/resources/${resource.slug}`)}): ${resource.summary}`
    ),
    "",
    "## Internships",
    "",
    `- [Internship Positions](${absoluteUrl("/internships")}): all internship roles and their status`,
    ...openRoles.map(
      (internship) =>
        `- [${internship.title}](${absoluteUrl(`/internships/${internship.slug}`)})${internship.location ? `: ${internship.location}` : ""}`
    ),
    "",
    "## Projects",
    "",
    `- [${projectsPage.title}](${absoluteUrl("/projects")}): ${projectsPage.subtitle}`,
    "",
    "## Contact",
    "",
    `- [Contact Us](${absoluteUrl("/company/contact")})`,
    ""
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" }
  });
}
