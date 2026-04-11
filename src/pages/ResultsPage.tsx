import { useEffect, useState } from "react";
import { useLocation, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, TrendingDown, Minus, Clock } from "lucide-react";
import Layout from "@/components/Layout";
import { AssessmentResult, levelColors, levelBgColors, saveResultToHistory, getHistory, calculateTrend, TrendAnalysis } from "@/lib/assessment";
import { useI18n } from "@/lib/i18n";

const ResultsPage = () => {
  const location = useLocation();
  const result = location.state?.result as AssessmentResult | undefined;
  const { t } = useI18n();
  const [trend, setTrend] = useState<TrendAnalysis | null>(null);

  useEffect(() => {
    if (result) {
      saveResultToHistory(result);
      const history = getHistory();
      setTrend(calculateTrend(history));
    }
  }, [result]);

  if (!result) return <Navigate to="/assessment" replace />;

  return (
    <Layout>
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl font-bold text-foreground mb-8 text-center">{t.results.title}</h1>

            <div className="gradient-card rounded-2xl p-10 shadow-card text-center mb-8">
              <div className="relative w-40 h-40 mx-auto mb-6">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
                  <motion.circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeDasharray={`${result.percentage * 2.64} 264`} initial={{ strokeDasharray: "0 264" }} animate={{ strokeDasharray: `${result.percentage * 2.64} 264` }} transition={{ duration: 1.2, ease: "easeOut" }} className={levelColors[result.level]} />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.span className="text-3xl font-bold text-foreground" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>{result.percentage}%</motion.span>
                </div>
              </div>

              <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold text-card mb-4 ${levelBgColors[result.level]}`}>
                {t.levels[result.level]} {t.results.depression}
              </div>
              <p className="text-muted-foreground leading-relaxed">{t.feedback[result.level]}</p>
              <p className="text-xs text-muted-foreground mt-3">{t.results.score}: {result.totalScore} / {result.maxScore}</p>
            </div>

            {/* Stress Trend Section */}
            {trend && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-card rounded-2xl p-6 shadow-soft border border-border mb-8 overflow-hidden relative"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                
                <div className="flex items-center gap-4 mb-3">
                  <div className={`p-2.5 rounded-xl ${
                    trend.status === 'improving' ? 'bg-emerald-500/10 text-emerald-600' : 
                    trend.status === 'worsening' ? 'bg-rose-500/10 text-rose-600' : 'bg-blue-500/10 text-blue-600'
                  }`}>
                    {trend.status === 'improving' && <TrendingDown className="w-5 h-5" />}
                    {trend.status === 'worsening' && <TrendingUp className="w-5 h-5" />}
                    {trend.status === 'stable' && <Minus className="w-5 h-5" />}
                    {trend.status === 'first' && <Clock className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {trend.status === 'improving' && 'Stress is Decreasing'}
                      {trend.status === 'worsening' && 'Stress is Increasing'}
                      {trend.status === 'stable' && 'Stress levels are Stable'}
                      {trend.status === 'first' && 'First Assessment'}
                    </h3>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {trend.message}
                </p>

                {trend.status !== 'first' && (
                  <div className="text-xs font-medium px-3 py-1.5 bg-muted rounded-lg inline-block">
                    {trend.difference > 0 ? '+' : ''}{trend.difference}% change from last time
                  </div>
                )}
              </motion.div>
            )}


            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/solutions" state={{ level: result.level }} className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl gradient-accent text-accent-foreground font-semibold shadow-card hover:opacity-90 transition-opacity">
                {t.results.viewSolutions} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/entertainment" state={{ level: result.level }} className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary/10 hover:bg-primary hover:text-primary-foreground text-primary font-semibold shadow-soft border border-border transition-all duration-200">
                🎬 Entertainment Picks
              </Link>
              <Link to="/assessment" className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-card text-foreground font-semibold shadow-soft border border-border hover:bg-muted transition-colors">
                {t.results.retake}
              </Link>
            </div>

            <div className="mt-8 bg-card rounded-2xl p-5 shadow-soft border border-border text-center">
              <p className="text-xs text-muted-foreground">⚠️ {t.results.disclaimerShort}</p>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default ResultsPage;
