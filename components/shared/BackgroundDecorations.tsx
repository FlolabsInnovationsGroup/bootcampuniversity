'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const BackgroundDecorations = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-mesh-gradient opacity-40" />
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-primary-500/10 rounded-full mix-blend-multiply filter blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-secondary-500/10 rounded-full mix-blend-multiply filter blur-3xl" />
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 bg-mesh-gradient opacity-40" />
      <motion.div
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        className="absolute top-0 left-0 w-[800px] h-[800px] bg-primary-500/10 rounded-full mix-blend-multiply filter blur-3xl"
      />
      <motion.div
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", delay: 2 }}
        className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-secondary-500/10 rounded-full mix-blend-multiply filter blur-3xl"
      />
    </div>
  );
}; 