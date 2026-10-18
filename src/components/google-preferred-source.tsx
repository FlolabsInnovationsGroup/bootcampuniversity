"use client";

import { useEffect, useId, useRef, useState } from "react";

const SCRIPT_SRC = "https://news.google.com/swg/js/v1/publisher.js";
const PREFERRED_SOURCE_URL = "https://www.google.com/preferences/source?q=www.bootcampuniversity.org";
const DISMISS_KEY = "ibu-google-preferred-source";
const SITE_NAME = "Innovation Bootcamp University";

type PreferredSourceApi = {
  init: (options?: { theme?: "light" | "dark"; lang?: string }) => void;
  addPreferredSource: () => void;
};

type PreferredSourceQueue = {
  push: (...callbacks: Array<(api: PreferredSourceApi) => void>) => void;
  api?: PreferredSourceApi;
};

declare global {
  interface Window {
    PREFERRED_SOURCE?: PreferredSourceApi[] | PreferredSourceQueue;
  }
}

let readyApi: PreferredSourceApi | null = null;
let loadStarted = false;

function currentTheme(): "light" | "dark" {
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

function isProductionHost() {
  const host = window.location.hostname;
  return host === "bootcampuniversity.org" || host === "www.bootcampuniversity.org";
}

function rememberApi(api: PreferredSourceApi) {
  readyApi = api;
  api.init({ theme: currentTheme(), lang: "en" });
}

export function loadGooglePreferredSource() {
  if (typeof window === "undefined" || loadStarted) return;
  loadStarted = true;

  const existing = window.PREFERRED_SOURCE;
  if (existing && !Array.isArray(existing) && existing.api) {
    rememberApi(existing.api);
    return;
  }

  const callback = (api: PreferredSourceApi) => rememberApi(api);
  if (Array.isArray(existing)) {
    existing.push(callback);
  } else if (existing && "push" in existing) {
    existing.push(callback);
  } else {
    window.PREFERRED_SOURCE = [callback];
  }

  if (document.querySelector(`script[src="${SCRIPT_SRC}"]`)) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = SCRIPT_SRC;
  script.setAttribute("preferred-sources-control", "manual");
  document.head.appendChild(script);
}

export function openGooglePreferredSource() {
  if (isProductionHost() && readyApi) {
    readyApi.init({ theme: currentTheme(), lang: "en" });
    readyApi.addPreferredSource();
    return;
  }

  window.open(PREFERRED_SOURCE_URL, "_blank", "noopener,noreferrer");
}

function hasDismissedPrompt() {
  try {
    return window.localStorage.getItem(DISMISS_KEY) === "1";
  } catch {
    return true;
  }
}

function dismissPrompt() {
  try {
    window.localStorage.setItem(DISMISS_KEY, "1");
  } catch {
    // Private browsing can block storage. The prompt still closes for this view.
  }
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" className="shrink-0">
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.2-2.27H12v4.51h6.47a5.53 5.53 0 0 1-2.4 3.58v2.98h3.86c2.26-2.08 3.56-5.15 3.56-8.8z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.93l-3.86-2.98c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.29A7.2 7.2 0 0 1 4.89 12c0-.8.14-1.58.38-2.31V6.6H1.29A12 12 0 0 0 0 12c0 1.94.46 3.77 1.29 5.4l3.98-3.11z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.6l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75z"
      />
    </svg>
  );
}

export function GooglePreferredSourceButton() {
  useEffect(() => {
    loadGooglePreferredSource();
  }, []);

  return (
    <button
      type="button"
      onClick={openGooglePreferredSource}
      className="focus-ring mt-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#2b2b2b] px-3.5 py-1.5 text-[13px] font-medium text-white transition-colors hover:border-white/35 hover:bg-[#343434]"
    >
      <GoogleMark />
      Add as preferred source on Google
    </button>
  );
}

export function GooglePreferredSourcePrompt() {
  const titleId = useId();
  const descriptionId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadGooglePreferredSource();
    if (hasDismissedPrompt()) return;

    const timeoutId = window.setTimeout(() => setOpen(true), 700);
    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement;
    dialogRef.current?.focus();
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        dismissPrompt();
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", onKeyDown);
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [open]);

  if (!open) return null;

  const close = () => {
    dismissPrompt();
    setOpen(false);
  };

  const confirm = () => {
    dismissPrompt();
    setOpen(false);
    openGooglePreferredSource();
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center px-4 py-8">
      <div className="absolute inset-0 bg-black/65" onClick={close} />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        tabIndex={-1}
        className="relative w-full max-w-[40rem] rounded-2xl border border-[color:color-mix(in_srgb,var(--text)_14%,transparent)] bg-[var(--surface)] px-6 py-6 text-[var(--text)] shadow-[0_24px_80px_rgb(0_0_0_/_0.45)] outline-none sm:px-7 sm:py-7"
      >
        <div className="flex items-start gap-3">
          <span className="mt-0.5">
            <GoogleMark />
          </span>
          <h2 id={titleId} className="text-wrap text-[1.25rem] leading-snug font-semibold tracking-[-0.02em] sm:text-[1.45rem]">
            <span className="block">Add {SITE_NAME}</span>
            <span className="block">as a preferred source?</span>
          </h2>
        </div>
        <p id={descriptionId} className="mt-4 text-[0.98rem] leading-relaxed text-[var(--text-muted)]">
          Google can show {SITE_NAME} more often in Search. You can change this anytime in your Google preferences.
        </p>
        <div className="mt-7 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={close}
            className="focus-ring rounded-lg px-4 py-2 text-[0.95rem] font-medium text-[var(--text)] transition-colors hover:bg-[color:color-mix(in_srgb,var(--text)_8%,transparent)]"
          >
            Not now
          </button>
          <button
            type="button"
            onClick={confirm}
            className="focus-ring rounded-lg bg-[var(--primary)] px-5 py-2 text-[0.95rem] font-semibold text-[var(--button-primary-text)] transition-colors hover:bg-[#39c7e8]"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
