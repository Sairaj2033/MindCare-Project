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

export type DepressionLevel = "Minimal" | "Mild" | "Moderate" | "Moderately Severe" | "Severe";

export interface AssessmentResult {
  totalScore: number;
  maxScore: number;
  percentage: number;
  level: DepressionLevel;
}

export function calculateResult(answers: Record<number, number>): AssessmentResult {
  const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0);
  const maxScore = questions.length * 3; // 30
  const percentage = Math.round((totalScore / maxScore) * 100);

  let level: DepressionLevel;
  if (percentage <= 20) level = "Minimal";
  else if (percentage <= 40) level = "Mild";
  else if (percentage <= 60) level = "Moderate";
  else if (percentage <= 80) level = "Moderately Severe";
  else level = "Severe";

  return { totalScore, maxScore, percentage, level };
}

export const levelColors: Record<DepressionLevel, string> = {
  Minimal: "text-level-minimal",
  Mild: "text-level-mild",
  Moderate: "text-level-moderate",
  "Moderately Severe": "text-level-mod-severe",
  Severe: "text-level-severe",
};

export const levelBgColors: Record<DepressionLevel, string> = {
  Minimal: "bg-level-minimal",
  Mild: "bg-level-mild",
  Moderate: "bg-level-moderate",
  "Moderately Severe": "bg-level-mod-severe",
  Severe: "bg-level-severe",
};

export const feedbackMessages: Record<DepressionLevel, string> = {
  Minimal: "You're doing well! Keep maintaining healthy habits and self-care routines.",
  Mild: "You're experiencing some challenges. Small lifestyle changes can make a big difference.",
  Moderate: "It's okay to seek support. Consider talking to a counselor or trusted person.",
  "Moderately Severe": "Please reach out to a mental health professional. You deserve support.",
  Severe: "Please seek immediate help. Contact a crisis helpline or visit an emergency room.",
};
