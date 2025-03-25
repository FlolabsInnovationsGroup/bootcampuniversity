'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Target, Users, Heart, Globe2 } from 'lucide-react';

const stats = [
  { label: 'Students Trained', value: '1000+' },
  { label: 'Industry Partners', value: '100+' },
  { label: 'Expert Advisors', value: '50+' },
  { label: 'Success Rate', value: '95%' },
];

const values = [
  {
    title: 'Innovation First',
    description: 'We embrace cutting-edge technology and innovative teaching methods.',
    icon: Target,
  },
  {
    title: 'Student Success',
    description: "Our students' success is our primary measure of achievement.",
    icon: Users,
  },
  {
    title: 'Community Impact',
    description: "We're committed to making tech education accessible to all.",
    icon: Heart,
  },
  {
    title: 'Global Reach',
    description: 'Our community spans across continents, bringing diverse perspectives.',
    icon: Globe2,
  },
];

const team = [
  {
    name: 'Dr. Sarah Chen',
    role: 'Founder & CEO',
    image: '/team/sarah-chen.jpg',
    bio: 'Former ML researcher at Stanford, passionate about democratizing tech education.',
  },
  {
    name: 'Michael Rodriguez',
    role: 'Head of Education',
    image: '/team/michael-rodriguez.jpg',
    bio: '15+ years in EdTech, previously led curriculum development at top coding bootcamps.',
  },
  {
    name: 'Dr. James Wilson',
    role: 'Technical Director',
    image: '/team/james-wilson.jpg',
    bio: 'PhD in Computer Science, specialized in AI and robotics education.',
  },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <section className="text-center mb-20">
        <h1 className="text-4xl font-bold mb-6">About Innovation Bootcamp</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          We are on a mission to transform tech education by combining cutting-edge curriculum 
          with hands-on learning experiences. Our focus is on preparing the next generation 
          of innovators and leaders in technology.
        </p>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-3xl font-bold mb-2">{stat.value}</div>
            <div className="text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Values Section */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value) => (
            <div key={value.title} className="text-center p-6 rounded-lg border">
              <value.icon className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
              <p className="text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member) => (
            <div key={member.name} className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="rounded-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
              <p className="text-muted-foreground mb-2">{member.role}</p>
              <p className="text-sm text-muted-foreground">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center">
        <h2 className="text-3xl font-bold mb-6">Join Our Mission</h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Whether you're a student looking to accelerate your career or an organization 
          interested in partnering with us, we'd love to hear from you.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/programs"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Explore Programs <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 rounded-lg border hover:bg-accent"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
} 