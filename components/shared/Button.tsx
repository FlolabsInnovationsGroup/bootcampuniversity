import React from 'react';
import Link from 'next/link';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-xl text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary: [
          "bg-gradient-to-r from-primary-500 to-primary-600",
          "text-primary-foreground",
          "shadow-lg shadow-primary-500/25",
          "hover:from-primary-600 hover:to-primary-700",
          "hover:shadow-primary-500/30 hover:scale-[1.02]",
          "dark:from-primary-600 dark:to-primary-700",
          "dark:shadow-primary-900/20",
          "dark:hover:from-primary-500 dark:hover:to-primary-600",
        ].join(" "),
        secondary: [
          "bg-secondary text-secondary-foreground",
          "border border-secondary/20",
          "hover:bg-secondary/80 hover:scale-[1.02]",
          "dark:bg-secondary-900/50",
          "dark:hover:bg-secondary-900/60",
          "dark:border-secondary-700/20",
        ].join(" "),
        outline: [
          "border border-input bg-background",
          "hover:bg-accent hover:text-accent-foreground hover:scale-[1.02]",
          "dark:border-slate-800",
          "dark:hover:bg-slate-800",
        ].join(" "),
        ghost: [
          "bg-transparent text-foreground",
          "hover:bg-accent hover:text-accent-foreground hover:scale-[1.02]",
          "dark:text-slate-200",
          "dark:hover:bg-slate-800",
          "dark:hover:text-slate-50",
        ].join(" "),
        destructive: [
          "bg-gradient-to-r from-destructive to-red-600",
          "text-destructive-foreground",
          "shadow-lg shadow-destructive/25",
          "hover:from-destructive/90 hover:to-red-700",
          "hover:shadow-destructive/30 hover:scale-[1.02]",
          "dark:from-red-700 dark:to-red-800",
          "dark:shadow-red-900/20",
        ].join(" "),
        link: [
          "text-primary underline-offset-4",
          "hover:underline hover:text-primary-600",
          "dark:text-primary-400",
          "dark:hover:text-primary-300",
        ].join(" "),
      },
      size: {
        xs: "h-8 px-3 text-xs",
        sm: "h-9 px-4 text-sm",
        md: "h-10 px-5 text-sm",
        lg: "h-11 px-6 text-base",
        xl: "h-12 px-8 text-lg",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
      loading: {
        true: "relative text-transparent transition-none hover:text-transparent",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
      loading: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
  className?: string;
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, loading, href, children, ...props }, ref) => {
    const Comp = href ? Link : "button";
    const content = (
      <>
        {children}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="h-4 w-4 animate-spin" />
          </div>
        )}
      </>
    );

    if (href) {
      return (
        <Link
          href={href}
          className={buttonVariants({ variant, size, fullWidth, loading, className })}
        >
          {content}
        </Link>
      );
    }
    
    return (
      <button
        className={buttonVariants({ variant, size, fullWidth, loading, className })}
        ref={ref}
        disabled={props.disabled || loading}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";