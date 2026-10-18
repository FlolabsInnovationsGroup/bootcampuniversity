import Link from "next/link";
import { sharedPurpose } from "@/content/site-content";

export function SharedPurposeSection() {
  return (
    <section
      aria-labelledby="shared-purpose-title"
      className="relative ml-[calc(50%-50vw)] w-screen max-w-[100vw] bg-[var(--bg)]"
    >
      <div className="mx-auto w-full max-w-[72rem] px-6 py-24 sm:px-10 sm:py-28 lg:px-16 lg:py-32">
        <header className="text-center">
          <p className="text-[0.95rem] font-semibold text-[var(--primary)]">{sharedPurpose.eyebrow}</p>
          <h2
            id="shared-purpose-title"
            className="mt-5 text-[clamp(2.15rem,4.8vw,4.35rem)] leading-[1.06] font-bold tracking-[-0.02em] text-[var(--text)]"
          >
            {sharedPurpose.titleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
        </header>

        <div className="mx-auto mt-16 grid max-w-[62rem] grid-cols-1 gap-14 md:mt-24 md:grid-cols-2 md:gap-x-16 lg:mt-28 lg:gap-x-28">
          <div>
            <h3 className="text-[0.95rem] font-semibold text-[var(--primary)]">{sharedPurpose.missionLabel}</h3>
            <p className="mt-4 max-w-[36ch] text-[1.05rem] leading-[1.35] font-bold text-[var(--text)] sm:text-[1.15rem]">
              {sharedPurpose.missionStatement.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
            <p className="mt-6 max-w-[36ch] text-[0.98rem] leading-[1.65] text-[var(--text-muted)]">{sharedPurpose.missionBody}</p>
          </div>

          <div>
            <h3 className="text-[0.95rem] font-semibold text-[var(--primary)]">{sharedPurpose.visionLabel}</h3>
            <p className="mt-4 max-w-[38ch] text-[1.02rem] leading-[1.55] text-[var(--text)] sm:text-[1.08rem]">
              {sharedPurpose.visionBody}
            </p>
            <div className="mt-14 max-w-[34ch] md:mt-28 lg:mt-36">
              <p className="text-[0.98rem] leading-[1.65] text-[var(--text-muted)]">{sharedPurpose.closing}</p>
              <Link
                href={sharedPurpose.ctaHref}
                className="focus-ring mt-4 inline-flex text-[0.98rem] font-medium text-[var(--text)] underline decoration-[color-mix(in_srgb,var(--text)_55%,transparent)] underline-offset-[6px] transition-colors hover:text-[var(--primary)] hover:decoration-[var(--primary)]"
              >
                {sharedPurpose.ctaLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
