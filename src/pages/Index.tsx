import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, BookOpen, Brain } from "lucide-react";
import Layout from "@/components/Layout";
import RegisterModal from "@/components/RegisterModal";
import heroBg from "@/assets/hero-bg.jpg";
import { useI18n } from "@/lib/i18n";

const Index = () => {
  const { t } = useI18n();
  return (
    <Layout>
      <RegisterModal />
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="Calming meditation illustration" className="w-full h-full object-cover" />
          <div className="absolute inset-0 gradient-hero opacity-60" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight mb-6">
              {t.hero.title1}{" "}
              <span className="text-primary">{t.hero.title2}</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">{t.hero.subtitle}</p>
            <div className="flex flex-wrap gap-4">
              <Link to="/assessment" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-accent text-accent-foreground font-semibold shadow-elevated hover:opacity-90 transition-opacity">
                <Brain className="w-5 h-5" />
                {t.hero.startAssessment}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/data-insights" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-card text-foreground font-semibold shadow-card border border-border hover:bg-muted transition-colors">
                <BarChart3 className="w-5 h-5" />
                {t.hero.viewData}
              </Link>
              <Link to="/awareness" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-card text-foreground font-semibold shadow-card border border-border hover:bg-muted transition-colors">
                <BookOpen className="w-5 h-5" />
                {t.hero.learnMore}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <h2 className="text-3xl font-bold text-foreground mb-3">{t.howItWorks.title}</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">{t.howItWorks.subtitle}</p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: "📝", title: t.howItWorks.step1Title, desc: t.howItWorks.step1Desc },
            { icon: "📊", title: t.howItWorks.step2Title, desc: t.howItWorks.step2Desc },
            { icon: "💡", title: t.howItWorks.step3Title, desc: t.howItWorks.step3Desc },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="gradient-card rounded-2xl p-8 shadow-card hover:shadow-elevated transition-shadow text-center">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="gradient-hero py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { stat: "280M+", label: t.stats.s1 },
              { stat: "50%", label: t.stats.s2 },
              { stat: "75%", label: t.stats.s3 },
              { stat: "3x", label: t.stats.s4 },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="text-3xl md:text-4xl font-bold text-foreground">{item.stat}</div>
                <div className="text-sm text-muted-foreground mt-1">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="container mx-auto px-4 py-12">
        <div className="bg-card rounded-2xl p-6 shadow-soft border border-border text-center max-w-2xl mx-auto">
          <p className="text-sm text-muted-foreground">⚠️ {t.disclaimer}</p>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
