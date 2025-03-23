import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono, Urbanist } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ThemeInitializer } from '@/components/shared/ThemeInitializer';
import { Toaster } from '@/components/ui/toaster';

// Font definitions
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const urbanist = Urbanist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-urbanist',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL('https://innovationbootcamp.edu'),
  title: 'Innovation Bootcamp University | Learn, Earn & Master Tech Skills',
  description: 'Get paid to learn tech skills with Innovation Bootcamp University. Our tiered program combines education with real-world experience.',
  keywords: 'tech education, bootcamp, paid internship, tiered education, tech skills, innovation',
  authors: [{ name: 'Innovation Bootcamp University' }],
  robots: 'index, follow',
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${urbanist.variable} ${jetbrainsMono.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              // On page load or when changing themes, best to add inline in \`head\` to avoid FOUC
              if (localStorage.getItem('theme') === 'dark' || 
                (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
              }
            })()
          `
        }} />
      </head>
      <body className="min-h-screen flex flex-col font-sans antialiased bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50">
        <ThemeInitializer />
        <Navbar />
        <main className="flex-grow pt-16">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}