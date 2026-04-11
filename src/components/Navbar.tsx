import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Heart, Globe, UserPlus, LogOut, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/useAuth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navKeys = [
  { to: "/", key: "home" as const },
  { to: "/assessment", key: "assessment" as const },
  { to: "/solutions", key: "solutions" as const },
  { to: "/data-insights", key: "dataInsights" as const },
  { to: "/awareness", key: "awareness" as const },
  { to: "/helplines", key: "helplines" as const },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { lang, setLang, t } = useI18n();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const getInitials = (name: string) => {
    return name ? name.split(" ").map((n) => n[0]).join("").toUpperCase().substring(0, 2) : "U";
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-foreground font-semibold text-lg">
          <svg viewBox="0 0 24 24" className="w-7 h-7" fill="#fbcfe8">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
          <span>MindCare</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navKeys.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === link.to
                  ? "bg-primary/20 text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {t.nav[link.key]}
            </Link>
          ))}
          {/* Language toggle */}
          <button
            onClick={() => setLang(lang === "en" ? "hi" : "en")}
            className="ml-2 flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium border border-border bg-muted hover:bg-accent transition-colors text-foreground"
          >
            <Globe className="w-4 h-4" />
            {lang === "en" ? "हिंदी" : "English"}
          </button>
          
          {/* Auth State Desktop */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="ml-2 flex items-center gap-2 hover:opacity-80 transition-opacity focus:outline-none">
                  <Avatar className="h-9 w-9 border border-border">
                    <AvatarFallback className="bg-primary/20 text-primary text-xs font-semibold">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium hidden lg:inline-block">
                    {user.name?.split(" ")[0]}
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-2">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/profile")} className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => { logout(); navigate("/"); }} className="cursor-pointer text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              to="/auth"
              className="ml-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold gradient-accent text-accent-foreground shadow-sm hover:opacity-90 transition-opacity"
            >
              <UserPlus className="w-4 h-4" />
              Sign Up
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setLang(lang === "en" ? "hi" : "en")}
            className="p-2 rounded-lg border border-border bg-muted hover:bg-accent transition-colors text-foreground text-xs font-medium"
          >
            {lang === "en" ? "हिं" : "EN"}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-muted text-foreground"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-card/95 backdrop-blur-lg"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {navKeys.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === link.to
                      ? "bg-primary/20 text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {t.nav[link.key]}
                </Link>
              ))}
              
              {/* Auth State Mobile */}
              {user ? (
                <div className="mt-4 pt-4 border-t border-border flex flex-col gap-2">
                  <div className="flex items-center gap-3 px-2 mb-2">
                    <Avatar className="h-10 w-10 border border-border">
                      <AvatarFallback className="bg-primary/20 text-primary text-sm font-semibold">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email || user.phone}</p>
                    </div>
                  </div>
                  <Link
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium hover:bg-accent text-foreground transition-colors"
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </Link>
                  <button
                    onClick={() => { setIsOpen(false); logout(); navigate("/"); }}
                    className="flex items-center justify-start gap-2 px-4 py-3 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Log out
                  </button>
                </div>
              ) : (
                <Link
                  to="/auth"
                  onClick={() => setIsOpen(false)}
                  className="mt-2 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold gradient-accent text-accent-foreground shadow-sm hover:opacity-90 transition-opacity"
                >
                  <UserPlus className="w-4 h-4" />
                  Sign Up
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
