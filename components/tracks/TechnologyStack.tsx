import React from 'react';
import Image from 'next/image';

interface Technology {
  name: string;
  logo: string;
  description: string;
}

interface TechnologyStackProps {
  title?: string;
  description?: string;
  technologies: Technology[];
}

export const TechnologyStack = ({
  title = "Technologies You'll Master",
  description = "Our curriculum is built around industry-standard technologies that employers are actively seeking.",
  technologies
}: TechnologyStackProps) => {
  return (
    <div className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{title}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
            {description}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className="flex flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-md overflow-hidden bg-gray-100">
                  <Image
                    src={tech.logo}
                    alt={tech.name}
                    width={40}
                    height={40}
                    className="h-8 w-8 object-contain"
                  />
                </div>
                <h3 className="ml-3 text-lg font-medium text-gray-900">{tech.name}</h3>
              </div>
              <p className="text-gray-500 text-sm">{tech.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};