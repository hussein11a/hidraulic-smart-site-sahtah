
import React from 'react';
import { useResourceHints } from '@/hooks/useResourceHints';
import { useCriticalCSS } from '@/hooks/useCriticalCSS';
import { useAdvancedImageOptimization } from '@/hooks/useAdvancedImageOptimization';
import { useServiceWorkerRegistration } from '@/hooks/useServiceWorkerRegistration';
import { useMemoryManagement } from '@/hooks/useMemoryManagement';
import { useNextPagePreloading } from '@/hooks/useNextPagePreloading';

const AdvancedPerformanceOptimizer: React.FC = () => {
  // Execute all advanced performance optimizations through focused hooks
  useResourceHints();
  useCriticalCSS();
  useAdvancedImageOptimization();
  useServiceWorkerRegistration();
  useMemoryManagement();
  useNextPagePreloading();

  return null;
};

export default AdvancedPerformanceOptimizer;
