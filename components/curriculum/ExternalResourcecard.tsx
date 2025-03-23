import React from 'react';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';

interface ExternalResourceCardProps {
  title: string;
  provider: string;
  description: string;
  image: string;
  url: string;
  badgeText?: string;
}

export const ExternalResourceCard = ({
  title,
  provider,
  description,
  image,
  url,
  badgeText,
}: ExternalResourceCardProps) => {
  return (
    <div className="flex flex-col border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="relative h-48">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
        {badgeText && (
          <div className="absolute top-4 right-4 bg-blue-600 text-white px-2 py-1 rounded-md text-xs font-medium">
            {badgeText}
          </div>
        )}
      </div>
      <div className="flex-1 p-6">
        <div className="mb-2">
          <span className="text-sm font-medium text-gray-500">{provider}</span>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <div className="mt-auto">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <span>View resource</span>
            <ExternalLink className="ml-1 h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
};