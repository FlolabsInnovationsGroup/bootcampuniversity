import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const cardVariants = cva(
  [
    "relative overflow-hidden",
    "transition-all duration-200",
    "backdrop-blur-[2px]",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "bg-white/80 dark:bg-gray-950/80",
          "border border-gray-200/50 dark:border-gray-800/50",
          "shadow-sm hover:shadow-md",
          "rounded-xl",
        ].join(" "),
        glass: [
          "bg-white/40 dark:bg-gray-950/40",
          "border border-gray-200/50 dark:border-gray-800/50",
          "shadow-sm hover:shadow-md",
          "rounded-xl",
        ].join(" "),
        solid: [
          "bg-white dark:bg-gray-950",
          "border border-gray-200 dark:border-gray-800",
          "shadow-sm hover:shadow-md",
          "rounded-xl",
        ].join(" "),
        gradient: [
          "bg-gradient-to-br from-white/80 to-gray-50/80 dark:from-gray-950/80 dark:to-gray-900/80",
          "border border-gray-200/50 dark:border-gray-800/50",
          "shadow-sm hover:shadow-md",
          "rounded-xl",
        ].join(" "),
      },
      size: {
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
      hover: {
        true: "hover:scale-[1.02] hover:-translate-y-0.5",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      hover: false,
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  className?: string;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, hover, ...props }, ref) => {
    return (
      <div
        className={cardVariants({ variant, size, hover, className })}
        ref={ref}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";

export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={[
      "flex flex-col space-y-1.5",
      "pb-4",
      className,
    ].join(" ")}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={[
      "font-semibold leading-none tracking-tight",
      "text-gray-900 dark:text-gray-50",
      className,
    ].join(" ")}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={[
      "text-sm",
      "text-gray-500 dark:text-gray-400",
      className,
    ].join(" ")}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={className} {...props} />
));
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={[
      "flex items-center pt-4",
      className,
    ].join(" ")}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";