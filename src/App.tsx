
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { VisaApplicationProvider } from "@/contexts/VisaApplicationContext";
import { VisaLayout } from "@/components/visa/VisaLayout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Step1 from "./pages/visa/Step1";
import Step2 from "./pages/visa/Step2";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/visa" element={
            <VisaApplicationProvider>
              <VisaLayout />
            </VisaApplicationProvider>
          }>
            <Route path="step1" element={<Step1 />} />
            <Route path="step2" element={<Step2 />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
