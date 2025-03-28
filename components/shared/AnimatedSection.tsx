'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  background?: "none" | "light" | "grid" | "gradient";
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({ 
  children, 
  className = "", 
  background = "none" 
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const getBgClasses = () => {
    switch (background) {
      case "light":
        return "bg-slate-50/50 dark:bg-slate-950/50";
      case "grid":
        return "bg-grid opacity-[0.03]";
      case "gradient":
        return "bg-gradient-to-b from-transparent via-slate-50/80 to-transparent dark:via-slate-950/80";
      default:
        return "";
    }
  };

  return (
    <section 
      className={`relative py-20 sm:py-32 ${className}`} 
      suppressHydrationWarning
      style={{ position: 'relative' }}
    >
      {background !== "none" && (
        <div 
          className={`absolute inset-0 ${getBgClasses()}`}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        />
      )}
      {isMounted ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ 
            duration: 0.5,
            color: { duration: 0 } // Disable color animation
          }}
          className="relative"
          style={{ position: 'relative', color: 'inherit' }}
        >
          {children}
        </motion.div>
      ) : (
        <div className="relative" style={{ position: 'relative' }}>
          {children}
        </div>
      )}
    </section>
  );
}; 