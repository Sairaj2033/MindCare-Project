import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
app.use(cors()); // In production, replace with specific origins for better security
app.use(express.json());

// ── Serve Static Assets ────────────────────────────────────────────────
// Point to the built frontend files in the root /dist directory
app.use(express.static(path.join(__dirname, "../dist")));

// ── Nodemailer Transporter (Gmail) ────────────────────────────────────
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Mock Database of Doctors
const doctorsDb = [
  { id: 1, name: "Dr. Ananya Sharma", specialization: "Psychiatrist", clinic: "Mindful Health Clinic", phone: "+91 98765 43210", address: "Andheri West, Mumbai", lat: 19.1136, lng: 72.8297 },
  { id: 2, name: "Dr. Rohan Gupta", specialization: "Clinical Psychologist", clinic: "Wellness Care Center", phone: "+91 87654 32109", address: "Bandra East, Mumbai", lat: 19.0596, lng: 72.8465 },
  { id: 3, name: "Dr. Sarah Patel", specialization: "Counselor", clinic: "Serenity Therapy", phone: "+91 76543 21098", address: "Powai, Mumbai", lat: 19.1176, lng: 72.9060 },
  { id: 4, name: "Dr. Alok Verma", specialization: "Psychiatrist", clinic: "Apex Mental Health", phone: "+91 65432 10987", address: "Lower Parel, Mumbai", lat: 18.9953, lng: 72.8300 },
  { id: 5, name: "Dr. Meera Desai", specialization: "General Wellness Expert", clinic: "Holistic Healing", phone: "+91 54321 09876", address: "Borivali West, Mumbai", lat: 19.2288, lng: 72.8453 },
];

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}

app.get("/api/doctors", (req, res) => {
  const { lat, lng, stressLevel } = req.query;
  const userLat = parseFloat(lat);
  const userLng = parseFloat(lng);
  
  let suitableDoctors = doctorsDb;
  
  // Filter by stress
  if (stressLevel === "Moderate stress") {
    suitableDoctors = suitableDoctors.filter(d => ["Counselor", "General Wellness Expert", "Clinical Psychologist"].includes(d.specialization));
  } else if (stressLevel === "High stress" || stressLevel === "Critical stress") {
    suitableDoctors = suitableDoctors.filter(d => ["Psychiatrist", "Clinical Psychologist"].includes(d.specialization));
  }

  // Calculate distance if coordinates provided
  if (!isNaN(userLat) && !isNaN(userLng)) {
    suitableDoctors = suitableDoctors.map(doc => ({
      ...doc,
      distance: calculateDistance(userLat, userLng, doc.lat, doc.lng),
    })).sort((a, b) => a.distance - b.distance);
  }

  // Return the best match or fallback
  if (suitableDoctors.length > 0) {
    res.json({ doctor: suitableDoctors[0] });
  } else {
    res.json({ doctor: doctorsDb[0] }); // Ultimate fallback
  }
});

// ── HTML Email Template Generator ─────────────────────────────────────
function generateEmailTemplate({ title, userName, message, ctaText, ctaLink, secondaryCtaText, secondaryCtaLink, secondaryCtaSubtitle, doctorData }) {
  // Replaces newline characters with <br> tags while preserving bold markdown-style tags if any
  const formattedMessage = message.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      <style>
        body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #fdf2f8; }
        .wrapper { width: 100%; min-height: 100vh; table-layout: fixed; background: linear-gradient(135deg, #ffe4e6 0%, #e0f2fe 100%); padding: 50px 10px; box-sizing: border-box; }
        .card { max-width: 550px; margin: 0 auto; background-color: rgba(255, 255, 255, 0.95); border-radius: 20px; box-shadow: 0 15px 35px rgba(0, 0, 0, 0.05); overflow: hidden; padding: 40px; position: relative; }
        .title { text-align: center; font-size: 22px; font-weight: 700; color: #1f2937; margin-top: 0; margin-bottom: 24px; letter-spacing: -0.3px; }
        .brand-row { text-align: center; margin-bottom: 30px; }
        .brand-heart { font-size: 32px; color: #fbcfe8; vertical-align: middle; margin-right: 8px; }
        .brand-text { font-size: 36px; font-weight: 800; color: #374151; vertical-align: middle; letter-spacing: -1px; }
        .brand-icon { font-size: 36px; margin-left: 15px; vertical-align: middle; }
        .content { margin-bottom: 30px; }
        .greeting { font-size: 16px; font-weight: 700; color: #111827; margin-top: 0; margin-bottom: 12px; }
        .message { font-size: 15px; color: #374151; line-height: 1.6; margin-top: 0; margin-bottom: 0; font-weight: 500; }
        .btn-container { width: 100%; margin-top: 10px; }
        .btn-table { width: 100%; border-collapse: separate; border-spacing: 12px 0; }
        .btn { text-decoration: none; display: block; border-radius: 30px; text-align: center; font-family: sans-serif; }
        .btn-primary { background-color: #e5a9b8; border: 1px solid #e5a9b8; color: #ffffff; padding: ${secondaryCtaSubtitle ? '12px 20px' : '16px 24px'}; }
        .btn-primary-title { font-size: 13px; margin: 0 0 2px 0; opacity: 0.9; }
        .btn-primary-main { font-size: 15px; font-weight: 600; margin: 0; }
        .btn-secondary { background-color: #8daabc; border: 1px solid #8daabc; color: #ffffff; padding: 16px 24px; font-size: 15px; font-weight: 600; }
        .footer { text-align: center; margin-top: 30px; padding-top: 20px; font-size: 13px; color: #4b5563; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="card">
          <h2 class="title">${title}</h2>
          
          <div class="brand-row">
            <span class="brand-heart"><svg width="32" height="32" viewBox="0 0 24 24" fill="#fbcfe8" style="vertical-align: middle;"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></span>
            <span class="brand-text">MindCare</span>
            <span class="brand-icon">🧘‍♀️</span>
          </div>

          <div class="content">
            <p class="greeting">Hi ${userName},</p>
            <p class="message">${formattedMessage}</p>
          </div>

          ${doctorData ? `
          <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin-bottom: 30px;">
            <p style="margin: 0 0 10px 0; font-size: 13px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">Recommended Professional</p>
            <p style="margin: 0 0 4px 0; font-size: 18px; font-weight: 700; color: #1e293b;">${doctorData.name}</p>
            <p style="margin: 0 0 12px 0; font-size: 14px; font-weight: 500; color: #0284c7;">${doctorData.specialization}</p>
            <p style="margin: 0 0 4px 0; font-size: 14px; color: #475569;">📍 ${doctorData.clinic}, ${doctorData.address}</p>
            <p style="margin: 0 0 16px 0; font-size: 14px; color: #475569;">📞 ${doctorData.phone}</p>
            ${doctorData.distance ? `<p style="margin: 0 0 16px 0; font-size: 13px; font-weight: 600; color: #10b981;">Approx. ${doctorData.distance.toFixed(1)} km away</p>` : ''}
            <a href="tel:${doctorData.phone.replace(/[^0-9+]/g, '')}" style="display: inline-block; background-color: #0f172a; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 20px; font-size: 13px; font-weight: 600;">Call Doctor Now</a>
          </div>
          ` : ''}
          
          ${ctaText ? `
          <div class="btn-container">
            <table class="btn-table" role="presentation">
              <tr>
                ${secondaryCtaLink ? `
                <td width="50%" valign="middle">
                  <a href="${secondaryCtaLink}" class="btn btn-primary">
                    ${secondaryCtaSubtitle ? `<p class="btn-primary-title">${secondaryCtaSubtitle}</p>` : ''}
                    <p class="btn-primary-main">${secondaryCtaText}</p>
                  </a>
                </td>
                ` : ''}
                <td ${secondaryCtaLink ? 'width="50%"' : 'width="100%" align="center"'} valign="middle">
                  <a href="${ctaLink}" class="btn btn-secondary" ${!secondaryCtaLink ? 'style="display:inline-block; padding: 16px 40px;"' : ''}>
                    ${ctaText}
                  </a>
                </td>
              </tr>
            </table>
          </div>
          ` : ''}

          <div class="footer">
            Explore. Heal. Grow. | | MindCare App
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

// ── POST /api/send-email ──────────────────────────────────────────────
app.post("/api/send-email", async (req, res) => {
  const { email, subject, title, userName, message, ctaText, ctaLink, secondaryCtaText, secondaryCtaLink, secondaryCtaSubtitle, doctorData } = req.body;

  if (!email || !message) {
    return res.status(400).json({ error: "email and message are required" });
  }

  try {
    const mailOptions = {
      from: `"MindCare Admin" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: subject || "MindCare Notification",
      text: `Hi ${userName},\n\n${title}\n\n${message}\n\n${ctaText ? ctaText + ': ' + ctaLink : ''}`,
      html: generateEmailTemplate({ title: title || "Notification", userName: userName || "User", message, ctaText, ctaLink, secondaryCtaText, secondaryCtaLink, secondaryCtaSubtitle, doctorData }),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${email} (ID: ${info.messageId})`);
    res.json({ success: true, messageId: info.messageId });
  } catch (err) {
    console.error("❌ Email failed:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// ── Health check ───────────────────────────────────────────────────────
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

// ── Catch-all for SPA ──────────────────────────────────────────────────
// Any request that doesn't match an API route will serve index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

// ── Start server ───────────────────────────────────────────────────────
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
