'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Rocket, 
  BrainCircuit, 
  Users, 
  DollarSign, 
  Building2, 
  Trophy,
  Sparkles,
  ArrowRight,
  LucideIcon,
  GraduationCap,
  Briefcase,
  Award
} from 'lucide-react';

type ColorKey = 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'slate';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  color: ColorKey;
}

const features: Feature[] = [
  {
    icon: GraduationCap,
    title: 'Learn from Experts',
    description: 'Get mentored by industry professionals with years of real-world experience.',
    color: 'primary'
  },
  {
    icon: DollarSign,
    title: 'Earn While Learning',
    description: 'Start earning through our paid apprenticeship program while mastering your skills.',
    color: 'secondary'
  },
  {
    icon: Briefcase,
    title: 'Real Projects',
    description: 'Work on actual projects for real clients to build a professional portfolio.',
    color: 'accent'
  },
  {
    icon: Users,
    title: 'Community',
    description: 'Join a thriving community of learners, mentors, and industry partners.',
    color: 'primary'
  },
  {
    icon: Award,
    title: 'Certifications',
    description: 'Earn industry-recognized certifications as you progress through the program.',
    color: 'secondary'
  },
  {
    icon: Rocket,
    title: 'Career Launch',
    description: 'Get placed in high-paying tech roles through our industry partnerships.',
    color: 'accent'
  }
];

// Function to get color classes based on color key
const getColorClasses = (color: ColorKey) => {
  const colorMap: Record<ColorKey, {
    gradient: string;
    gradientDark: string;
    iconLight: string;
    iconDark: string;
    bgLight: string;
    bgDark: string;
    border: string;
    buttonText: string;
    cssVars: {
      light: string;
      dark: string;
    };
  }> = {
    primary: {
      gradient: 'bg-gradient-to-br from-primary-500 to-primary-600',
      gradientDark: 'dark:from-primary-600 dark:to-primary-700',
      iconLight: 'text-primary-50',
      iconDark: 'dark:text-primary-50',
      bgLight: 'bg-primary-500',
      bgDark: 'dark:bg-primary-600',
      border: 'border-primary-200 dark:border-primary-800',
      buttonText: 'text-primary-600 dark:text-primary-400',
      cssVars: {
        light: 'rgba(var(--primary-500), 0.8)',
        dark: 'rgba(var(--primary-700), 0.8)'
      }
    },
    secondary: {
      gradient: 'bg-gradient-to-br from-secondary-500 to-secondary-600',
      gradientDark: 'dark:from-secondary-600 dark:to-secondary-700',
      iconLight: 'text-secondary-50',
      iconDark: 'dark:text-secondary-50',
      bgLight: 'bg-secondary-500',
      bgDark: 'dark:bg-secondary-600',
      border: 'border-secondary-200 dark:border-secondary-800',
      buttonText: 'text-secondary-600 dark:text-secondary-400',
      cssVars: {
        light: 'rgba(var(--secondary-500), 0.8)',
        dark: 'rgba(var(--secondary-700), 0.8)'
      }
    },
    accent: {
      gradient: 'bg-gradient-to-br from-accent-500 to-accent-600',
      gradientDark: 'dark:from-accent-600 dark:to-accent-700',
      iconLight: 'text-accent-50',
      iconDark: 'dark:text-accent-50',
      bgLight: 'bg-accent-500',
      bgDark: 'dark:bg-accent-600',
      border: 'border-accent-200 dark:border-accent-800',
      buttonText: 'text-accent-600 dark:text-accent-400',
      cssVars: {
        light: 'rgba(var(--accent-500), 0.8)',
        dark: 'rgba(var(--accent-700), 0.8)'
      }
    },
    success: {
      gradient: 'from-emerald-500 to-emerald-600',
      gradientDark: 'dark:from-emerald-600 dark:to-emerald-700',
      iconLight: 'text-emerald-500',
      iconDark: 'dark:text-emerald-400',
      bgLight: 'bg-emerald-50/70',
      bgDark: 'dark:bg-emerald-900/20',
      border: 'border-emerald-100 dark:border-emerald-800/30',
      buttonText: 'text-emerald-600 dark:text-emerald-400',
      cssVars: {
        light: 'var(--emerald-500)',
        dark: 'var(--emerald-600)'
      }
    },
    warning: {
      gradient: 'from-amber-500 to-amber-600',
      gradientDark: 'dark:from-amber-600 dark:to-amber-700',
      iconLight: 'text-amber-500',
      iconDark: 'dark:text-amber-400',
      bgLight: 'bg-amber-50/70',
      bgDark: 'dark:bg-amber-900/20',
      border: 'border-amber-100 dark:border-amber-800/30',
      buttonText: 'text-amber-600 dark:text-amber-400',
      cssVars: {
        light: 'var(--amber-500)',
        dark: 'var(--amber-600)'
      }
    },
    error: {
      gradient: 'from-rose-500 to-rose-600',
      gradientDark: 'dark:from-rose-600 dark:to-rose-700',
      iconLight: 'text-rose-500',
      iconDark: 'dark:text-rose-400',
      bgLight: 'bg-rose-50/70',
      bgDark: 'dark:bg-rose-900/20',
      border: 'border-rose-100 dark:border-rose-800/30',
      buttonText: 'text-rose-600 dark:text-rose-400',
      cssVars: {
        light: 'var(--rose-500)',
        dark: 'var(--rose-600)'
      }
    },
    slate: {
      gradient: 'bg-gradient-to-br from-slate-500 to-slate-600',
      gradientDark: 'dark:from-slate-600 dark:to-slate-700',
      iconLight: 'text-slate-50',
      iconDark: 'dark:text-slate-50',
      bgLight: 'bg-slate-500',
      bgDark: 'dark:bg-slate-600',
      border: 'border-slate-200 dark:border-slate-800',
      buttonText: 'text-slate-600 dark:text-slate-400',
      cssVars: {
        light: 'rgba(var(--slate-500), 0.8)',
        dark: 'rgba(var(--slate-700), 0.8)'
      }
    }
  };

  return colorMap[color];
};

const Features = () => {
  return (
    <section className="relative py-24 bg-white dark:bg-slate-900">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-slate-50 dark:bg-slate-800/50 skew-y-3 -z-10" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-urbanist-text font-extrabold tracking-tight mb-6">
            <span className="text-slate-900 dark:text-white">Why Choose </span>
            <span className="bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 bg-clip-text text-transparent">
              Innovation Bootcamp
            </span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Our unique approach combines education, real-world experience, and career development
            to ensure your success in the tech industry.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg hover:shadow-xl border border-slate-100 dark:border-slate-700 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Hover effect background */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/0 via-secondary-500/0 to-accent-500/0 group-hover:from-primary-500/5 group-hover:via-secondary-500/5 group-hover:to-accent-500/5 transition-colors duration-500" />
              
              <div className="relative">
                <div className={`w-12 h-12 rounded-lg mb-4 flex items-center justify-center bg-${feature.color}-100 dark:bg-${feature.color}-900/30`}>
                  <feature.icon className={`w-6 h-6 text-${feature.color}-500 dark:text-${feature.color}-400`} />
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                
                <p className="text-slate-600 dark:text-slate-300">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features; 