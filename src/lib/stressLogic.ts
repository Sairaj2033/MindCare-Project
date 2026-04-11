import { DepressionLevel } from "./assessment";

interface StressLogicConfig {
  emailSubject: string;
  emailTitle: string;
  emailMessage: string;
  ctaText: string;
  ctaLink: string;
  toastTitle: string;
  toastColorClass: string;
}

export const STRESS_LOGIC: Record<DepressionLevel, StressLogicConfig> = {
  "Low stress": {
    emailSubject: "MindCare: Maintain Your Wellness",
    emailTitle: "You're Doing Great",
    emailMessage: "We noticed your stress levels are low. Keep up the excellent work! Maintaining healthy habits and short wellness routines can help you stay balanced.",
    ctaText: "View Wellness Tips",
    ctaLink: "http://localhost:8080/solutions",
    toastTitle: "Low Stress",
    toastColorClass: "!border-green-500/30 !bg-green-500/5",
  },
  "Mild stress": {
    emailSubject: "MindCare: Daily Check-In",
    emailTitle: "Small Steps for Balance",
    emailMessage: "You're experiencing mild stress. This is completely normal, but it's a great time to encourage self-check and take short relaxation steps.",
    ctaText: "Check Your Progress",
    ctaLink: "http://localhost:8080/profile",
    toastTitle: "Mild Stress",
    toastColorClass: "!border-blue-500/30 !bg-blue-500/5",
  },
  "Moderate stress": {
    emailSubject: "MindCare: Pause & Breathe",
    emailTitle: "Time for a Short Break",
    emailMessage: "Your assessment shows moderate stress. We gently suggest taking a moment for some breathing exercises or a short meditation session.",
    ctaText: "Start Meditation",
    ctaLink: "http://localhost:8080/solutions",
    toastTitle: "Moderate Stress",
    toastColorClass: "!border-amber-500/30 !bg-amber-500/5",
  },
  "High stress": {
    emailSubject: "MindCare: Supportive Alert",
    emailTitle: "We're Here for You",
    emailMessage: "Your stress levels are highly elevated. We strongly recommend stepping away for a calming activity and taking a break. Please don't hesitate to reach out for support if you need it.",
    ctaText: "Find Support",
    ctaLink: "http://localhost:8080/helplines",
    toastTitle: "High Stress",
    toastColorClass: "!border-orange-500/30 !bg-orange-500/5",
  },
  "Critical stress": {
    emailSubject: "MindCare: Urgent Support Available",
    emailTitle: "Please Take Care of Yourself",
    emailMessage: "Your assessment indicates critical stress levels. Please prioritize immediate rest and consider a guided meditation. We strongly suggest reaching out to a professional or a trusted support contact.",
    ctaText: "Immediate Help",
    ctaLink: "http://localhost:8080/helplines",
    toastTitle: "Critical Stress",
    toastColorClass: "!border-destructive/30 !bg-destructive/5",
  },
};
