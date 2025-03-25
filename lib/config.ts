export const config = {
  env: process.env.NODE_ENV || 'development',
  isProd: process.env.NODE_ENV === 'production',
  isDev: process.env.NODE_ENV === 'development',
  isTest: process.env.NODE_ENV === 'test',
  
  seo: {
    defaultTitle: 'Innovation Bootcamp University',
    titleTemplate: '%s | Innovation Bootcamp University',
    description: 'Choose your tech path: Bootcamp or Internship',
    canonical: 'https://innovationbootcamp.edu',
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://innovationbootcamp.edu',
      siteName: 'Innovation Bootcamp University',
    },
    twitter: {
      handle: '@innovationbootcamp',
      site: '@innovationbootcamp',
      cardType: 'summary_large_image',
    },
  },

  features: {
    darkMode: true,
    newsletter: true,
    applicationForm: true,
  },

  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'https://api.innovationbootcamp.edu',
    timeout: 10000,
  },
} as const; 