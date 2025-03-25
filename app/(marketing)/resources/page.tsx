'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';

const categories = [
  {
    title: 'Learning Paths',
    description: 'Structured guides to help you master specific technologies and skills.',
    icon: '/icons/path.svg',
    href: '/resources/learning-paths',
  },
  {
    title: 'Tutorials',
    description: 'Step-by-step guides for building real-world projects.',
    icon: '/icons/tutorial.svg',
    href: '/resources/tutorials',
  },
  {
    title: 'Documentation',
    description: 'Comprehensive references and API documentation.',
    icon: '/icons/docs.svg',
    href: '/resources/docs',
  },
  {
    title: 'Templates',
    description: 'Starter templates and boilerplates for your projects.',
    icon: '/icons/template.svg',
    href: '/resources/templates',
  },
];

const featuredResources = [
  {
    title: 'Complete Web Development Guide',
    description: 'A comprehensive guide covering HTML, CSS, JavaScript, and modern frameworks.',
    image: '/resources/web-dev-guide.jpg',
    type: 'Guide',
    duration: '8 hours',
    href: '/resources/web-development-guide',
  },
  {
    title: 'React Best Practices',
    description: 'Learn the best practices for building scalable React applications.',
    image: '/resources/react-guide.jpg',
    type: 'Tutorial',
    duration: '4 hours',
    href: '/resources/react-best-practices',
  },
  {
    title: 'API Development with Node.js',
    description: 'Build robust and scalable APIs using Node.js and Express.',
    image: '/resources/api-guide.jpg',
    type: 'Course',
    duration: '6 hours',
    href: '/resources/api-development',
  },
];

export default function ResourcesPage() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Learning Resources
          </h1>
          <p className="text-xl text-gray-600">
            Access our comprehensive collection of learning materials, tutorials,
            and guides to support your learning journey.
          </p>
        </div>

        {/* Categories */}
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          {categories.map((category) => (
            <Link key={category.title} href={category.href}>
              <Card className="h-full group cursor-pointer hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="w-12 h-12 mb-4">
                    <Image
                      src={category.icon}
                      alt={category.title}
                      width={48}
                      height={48}
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
                    {category.title}
                  </h3>
                  <p className="text-gray-600">
                    {category.description}
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Featured Resources */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Resources</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredResources.map((resource) => (
              <Link key={resource.title} href={resource.href}>
                <Card className="h-full group cursor-pointer hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <Image
                      src={resource.image}
                      alt={resource.title}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {resource.type}
                      </span>
                      <span className="ml-2">{resource.duration}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
                      {resource.title}
                    </h3>
                    <p className="text-gray-600">
                      {resource.description}
                    </p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 