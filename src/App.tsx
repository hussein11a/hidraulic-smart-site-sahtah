
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PerformanceMonitor from "@/components/PerformanceMonitor";
import AdvancedPerformanceOptimizer from "@/components/AdvancedPerformanceOptimizer";
import UXEnhancer from "@/components/UXEnhancer";
import AccessibilityEnhancer from "@/components/AccessibilityEnhancer";
import EnhancedSEO from "@/components/EnhancedSEO";
import SEOOptimizer from "@/components/SEOOptimizer";
import StructuredData from "@/components/StructuredData";
import SecurityProvider from "@/components/SecurityProvider";
import EnhancedPerformanceOptimizer from "@/components/EnhancedPerformanceOptimizer";
import MetaTags from "@/components/MetaTags";
import EnhancedSecurity from "@/components/EnhancedSecurity";

const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SecurityProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <PerformanceMonitor />
          <AdvancedPerformanceOptimizer />
          <EnhancedPerformanceOptimizer />
          <UXEnhancer />
          <AccessibilityEnhancer />
          <EnhancedSEO />
          <SEOOptimizer />
          <MetaTags />
          <EnhancedSecurity />
          <StructuredData 
            type="service" 
            data={{
              name: "خدمة سطحة هيدروليك",
              description: "نقل السيارات المعطلة والمساعدة على الطريق"
            }} 
          />
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </SecurityProvider>
  </QueryClientProvider>
);

export default App;
