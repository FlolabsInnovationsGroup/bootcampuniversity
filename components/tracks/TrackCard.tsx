import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '../shared/Badge';

interface TrackCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  skills: string[];
  color?: string;
  featured?: boolean;
}

export const TrackCard = ({ 
  id, 
  title, 
  description, 
  image, 
  skills,
  color = 'blue',
  featured = false
}: TrackCardProps) => {
  const colorClasses = {
    blue: 'from-blue-600 to-indigo-600',
    indigo: 'from-indigo-600 to-purple-600',
    teal: 'from-teal-600 to-green-600',
    purple: 'from-purple-600 to-pink-600',
    orange: 'from-orange-600 to-red-600',
  };

  const gradientClass = colorClasses[color as keyof typeof colorClasses] || colorClasses.blue;

  return (
    <div className={`relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl ${featured ? 'border-2 border-blue-500' : 'border border-gray-200'}`}>
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className={`absolute inset-0 bg-gradient-to-r ${gradientClass} opacity-70`}></div>
        {featured && (
          <div className="absolute top-4 right-4">
            <Badge variant="default" className="bg-white text-blue-600">
              Featured
            </Badge>
          </div>
        )}
        <div className="absolute bottom-0 left-0 p-6 text-white">
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
      </div>
      <div className="p-6">
        <p className="mb-4 text-gray-600">{description}</p>
        <div className="mb-6">
          <h4 className="mb-2 text-xs font-semibold uppercase text-gray-500">Skills you'll learn:</h4>
          <div className="flex flex-wrap gap-2">
            {skills.slice(0, 5).map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
            {skills.length > 5 && (
              <Badge variant="secondary">+{skills.length - 5} more</Badge>
            )}
          </div>
        </div>
        <Link
          href={`/tracks/${id}`}
          className={`mt-4 inline-flex items-center text-${color}-600 hover:text-${color}-800`}
        >
          <span>Explore this track</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ml-2 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};