import { motion } from "framer-motion";
import { Phone, Globe, MessageCircle } from "lucide-react";
import Layout from "@/components/Layout";
import { useI18n } from "@/lib/i18n";

const helplines = [
  { name: "988 Suicide & Crisis Lifeline", phone: "988", desc: "24/7 free and confidential support for people in distress.", type: "call" },
  { name: "Crisis Text Line", phone: "741741", desc: "Text HOME to 741741 to connect with a crisis counselor.", type: "text" },
  { name: "SAMHSA National Helpline", phone: "1-800-662-4357", desc: "Free, confidential, 24/7, treatment referral and information service.", type: "call" },
  { name: "Trevor Project (LGBTQ+)", phone: "1-866-488-7386", desc: "Crisis intervention and suicide prevention for LGBTQ+ youth.", type: "call" },
  { name: "Childhelp National Hotline", phone: "1-800-422-4453", desc: "Crisis intervention for child abuse victims, parents, and concerned individuals.", type: "call" },
];

const platforms = [
  { name: "BetterHelp", url: "https://www.betterhelp.com", desc: "Online counseling with licensed therapists." },
  { name: "Talkspace", url: "https://www.talkspace.com", desc: "Therapy via text, audio, and video messaging." },
  { name: "7 Cups", url: "https://www.7cups.com", desc: "Free online chat with trained listeners." },
  { name: "NAMI", url: "https://www.nami.org", desc: "National Alliance on Mental Illness — education, support, and advocacy." },
  { name: "Mental Health America", url: "https://www.mhanational.org", desc: "Screening tools, resources, and community support." },
];

const HelplinesPage = () => {
  const { t } = useI18n();
  return (
    <Layout>
      <section className="container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold text-foreground mb-3 text-center">{t.helplines.title}</h1>
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">{t.helplines.subtitle}</p>

          <div className="max-w-3xl mx-auto mb-10 bg-destructive/10 border border-destructive/30 rounded-2xl p-6 text-center">
            <p className="text-lg font-semibold text-destructive mb-2">{t.helplines.emergencyBanner}</p>
            <a href="tel:911" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-destructive text-destructive-foreground font-semibold mt-2">
              <Phone className="w-5 h-5" /> Call 911
            </a>
          </div>

          <div className="max-w-3xl mx-auto space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <Phone className="w-5 h-5" /> {t.helplines.crisisHelplines}
              </h2>
              <div className="space-y-4">
                {helplines.map((h, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="gradient-card rounded-2xl p-6 shadow-card border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-foreground">{h.name}</h3>
                      <p className="text-sm text-muted-foreground">{h.desc}</p>
                    </div>
                    {h.type === "call" ? (
                      <a href={`tel:${h.phone}`} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl gradient-accent text-accent-foreground font-medium text-sm whitespace-nowrap shadow-soft hover:opacity-90 transition-opacity">
                        <Phone className="w-4 h-4" /> {h.phone}
                      </a>
                    ) : (
                      <a href={`sms:${h.phone}&body=HOME`} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl gradient-accent text-accent-foreground font-medium text-sm whitespace-nowrap shadow-soft hover:opacity-90 transition-opacity">
                        <MessageCircle className="w-4 h-4" /> Text {h.phone}
                      </a>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5" /> {t.helplines.onlineTherapy}
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {platforms.map((p, i) => (
                  <motion.a key={i} href={p.url} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="gradient-card rounded-2xl p-5 shadow-card border border-border hover:shadow-elevated transition-shadow group">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{p.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{p.desc}</p>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </Layout>
  );
};

export default HelplinesPage;
