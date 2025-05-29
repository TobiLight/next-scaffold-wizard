
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
import Step3 from "./pages/visa/Step3";
import Step4 from "./pages/visa/Step4";
import Step5 from "./pages/visa/Step5";
import Step6 from "./pages/visa/Step6";
import Step7 from "./pages/visa/Step7";
import Step8 from "./pages/visa/Step8";
import Step9 from "./pages/visa/Step9";
import Step10 from "./pages/visa/Step10";
import Step11 from "./pages/visa/Step11";
import Review from "./pages/visa/Review";

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
            <Route path="step3" element={<Step3 />} />
            <Route path="step4" element={<Step4 />} />
            <Route path="step5" element={<Step5 />} />
            <Route path="step6" element={<Step6 />} />
            <Route path="step7" element={<Step7 />} />
            <Route path="step8" element={<Step8 />} />
            <Route path="step9" element={<Step9 />} />
            <Route path="step10" element={<Step10 />} />
            <Route path="step11" element={<Step11 />} />
            <Route path="review" element={<Review />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
