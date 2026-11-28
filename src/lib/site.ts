export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.bootcampuniversity.org"
).replace(/\/$/, "");

export const SITE_NAME = "Innovation Bootcamp University";

export const SITE_DESCRIPTION =
  "Innovation Bootcamp University connects structured education to real internships across AI, software, robotics and business. Remote-first, no experience needed.";

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export function absoluteUrl(path = "/") {
  return new URL(path, `${SITE_URL}/`).toString();
}
