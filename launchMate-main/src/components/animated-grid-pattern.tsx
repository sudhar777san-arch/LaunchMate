'use client';
import { motion, useAnimation } from 'framer-motion';
import { useEffect, memo } from 'react';
import { useInView } from 'react-intersection-observer';
import type { ReactNode } from 'react';

export const AnimatedBeam = memo(function AnimatedBeam() {
  // Disable animations for better performance
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    // Skip animations for performance
    return;
  }, [controls, inView]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      {/* Static elements instead of animated ones for better performance */}
      <div className="absolute h-[2px] w-1/2 bg-gradient-to-r from-transparent via-primary/20 to-transparent top-[10%] left-[25%]" />
      <div className="absolute h-1/2 w-[2px] bg-gradient-to-b from-transparent via-accent/20 to-transparent top-[25%] left-[20%]" />
      <div className="absolute h-[2px] w-1/2 bg-gradient-to-r from-transparent via-primary/20 to-transparent top-[90%] right-[25%]" />
      <div className="absolute h-1/2 w-[2px] bg-gradient-to-b from-transparent via-accent/20 to-transparent bottom-[25%] right-[20%]" />
    </div>
  );
});

export const AnimatedGradientBackground = memo(function AnimatedGradientBackground({ children }: { children: ReactNode }) {
    return (
        <div className="relative isolate min-h-screen w-full bg-background">
            {/* Simplified background for better performance */}
            <div
                className="fixed inset-0 -z-10 h-full w-full opacity-30"
                style={{
                    backgroundImage:
                    'radial-gradient(circle at 10% 20%, hsl(var(--primary) / 0.05), transparent 50%),' +
                    'radial-gradient(circle at 80% 30%, hsl(var(--accent) / 0.05), transparent 50%)',
                }}
            />

            <AnimatedBeam />
            {children}
      </div>
    );
});
