import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const badgeVariants = cva(
  [
    "inline-flex items-center justify-center gap-1.5",
    "rounded-full px-3 py-1",
    "text-xs font-medium",
    "transition-all duration-200",
    "ring-offset-background",
    "hover:scale-[1.02]",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "bg-gradient-to-r from-primary-500/10 to-primary-600/10",
          "text-primary-700",
          "dark:from-primary-400/10 dark:to-primary-500/10",
          "dark:text-primary-400",
          "border border-primary-500/20",
          "dark:border-primary-400/20",
        ].join(" "),
        secondary: [
          "bg-gradient-to-r from-secondary-500/10 to-secondary-600/10",
          "text-secondary-700",
          "dark:from-secondary-400/10 dark:to-secondary-500/10",
          "dark:text-secondary-400",
          "border border-secondary-500/20",
          "dark:border-secondary-400/20",
        ].join(" "),
        success: [
          "bg-gradient-to-r from-green-500/10 to-emerald-600/10",
          "text-green-700",
          "dark:from-green-400/10 dark:to-emerald-500/10",
          "dark:text-green-400",
          "border border-green-500/20",
          "dark:border-green-400/20",
        ].join(" "),
        warning: [
          "bg-gradient-to-r from-yellow-500/10 to-amber-600/10",
          "text-yellow-700",
          "dark:from-yellow-400/10 dark:to-amber-500/10",
          "dark:text-yellow-400",
          "border border-yellow-500/20",
          "dark:border-yellow-400/20",
        ].join(" "),
        danger: [
          "bg-gradient-to-r from-red-500/10 to-rose-600/10",
          "text-red-700",
          "dark:from-red-400/10 dark:to-rose-500/10",
          "dark:text-red-400",
          "border border-red-500/20",
          "dark:border-red-400/20",
        ].join(" "),
        info: [
          "bg-gradient-to-r from-blue-500/10 to-indigo-600/10",
          "text-blue-700",
          "dark:from-blue-400/10 dark:to-indigo-500/10",
          "dark:text-blue-400",
          "border border-blue-500/20",
          "dark:border-blue-400/20",
        ].join(" "),
      },
      size: {
        sm: "text-[0.6875rem] px-2 py-0.5",
        md: "text-xs px-3 py-1",
        lg: "text-sm px-4 py-1.5",
      },
      interactive: {
        true: [
          "cursor-pointer",
          "hover:bg-opacity-80",
          "active:scale-[0.98]",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1",
        ].join(" "),
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      interactive: false,
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  className?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, interactive, icon, children, onClick, ...props }, ref) => {
    // Convert to explicit boolean to satisfy TypeScript
    const isInteractive = Boolean(interactive) || Boolean(onClick);
    
    return (
      <span
        ref={ref}
        className={badgeVariants({ variant, size, interactive: isInteractive, className })}
        onClick={onClick}
        {...props}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";