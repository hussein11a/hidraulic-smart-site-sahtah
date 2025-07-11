import React from 'react';
import { useCriticalPathOptimization } from '@/hooks/useCriticalPathOptimization';
import { useLayoutShiftPrevention } from '@/hooks/useLayoutShiftPrevention';
import { useAssetOptimization } from '@/hooks/useAssetOptimization';
import { useAdvancedCaching } from '@/hooks/useAdvancedCaching';
import { useInteractivityOptimization } from '@/hooks/useInteractivityOptimization';
import { usePerformanceMonitoring } from '@/hooks/usePerformanceMonitoring';

const UltimatePerformanceBooster: React.FC = () => {
  // Execute all performance optimizations through focused hooks
  useCriticalPathOptimization();
  useLayoutShiftPrevention();
  useAssetOptimization();
  useAdvancedCaching();
  useInteractivityOptimization();
  usePerformanceMonitoring();

  return null;
};

export default UltimatePerformanceBooster;