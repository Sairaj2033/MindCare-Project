import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X, Clock, Repeat } from "lucide-react";

const PRESET_OPTIONS = [
  { label: "10 minutes", ms: 10 * 60 * 1000 },
  { label: "30 minutes", ms: 30 * 60 * 1000 },
  { label: "1 hour", ms: 60 * 60 * 1000 },
  { label: "2 hours", ms: 2 * 60 * 60 * 1000 },
];

type Props = {
  exerciseTitle: string;
  exerciseUrl: string;
  onClose: () => void;
  onSchedule: (ms: number, daily: boolean, exerciseTitle: string, exerciseUrl: string) => void;
};

export default function ExerciseReminderModal({ exerciseTitle, exerciseUrl, onClose, onSchedule }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [customTime, setCustomTime] = useState("");
  const [daily, setDaily] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const getDelayMs = (): number | null => {
    if (selected !== null) return PRESET_OPTIONS[selected].ms;
    if (customTime) {
      const [h, m] = customTime.split(":").map(Number);
      const now = new Date();
      const target = new Date();
      target.setHours(h, m, 0, 0);
      if (target <= now) target.setDate(target.getDate() + 1);
      return target.getTime() - now.getTime();
    }
    return null;
  };

  const handleConfirm = () => {
    const delay = getDelayMs();
    if (delay === null) return;
    onSchedule(delay, daily, exerciseTitle, exerciseUrl);
    setConfirmed(true);
    setTimeout(onClose, 1600);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 12 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 12 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="bg-card border border-border rounded-2xl shadow-elevated w-full max-w-sm p-6 relative"
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/10">
                <Bell className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-base">Set Reminder</h3>
                <p className="text-xs text-muted-foreground line-clamp-1 max-w-[200px]">{exerciseTitle}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-1 rounded-full hover:bg-muted transition-colors text-muted-foreground">
              <X className="w-4 h-4" />
            </button>
          </div>

          {confirmed ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-4"
            >
              <div className="text-3xl mb-2">✅</div>
              <p className="font-semibold text-foreground">Reminder Set!</p>
              <p className="text-sm text-muted-foreground mt-1">We'll notify you when it's time.</p>
            </motion.div>
          ) : (
            <>
              {/* Preset buttons */}
              <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> Remind me in
              </p>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {PRESET_OPTIONS.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => { setSelected(i); setCustomTime(""); }}
                    className={`py-2 px-3 rounded-xl text-sm font-medium transition-all border ${
                      selected === i
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-muted text-foreground border-border hover:border-primary/40"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {/* Custom time picker */}
              <p className="text-xs font-medium text-muted-foreground mb-2">Or pick a specific time</p>
              <input
                type="time"
                value={customTime}
                onChange={e => { setCustomTime(e.target.value); setSelected(null); }}
                className="w-full bg-muted text-foreground text-sm px-4 py-2.5 rounded-xl border border-border outline-none focus:ring-1 focus:ring-primary/40 mb-4"
              />

              {/* Daily toggle */}
              <button
                onClick={() => setDaily(d => !d)}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl border text-sm font-medium transition-all mb-5 ${
                  daily
                    ? "bg-primary/10 text-primary border-primary/30"
                    : "bg-muted text-muted-foreground border-border"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Repeat className="w-4 h-4" />
                  Repeat Daily
                </span>
                <div className={`w-8 h-4 rounded-full transition-all ${daily ? "bg-primary" : "bg-border"} relative`}>
                  <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${daily ? "left-4" : "left-0.5"}`} />
                </div>
              </button>

              {/* Confirm */}
              <button
                onClick={handleConfirm}
                disabled={selected === null && !customTime}
                className="w-full py-3 rounded-xl gradient-accent text-accent-foreground font-semibold text-sm disabled:opacity-40 hover:opacity-90 transition-opacity"
              >
                Set Reminder
              </button>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
