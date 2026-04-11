import { motion, AnimatePresence } from "framer-motion";
import { Bell, Play, Clock, X } from "lucide-react";
import type { Reminder } from "@/lib/useExerciseReminders";

type Props = {
  reminder: Reminder | null;
  onStart: () => void;
  onSnooze: () => void;
  onDismiss: () => void;
};

export default function ReminderAlarmPopup({ reminder, onStart, onSnooze, onDismiss }: Props) {
  return (
    <AnimatePresence>
      {reminder && (
        <motion.div
          key={reminder.id}
          initial={{ y: 80, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 80, opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", damping: 22, stiffness: 260 }}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[70] w-[92vw] max-w-sm"
        >
          <div className="bg-card border border-primary/30 rounded-2xl shadow-elevated overflow-hidden">
            {/* Accent bar */}
            <div className="h-1 w-full gradient-accent" />

            <div className="p-5">
              {/* Icon + title */}
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-primary/10 shrink-0">
                  <Bell className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-primary mb-0.5">Exercise Reminder ⏰</p>
                  <h3 className="font-semibold text-foreground text-base leading-snug">
                    Time for your exercise!
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                    "{reminder.exerciseTitle}" is waiting for you. Take a few minutes for yourself. 💙
                  </p>
                </div>
                <button
                  onClick={onDismiss}
                  className="p-1 rounded-full hover:bg-muted text-muted-foreground transition-colors shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Action buttons */}
              <div className="flex gap-2">
                <a
                  href={reminder.exerciseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onStart}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl gradient-accent text-accent-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  Start Exercise
                </a>
                <button
                  onClick={onSnooze}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-border bg-muted text-foreground text-sm font-medium hover:bg-accent transition-colors"
                >
                  <Clock className="w-3.5 h-3.5" />
                  +10 min
                </button>
                <button
                  onClick={onDismiss}
                  className="px-3 py-2.5 rounded-xl border border-border bg-muted text-muted-foreground text-sm font-medium hover:bg-accent transition-colors"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
