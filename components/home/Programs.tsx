'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, CheckCircle2, Code, Server, Layout } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';

interface Program {
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  price: string;
  icon: React.ElementType;
  features: string[];
  color: string;
  iconColor: string;
  delay: number;
}

const programs: Program[] = [
  {
    title: 'Foundation Builder',
    subtitle: 'Web Development Basics',
    description: 'Master the fundamentals of web development and start your journey in tech.',
    duration: '3 months',
    price: '$500/month',
    icon: Layout,
    features: [
      'HTML, CSS, and JavaScript fundamentals',
      'Responsive web design principles',
      'Basic UI/UX concepts',
      'Version control with Git',
      'Introduction to React',
      'Personal portfolio development',
    ],
    color: 'bg-primary-50 dark:bg-primary-950/50',
    iconColor: 'text-primary-600 dark:text-primary-400',
    delay: 0.1,
  },
  {
    title: 'Skill Accelerator',
    subtitle: 'Full-Stack Development',
    description: 'Advance your skills with modern full-stack development practices.',
    duration: '6 months',
    price: '$750/month',
    icon: Code,
    features: [
      'Advanced React and Next.js',
      'Backend development with Node.js',
      'Database design and management',
      'API development and integration',
      'Testing and debugging',
      'Deployment and DevOps basics',
    ],
    color: 'bg-secondary-50 dark:bg-secondary-950/50',
    iconColor: 'text-secondary-600 dark:text-secondary-400',
    delay: 0.2,
  },
  {
    title: 'Professional Developer',
    subtitle: 'Enterprise Development',
    description: 'Gain enterprise-level development experience and launch your career.',
    duration: '6 months',
    price: '$1000/month',
    icon: Server,
    features: [
      'Enterprise architecture patterns',
      'Cloud services and deployment',
      'Security best practices',
      'Team collaboration and Agile',
      'Real-world project experience',
      'Job placement assistance',
    ],
    color: 'bg-accent-50 dark:bg-accent-950/50',
    iconColor: 'text-accent-600 dark:text-accent-400',
    delay: 0.3,
  },
];

const ProgramCard = ({ program }: { program: Program }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start']
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <motion.div
      ref={cardRef}
      style={{ scale, opacity }}
      whileHover={{ scale: 1.02 }}
      className="group relative overflow-hidden rounded-xl border bg-card p-6 transition-all duration-300 hover:shadow-xl dark:shadow-primary-500/5"
    >
      <div className={`absolute -right-8 -top-8 h-40 w-40 rounded-full ${program.color} opacity-40 blur-3xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-60`} />
      <div className="relative">
        <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl ${program.color} transition-transform duration-300 group-hover:scale-110`}>
          <program.icon className={`h-7 w-7 ${program.iconColor} transition-all duration-300 group-hover:scale-110`} />
        </div>
        <h3 className="mb-2 text-2xl font-bold tracking-tight text-foreground">{program.title}</h3>
        <p className="mb-4 text-sm font-medium text-muted-foreground/90">{program.subtitle}</p>
        <p className="mb-6 text-muted-foreground/90">{program.description}</p>
        <div className="mb-6 flex items-center justify-between rounded-lg border bg-muted/10 p-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Duration</p>
            <p className="font-semibold text-foreground">{program.duration}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-muted-foreground">Investment</p>
            <p className="font-semibold text-foreground">{program.price}</p>
          </div>
        </div>
        <ul className="mb-8 space-y-3">
          {program.features.map((feature, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              viewport={{ once: true }}
              className="flex items-center text-sm text-muted-foreground/90"
            >
              <CheckCircle2 className={`mr-2 h-4 w-4 ${program.iconColor}`} />
              {feature}
            </motion.li>
          ))}
        </ul>
        <Link
          href="/apply"
          className="group/btn inline-flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:from-primary-600 hover:to-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:from-primary-600 dark:to-primary-700 dark:hover:from-primary-700 dark:hover:to-primary-800"
        >
          Apply Now
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
};

export default function Programs() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.2], [50, 0]);

  return (
    <section ref={containerRef} className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 bg-grid opacity-[0.02] dark:opacity-[0.03]" />
      <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-primary-50/20 via-primary-50/10 to-transparent dark:from-primary-950/20 dark:via-primary-950/10" />
      <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-secondary-50/20 via-secondary-50/10 to-transparent dark:from-secondary-950/20 dark:via-secondary-950/10" />

      <motion.div style={{ opacity }} className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <motion.h2 style={{ y }} className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Choose Your{' '}
            <span className="text-gradient bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              Learning Path
            </span>
          </motion.h2>
          <motion.p style={{ y }} transition={{ delay: 0.1 }} className="mt-6 text-lg text-muted-foreground">
            Our tiered program structure allows you to progress at your own pace while earning and learning. 
            Each tier builds upon the previous one, creating a comprehensive learning journey.
          </motion.p>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((program, index) => (
            <ProgramCard key={index} program={program} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
