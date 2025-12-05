"use client";

import { createContext, useContext, useState, useEffect } from 'react';

interface PerformanceContextType {
  isPerformanceMode: boolean;
  togglePerformanceMode: () => void;
}

const PerformanceContext = createContext<PerformanceContextType | undefined>(undefined);

export function PerformanceProvider({ children }: { children: React.ReactNode }) {
  const [isPerformanceMode, setIsPerformanceMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('performance-mode') === 'true';
    }
    return false;
  });

  const togglePerformanceMode = () => {
    const newMode = !isPerformanceMode;
    setIsPerformanceMode(newMode);
    if (typeof window !== 'undefined') {
      localStorage.setItem('performance-mode', newMode.toString());
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('performance-mode', isPerformanceMode.toString());
    }
  }, [isPerformanceMode]);

  return (
    <PerformanceContext.Provider value={{ isPerformanceMode, togglePerformanceMode }}>
      {children}
    </PerformanceContext.Provider>
  );
}

export function usePerformanceMode() {
  const context = useContext(PerformanceContext);
  if (context === undefined) {
    throw new Error('usePerformanceMode must be used within a PerformanceProvider');
  }
  return context;
}
