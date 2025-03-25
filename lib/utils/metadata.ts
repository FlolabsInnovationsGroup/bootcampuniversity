import { Metadata } from 'next';

interface GenerateMetadataProps {
  title: string;
  description: string;
  path?: string;
  noIndex?: boolean;
  ogImage?: string;
  type?: 'website' | 'article';
}

export function generateMetadata({
  title,
  description,
  path = '',
  noIndex = false,
  ogImage = '/images/og-default.jpg',
  type = 'website',
}: GenerateMetadataProps): Metadata {
  const url = `https://innovationbootcamp.edu${path}`;

  return {
    title: {
      default: title,
      template: `%s | Innovation Bootcamp University`,
    },
    description,
    metadataBase: new URL('https://innovationbootcamp.edu'),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Innovation Bootcamp University',
      type,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      creator: '@innovbootcamp',
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export function generateArticleMetadata({
  title,
  description,
  path,
  author,
  publishedTime,
  modifiedTime,
  tags,
  ogImage,
}: GenerateMetadataProps & {
  author: string;
  publishedTime: string;
  modifiedTime?: string;
  tags?: string[];
}): Metadata {
  const baseMetadata = generateMetadata({
    title,
    description,
    path,
    ogImage,
    type: 'article',
  });

  return {
    ...baseMetadata,
    authors: [{ name: author }],
    keywords: tags,
    openGraph: {
      ...baseMetadata.openGraph,
      type: 'article',
      authors: [author],
      publishedTime,
      modifiedTime: modifiedTime || publishedTime,
      tags,
    },
  };
} 