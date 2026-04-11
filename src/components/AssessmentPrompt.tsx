import { useState, useEffect } from "react";
import { X, Activity } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function AssessmentPrompt() {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const checkAndShow = () => {
      const currentUser = localStorage.getItem("currentUser");
      if (!currentUser) {
        setIsVisible(false);
        return;
      }

      const dismissed = sessionStorage.getItem("assessmentDismissed");
      if (dismissed) return;

      const lastAssessment = localStorage.getItem("lastAssessmentDate");
      const now = new Date().getTime();
      
      if (!lastAssessment || (now - parseInt(lastAssessment)) > 259200000) {
        timer = setTimeout(() => {
          setIsVisible(true);
        }, 5000);
      }
    };

    // Check immediately on mount
    checkAndShow();

    // Re-check whenever auth changes
    window.addEventListener("auth-change", checkAndShow);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("auth-change", checkAndShow);
    };
  }, []);

  const handleDismiss = () => {
    sessionStorage.setItem("assessmentDismissed", "true");
    setIsVisible(false);
  };

  const handleTakeAssessment = () => {
    setIsVisible(false);
    navigate("/assessment");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="fixed bottom-6 right-6 z-50 p-5 rounded-2xl w-[95vw] max-w-sm sm:w-96 max-h-[85vh] overflow-y-auto shadow-2xl border-[0.5px] border-border/50 bg-card/90 backdrop-blur-xl group"
        >
          <div className="absolute top-4 right-4 cursor-pointer text-muted-foreground hover:text-foreground transition-colors" onClick={handleDismiss}>
            <X className="w-4 h-4" />
          </div>
          
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
              <Activity className="w-6 h-6 text-primary" />
            </div>
            
            <div className="flex-1 pr-6">
              <h3 className="text-base font-semibold text-foreground mb-1">
                Check your current stress level
              </h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                Complete a quick wellness assessment to get personalized suggestions and support.
              </p>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={handleTakeAssessment}
                  className="bg-primary text-primary-foreground text-sm font-medium py-2 px-4 rounded-lg hover:opacity-90 transition-opacity"
                >
                  Take Assessment
                </button>
                <button
                  onClick={handleDismiss}
                  className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
                >
                  Remind Me Later
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
