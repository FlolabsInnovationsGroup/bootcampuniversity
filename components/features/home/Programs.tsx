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
    subtitle: 'Tier 1: Learning Phase',
    description: 'Start your journey with foundational education in tech skills. You pay for expert instruction and guided projects.',
    duration: '2-3 months',
    price: 'Investment: $500/month',
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
    subtitle: 'Tier 2: Start Earning',
    description: 'Transition to earning while continuing to learn. Work on real-world projects and receive compensation.',
    duration: '3-4 months',
    price: 'Start Earning Income',
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
    subtitle: 'Tier 3: Earn More',
    description: 'Take on leadership roles in projects and earn higher compensation while mastering advanced skills.',
    duration: '4-6 months',
    price: 'Increased Earnings',
    icon: Server,
    features: [
      'Enterprise architecture patterns',
      'Cloud services and deployment',
      'Security best practices',
      'Team collaboration and Agile',
      'Project leadership opportunities',
      'Career placement support',
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
      whileHover={{ scale: 1.02, y: -5 }}
      className="group relative overflow-hidden rounded-xl border bg-white/80 dark:bg-slate-800/80 p-6 transition-all duration-300 hover:shadow-xl dark:shadow-primary-500/5 backdrop-blur-sm"
    >
      <motion.div 
        initial={{ scale: 0.8, opacity: 0.5 }}
        animate={{ scale: 1, opacity: 0.4 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        className={`absolute -right-8 -top-8 h-40 w-40 rounded-full ${program.color} blur-3xl`} 
      />
      <div className="relative">
        <motion.div 
          whileHover={{ scale: 1.1, rotate: -5 }}
          whileTap={{ scale: 0.95 }}
          className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl ${program.color} shadow-lg transition-transform duration-300`}
        >
          <program.icon className={`h-7 w-7 ${program.iconColor} transition-all duration-300`} />
        </motion.div>
        <motion.h3 
          whileHover={{ x: 5 }}
          className="mb-2 text-2xl font-bold tracking-tight text-foreground"
        >
          {program.title}
        </motion.h3>
        <motion.p 
          whileHover={{ x: 3 }}
          className="mb-4 text-sm font-medium text-muted-foreground/90"
        >
          {program.subtitle}
        </motion.p>
        <p className="mb-6 text-muted-foreground/90">{program.description}</p>
        
        <motion.div 
          whileHover={{ scale: 1.02, y: -2 }}
          className="mb-6 flex items-center justify-between rounded-lg border bg-muted/10 p-4 backdrop-blur-sm"
        >
          <div>
            <p className="text-sm font-medium text-muted-foreground">Duration</p>
            <motion.p 
              whileHover={{ scale: 1.1 }}
              className="font-semibold text-foreground bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent"
            >
              {program.duration}
            </motion.p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-muted-foreground">Investment</p>
            <motion.p 
              whileHover={{ scale: 1.1 }}
              className="font-semibold text-foreground bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent"
            >
              {program.price}
            </motion.p>
          </div>
        </motion.div>

        <ul className="mb-8 space-y-3">
          {program.features.map((feature, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ x: 5 }}
              transition={{ delay: 0.1 * index }}
              viewport={{ once: true }}
              className="flex items-center text-sm text-muted-foreground/90"
            >
              <motion.div
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.3 }}
              >
                <CheckCircle2 className={`mr-2 h-4 w-4 ${program.iconColor}`} />
              </motion.div>
              {feature}
            </motion.li>
          ))}
        </ul>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link
            href="/apply"
            className="group/btn inline-flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:from-primary-600 hover:to-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:from-primary-600 dark:to-primary-700 dark:hover:from-primary-700 dark:hover:to-primary-800"
          >
            Pre-Register
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="ml-2 h-4 w-4" />
            </motion.div>
          </Link>
        </motion.div>
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
            Our cooperative education model transitions you from student to paid professional. 
            Start by investing in your education, then earn income as you develop advanced skills.
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
