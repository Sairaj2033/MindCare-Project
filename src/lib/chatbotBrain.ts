import { useNavigate } from "react-router-dom";

export type SuggestionAction = {
  label: string;
  href?: string;
  action?: "assessment" | "exercises" | "doctor";
  icon: string;
};

export type BotResponse = {
  message: string;
  suggestions?: SuggestionAction[];
};

// Keyword sets for stress detection
const STRESS_HIGH_KEYWORDS = [
  "suicid", "die", "hurt myself", "self harm", "hopeless", "cant go on",
  "can't go on", "worthless", "no point", "end it", "crisis"
];

const STRESS_MED_KEYWORDS = [
  "anxious", "anxiety", "panic", "worried", "overwhelmed", "depressed",
  "depression", "sad", "lonely", "cry", "crying", "stressed", "stress",
  "burnout", "exhausted", "tired of", "struggling", "low", "not okay",
  "feeling bad", "feeling down"
];

const EXERCISE_KEYWORDS = [
  "breath", "meditat", "relax", "calm", "exercise", "grounding", "yoga",
  "mindful", "peace", "sleep", "tension"
];

const DOCTOR_KEYWORDS = [
  "doctor", "professional", "therapist", "psychiatrist", "help me",
  "seek help", "treatment", "medication", "clinic", "recommend"
];

const ASSESSMENT_KEYWORDS = [
  "assess", "test", "quiz", "check", "score", "level", "result",
  "depression level", "how bad", "how am i"
];

function detectIntent(msg: string): "crisis" | "stress_high" | "stress_med" | "exercise" | "doctor" | "assessment" | "general" {
  const lower = msg.toLowerCase();
  if (STRESS_HIGH_KEYWORDS.some(k => lower.includes(k))) return "crisis";
  if (STRESS_MED_KEYWORDS.some(k => lower.includes(k))) return "stress_med";
  if (EXERCISE_KEYWORDS.some(k => lower.includes(k))) return "exercise";
  if (DOCTOR_KEYWORDS.some(k => lower.includes(k))) return "doctor";
  if (ASSESSMENT_KEYWORDS.some(k => lower.includes(k))) return "assessment";
  return "general";
}

// Pull a topic from recent messages to improve follow-up replies
function extractTopic(history: string[]): string | null {
  const recent = history.slice(-3).join(" ").toLowerCase();
  if (STRESS_MED_KEYWORDS.some(k => recent.includes(k))) return "stress";
  if (EXERCISE_KEYWORDS.some(k => recent.includes(k))) return "exercise";
  if (DOCTOR_KEYWORDS.some(k => recent.includes(k))) return "doctor";
  if (ASSESSMENT_KEYWORDS.some(k => recent.includes(k))) return "assessment";
  return null;
}

const ASSESSMENT_SUGGESTION: SuggestionAction = {
  label: "Take Assessment",
  href: "/assessment",
  action: "assessment",
  icon: "🧠",
};
const EXERCISE_SUGGESTION: SuggestionAction = {
  label: "Try Breathing Exercise",
  href: "/exercises",
  action: "exercises",
  icon: "🌬️",
};
const DOCTOR_SUGGESTION: SuggestionAction = {
  label: "View Doctor Recommendation",
  action: "doctor",
  icon: "🩺",
};
const EXERCISES_SUGGESTION: SuggestionAction = {
  label: "Browse Guided Exercises",
  href: "/exercises",
  action: "exercises",
  icon: "🧘",
};

export function generateResponse(
  userMsg: string,
  history: string[]
): BotResponse {
  const intent = detectIntent(userMsg);
  const topic = extractTopic(history);

  // Crisis — top priority
  if (intent === "crisis") {
    return {
      message:
        "I'm really sorry you're feeling this way. 💙 Please know you're not alone. If you're in immediate danger, call **iCall: 9152987821** or **Vandrevala Foundation: 1860-2662-345** right now. I'm here with you.",
      suggestions: [ASSESSMENT_SUGGESTION],
    };
  }

  // Medium stress
  if (intent === "stress_med") {
    return {
      message:
        "I hear you. Feeling stressed or low is really tough. 💙 A good first step is to check in with yourself — start with the assessment or try a calming exercise.",
      suggestions: [ASSESSMENT_SUGGESTION, EXERCISE_SUGGESTION, DOCTOR_SUGGESTION],
    };
  }

  // Exercise request
  if (intent === "exercise") {
    return {
      message:
        "Breathing and mindfulness can work wonders for calming your mind. 🌬️ We have guided sessions for breathing, meditation, grounding, and more.",
      suggestions: [EXERCISES_SUGGESTION, ASSESSMENT_SUGGESTION],
    };
  }

  // Doctor request
  if (intent === "doctor") {
    return {
      message:
        "Reaching out to a professional is a great step. 🩺 Based on your location and stress level, I can find the nearest mental health professional for you.",
      suggestions: [DOCTOR_SUGGESTION, ASSESSMENT_SUGGESTION],
    };
  }

  // Assessment request
  if (intent === "assessment") {
    return {
      message:
        "The assessment takes just a few minutes and gives you a clear picture of your stress level with personalized guidance. 🧠",
      suggestions: [ASSESSMENT_SUGGESTION],
    };
  }

  // General — but context-aware via topic
  if (topic === "stress") {
    return {
      message:
        "It sounds like you might still be dealing with stress. Want to take a quick assessment or try a breathing exercise? That can really help.",
      suggestions: [ASSESSMENT_SUGGESTION, EXERCISE_SUGGESTION],
    };
  }

  if (topic === "exercise") {
    return {
      message:
        "Looking for more exercises? Our Guided Exercises page has breathing, meditation, grounding, and relaxation sessions.",
      suggestions: [EXERCISES_SUGGESTION],
    };
  }

  // Greetings
  const greetings = ["hi", "hello", "hey", "good morning", "good evening", "how are you"];
  if (greetings.some(g => userMsg.toLowerCase().includes(g))) {
    return {
      message:
        "Hi there! 😊 I'm your MindCare assistant. I can help you check your stress level, find calming exercises, or locate a professional nearby. How are you feeling today?",
      suggestions: [ASSESSMENT_SUGGESTION, EXERCISES_SUGGESTION, DOCTOR_SUGGESTION],
    };
  }

  // Help / what can you do
  if (userMsg.toLowerCase().includes("help") || userMsg.toLowerCase().includes("what can you")) {
    return {
      message:
        "I can help you with: 🧠 stress assessment, 🌬️ guided breathing & meditation exercises, 🩺 doctor recommendations, and general mental wellness guidance. What would you like to explore?",
      suggestions: [ASSESSMENT_SUGGESTION, EXERCISES_SUGGESTION, DOCTOR_SUGGESTION],
    };
  }

  // Fallback
  return {
    message:
      "I'm here to support your mental wellbeing! 💙 Tell me how you're feeling, or pick one of these options to get started.",
    suggestions: [ASSESSMENT_SUGGESTION, EXERCISES_SUGGESTION, DOCTOR_SUGGESTION],
  };
}
