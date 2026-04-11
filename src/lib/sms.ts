/**
 * Email Notification Utility
 *
 * Sends Email via the Express backend at /api/send-email (which uses Nodemailer + Gmail).
 * Falls back to console logging if the backend is not running.
 */

const EMAIL_SERVER_URL = "http://localhost:3001/api/send-email";

export interface NotificationPayload {
  email: string;
  subject: string;
  title: string;
  userName: string;
  message: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaSubtitle?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  doctorData?: {
    name: string;
    specialization: string;
    clinic: string;
    phone: string;
    address: string;
    distance?: number;
  };
}

export async function sendNotification(payload: NotificationPayload): Promise<void> {
  try {
    const res = await fetch(EMAIL_SERVER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Email request failed");
    }

    console.log(`✅ Email sent to ${payload.email}`);
  } catch (err: any) {
    // Fallback: log to console if backend is not reachable
    console.warn("⚠️ Email server not reachable — logging to console instead:");
    console.log("──── EMAIL NOTIFICATION ────");
    console.log(`📧 To: ${payload.email}`);
    console.log(`📌 Subject: ${payload.subject}`);
    console.log(`👋 Hi ${payload.userName},`);
    console.log(`${payload.title}`);
    console.log(`💬 Message: ${payload.message}`);
    if (payload.ctaText) console.log(`🔗 CTA: [${payload.ctaText}](${payload.ctaLink})`);
    console.log("──────────────────────────");
  }
}
