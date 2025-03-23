/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    // Background colors
    'bg-blue-100', 'bg-green-100', 'bg-purple-100', 'bg-orange-100', 'bg-red-100', 'bg-teal-100',
    'bg-primary-50', 'bg-primary-100', 'bg-secondary-50', 'bg-secondary-100', 'bg-accent-50', 'bg-accent-100',
    // Text colors
    'text-blue-600', 'text-green-600', 'text-purple-600', 'text-orange-600', 'text-red-600', 'text-teal-600',
    'text-primary-50', 'text-primary-100', 'text-primary-200', 'text-primary-300', 'text-primary-400', 
    'text-primary-500', 'text-primary-600', 'text-primary-700', 'text-primary-800', 'text-primary-900',
    'text-secondary-50', 'text-secondary-100', 'text-secondary-200', 'text-secondary-300', 'text-secondary-400', 
    'text-secondary-500', 'text-secondary-600', 'text-secondary-700', 'text-secondary-800', 'text-secondary-900',
    'text-accent-50', 'text-accent-100', 'text-accent-200', 'text-accent-300', 'text-accent-400', 
    'text-accent-500', 'text-accent-600', 'text-accent-700', 'text-accent-800', 'text-accent-900',
    // Gradient colors
    'from-blue-500', 'from-green-500', 'from-purple-500', 'from-orange-500', 'from-red-500', 'from-teal-500',
    'from-primary-500', 'from-secondary-500', 'from-accent-500',
    'to-blue-600', 'to-green-600', 'to-purple-600', 'to-orange-600', 'to-red-600', 'to-teal-600',
    'to-primary-600', 'to-secondary-600', 'to-accent-600',
    // Animation classes
    'animate-fadeIn', 'animate-slideInUp', 'animate-slideInRight', 'animate-pulse', 'animate-bounce',
    'animate-blob', 'animation-delay-2000', 'animation-delay-4000',
    // Hover effects
    'hover:shadow-lg', 'hover:scale-105', 'hover:-translate-y-1',
    // Font classes
    'font-urbanist-text',
  ],
  theme: {
    extend: {
      animation: {
        blob: 'blob 7s infinite',
        fadeIn: 'fadeIn 0.8s ease-out forwards',
        slideInUp: 'slideInUp 0.8s ease-out forwards',
        slideInRight: 'slideInRight 0.8s ease-out forwards',
        slideInLeft: 'slideInLeft 0.8s ease-out forwards',
        zoomIn: 'zoomIn 0.8s ease-out forwards',
        float: 'float 6s ease-in-out infinite',
        shine: 'shine 1.5s infinite',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        zoomIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shine: {
          '0%': { transform: 'translateX(-100%)' },
          '50%, 100%': { transform: 'translateX(100%)' },
        },
      },
      colors: {
        // Core brand colors
        primary: {
          50: '#f0f7ff',
          100: '#e0efff',
          200: '#c7deff',
          300: '#a3c8ff',
          400: '#79acff',
          500: '#4e89fc',
          600: '#3a6df3',
          700: '#2e58e0',
          800: '#2347b7',
          900: '#213d91',
          950: '#182758',
        },
        secondary: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
        },
        accent: {
          50: '#fdf5f9',
          100: '#fbeaf2',
          200: '#f9d5e5',
          300: '#f6afce',
          400: '#f07ab0',
          500: '#e84d95',
          600: '#d32e7c',
          700: '#b12064',
          800: '#941d53',
          900: '#7c1b46',
          950: '#4b0827',
        },
        // Semantic colors
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        },
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
        },
        // Neutral colors
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
        'pill': '9999px',
      },
      fontFamily: {
        sans: ['Inter var', 'Inter', 'system-ui', 'sans-serif'],
        urbanist: ['Urbanist', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '1rem' }],
        '4.5xl': ['2.5rem', { lineHeight: '2.75rem' }],
      },
      boxShadow: {
        'inner-lg': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'soft-md': '0 4px 6px -1px rgba(0, 0, 0, 0.06), 0 2px 4px -1px rgba(0, 0, 0, 0.04)',
        'soft-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.04), 0 4px 6px -2px rgba(0, 0, 0, 0.02)',
        'soft-xl': '0 10px 25px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025)',
        'highlight': '0 0 0 2px white, 0 0 0 4px rgba(79, 70, 229, 0.4)',
        'colored-lg': '0 4px 20px 0px rgba(62, 80, 180, 0.15)',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: '80ch',
            color: theme('colors.slate.700'),
            lineHeight: '1.75',
            a: {
              color: theme('colors.primary.600'),
              '&:hover': {
                color: theme('colors.primary.700'),
              },
              textDecoration: 'none',
              fontWeight: 500,
            },
            h1: {
              color: theme('colors.slate.900'),
              fontWeight: 800,
              fontSize: theme('fontSize.3xl[0]'),
              lineHeight: theme('fontSize.3xl[1].lineHeight'),
              letterSpacing: theme('letterSpacing.tight'),
              marginTop: '1.5em',
              marginBottom: '0.75em',
            },
            h2: {
              color: theme('colors.slate.900'),
              fontWeight: 700,
              fontSize: theme('fontSize.2xl[0]'),
              lineHeight: theme('fontSize.2xl[1].lineHeight'),
              letterSpacing: theme('letterSpacing.tight'),
              marginTop: '1.5em',
              marginBottom: '0.75em',
            },
            h3: {
              color: theme('colors.slate.900'),
              fontWeight: 600,
              fontSize: theme('fontSize.xl[0]'),
              lineHeight: theme('fontSize.xl[1].lineHeight'),
              marginTop: '1.5em',
              marginBottom: '0.75em',
            },
            code: {
              color: theme('colors.primary.600'),
              backgroundColor: theme('colors.primary.50'),
              borderRadius: theme('borderRadius.md'),
              paddingLeft: theme('spacing[1.5]'),
              paddingRight: theme('spacing[1.5]'),
              paddingTop: theme('spacing.1'),
              paddingBottom: theme('spacing.1'),
              fontWeight: '500',
            },
            'code::before': {
              content: 'none',
            },
            'code::after': {
              content: 'none',
            },
          },
        },
      }),
      transitionDuration: {
        '400': '400ms',
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'smooth-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'dot-pattern': "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23a0aec0' fill-opacity='0.1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3C/g%3E%3C/svg%3E\")",
        'grid-slate-200': "url(\"data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h30v30H0V0zm1 1h28v28H1V1z' fill='%23E2E8F0' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E\")",
        'grid-slate-800': "url(\"data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h30v30H0V0zm1 1h28v28H1V1z' fill='%231E293B' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
} 