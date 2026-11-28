export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.bootcampuniversity.org"
).replace(/\/$/, "");

export const SITE_NAME = "Innovation Bootcamp University";

export const SITE_DESCRIPTION =
  "Innovation Bootcamp University connects structured education to real internships across AI, software, robotics and business. Remote-first, no experience needed.";

/** Official social profiles (same URLs as the footer social links). */
export const SOCIAL_PROFILES = [
  "https://www.youtube.com/@flolabsinnovation",
  "https://www.linkedin.com/company/flolabs-innovation/",
  "https://www.facebook.com/people/Flo-Labs-RD/61572285432918/",
  "https://www.instagram.com/flolabsinnovations/",
  "https://www.tiktok.com/@flomadlabs",
  "https://www.reddit.com/user/FloLabs_Innovations/"
];

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export function absoluteUrl(path = "/") {
  return new URL(path, `${SITE_URL}/`).toString();
}
