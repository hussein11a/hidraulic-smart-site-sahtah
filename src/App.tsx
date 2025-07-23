import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ErrorBoundary from "./components/ErrorBoundary";
import FloatingNavigation from "./components/FloatingNavigation";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (replaces cacheTime)
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<Index />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
      {/* نقل مكون الأزرار العائمة هنا لضمان عمل position: fixed بشكل صحيح */}
      <FloatingNavigation isDarkMode={false} buttonsData={{ phone: { text: "اتصل", number: "+966503269219", enabled: true, color: "#3B82F6" }, whatsapp: { text: "واتساب", number: "966503269219", message: "مرحباً، أود الاستفسار عن خدماتكم.", enabled: true, color: "#25D366" } }} handlePhoneCall={() => { window.location.href = "tel:+966503269219"; }} handleWhatsApp={() => { window.open("https://wa.me/966503269219", "_blank"); }} />
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;


