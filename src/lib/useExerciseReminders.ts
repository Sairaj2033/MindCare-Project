import { useState, useEffect, useCallback } from "react";

export type Reminder = {
  id: string;
  exerciseTitle: string;
  exerciseUrl: string;
  delayMs: number;
  daily: boolean;
  createdAt: number;
  nextFireAt: number;
};

const STORAGE_KEY = "mindcare_exercise_reminders";

function load(): Reminder[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function save(reminders: Reminder[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reminders));
}

export function useExerciseReminders(onAlarm: (r: Reminder) => void) {
  const [reminders, setReminders] = useState<Reminder[]>(load);

  const scheduleReminder = useCallback(
    (delayMs: number, daily: boolean, exerciseTitle: string, exerciseUrl: string) => {
      const id = Math.random().toString(36).slice(2);
      const nextFireAt = Date.now() + delayMs;
      const reminder: Reminder = {
        id, exerciseTitle, exerciseUrl, delayMs, daily,
        createdAt: Date.now(), nextFireAt,
      };
      setReminders(prev => {
        const updated = [...prev, reminder];
        save(updated);
        return updated;
      });
    },
    []
  );

  const dismissReminder = useCallback((id: string) => {
    setReminders(prev => {
      const updated = prev.filter(r => r.id !== id);
      save(updated);
      return updated;
    });
  }, []);

  const snoozeReminder = useCallback((id: string) => {
    setReminders(prev => {
      const updated = prev.map(r =>
        r.id === id ? { ...r, nextFireAt: Date.now() + 10 * 60 * 1000 } : r
      );
      save(updated);
      return updated;
    });
  }, []);

  // Polling tick every 10 seconds to check for due reminders
  useEffect(() => {
    const tick = setInterval(() => {
      const now = Date.now();
      setReminders(prev => {
        let changed = false;
        const updated = prev
          .map(r => {
            if (r.nextFireAt <= now) {
              onAlarm(r);
              if (r.daily) {
                changed = true;
                return { ...r, nextFireAt: now + r.delayMs };
              }
              changed = true;
              return null; // remove one-time
            }
            return r;
          })
          .filter(Boolean) as Reminder[];
        if (changed) {
          save(updated);
          return updated;
        }
        return prev;
      });
    }, 10_000);
    return () => clearInterval(tick);
  }, [onAlarm]);

  return { reminders, scheduleReminder, dismissReminder, snoozeReminder };
}
