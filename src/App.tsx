import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { I18nProvider } from "@/lib/i18n";
import Index from "./pages/Index";
import AssessmentPage from "./pages/AssessmentPage";
import ResultsPage from "./pages/ResultsPage";
import SolutionsPage from "./pages/SolutionsPage";
import DataInsightsPage from "./pages/DataInsightsPage";
import AwarenessPage from "./pages/AwarenessPage";
import HelplinesPage from "./pages/HelplinesPage";
import NotFound from "./pages/NotFound";
import RegisterPage from "./pages/RegisterPage";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <I18nProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/assessment" element={<AssessmentPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/solutions" element={<SolutionsPage />} />
            <Route path="/data-insights" element={<DataInsightsPage />} />
            <Route path="/awareness" element={<AwarenessPage />} />
            <Route path="/helplines" element={<HelplinesPage />} />
            <Route path="/register" element={<AuthPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </I18nProvider>
  </QueryClientProvider>
);

export default App;
