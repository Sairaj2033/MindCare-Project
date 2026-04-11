import { sendNotification } from "./sms";

// SMS messages for each depression level
const SMS_MESSAGES = {
  Medium:
    "Reminder: Take care of yourself. Try meditation, exercise, or go for a short outing.",
  High:
    "Important: Please prioritize your mental health. Consider reaching out to a professional or a trusted person.",
} as const;

export async function registerUser(data: Record<string, any>) {
  // Simple client‑side mock: store users in localStorage
  const existing = JSON.parse(localStorage.getItem('users') || '[]');
  
  if (data.email) {
    const isDuplicate = existing.some((u: any) => u.email === data.email);
    if (isDuplicate) {
      throw new Error("An account with this email address already exists.");
    }
  }

  existing.push(data);
  localStorage.setItem('users', JSON.stringify(existing));
  localStorage.setItem("currentUser", JSON.stringify(data));
  localStorage.setItem("registered", "true");
  window.dispatchEvent(new Event("auth-change"));
  // Simulate async delay
  await new Promise<void>((resolve) => setTimeout(resolve, 200));

  // ── Welcome Email logic ────────────────────────────────────────────────
  if (data.email) {
    await sendNotification({
      email: data.email,
      subject: "Welcome to MindCare",
      title: "Account Created Successfully",
      userName: data.name || "User",
      message: "We're so glad you've joined MindCare.\nWe are here to help you **Understand Your Emotions** and **Empower Your Mind**. Your journey starts right securely here.",
      ctaText: "Go to Profile",
      ctaLink: "http://localhost:8080/profile",
      secondaryCtaSubtitle: "Complete Your Setup:",
      secondaryCtaText: "Take the Assessment →",
      secondaryCtaLink: "http://localhost:8080/assessment"
    });
  }

  // ── Depression‑level Email logic ───────────────────────────────────────
  const level = data.depressionLevel as string | undefined;
  if (level === "Medium" || level === "High") {
    await sendNotification({
      email: data.email,
      subject: "Important Health Guidance",
      title: "MindCare Priority Support",
      userName: data.name || "User",
      message: level === "Medium" ? SMS_MESSAGES.Medium : SMS_MESSAGES.High,
      ctaText: "View Resources",
      ctaLink: "http://localhost:8080/helplines"
    });
  }
}

export async function signInUser(emailOrPhone: string, password: string) {
  const users: Record<string, any>[] = JSON.parse(localStorage.getItem('users') || '[]');
  // Find user by email or phone
  const user = users.find(
    (u) => u.email === emailOrPhone || u.phone === emailOrPhone
  );
  await new Promise<void>((resolve) => setTimeout(resolve, 300));
  if (!user) {
    throw new Error("No account found with that email or phone number.");
  }
  
  if (user.password !== password) {
    throw new Error("Incorrect password.");
  }

  localStorage.setItem("registered", "true");
  localStorage.setItem("currentUser", JSON.stringify(user));
  window.dispatchEvent(new Event("auth-change"));
  return user;
}

export async function requestPasswordReset(email: string) {
  await new Promise<void>((resolve) => setTimeout(resolve, 300));
  // Mock — in production, send a reset email via your backend
  console.log(`Password reset requested for: ${email}`);
}
