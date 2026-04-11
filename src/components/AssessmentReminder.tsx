import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/lib/toast";
import { Button } from "@/components/ui/button";

export default function AssessmentReminder() {
  const navigate = useNavigate();

  useEffect(() => {
    // 30 minutes interval (30 * 60 * 1000)
    const interval = setInterval(() => {
      toast.custom(
        (t) => (
          <div className="bg-card w-full max-w-sm p-5 md:p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-border/50 backdrop-blur-xl group flex flex-col gap-3 pointer-events-auto">
            <div>
              <h3 className="font-semibold text-lg">Time for a Check-In!</h3>
              <p className="text-sm text-muted-foreground mt-1">
                It's been a while. Taking a quick assessment ensures your mental health dashboard is actively protecting you.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 mt-2">
              <Button
                className="flex-[3] min-h-[44px]"
                onClick={() => {
                  toast.dismiss(t);
                  navigate("/assessment");
                }}
              >
                Take Assessment
              </Button>
              <Button
                variant="secondary"
                className="flex-[2] min-h-[44px]"
                onClick={() => toast.dismiss(t)}
              >
                Remind Me Later
              </Button>
            </div>
            {/* Native Dismiss X on Top Right */}
            <div 
              className="absolute top-4 right-4 p-1 cursor-pointer text-muted-foreground hover:text-foreground transition-colors" 
              onClick={() => toast.dismiss(t)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </div>
          </div>
        ),
        {
          duration: Infinity, // Keep it open until interacted with
          id: "recurring-assessment",
        }
      );
    }, 30 * 60 * 1000); // 30 minutes

    return () => clearInterval(interval);
  }, [navigate]);

  return null; // purely a background logic component
}
