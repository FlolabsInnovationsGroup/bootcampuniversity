import { forwardRef } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import type { ReactNode } from 'react';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]',
  {
    variants: {
      variant: {
        default: 'bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-700',
        destructive: 'bg-red-600 text-white hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700',
        outline: 'border border-slate-200 bg-white hover:bg-slate-100 hover:text-primary-600 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800 dark:hover:text-primary-400',
        secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-700',
        ghost: 'hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50',
        link: 'text-primary-600 underline-offset-4 hover:underline dark:text-primary-400',
        gradient: 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white hover:from-primary-700 hover:to-secondary-700',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
      glow: {
        true: 'shadow-glow hover:shadow-glow-lg transition-shadow',
        false: '',
      },
      loading: {
        true: 'relative cursor-not-allowed',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      glow: false,
      loading: false,
    },
  }
);

export interface ButtonProps
  extends Omit<HTMLMotionProps<"button">, "children"> {
  children?: ReactNode;
  asChild?: boolean;
  icon?: ReactNode;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  size?: VariantProps<typeof buttonVariants>["size"];
  glow?: VariantProps<typeof buttonVariants>["glow"];
  loading?: VariantProps<typeof buttonVariants>["loading"];
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, glow, loading, icon, children, ...props }, ref) => {
    return (
      <motion.button
        className={cn(buttonVariants({ variant, size, glow, loading, className }))}
        ref={ref}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {loading && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
        {icon && !loading && (
          <span className="mr-2">{icon}</span>
        )}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants }; 