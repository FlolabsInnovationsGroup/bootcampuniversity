import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono, Urbanist } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ThemeInitializer } from '@/components/shared/ThemeInitializer';
import { Toaster } from '@/components/ui/toaster';
import { Analytics } from '../components/shared/Analytics';

// Font setup
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
});

const urbanist = Urbanist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-urbanist',
  preload: true,
  fallback: ['Inter', 'system-ui', 'sans-serif'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
  preload: true,
  fallback: ['Consolas', 'monospace'],
});

// Viewport & metadata
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  colorScheme: 'light dark',
  viewportFit: 'cover',
};

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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${urbanist.variable} ${jetbrainsMono.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme');
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body
        className={`
          min-h-screen flex flex-col font-sans antialiased
          bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-950 dark:to-gray-900/50
          text-slate-900 dark:text-slate-50
          transition-colors duration-150
          selection:bg-primary-500/20 selection:text-primary-900 dark:selection:text-primary-100
          overflow-x-hidden scroll-smooth
        `}
      >
        <ThemeInitializer />
        <div className="relative flex flex-col min-h-screen">
          <Navbar />
          <main className="relative flex-grow pt-16">
            {children}
          </main>
          <Footer />
        </div>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
