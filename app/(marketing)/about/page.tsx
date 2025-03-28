'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { ArrowRight, GraduationCap, Users, Briefcase, TrendingUp, Target, Heart, Globe2, Code } from 'lucide-react';

const stats = [
  { label: 'Program Success Rate', value: '95%', icon: TrendingUp },
  { label: 'Industry Partners', value: '50+', icon: Briefcase },
  { label: 'Expert Mentors', value: '25+', icon: Users },
  { label: 'Average Salary Increase', value: '40%', icon: TrendingUp },
];

const values = [
  {
    title: 'Learn & Earn Model',
    description: 'Start with foundational learning, then progress to earning while developing advanced skills.',
    icon: GraduationCap,
  },
  {
    title: 'Industry-Driven',
    description: 'Our curriculum is shaped by real industry needs and current tech trends.',
    icon: Code,
  },
  {
    title: 'Community Focus',
    description: 'Build lasting connections with peers, mentors, and industry professionals.',
    icon: Heart,
  },
  {
    title: 'Global Opportunities',
    description: 'Access remote work opportunities with companies worldwide.',
    icon: Globe2,
  },
];

const programs = [
  {
    title: 'Foundation Developer',
    description: 'Master programming fundamentals and build your first professional projects.',
    duration: '3-4 months',
    focus: 'Core Programming Skills',
  },
  {
    title: 'Professional Developer',
    description: 'Earn more with advanced skills and leadership roles.',
    duration: '6-8 months',
    focus: 'Advanced Development',
  },
  {
    title: 'Specialized Tracks',
    description: 'Deep dive into specific technologies like AI, Cloud, or Mobile Development.',
    duration: 'Varies',
    focus: 'Specialized Skills',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="container mx-auto px-4 py-16 space-y-20">
        {/* Hero Section */}
        <section className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80 dark:from-primary-400 dark:to-primary-600">
            Transforming Tech Education
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Innovation Bootcamp University pioneers a unique cooperative education model 
            that combines intensive learning with real-world experience. Our mission is 
            to make high-quality tech education accessible while ensuring our students 
            can earn as they learn.
          </p>
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <Card key={stat.label} className="p-6 text-center hover:shadow-lg transition-shadow">
              <stat.icon className="w-8 h-8 mx-auto mb-4 text-primary-500 dark:text-primary-400" />
              <div className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">{stat.value}</div>
              <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
            </Card>
          ))}
        </section>

        {/* Values Section */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <Card key={value.title} className="p-6 hover:shadow-lg transition-shadow">
                <value.icon className="w-12 h-12 mb-4 text-primary-500 dark:text-primary-400" />
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Programs Section */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100">Our Programs</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {programs.map((program) => (
              <Card key={program.title} className="p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">{program.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{program.description}</p>
                <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                  <div>Duration: {program.duration}</div>
                  <div>Focus: {program.focus}</div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Ready to Start Your Journey?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Pre-register now for our cooperative education program and take the first step 
            towards a rewarding career in technology.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="gap-2">
              <Link href="/apply">
                Apply Now <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
} 