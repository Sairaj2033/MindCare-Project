import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useI18n } from "@/lib/i18n";

const Footer = () => {
  const { t } = useI18n();
  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center gap-2 font-semibold text-lg text-foreground mb-3">
              <Heart className="w-5 h-5 text-primary fill-primary" />
              MindCare
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">{t.footer.tagline}</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-3">{t.footer.quickLinks}</h4>
            <div className="flex flex-col gap-2 text-sm">
              <Link to="/assessment" className="text-muted-foreground hover:text-foreground transition-colors">{t.footer.takeAssessment}</Link>
              <Link to="/awareness" className="text-muted-foreground hover:text-foreground transition-colors">{t.footer.learnAbout}</Link>
              <Link to="/helplines" className="text-muted-foreground hover:text-foreground transition-colors">{t.footer.helplinesResources}</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-6 text-center text-xs text-muted-foreground">
          <p>⚠️ {t.footer.disclaimerFooter}</p>
          <p className="mt-2">{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
