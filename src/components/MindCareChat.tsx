import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Heart, ExternalLink, Stethoscope } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { generateResponse, SuggestionAction } from "@/lib/chatbotBrain";
import { notificationStore } from "@/lib/notifications";

type Message = {
  id: string;
  role: "user" | "bot";
  text: string;
  suggestions?: SuggestionAction[];
};

const WELCOME: Message = {
  id: "welcome",
  role: "bot",
  text: "Hi! 😊 I'm your MindCare assistant. How are you feeling today? I can help with stress check-ins, guided exercises, or finding a professional.",
  suggestions: [
    { label: "Check Stress Level", href: "/assessment", action: "assessment", icon: "🧠" },
    { label: "Guided Exercises", href: "/exercises", action: "exercises", icon: "🌬️" },
    { label: "Find a Doctor", action: "doctor", icon: "🩺" },
  ],
};

export default function MindCareChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Scroll to bottom whenever messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  // Focus input when opened
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  const userHistory = messages.filter(m => m.role === "user").map(m => m.text);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    // Simulate thinking delay (600–1200ms)
    await new Promise(r => setTimeout(r, 700 + Math.random() * 500));

    const response = generateResponse(text, userHistory);
    const botMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: "bot",
      text: response.message,
      suggestions: response.suggestions,
    };
    setTyping(false);
    setMessages(prev => [...prev, botMsg]);

    // Fire notification if stress or crisis detected
    if (response.suggestions?.some(s => s.action === "assessment")) {
      notificationStore.add({
        title: "MindCare Assistant",
        description: "New guidance available in your chat.",
        type: "info",
      });
    }
  };

  const handleSuggestion = (s: SuggestionAction) => {
    if (s.action === "doctor") {
      // Trigger the doctor recommendation via URL param
      navigate("/?trigger=doctor");
    } else if (s.href) {
      navigate(s.href);
    }
    setOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      {/* Floating toggle button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full gradient-accent shadow-elevated flex items-center justify-center text-accent-foreground focus:outline-none"
        aria-label="Open AI Chat"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div key="icon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
        {/* Unread badge when closed and messages > 1 */}
        {!open && messages.length > 1 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full text-[9px] text-white flex items-center justify-center font-bold">
            {Math.min(messages.filter(m => m.role === "bot").length - 1, 9)}
          </span>
        )}
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-24 right-4 z-50 w-[92vw] max-w-sm rounded-2xl border border-border bg-card shadow-[0_12px_48px_rgba(0,0,0,0.25)] flex flex-col overflow-hidden"
            style={{ maxHeight: "78vh" }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 gradient-accent text-accent-foreground shrink-0">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Heart className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm">MindCare Assistant</p>
                <p className="text-[10px] opacity-80">Context-aware · Always here 💙</p>
              </div>
              <button onClick={() => setOpen(false)} className="p-1 rounded-full hover:bg-white/10 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-3 min-h-0">
              {messages.map(msg => (
                <div key={msg.id}>
                  <div className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    {msg.role === "bot" && (
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mr-2 mt-0.5 shrink-0">
                        <Heart className="w-3 h-3 text-primary" />
                      </div>
                    )}
                    <div
                      className={`max-w-[82%] px-3 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground rounded-br-sm"
                          : "bg-muted text-foreground rounded-bl-sm"
                      }`}
                    >
                      {msg.text.split("**").map((part, i) =>
                        i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                      )}
                    </div>
                  </div>

                  {/* Suggestion Buttons */}
                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2 pl-8">
                      {msg.suggestions.map((s, i) => (
                        s.href ? (
                          <button
                            key={i}
                            onClick={() => handleSuggestion(s)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full border border-primary/30 bg-primary/5 hover:bg-primary hover:text-primary-foreground text-primary transition-all duration-150"
                          >
                            <span>{s.icon}</span> {s.label}
                          </button>
                        ) : (
                          <button
                            key={i}
                            onClick={() => handleSuggestion(s)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full border border-primary/30 bg-primary/5 hover:bg-primary hover:text-primary-foreground text-primary transition-all duration-150"
                          >
                            <span>{s.icon}</span> {s.label}
                          </button>
                        )
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              {typing && (
                <div className="flex items-center gap-2 pl-1">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <Heart className="w-3 h-3 text-primary" />
                  </div>
                  <div className="bg-muted rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5">
                    {[0, 0.2, 0.4].map((d, i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 bg-primary/50 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.8, delay: d, repeat: Infinity, ease: "easeInOut" }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="px-3 py-3 border-t border-border flex items-center gap-2 shrink-0 bg-card">
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="How are you feeling?"
                className="flex-1 bg-muted text-foreground text-sm px-4 py-2.5 rounded-full outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-primary/40 min-h-[44px]"
              />
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || typing}
                className="w-10 h-10 rounded-full gradient-accent text-accent-foreground flex items-center justify-center disabled:opacity-40 transition-opacity"
              >
                <Send className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
