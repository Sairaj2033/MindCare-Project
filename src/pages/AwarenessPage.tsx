import { motion } from "framer-motion";
import { Brain, AlertCircle, Heart, Users, Lightbulb, CheckCircle, XCircle } from "lucide-react";
import Layout from "@/components/Layout";
import { useI18n } from "@/lib/i18n";

const sectionIcons = [
  <Brain className="w-6 h-6" />,
  <AlertCircle className="w-6 h-6" />,
  <Heart className="w-6 h-6" />,
  <Users className="w-6 h-6" />,
  <Lightbulb className="w-6 h-6" />,
];

const AwarenessPage = () => {
  const { t } = useI18n();

  return (
    <Layout>
      <section className="container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold text-foreground mb-3 text-center">{t.awareness.title}</h1>
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">{t.awareness.subtitle}</p>

          <div className="max-w-3xl mx-auto space-y-8">
            {t.awareness.sections.map((sec, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="gradient-card rounded-2xl p-8 shadow-card border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl bg-primary/10 text-foreground">{sectionIcons[i]}</div>
                  <h2 className="text-xl font-semibold text-foreground">{sec.title}</h2>
                </div>
                {"content" in sec && <p className="text-muted-foreground leading-relaxed">{sec.content}</p>}
                {"items" in sec && (
                  <ul className="space-y-2 mt-2">
                    {(sec as any).items.map((item: string, j: number) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}

            {/* Myths vs Facts */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="gradient-card rounded-2xl p-8 shadow-card border border-border">
              <h2 className="text-xl font-semibold text-foreground mb-6">{t.awareness.mythsTitle}</h2>
              <div className="space-y-4">
                {t.awareness.myths.map((m, i) => (
                  <div key={i} className="grid md:grid-cols-2 gap-3">
                    <div className="flex items-start gap-2 p-3 rounded-xl bg-destructive/5 border border-destructive/10">
                      <XCircle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground"><strong className="text-foreground">Myth:</strong> {m.myth}</span>
                    </div>
                    <div className="flex items-start gap-2 p-3 rounded-xl bg-accent/50 border border-accent">
                      <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground"><strong className="text-foreground">Fact:</strong> {m.fact}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="gradient-hero rounded-2xl p-8 text-center">
              <h2 className="text-xl font-semibold text-foreground mb-3">{t.awareness.earlyDetectionTitle}</h2>
              <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto">{t.awareness.earlyDetectionContent}</p>
            </div>
          </div>
        </motion.div>
      </section>
    </Layout>
  );
};

export default AwarenessPage;
