import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Phone, Users, Brain, Shield, Sparkles } from "lucide-react";
import Layout from "@/components/Layout";
import { DepressionLevel } from "@/lib/assessment";
import { useI18n } from "@/lib/i18n";

const levelIcons: Record<DepressionLevel, React.ReactNode> = {
  Minimal: <Sparkles className="w-6 h-6" />,
  Mild: <Heart className="w-6 h-6" />,
  Moderate: <Users className="w-6 h-6" />,
  "Moderately Severe": <Brain className="w-6 h-6" />,
  Severe: <Shield className="w-6 h-6" />,
};

const SolutionsPage = () => {
  const location = useLocation();
  const highlightLevel = location.state?.level as DepressionLevel | undefined;
  const { t } = useI18n();

  const levels: DepressionLevel[] = ["Minimal", "Mild", "Moderate", "Moderately Severe", "Severe"];

  return (
    <Layout>
      <section className="container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold text-foreground mb-3 text-center">{t.solutions.title}</h1>
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">{t.solutions.subtitle}</p>

          <div className="space-y-8 max-w-3xl mx-auto">
            {levels.map((level, i) => {
              const data = t.solutionLevels[level];
              return (
                <motion.div
                  key={level}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`gradient-card rounded-2xl p-8 shadow-card border ${
                    highlightLevel === level ? "border-primary ring-2 ring-primary/30" : "border-border"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-xl bg-primary/10 text-foreground">{levelIcons[level]}</div>
                    <div>
                      <h3 className="font-semibold text-foreground">{data.title}</h3>
                      <span className="text-xs text-muted-foreground">{t.levels[level]} {t.solutions.level}</span>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {data.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>

          {/* Emergency banner */}
          <div className="max-w-3xl mx-auto mt-12 bg-destructive/10 border border-destructive/30 rounded-2xl p-6 text-center">
            <div className="flex items-center justify-center gap-2 text-destructive font-semibold mb-2">
              <Phone className="w-5 h-5" /> {t.solutions.emergencyTitle}
            </div>
            <p className="text-muted-foreground text-sm mb-4">{t.solutions.emergencyMsg}</p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="tel:988" className="px-4 py-2 rounded-xl bg-destructive text-destructive-foreground font-medium text-sm">Call 988</a>
              <a href="tel:911" className="px-4 py-2 rounded-xl bg-destructive text-destructive-foreground font-medium text-sm">Call 911</a>
              <a href="sms:741741&body=HELLO" className="px-4 py-2 rounded-xl bg-destructive text-destructive-foreground font-medium text-sm">Text 741741</a>
            </div>
          </div>
        </motion.div>
      </section>
    </Layout>
  );
};

export default SolutionsPage;
