import { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AssessmentPrompt from "./AssessmentPrompt";
import DoctorRecommendation from "./DoctorRecommendation";

const Layout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  // Prevent backing if history is empty, though within the SPA we just hide on home
  const showBackButton = !isHome && window.history.length > 1;

  return (
    <div className="min-h-screen flex flex-col gradient-soft">
      <Navbar />
      <main className="flex-1 pt-20">
        {showBackButton && (
          <div className="container mx-auto px-4 mb-4">
            <button 
              onClick={() => navigate(-1)} 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted font-medium bg-secondary/80 px-4 py-2 rounded-full border border-border shadow-[0_4px_16px_rgba(0,0,0,0.05)] transition-all min-h-[44px]"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          </div>
        )}
        {children}
      </main>
      <Footer />
      <AssessmentPrompt />
      <DoctorRecommendation />
    </div>
  );
};

export default Layout;
