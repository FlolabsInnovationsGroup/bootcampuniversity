'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';

const featuredPost = {
  title: 'The Future of Tech Education',
  excerpt: 'Exploring how AI and virtual reality are transforming the way we learn and teach programming.',
  author: 'Sarah Johnson',
  date: 'March 15, 2024',
  image: '/blog/featured-post.jpg',
  slug: 'future-of-tech-education',
};

const recentPosts = [
  {
    title: 'Getting Started with Web Development',
    excerpt: 'A comprehensive guide for beginners looking to start their journey in web development.',
    author: 'Michael Chen',
    date: 'March 10, 2024',
    image: '/blog/web-dev.jpg',
    slug: 'getting-started-web-development',
  },
  {
    title: 'The Importance of Soft Skills in Tech',
    excerpt: 'Why technical skills alone are not enough to succeed in the modern tech industry.',
    author: 'John Smith',
    date: 'March 5, 2024',
    image: '/blog/soft-skills.jpg',
    slug: 'importance-of-soft-skills',
  },
  {
    title: 'Building Your First React Application',
    excerpt: 'Step-by-step tutorial on creating a React app from scratch with modern best practices.',
    author: 'Emily Brown',
    date: 'March 1, 2024',
    image: '/blog/react-tutorial.jpg',
    slug: 'first-react-application',
  },
];

export default function BlogPage() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Latest Insights & Tutorials
          </h1>
          <p className="text-xl text-gray-600">
            Stay up to date with the latest trends in tech education, programming tutorials,
            and student success stories.
          </p>
        </div>

        {/* Featured Post */}
        <div className="mb-16">
          <Link href={`/blog/${featuredPost.slug}`}>
            <Card className="group cursor-pointer">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative h-[300px] md:h-[400px]">
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-blue-600 font-medium mb-2">Featured Post</span>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-blue-600">
                    {featuredPost.title}
                  </h2>
                  <p className="text-gray-600 mb-6">{featuredPost.excerpt}</p>
                  <div className="text-sm text-gray-500">
                    <span>{featuredPost.author}</span>
                    <span className="mx-2">·</span>
                    <span>{featuredPost.date}</span>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        </div>

        {/* Recent Posts */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Recent Posts</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <Card className="h-full group cursor-pointer">
                  <div className="relative h-48 mb-6">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{post.excerpt}</p>
                  <div className="text-sm text-gray-500 mt-auto">
                    <span>{post.author}</span>
                    <span className="mx-2">·</span>
                    <span>{post.date}</span>
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