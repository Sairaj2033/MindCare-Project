import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Volume2, VolumeX, Sparkles, Wind } from "lucide-react";

type CalmMeOverlayProps = {
  isOpen: boolean;
  onClose: () => void;
};

const MESSAGES = [
  "Take a deep breath...",
  "Release all tension...",
  "You are in a safe space.",
  "Everything is okay.",
  "Focus on the present moment.",
  "Let your mind be still.",
];

export default function CalmMeOverlay({ isOpen, onClose }: CalmMeOverlayProps) {
  const [muted, setMuted] = useState(false);
  const [breathState, setBreathState] = useState<"In" | "Hold" | "Out">("In");
  const [messageIndex, setMessageIndex] = useState(0);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Breathing cycle logic (Box breathing: 4s In, 4s Hold, 4s Out)
  useEffect(() => {
    if (!isOpen) return;

    let timer: NodeJS.Timeout;
    const cycle = () => {
      setBreathState("In");
      timer = setTimeout(() => {
        setBreathState("Hold");
        timer = setTimeout(() => {
          setBreathState("Out");
          timer = setTimeout(cycle, 4000);
        }, 4000);
      }, 4000);
    };

    cycle();
    return () => clearTimeout(timer);
  }, [isOpen]);

  // Rotate messages every 8 seconds
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background/40 backdrop-blur-[20px] overflow-hidden"
        >
          {/* Animated Background Gradients */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-primary/20 rounded-full blur-[120px]"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-[20%] -right-[10%] w-[70%] h-[70%] bg-blue-400/10 rounded-full blur-[130px]"
            />
          </div>

          {/* Controls Header */}
          <div className="absolute top-6 left-0 right-0 px-6 flex items-center justify-between z-10">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/10 text-primary">
                <Wind className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground tracking-tight">Calm Mode</h2>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">MindCare Premium</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMuted(!muted)}
                className="p-3 rounded-full bg-card/50 border border-border/50 text-foreground hover:bg-muted transition-colors flex items-center justify-center"
              >
                {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <button
                onClick={onClose}
                className="p-3 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Breathing Visualizer */}
          <div className="relative flex items-center justify-center w-full max-w-md aspect-square">
            {/* Outer Ring */}
            <motion.div
              animate={{
                scale: breathState === "In" ? 1.4 : breathState === "Hold" ? 1.4 : 1,
              }}
              transition={{ duration: 4, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full border border-primary/20"
            />
            
            {/* Middle Glow */}
            <motion.div
              animate={{
                scale: breathState === "In" ? 1.2 : breathState === "Hold" ? 1.2 : 1,
                opacity: breathState === "Out" ? 0.3 : 0.6,
              }}
              transition={{ duration: 4, ease: "easeInOut" }}
              className="absolute inset-[15%] rounded-full bg-gradient-to-br from-primary/30 to-blue-300/20 blur-xl"
            />

            {/* Core Circle */}
            <motion.div
              animate={{
                scale: breathState === "In" ? 1.1 : breathState === "Hold" ? 1.1 : 1,
              }}
              transition={{ duration: 4, ease: "easeInOut" }}
              className="relative w-40 h-40 rounded-full bg-card shadow-elevated flex items-center justify-center border border-primary/10 overflow-hidden"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={breathState}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <p className="text-xl font-bold text-foreground">Breathe {breathState}</p>
                </motion.div>
              </AnimatePresence>
              
              {/* Ripple effects */}
              <motion.div 
                animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeOut" }}
                className="absolute inset-0 bg-primary/20 rounded-full"
              />
            </motion.div>
          </div>

          {/* Supportive Message */}
          <div className="mt-16 text-center px-6 max-w-lg">
            <AnimatePresence mode="wait">
              <motion.div
                key={messageIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              >
                <div className="flex items-center justify-center gap-2 text-primary mb-3">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em]">Guidance</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-medium text-foreground leading-tight italic">
                  "{MESSAGES[messageIndex]}"
                </h3>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer distraction reduced info */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            className="absolute bottom-8 text-[11px] text-muted-foreground uppercase tracking-[0.3em] font-medium"
          >
            Distractions Minimized · Safe Space
          </motion.p>

          {/* Hidden Audio Player */}
          {!muted && (
            <div className="hidden">
              <iframe
                width="0"
                height="0"
                src="https://www.youtube.com/embed/5qap5aO4i9A?autoplay=1&loop=1&playlist=5qap5aO4i9A"
                title="Calm Music"
                allow="autoplay"
              />
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
