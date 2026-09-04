export const PREFERRED_SOURCE_DOMAIN = "www.bootcampuniversity.org";

export const PREFERRED_SOURCE_DEEPLINK = `https://www.google.com/preferences/source?q=${PREFERRED_SOURCE_DOMAIN}`;

export const PREFERRED_SOURCE_SCRIPT_SRC =
  "https://news.google.com/swg/js/v1/publisher.js";

export const PREFERRED_SOURCE_DISMISS_KEY =
  "innovation-bootcamp-university.preferred-source.dismissed-at";

export const PREFERRED_SOURCE_DISMISS_MS = 30 * 24 * 60 * 60 * 1000;

export const PREFERRED_SOURCE_CHIP_DELAY_MS = 10_000;

export const PREFERRED_SOURCE_CHIP_SCROLL_PX = 320;

const PRIVATE_PATH_PREFIXES = [
  "/login",
  "/auth",
  "/account",
  "/admin",
  "/signup",
  "/register",
  "/me",
  "/profile",
  "/dashboard"
] as const;

export function isPreferredSourcePrivatePath(pathname: string) {
  return PRIVATE_PATH_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

export function readPreferredSourceDismissedAt(storage: Pick<Storage, "getItem"> | null) {
  if (!storage) {
    return null;
  }

  const raw = storage.getItem(PREFERRED_SOURCE_DISMISS_KEY);
  if (!raw) {
    return null;
  }

  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : null;
}

export function writePreferredSourceDismissedAt(storage: Pick<Storage, "setItem">, at: number) {
  storage.setItem(PREFERRED_SOURCE_DISMISS_KEY, String(at));
}

export function isPreferredSourceDismissed(
  now: number,
  dismissedAt: number | null,
  ttl = PREFERRED_SOURCE_DISMISS_MS
) {
  if (dismissedAt == null) {
    return false;
  }

  return now - dismissedAt < ttl;
}

export function getPreferredSourceTheme(): "light" | "dark" {
  if (typeof document === "undefined") {
    return "dark";
  }

  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}
