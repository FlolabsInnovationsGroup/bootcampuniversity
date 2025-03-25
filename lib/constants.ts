export const APP_NAME = 'Innovation Bootcamp University';
export const APP_DESCRIPTION = 'Choose your tech path: Bootcamp or Internship';
export const CONTACT_EMAIL = 'admissions@innovationbootcamp.edu';

export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/innovationbootcamp',
  linkedin: 'https://linkedin.com/company/innovationbootcamp',
  github: 'https://github.com/innovationbootcamp',
} as const;

export const NAVIGATION = {
  main: [
    { name: 'Programs', href: '/programs' },
    { name: 'Opportunities', href: '/opportunities' },
    { name: 'Resources', href: '/resources' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
  ],
  resources: [
    { name: 'How It Works', href: '/resources/how-it-works' },
    { name: 'Curriculum', href: '/resources/curriculum' },
    { name: 'Student Handbook', href: '/resources/handbook' },
    { name: 'Help Center', href: '/resources/help' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/legal/privacy' },
    { name: 'Terms of Service', href: '/legal/terms' },
    { name: 'Cookie Policy', href: '/legal/cookies' },
  ],
} as const; 