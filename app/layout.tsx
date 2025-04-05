import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono, Urbanist } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { ProgressBar, SkipLink } from '@/components/shared';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Providers } from './providers';

// Font setup
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
});

const urbanist = Urbanist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-urbanist',
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
  preload: true,
});

// Enhanced metadata
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000'
  ),
  title: {
    default: 'Innovation Bootcamp University | From Paying to Earning Tech Skills',
    template: '%s | Innovation Bootcamp University',
  },
  description: 'Our cooperative education model transitions you from student to paid professional. Start with foundational learning, then progress to earning.',
  keywords: [
    'bootcamp',
    'tech education',
    'coding',
    'programming',
    'cooperative education',
    'experiential learning',
    'tiered education',
    'web development',
    'AI',
    'machine learning',
    'robotics',
  ],
  authors: [{ name: 'Innovation Bootcamp University' }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Innovation Bootcamp University | From Paying to Earning Tech Skills',
    description: 'Our cooperative education model transitions you from student to paid professional. Start with foundational learning, then progress to earning.',
    images: [
      {
        url: '/logos/newlogo.png',
        width: 192,
        height: 192,
        alt: 'Innovation Bootcamp University',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Innovation Bootcamp University | From Paying to Earning Tech Skills',
    description: 'Our cooperative education model transitions you from student to paid professional. Start with foundational learning, then progress to earning.',
    images: ['/logos/newlogo.png'],
    creator: '@InnovationBoot',
  },
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/logos/favicon.ico', sizes: '32x32' },
      { url: '/logos/logo.svg', type: 'image/svg+xml' },
      { url: '/logos/newlogo.png', sizes: '192x192' },
    ],
    apple: [{ url: '/logos/newlogo.png' }],
  },
  other: {
    'google-site-verification': 'your-verification-code',
    structured: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'EducationalOrganization',
      name: 'Innovation Bootcamp University',
      description: 'Get paid to learn tech skills with our innovative tiered program',
      url: 'https://innovationbootcamp.edu',
      sameAs: [
        'https://twitter.com/innovbootcamp',
        'https://linkedin.com/company/innovationbootcamp',
        'https://github.com/innovationbootcamp'
      ]
    })
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={cn(
        'scroll-smooth',
        inter.variable,
        urbanist.variable,
        jetbrainsMono.variable
      )}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            // Force light mode
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
          `
        }} />
      </head>
      <body className={cn(
        'min-h-screen font-sans antialiased',
        'bg-background text-foreground',
        'selection:bg-primary-500/20 selection:text-foreground'
      )}>
        <Providers>
          <SkipLink />
          <ProgressBar />
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="relative flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
