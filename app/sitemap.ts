import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://innovationbootcamp.edu';

  const routes = [
    '',
    '/about',
    '/programs',
    '/opportunities',
    '/blog',
    '/faqs',
    '/legal',
    '/resources',
    '/apply',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return routes;
} 