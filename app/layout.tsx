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
  metadataBase: new URL('https://innovationbootcamp.edu'),
  title: {
    template: '%s | Innovation Bootcamp University',
    default: 'Innovation Bootcamp University | Learn, Earn & Master Tech Skills',
  },
  description: 'Get paid to learn tech skills with Innovation Bootcamp University. Our tiered program combines education with real-world experience.',
  keywords: [
    'tech education',
    'bootcamp',
    'paid internship',
    'tiered education',
    'tech skills',
    'innovation',
    'web development',
    'software engineering',
    'career development',
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
    url: 'https://innovationbootcamp.edu',
    title: 'Innovation Bootcamp University',
    description: 'Get paid to learn tech skills with our innovative tiered program',
    siteName: 'Innovation Bootcamp University',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Innovation Bootcamp University',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Innovation Bootcamp University | Learn, Earn & Master Tech Skills',
    description: 'Get paid to learn tech skills with our innovative tiered program',
    images: ['/images/twitter-image.jpg'],
    creator: '@innovbootcamp',
  },
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/apple-touch-icon.png', sizes: '180x180' },
    ],
    apple: [{ url: '/apple-touch-icon.png' }],
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
