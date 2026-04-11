import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, BarChart3, BookOpen, Brain } from "lucide-react";
import Layout from "@/components/Layout";
import RegisterModal from "@/components/RegisterModal";
import heroBg from "@/assets/hero-bg.jpg";
import { useI18n } from "@/lib/i18n";

const Index = () => {
  const { t } = useI18n();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // High-performance fluid 60fps tracking for the watery cursor ripple
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springX = useSpring(cursorX, { damping: 30, stiffness: 100 });
  const springY = useSpring(cursorY, { damping: 30, stiffness: 100 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    // Ambient Parallax logic
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    setMousePos({ x, y });

    // Mathematical Trailing cursor logic accurately locating DOM container bounds
    const rect = e.currentTarget.getBoundingClientRect();
    cursorX.set(e.clientX - rect.left);
    cursorY.set(e.clientY - rect.top);
  };

  return (
    <Layout>
      <RegisterModal />
      {/* Hero */}
      <section 
        className="relative min-h-[90vh] flex items-center overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        
        {/* Invisible Math Layer: Microscopically subtle wind effect preserving structural proportions */}
        <svg style={{ position: "absolute", width: 0, height: 0 }}>
          <filter id="wind-displacement">
            <feTurbulence type="fractalNoise" baseFrequency="0.006 0.01" numOctaves="2" result="noise">
              <animate attributeName="baseFrequency" values="0.006 0.01; 0.008 0.012; 0.006 0.01" dur="20s" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="18" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </svg>

        <div className="absolute inset-0">
          {/* LAYER 1: Base clean image — always visible, never filtered */}
          <img src={heroBg} alt="Calming meditation illustration" className="w-full h-full object-cover" />
          
          {/* LAYER 2: Displaced background-only — has wind filter, but masked OUT over the girl's silhouette */}
          <img 
            src={heroBg} 
            alt="" 
            className="absolute inset-0 w-full h-full object-cover pointer-events-none" 
            style={{ 
              filter: "url(#wind-displacement)",
              WebkitMaskImage: "radial-gradient(ellipse 22% 50% at 52% 62%, transparent 0%, transparent 40%, black 65%)",
              maskImage: "radial-gradient(ellipse 22% 50% at 52% 62%, transparent 0%, transparent 40%, black 65%)" 
            }} 
          />

          {/* LAYER 3: Girl protection — clean unfiltered pixels rendered on top of displacement, covering ONLY the girl's area */}
          <img 
            src={heroBg} 
            alt="" 
            className="absolute inset-0 w-full h-full object-cover pointer-events-none" 
            style={{ 
              WebkitMaskImage: "radial-gradient(ellipse 22% 50% at 52% 62%, black 0%, black 38%, transparent 60%)",
              maskImage: "radial-gradient(ellipse 22% 50% at 52% 62%, black 0%, black 38%, transparent 60%)" 
            }} 
          />

          {/* Ambient parallax glows (muted) */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden mix-blend-screen">
            <motion.div 
              animate={{ x: mousePos.x * -10, y: mousePos.y * -10 }} 
              transition={{ type: "spring", damping: 60, stiffness: 40 }}
              className="absolute top-[20%] left-[20%] w-72 h-72 bg-primary/20 rounded-full blur-[90px]" 
            />
            <motion.div 
              animate={{ x: mousePos.x * 8, y: mousePos.y * 8 }} 
              transition={{ type: "spring", damping: 60, stiffness: 40 }}
              className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-blue-400/15 rounded-full blur-[100px]" 
            />
            <motion.div 
              animate={{ x: mousePos.x * -5, y: mousePos.y * -5 }} 
              transition={{ type: "spring", damping: 80, stiffness: 30 }}
              className="absolute top-[35%] right-[25%] w-2 h-2 bg-white/40 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)]"
            />
            <motion.div 
              animate={{ x: mousePos.x * 6, y: mousePos.y * 6 }} 
              transition={{ type: "spring", damping: 80, stiffness: 30 }}
              className="absolute bottom-[45%] left-[25%] w-1.5 h-1.5 bg-primary/40 rounded-full shadow-[0_0_10px_rgba(var(--primary),0.8)]"
            />
          </div>

          {/* LAYER 4: Cursor water ripple orb — glowing soft lens above bg, same mask as displaced layer so girl stays clean */}
          <motion.div
            style={{ x: springX, y: springY, zIndex: 5, position: "absolute" }}
            className="pointer-events-none"
          >
            <div
              style={{
                position: "absolute",
                width: 300,
                height: 300,
                top: -150,
                left: -150,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(186,230,253,0.45) 0%, rgba(147,197,253,0.22) 45%, transparent 70%)",
                filter: "blur(20px)",
                zIndex: 5,
              }}
            />
            <div
              style={{
                position: "absolute",
                width: 100,
                height: 100,
                top: -50,
                left: -50,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(255,255,255,0.75) 0%, rgba(186,230,253,0.45) 55%, transparent 100%)",
                filter: "blur(8px)",
                zIndex: 5,
              }}
            />
            <div
              style={{
                position: "absolute",
                width: 40,
                height: 40,
                top: -20,
                left: -20,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(255,255,255,1.0) 0%, rgba(186,230,253,0.70) 60%, transparent 100%)",
                filter: "blur(3px)",
                boxShadow: "0 0 18px 6px rgba(186,230,253,0.55)",
                zIndex: 5,
              }}
            />
          </motion.div>

          <div className="absolute inset-0 gradient-hero opacity-50 pointer-events-none" />
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
