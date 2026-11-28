import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { SiteNavbar } from "@/components/site-navbar";
import { Footer } from "@/components/Footer";
import { NoOrphanWords } from "@/components/ui/no-orphan-words";
import { JsonLd } from "@/components/json-ld";
import { OG_IMAGE, jsonLdGraph } from "@/lib/seo";
import {
  ORGANIZATION_ID,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  WEBSITE_ID,
  absoluteUrl
} from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
  icons: {
    icon: "/flolabs-logo.svg",
  },

  // Google Search Console verification
  verification: {
    google: "F5DDKTkbYV5m5cCrVvYlq5e-SO-caM64Ttg_Dy-UQns",
  },
};

const siteJsonLd = jsonLdGraph(
  {
    "@type": "EducationalOrganization",
    "@id": ORGANIZATION_ID,
    name: SITE_NAME,
    alternateName: "Bootcamp University",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/flolabs-logo.svg"),
    },
    description:
      "Innovation Bootcamp University connects structured education directly to real internships across AI, software, robotics, business, and more.",
    // No sameAs: the footer's social accounts belong to the FloLabs group, which
    // the footer lists as a separate entity, so they do not identify this one.
  },
  {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    alternateName: "Bootcamp University",
    inLanguage: "en",
    publisher: { "@id": ORGANIZATION_ID },
  }
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="beforeInteractive">
          {`
            (function(w,d,s,l,i){
              w[l]=w[l]||[];
              w[l].push({
                'gtm.start': new Date().getTime(),
                event: 'gtm.js'
              });

              var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),
                  dl=l!='dataLayer'?'&l='+l:'';

              j.async=true;
              j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-PC5FC73J');
          `}
        </Script>
        {/* End Google Tag Manager */}

        <Script id="theme-init" strategy="beforeInteractive">
          {`
            (() => {
              try {
                const stored = localStorage.getItem("theme");

                const theme =
                  stored === "light" || stored === "dark"
                    ? stored
                    : window.matchMedia("(prefers-color-scheme: light)").matches
                      ? "light"
                      : "dark";

                document.documentElement.setAttribute("data-theme", theme);
              } catch (_) {}
            })();
          `}
        </Script>
      </head>

      <body
        className="min-w-0 overflow-x-hidden"
        suppressHydrationWarning
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PC5FC73J"
            height="0"
            width="0"
            title="Google Tag Manager"
            style={{
              display: "none",
              visibility: "hidden",
            }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        <a href="#main-content" className="skip-link focus-ring">
          Skip to main content
        </a>

        <SiteNavbar />

        <main id="main-content" className="container-shell min-w-0 py-10">
          {children}
        </main>

        <Footer />
        <NoOrphanWords />
        <JsonLd data={siteJsonLd} />
      </body>
    </html>
  );
}
