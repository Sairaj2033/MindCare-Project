import { useState } from "react";
import { motion } from "framer-motion";
import { Tv, Music, ExternalLink, Play, Sparkles, Star } from "lucide-react";
import Layout from "@/components/Layout";
import { useLocation, Link } from "react-router-dom";
import type { DepressionLevel } from "@/lib/assessment";

// ─── Data types ───────────────────────────────────────────────────────────────

type Platform = "Netflix" | "YouTube" | "Spotify" | "Amazon" | "Disney+";

type Show = {
  title: string;
  description: string;
  genre: string;
  platform: Platform;
  url: string;
  emoji: string;
  reason: string;
};

type MusicItem = {
  title: string;
  description: string;
  type: string;
  platform: Platform;
  url: string;
  emoji: string;
};

type EntertainmentPack = {
  shows: Show[];
  music: MusicItem[];
  tagline: string;
};

// ─── Platform badge colours ───────────────────────────────────────────────────

const platformColors: Record<Platform, string> = {
  Netflix: "bg-red-500/15 text-red-500",
  YouTube: "bg-orange-500/15 text-orange-500",
  Spotify: "bg-emerald-500/15 text-emerald-500",
  Amazon: "bg-blue-500/15 text-blue-500",
  "Disney+": "bg-indigo-500/15 text-indigo-500",
};

// ─── Entertainment database ───────────────────────────────────────────────────

const data: Record<string, EntertainmentPack> = {
  Minimal: {
    tagline: "You're doing great — celebrate with some thrilling entertainment!",
    shows: [
      {
        title: "Stranger Things",
        description: "A group of kids in a small town encounter supernatural forces and secret government experiments.",
        genre: "Sci-Fi / Thriller",
        platform: "Netflix",
        url: "https://www.netflix.com/title/80057281",
        emoji: "👾",
        reason: "Perfect for low-stress adventurous binging",
      },
      {
        title: "Money Heist",
        description: "A criminal mastermind plans the greatest heist in history. Edge-of-your-seat drama.",
        genre: "Crime / Drama",
        platform: "Netflix",
        url: "https://www.netflix.com/title/80192098",
        emoji: "🔴",
        reason: "Gripping storyline for your best mood",
      },
      {
        title: "Breaking Bad",
        description: "A chemistry teacher turns to manufacturing drugs to secure his family's future. A masterpiece.",
        genre: "Drama / Thriller",
        platform: "Netflix",
        url: "https://www.netflix.com/title/70143836",
        emoji: "⚗️",
        reason: "Intense but brilliant — best enjoyed stress-free",
      },
    ],
    music: [
      {
        title: "Chill Pop Vibes",
        description: "Upbeat, happy pop tracks to celebrate your great mood.",
        type: "Chill Pop",
        platform: "Spotify",
        url: "https://open.spotify.com/playlist/37i9dQZF1DX4WYpdgoIcn6",
        emoji: "🎵",
      },
      {
        title: "Upbeat Lo-fi",
        description: "Feel-good lo-fi beats for a productive and joyful day.",
        type: "Lo-fi Beats",
        platform: "YouTube",
        url: "https://www.youtube.com/watch?v=DWcJFNfaw9c",
        emoji: "🎧",
      },
    ],
  },

  Mild: {
    tagline: "A little light relief goes a long way — here's your comfort entertainment.",
    shows: [
      {
        title: "Brooklyn Nine-Nine",
        description: "A quirky detective comedy set in a New York police precinct. Hilarious and heartwarming.",
        genre: "Comedy",
        platform: "Netflix",
        url: "https://www.netflix.com/title/70281562",
        emoji: "🚔",
        reason: "Laughing is the best medicine",
      },
      {
        title: "The Big Bang Theory",
        description: "A group of genius scientists navigate life, friendship, and romance. Pure feel-good comedy.",
        genre: "Sitcom",
        platform: "Netflix",
        url: "https://www.netflix.com/title/70143830",
        emoji: "🔭",
        reason: "Easy, breezy, and delightfully nerdy",
      },
      {
        title: "Wednesday",
        description: "Wednesday Addams investigates mysterious events at her new school. Dark, witty, and addictive.",
        genre: "Dark Comedy / Mystery",
        platform: "Netflix",
        url: "https://www.netflix.com/title/81231974",
        emoji: "🖤",
        reason: "Quirky and distracting — great for mild stress",
      },
    ],
    music: [
      {
        title: "Lo-fi Chill Study Beats",
        description: "Calm lo-fi tracks to help you unwind and de-stress gently.",
        type: "Lo-fi Beats",
        platform: "YouTube",
        url: "https://www.youtube.com/watch?v=jfKfPfyJRdk",
        emoji: "🌙",
      },
      {
        title: "Soft Acoustic Playlist",
        description: "Gentle acoustic guitar melodies for a warm, relaxed feeling.",
        type: "Soft Acoustic",
        platform: "Spotify",
        url: "https://open.spotify.com/playlist/37i9dQZF1DX4E3UdUs7fUx",
        emoji: "🎸",
      },
    ],
  },

  Moderate: {
    tagline: "Comfort shows and calming music — exactly what you need right now.",
    shows: [
      {
        title: "Friends",
        description: "Six friends navigate life, love, and laughter in New York. The ultimate comfort TV.",
        genre: "Sitcom / Comedy",
        platform: "Netflix",
        url: "https://www.netflix.com/title/70153404",
        emoji: "☕",
        reason: "Timeless comfort — like a warm hug",
      },
      {
        title: "How I Met Your Mother",
        description: "Ted tells his kids the story of how he met their mother. Funny, nostalgic, and heartwarming.",
        genre: "Sitcom / Romance",
        platform: "Netflix",
        url: "https://www.netflix.com/title/70171942",
        emoji: "💛",
        reason: "Feel-good nostalgia for moderate stress days",
      },
    ],
    music: [
      {
        title: "Calm Instrumental Music",
        description: "Peaceful piano and orchestral music to soothe your mind.",
        type: "Calm Instrumental",
        platform: "YouTube",
        url: "https://www.youtube.com/watch?v=1ZYbU82GVz4",
        emoji: "🎹",
      },
      {
        title: "Relaxing Chill Playlist",
        description: "Soft, mellow tracks curated for deep relaxation and stress relief.",
        type: "Relaxing Playlist",
        platform: "Spotify",
        url: "https://open.spotify.com/playlist/37i9dQZF1DWZZbwlv3Vmtr",
        emoji: "🌿",
      },
    ],
  },

  "Moderately Severe": {
    tagline: "Take it easy — gentle laughter and calm sounds are here for you.",
    shows: [
      {
        title: "Friends",
        description: "Six friends navigate life, love, and laughter in New York. The ultimate comfort TV.",
        genre: "Sitcom / Comedy",
        platform: "Netflix",
        url: "https://www.netflix.com/title/70153404",
        emoji: "☕",
        reason: "Familiar comfort — perfect for tough days",
      },
      {
        title: "The Office",
        description: "The mundane daily life of office workers in Scranton. Dry humour, warm heart.",
        genre: "Mockumentary / Comedy",
        platform: "Netflix",
        url: "https://www.netflix.com/title/70136120",
        emoji: "📋",
        reason: "Low-effort laughs when you need them most",
      },
    ],
    music: [
      {
        title: "Meditation Music",
        description: "Deep, slow meditation music to calm a busy, anxious mind.",
        type: "Meditation",
        platform: "YouTube",
        url: "https://www.youtube.com/watch?v=FjHGZj2IjBk",
        emoji: "🧘",
      },
      {
        title: "Nature Sounds — Rain & Forest",
        description: "Gentle rain and forest sounds to help you breathe and be present.",
        type: "Nature Sounds",
        platform: "YouTube",
        url: "https://www.youtube.com/watch?v=mPZkdNFkNps",
        emoji: "🌧️",
      },
    ],
  },

  Severe: {
    tagline: "You deserve calm and comfort. Let these gentle recommendations hold you right now. 💙",
    shows: [
      {
        title: "The Office",
        description: "The mundane daily life of office workers in Scranton. No drama — just warm laughs.",
        genre: "Mockumentary / Comedy",
        platform: "Netflix",
        url: "https://www.netflix.com/title/70136120",
        emoji: "📋",
        reason: "Gentle distraction — no intensity, pure comfort",
      },
      {
        title: "Friends",
        description: "Six friends, endless laughter. Always there when you need them most.",
        genre: "Sitcom / Comedy",
        platform: "Netflix",
        url: "https://www.netflix.com/title/70153404",
        emoji: "☕",
        reason: "Wrap yourself in this warm, familiar world",
      },
    ],
    music: [
      {
        title: "Deep Meditation & Healing Music",
        description: "Deeply restorative sounds to ground you and ease anxiety.",
        type: "Deep Meditation",
        platform: "YouTube",
        url: "https://www.youtube.com/watch?v=lE6RYpe9IT0",
        emoji: "🌌",
      },
      {
        title: "Ocean Waves & Rain Sounds",
        description: "Pure ocean and rain sounds — the most calming audio for high stress and sleeplessness.",
        type: "Nature Sounds",
        platform: "YouTube",
        url: "https://www.youtube.com/watch?v=V1RPi2MYptM",
        emoji: "🌊",
      },
    ],
  },
};

// ─── Card variants ────────────────────────────────────────────────────────────

const cardVariants: import("framer-motion").Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.45, ease: "easeOut" as const },
  }),
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function ShowCard({ show, index }: { show: Show; index: number }) {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-30px" }}
      whileHover={{ y: -4, transition: { duration: 0.18 } }}
      className="group bg-card border border-border rounded-2xl p-5 flex flex-col gap-3 shadow-sm hover:shadow-elevated hover:border-primary/30 transition-all duration-300"
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-3xl">{show.emoji}</span>
        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${platformColors[show.platform]}`}>
          {show.platform}
        </span>
      </div>
      <div>
        <h3 className="font-semibold text-foreground text-base leading-snug">{show.title}</h3>
        <span className="text-[11px] text-muted-foreground">{show.genre}</span>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed flex-1">{show.description}</p>
      <p className="text-xs text-primary/80 italic">💡 {show.reason}</p>
      <a
        href={show.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl gradient-accent text-accent-foreground text-sm font-semibold hover:opacity-90 hover:scale-105 transition-all duration-200 justify-center"
      >
        <Play className="w-3.5 h-3.5 fill-current" />
        Watch Now
      </a>
    </motion.div>
  );
}

function MusicCard({ item, index }: { item: MusicItem; index: number }) {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-30px" }}
      whileHover={{ y: -4, transition: { duration: 0.18 } }}
      className="group bg-card border border-border rounded-2xl p-5 flex flex-col gap-3 shadow-sm hover:shadow-elevated hover:border-primary/30 transition-all duration-300"
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-3xl">{item.emoji}</span>
        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${platformColors[item.platform]}`}>
          {item.platform}
        </span>
      </div>
      <div>
        <h3 className="font-semibold text-foreground text-base leading-snug">{item.title}</h3>
        <span className="text-[11px] text-muted-foreground">{item.type}</span>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed flex-1">{item.description}</p>
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground text-sm font-semibold hover:scale-105 transition-all duration-200 justify-center"
      >
        <Music className="w-3.5 h-3.5" />
        Listen Now
      </a>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const LEVEL_LABELS: Record<string, string> = {
  Minimal: "Low 🟢",
  Mild: "Mild 🟡",
  Moderate: "Moderate 🟠",
  "Moderately Severe": "High 🔴",
  Severe: "Very High 🆘",
};

const ALL_LEVELS = Object.keys(data) as DepressionLevel[];

export default function EntertainmentPage() {
  const location = useLocation();
  const passedLevel = location.state?.level as DepressionLevel | undefined;
  const [selectedLevel, setSelectedLevel] = useState<DepressionLevel>(passedLevel ?? ("Moderate" as DepressionLevel));

  const pack = data[selectedLevel];

  return (
    <Layout>
      <div className="min-h-screen pt-20 pb-16">
        {/* Header */}
        <section className="container mx-auto px-4 py-10 text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Stress-Based Recommendations
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground leading-tight mb-4">
              Entertainment <span className="text-primary">for You</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Personalised TV shows and music matched to your current stress level. Take a breath, press play, and let yourself relax.
            </p>
          </motion.div>
        </section>

        {/* Stress Level Selector */}
        <section className="container mx-auto px-4 mb-10 max-w-4xl">
          <p className="text-sm text-muted-foreground text-center mb-3 font-medium">Select your stress level</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {ALL_LEVELS.map(lvl => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${
                  selectedLevel === lvl
                    ? "gradient-accent text-accent-foreground border-transparent shadow-soft"
                    : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {LEVEL_LABELS[lvl]}
              </button>
            ))}
          </div>
        </section>

        {/* Tagline banner */}
        <section className="container mx-auto px-4 mb-10 max-w-4xl">
          <motion.div
            key={selectedLevel}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="rounded-2xl bg-gradient-to-r from-primary/10 via-card to-primary/5 border border-primary/15 p-5 text-center"
          >
            <p className="text-base font-medium text-foreground">{pack.tagline}</p>
          </motion.div>
        </section>

        {/* TV Shows Section */}
        <section className="container mx-auto px-4 mb-12 max-w-6xl">
          <motion.div
            key={`tv-${selectedLevel}`}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <Tv className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-foreground">Recommended Shows</h2>
              <p className="text-xs text-muted-foreground">Curated for your {LEVEL_LABELS[selectedLevel]} stress level</p>
            </div>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pack.shows.map((show, i) => (
              <ShowCard key={show.title} show={show} index={i} />
            ))}
          </div>
        </section>

        {/* Music Section */}
        <section className="container mx-auto px-4 mb-12 max-w-6xl">
          <motion.div
            key={`music-${selectedLevel}`}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600">
              <Music className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-foreground">Recommended Music</h2>
              <p className="text-xs text-muted-foreground">Playlists to help you feel better right now</p>
            </div>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pack.music.map((item, i) => (
              <MusicCard key={item.title} item={item} index={i} />
            ))}
          </div>
        </section>

        {/* CTA — take assessment if no level passed */}
        {!passedLevel && (
          <section className="container mx-auto px-4 max-w-4xl">
            <div className="rounded-2xl border border-dashed border-border/60 bg-card/50 p-8 text-center">
              <Star className="w-8 h-8 text-primary mx-auto mb-3 opacity-60" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Get personalised picks</h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto mb-5">
                Take the stress assessment to automatically see recommendations matched to your exact stress level.
              </p>
              <Link
                to="/assessment"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary/10 hover:bg-primary hover:text-primary-foreground text-primary text-sm font-semibold transition-all duration-200"
              >
                Take Assessment
              </Link>
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
}
