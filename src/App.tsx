
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { usePerformanceOptimization } from "./hooks/usePerformanceOptimization";
import CriticalCSS from "./components/CriticalCSS";
import EnhancedSecurity from "./components/EnhancedSecurity";
import EnhancedPerformanceOptimizer from "./components/EnhancedPerformanceOptimizer";
import MetaTags from "./components/MetaTags";
import SecurityProvider from "./components/SecurityProvider";
import PerformanceMonitor from "./components/PerformanceMonitor";
import AdvancedPerformanceOptimizer from "./components/AdvancedPerformanceOptimizer";
import SEOOptimizer from "./components/SEOOptimizer";

const Index = lazy(() => import("./pages/Index"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

const App = () => {
  usePerformanceOptimization();

  return (
    <QueryClientProvider client={queryClient}>
      <CriticalCSS />
      <EnhancedSecurity />
      <EnhancedPerformanceOptimizer />
      <MetaTags />
      <SecurityProvider>
        <PerformanceMonitor />
        <AdvancedPerformanceOptimizer />
        <SEOOptimizer />
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <Suspense fallback={<div>جاري التحميل...</div>}>
                    <Index />
                  </Suspense>
                }
              />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </SecurityProvider>
    </QueryClientProvider>
  );
};

export default App;
