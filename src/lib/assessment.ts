export interface Question {
  id: number;
  text: string;
  category: string;
}

export const questions: Question[] = [
  { id: 1, text: "How often do you feel sad or down without a clear reason?", category: "Mood" },
  { id: 2, text: "How frequently do you lose interest in activities you usually enjoy?", category: "Interest" },
  { id: 3, text: "How would you rate your energy level during most days?", category: "Energy" },
  { id: 4, text: "How often do you experience difficulty sleeping?", category: "Sleep" },
  { id: 5, text: "Do you find it hard to concentrate on tasks such as studying or working?", category: "Concentration" },
  { id: 6, text: "How often do you feel stressed due to studies, work, or personal life?", category: "Stress" },
  { id: 7, text: "How often do you feel lonely even when you are around people?", category: "Social" },
  { id: 8, text: "How frequently do you feel tired or lack motivation to do daily activities?", category: "Motivation" },
  { id: 9, text: "How often do you talk to friends or family about your feelings?", category: "Communication" },
  { id: 10, text: "How would you describe your overall mental well-being in the past month?", category: "Well-being" },
];

export const answerOptions = [
  { value: 0, label: "Never / Very good / Very high / Very often" },
  { value: 1, label: "Rarely / Occasionally / Good / Moderate / Sometimes" },
  { value: 2, label: "Sometimes / Frequently / Poor / Low / Often" },
  { value: 3, label: "Often / Always / Very poor / Very low / Rarely / Never" },
];

export type DepressionLevel = "Low stress" | "Mild stress" | "Moderate stress" | "High stress" | "Critical stress";

export interface AssessmentResult {
  totalScore: number;
  maxScore: number;
  percentage: number;
  level: DepressionLevel;
}

export interface HistoryEntry extends AssessmentResult {
  timestamp: string;
}

const STORAGE_KEY = "mindcare_stress_history";

export function saveResultToHistory(result: AssessmentResult): void {
  const history = getHistory();
  const newEntry: HistoryEntry = {
    ...result,
    timestamp: new Date().toISOString(),
  };
  // Avoid saving if the last entry is identical and from very recently (e.g. 5 seconds)
  const lastEntry = history[0];
  if (lastEntry) {
    const lastTime = new Date(lastEntry.timestamp).getTime();
    const now = new Date().getTime();
    if (now - lastTime < 5000 && lastEntry.percentage === result.percentage) {
      return;
    }
  }
  
  const updated = [newEntry, ...history].slice(0, 50); // Keep last 50 entries
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function getHistory(): HistoryEntry[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export type TrendStatus = "improving" | "stable" | "worsening" | "first";

export interface TrendAnalysis {
  status: TrendStatus;
  message: string;
  difference: number;
}

export function calculateTrend(history: HistoryEntry[]): TrendAnalysis {
  if (history.length < 2) {
    return { status: "first", message: "This is your first assessment. Keep it up!", difference: 0 };
  }

  const latest = history[0].percentage;
  const previous = history[1].percentage;
  const diff = latest - previous;

  if (Math.abs(diff) <= 5) {
    return { 
      status: "stable", 
      message: "Your stress levels are stable. Maintain your self-care routine.",
      difference: diff
    };
  } else if (diff < 0) {
    return { 
      status: "improving", 
      message: "Great news! Your stress levels are decreasing. Whatever you're doing is working.",
      difference: diff
    };
  } else {
    return { 
      status: "worsening", 
      message: "It looks like your stress has increased. Consider taking a break and using our guided exercises.",
      difference: diff
    };
  }
}

export function calculateResult(answers: Record<number, number>): AssessmentResult {
  const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0);
  const maxScore = questions.length * 3; // 30
  const percentage = Math.round((totalScore / maxScore) * 100);

  let level: DepressionLevel;
  if (percentage <= 20) level = "Low stress";
  else if (percentage <= 40) level = "Mild stress";
  else if (percentage <= 60) level = "Moderate stress";
  else if (percentage <= 80) level = "High stress";
  else level = "Critical stress";

  return { totalScore, maxScore, percentage, level };
}

export const levelColors: Record<DepressionLevel, string> = {
  "Low stress": "text-level-minimal",
  "Mild stress": "text-level-mild",
  "Moderate stress": "text-level-moderate",
  "High stress": "text-level-mod-severe",
  "Critical stress": "text-level-severe",
};

export const levelBgColors: Record<DepressionLevel, string> = {
  "Low stress": "bg-level-minimal",
  "Mild stress": "bg-level-mild",
  "Moderate stress": "bg-level-moderate",
  "High stress": "bg-level-mod-severe",
  "Critical stress": "bg-level-severe",
};

export const feedbackMessages: Record<DepressionLevel, string> = {
  "Low stress": "You're doing well! Maintain healthy habits and self-care routines.",
  "Mild stress": "You're experiencing mild stress. Short relaxation steps can make a big difference.",
  "Moderate stress": "Your stress is moderate. Consider breathing exercises or a short meditation session.",
  "High stress": "Your stress is high. We recommend taking a break, trying a calming activity, and reaching out for support.",
  "Critical stress": "Your stress levels are critical. Please rest immediately and consider reaching out to a professional or a trusted support contact.",
};
