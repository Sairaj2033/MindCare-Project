import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Layout from "@/components/Layout";
import { questions, answerOptions, calculateResult } from "@/lib/assessment";
import { STRESS_LOGIC } from "@/lib/stressLogic";
import { sendNotification } from "@/lib/sms";
import { useI18n } from "@/lib/i18n";

const AssessmentPage = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { t } = useI18n();

  const progress = (Object.keys(answers).length / questions.length) * 100;
  const q = questions[currentQ];
  const isLast = currentQ === questions.length - 1;

  const handleAnswer = (value: number) => {
    const newAnswers = { ...answers, [q.id]: value };
    setAnswers(newAnswers);
    if (!isLast) setTimeout(() => setCurrentQ(currentQ + 1), 300);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const result = calculateResult(answers);
    
    // Save last assessment timestamp to silence the prompt
    localStorage.setItem("lastAssessmentDate", new Date().getTime().toString());

    // Evaluate logic for logged in users
    const userStr = localStorage.getItem("currentUser");
    if (userStr) {
      const user = JSON.parse(userStr);
      // Update their stress level natively
      user.depressionLevel = result.level;
      localStorage.setItem("currentUser", JSON.stringify(user));
      window.dispatchEvent(new Event("auth-change"));

      // Fetch dynamic content mapping
      const stressContent = STRESS_LOGIC[result.level];
      
      // Determine if a doctor is needed based on stress level
      const needsDoctor = ["Moderate stress", "High stress", "Critical stress"].includes(result.level);
      let doctorData = undefined;

      if (needsDoctor) {
        try {
          // Attempt geolocation with a timeout
          const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 3000 });
          }).catch(() => null);

          const params = new URLSearchParams({ stressLevel: result.level });
          if (pos) {
            params.append("lat", pos.coords.latitude.toString());
            params.append("lng", pos.coords.longitude.toString());
          }

          const res = await fetch(`http://localhost:3001/api/doctors?${params.toString()}`);
          const data = await res.json();
          if (data.doctor) {
            doctorData = data.doctor;
            // Pop the UI Card immediately after the page seamlessly transitions
            setTimeout(() => {
              window.dispatchEvent(new CustomEvent("show-doctor", { detail: doctorData }));
            }, 500);
          }
        } catch (e) {
          console.error("Failed to fetch nearby doctor", e);
        }
      }
      
      // Coordinated Toast
      toast(stressContent.toastTitle, {
        description: stressContent.emailMessage,
        className: stressContent.toastColorClass,
      });

      // Coordinated Email (do not block UI)
      sendNotification({
        email: user.email,
        subject: stressContent.emailSubject,
        title: stressContent.emailTitle,
        userName: user.name || "User",
        message: stressContent.emailMessage,
        ctaText: stressContent.ctaText,
        ctaLink: stressContent.ctaLink,
        doctorData: doctorData
      }).catch((e) => console.error("Stress email failed:", e));
    }

    setIsSubmitting(false);
    navigate("/results", { state: { result } });
  };

  return (
    <Layout>
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl font-bold text-foreground mb-2">{t.assessment.title}</h1>
            <p className="text-muted-foreground mb-8">{t.assessment.subtitle}</p>

            {/* Progress bar */}
            <div className="w-full h-2 bg-muted rounded-full mb-8 overflow-hidden">
              <motion.div className="h-full gradient-accent rounded-full" animate={{ width: `${progress}%` }} transition={{ duration: 0.3 }} />
            </div>

            {/* Question */}
            <AnimatePresence mode="wait">
              <motion.div key={currentQ} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="gradient-card rounded-2xl p-8 shadow-card">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/20 text-foreground">{q.category}</span>
                  <span className="text-xs text-muted-foreground">{currentQ + 1} / {questions.length}</span>
                </div>
                <h2 className="text-lg font-semibold text-foreground mb-6">{t.questions[currentQ]}</h2>

                <div className="space-y-3">
                  {answerOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleAnswer(opt.value)}
                      className={`w-full text-left p-4 rounded-xl border transition-all ${
                        answers[q.id] === opt.value
                          ? "border-primary bg-primary/10 text-foreground shadow-soft"
                          : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:bg-muted"
                      }`}
                    >
                      <span className="font-medium">{t.answerOptions[opt.value as 0 | 1 | 2 | 3]}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentQ(Math.max(0, currentQ - 1))} disabled={currentQ === 0} className="flex items-center gap-2 px-4 py-2 rounded-xl text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors">
                <ArrowLeft className="w-4 h-4" /> {t.assessment.previous}
              </button>
              {isLast && Object.keys(answers).length === questions.length ? (
                <button onClick={handleSubmit} disabled={isSubmitting} className="flex items-center justify-center gap-2 px-6 py-3 min-w-[160px] rounded-xl gradient-accent text-accent-foreground font-semibold shadow-card hover:opacity-90 transition-opacity disabled:opacity-50">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-accent-foreground" />
                      Processing...
                    </>
                  ) : (
                    <>
                      {t.assessment.viewResults} <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              ) : (
                <button onClick={() => setCurrentQ(Math.min(questions.length - 1, currentQ + 1))} disabled={answers[q.id] === undefined} className="flex items-center gap-2 px-4 py-2 rounded-xl text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors">
                  {t.assessment.next} <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default AssessmentPage;
