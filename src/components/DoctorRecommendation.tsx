import { useState, useEffect } from "react";
import { X, MapPin, Phone, Stethoscope } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DoctorData {
  name: string;
  specialization: string;
  clinic: string;
  phone: string;
  address: string;
  distance?: number;
}

export default function DoctorRecommendation() {
  const [isVisible, setIsVisible] = useState(false);
  const [doctor, setDoctor] = useState<DoctorData | null>(null);

  useEffect(() => {
    const handleShowDoctor = (event: Event) => {
      const customEvent = event as CustomEvent<DoctorData>;
      setDoctor(customEvent.detail);
      setIsVisible(true);
    };

    window.addEventListener("show-doctor", handleShowDoctor as EventListener);
    return () => window.removeEventListener("show-doctor", handleShowDoctor as EventListener);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!doctor) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100, transition: { duration: 0.2 } }}
          className="fixed bottom-0 left-0 right-0 md:bottom-6 md:left-auto md:right-6 z-[60] p-5 md:p-6 rounded-t-2xl md:rounded-2xl w-full md:max-w-[400px] shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.2)] border-t md:border border-border/60 bg-card/95 backdrop-blur-xl group"
        >
          <div className="absolute top-4 right-4 cursor-pointer text-muted-foreground hover:text-foreground transition-colors p-1" onClick={handleDismiss}>
            <X className="w-5 h-5" />
          </div>
          
          <div className="mb-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-1 flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-primary" />
              Recommended Professional
            </h3>
            <h4 className="text-xl font-bold text-foreground">{doctor.name}</h4>
            <p className="text-primary font-medium">{doctor.specialization}</p>
          </div>
          
          <div className="space-y-3 mb-6 bg-muted/30 p-4 rounded-xl border border-border/40">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">{doctor.clinic}</p>
                <p className="text-sm text-muted-foreground leading-snug">{doctor.address}</p>
                {doctor.distance !== undefined && (
                  <p className="text-xs font-semibold text-green-500 mt-1">
                    {doctor.distance.toFixed(1)} km away
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-muted-foreground shrink-0" />
              <p className="text-sm font-medium text-foreground">{doctor.phone}</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={`tel:${doctor.phone.replace(/[^0-9+]/g, '')}`}
              className="flex-1 bg-foreground text-background text-sm font-bold py-3.5 sm:py-2.5 px-4 rounded-xl text-center hover:opacity-90 transition-opacity drop-shadow-md min-h-[44px] flex items-center justify-center"
            >
              Call Now
            </a>
            <button
              onClick={handleDismiss}
              className="flex-1 bg-muted text-foreground text-sm font-semibold py-3.5 sm:py-2.5 px-4 rounded-xl text-center hover:bg-muted/80 transition-colors min-h-[44px]"
            >
              Close
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
