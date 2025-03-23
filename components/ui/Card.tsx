import { forwardRef } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";
import type { ReactNode, ElementType } from "react";

const cardVariants = cva(
  "rounded-xl border bg-white dark:bg-slate-900 shadow-sm transition-all duration-200",
  {
    variants: {
      variant: {
        default: "border-slate-200 dark:border-slate-800",
        glass: "bg-white/10 dark:bg-slate-900/10 backdrop-blur-md border-white/20 dark:border-slate-700/30",
        gradient: "bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 border-slate-200/50 dark:border-slate-700/50",
        outline: "border-2",
        ghost: "border-transparent shadow-none bg-transparent dark:bg-transparent",
      },
      hover: {
        default: "hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md",
        lift: "hover:-translate-y-1 hover:shadow-lg",
        glow: "hover:shadow-glow-sm dark:hover:shadow-glow-sm-dark",
        none: "",
      },
      padding: {
        default: "p-6",
        sm: "p-4",
        lg: "p-8",
        none: "",
      },
    },
    defaultVariants: {
      variant: "default",
      hover: "default",
      padding: "default",
    },
  }
);

type CardBaseProps = VariantProps<typeof cardVariants> & {
  as?: ElementType;
  isInteractive?: boolean;
  children?: ReactNode;
};

export type CardProps = CardBaseProps & React.HTMLAttributes<HTMLDivElement>;

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ 
    className, 
    variant, 
    hover, 
    padding,
    as: Component = "div",
    isInteractive,
    children,
    ...props 
  }, ref) => {
    if (isInteractive) {
      return (
        <motion.div
          ref={ref}
          className={cn(cardVariants({ variant, hover, padding, className }))}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          {...(props as HTMLMotionProps<"div">)}
        >
          {children}
        </motion.div>
      );
    }

    return (
      <Component
        ref={ref}
        className={cn(cardVariants({ variant, hover, padding, className }))}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Card.displayName = "Card";

const CardHeader = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "font-urbanist-text text-xl font-semibold leading-none tracking-tight text-slate-900 dark:text-white",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-slate-500 dark:text-slate-400", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center pt-4", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
}; 