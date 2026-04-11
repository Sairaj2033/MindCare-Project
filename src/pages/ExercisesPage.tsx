import { motion } from "framer-motion";
import { Play, Clock, Wind, Brain, Leaf, Heart, Sparkles, Star } from "lucide-react";
import Layout from "@/components/Layout";

type Exercise = {
  id: string;
  title: string;
  description: string;
  duration: string;
  youtubeUrl: string;
  tag?: string;
};

type Section = {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  exercises: Exercise[];
};

const featuredExercise: Exercise = {
  id: "featured-1",
  title: "5-Minute Calm Breathing",
  description:
    "Start here. This guided breathing session helps regulate your nervous system, reduce anxiety, and bring immediate calm. Perfect for beginners and daily practice.",
  duration: "5 min",
  youtubeUrl: "https://www.youtube.com/watch?v=odADwWzHR24",
  tag: "Most Popular",
};

const sections: Section[] = [
  {
    id: "breathing",
    label: "Breathing Exercises",
    icon: <Wind className="w-5 h-5" />,
    color: "from-sky-500/20 to-blue-500/10",
    exercises: [
      {
        id: "b1",
        title: "4-7-8 Breathing Technique",
        description: "Inhale for 4, hold for 7, exhale for 8. A powerful breath pattern for anxiety and sleep.",
        duration: "6 min",
        youtubeUrl: "https://www.youtube.com/watch?v=YRPh_GaiL8s",
      },
      {
        id: "b2",
        title: "Box Breathing for Stress",
        description: "Used by Navy SEALs. Breathe in a square pattern to calm the mind and body instantly.",
        duration: "5 min",
        youtubeUrl: "https://www.youtube.com/watch?v=tEmt1Znux58",
      },
      {
        id: "b3",
        title: "Deep Belly Breathing",
        description: "Activate your parasympathetic system with diaphragmatic breathing for deep relaxation.",
        duration: "8 min",
        youtubeUrl: "https://www.youtube.com/watch?v=kgTL5G1ibIo",
      },
    ],
  },
  {
    id: "meditation",
    label: "Meditation",
    icon: <Brain className="w-5 h-5" />,
    color: "from-violet-500/20 to-purple-500/10",
    exercises: [
      {
        id: "m1",
        title: "5-Minute Mindfulness Meditation",
        description: "A short guided meditation to centre your thoughts and achieve mental clarity.",
        duration: "5 min",
        youtubeUrl: "https://www.youtube.com/watch?v=inpok4MKVLM",
      },
      {
        id: "m2",
        title: "Body Scan Meditation",
        description: "Slowly scan from head to toe to release tension stored throughout your body.",
        duration: "12 min",
        youtubeUrl: "https://www.youtube.com/watch?v=zfSKAixsn_M",
      },
      {
        id: "m3",
        title: "Loving-Kindness Meditation",
        description: "Cultivate compassion for yourself and others with this beautiful metta practice.",
        duration: "10 min",
        youtubeUrl: "https://www.youtube.com/watch?v=sz7cpV7ERsM",
      },
    ],
  },
  {
    id: "grounding",
    label: "Grounding Techniques",
    icon: <Leaf className="w-5 h-5" />,
    color: "from-emerald-500/20 to-green-500/10",
    exercises: [
      {
        id: "g1",
        title: "5-4-3-2-1 Grounding Exercise",
        description: "Name 5 things you see, 4 you feel, 3 you hear, 2 you smell, 1 you taste. Anchor yourself.",
        duration: "4 min",
        youtubeUrl: "https://www.youtube.com/watch?v=-oAlb38WfuE",
      },
      {
        id: "g2",
        title: "Cold Water Grounding",
        description: "Use sensation to pull yourself back to the present moment. Simple and effective.",
        duration: "3 min",
        youtubeUrl: "https://www.youtube.com/watch?v=V9mILMHGiQw",
      },
      {
        id: "g3",
        title: "Walking Meditation",
        description: "Slow, mindful walking with full attention to each step and sensation in the feet.",
        duration: "10 min",
        youtubeUrl: "https://www.youtube.com/watch?v=3PicMchKaJg",
      },
    ],
  },
  {
    id: "relaxation",
    label: "Relaxation",
    icon: <Heart className="w-5 h-5" />,
    color: "from-rose-500/20 to-pink-500/10",
    exercises: [
      {
        id: "r1",
        title: "Progressive Muscle Relaxation",
        description: "Tense and release each muscle group to melt away physical stress and tension.",
        duration: "15 min",
        youtubeUrl: "https://www.youtube.com/watch?v=1nZEdqcGvsI",
      },
      {
        id: "r2",
        title: "Yoga Nidra for Sleep",
        description: "A deeply restorative 'yogic sleep' that leaves you feeling completely refreshed.",
        duration: "20 min",
        youtubeUrl: "https://www.youtube.com/watch?v=M0u9GST_j3s",
      },
      {
        id: "r3",
        title: "Guided Visualization",
        description: "Imagine a peaceful place and let your mind fully relax with this calming guided session.",
        duration: "10 min",
        youtubeUrl: "https://www.youtube.com/watch?v=b2uXmM0A04M",
      },
    ],
  },
  {
    id: "stress",
    label: "Stress Relief",
    icon: <Sparkles className="w-5 h-5" />,
    color: "from-amber-500/20 to-yellow-500/10",
    exercises: [
      {
        id: "s1",
        title: "EFT Tapping for Anxiety",
        description: "Tap acupressure points while speaking affirmations to reduce stress at the root.",
        duration: "8 min",
        youtubeUrl: "https://www.youtube.com/watch?v=pAclBdj20ZU",
      },
      {
        id: "s2",
        title: "Shaking & Moving Trauma Release",
        description: "Release stored tension through gentle body movements — based on somatic therapy.",
        duration: "12 min",
        youtubeUrl: "https://www.youtube.com/watch?v=8oGnG7MsGAQ",
      },
      {
        id: "s3",
        title: "Quick Stress Reset",
        description: "A fast combination of breathing, movement, and mindset to reset your nervous system.",
        duration: "5 min",
        youtubeUrl: "https://www.youtube.com/watch?v=hZh0ekjOjE0",
      },
    ],
  },
];

const cardVariants: import("framer-motion").Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

function ExerciseCard({ exercise, index }: { exercise: Exercise; index: number }) {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group relative bg-card border border-border rounded-2xl p-5 flex flex-col gap-3 shadow-sm hover:shadow-elevated hover:border-primary/30 transition-all duration-300"
    >
      {exercise.tag && (
        <span className="absolute top-4 right-4 inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/15 text-primary">
          <Star className="w-2.5 h-2.5" /> {exercise.tag}
        </span>
      )}
      <h3 className="font-semibold text-foreground text-base leading-snug pr-16">{exercise.title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed flex-1">{exercise.description}</p>
      <div className="flex items-center justify-between pt-1">
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
          <Clock className="w-3.5 h-3.5" />
          {exercise.duration}
        </span>
        <a
          href={exercise.youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground text-sm font-semibold transition-all duration-200 group-hover:scale-105"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          Watch
        </a>
      </div>
    </motion.div>
  );
}

export default function ExercisesPage() {
  return (
    <Layout>
      <div className="min-h-screen pt-20 pb-16">
        {/* Hero Header */}
        <section className="container mx-auto px-4 py-12 text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Guided Wellness
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground leading-tight mb-4">
              Guided Mini <span className="text-primary">Exercises</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Short, science-backed wellness exercises to calm your mind, reduce stress, and restore balance — anytime, anywhere.
            </p>
          </motion.div>
        </section>

        {/* Featured Exercise */}
        <section className="container mx-auto px-4 mb-14 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 via-card to-card border border-primary/20 p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6 shadow-elevated"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="flex-1 z-10">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/20 text-primary mb-3">
                <Star className="w-3 h-3" /> Featured Exercise
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{featuredExercise.title}</h2>
              <p className="text-muted-foreground leading-relaxed mb-4 max-w-lg">{featuredExercise.description}</p>
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground mb-5">
                <Clock className="w-4 h-4" /> {featuredExercise.duration}
              </span>
              <a
                href={featuredExercise.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl gradient-accent text-accent-foreground font-semibold shadow-sm hover:opacity-90 hover:scale-105 transition-all duration-200"
              >
                <Play className="w-4 h-4 fill-current" />
                Start Now
              </a>
            </div>
          </motion.div>
        </section>

        {/* All Category Sections */}
        {sections.map((section) => (
          <section key={section.id} className="container mx-auto px-4 mb-14 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className={`p-2 rounded-xl bg-gradient-to-br ${section.color} text-foreground`}>
                {section.icon}
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-foreground">{section.label}</h2>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {section.exercises.map((ex, i) => (
                <ExerciseCard key={ex.id} exercise={ex} index={i} />
              ))}
            </div>
          </section>
        ))}

        {/* Recommended Section placeholder */}
        <section className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-dashed border-border/60 bg-card/50 p-8 text-center"
          >
            <Sparkles className="w-8 h-8 text-primary mx-auto mb-3 opacity-60" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Recommended for Your Stress Level</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Complete the stress assessment to unlock personalized exercise recommendations tailored to your current stress level.
            </p>
            <a
              href="/assessment"
              className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary/10 hover:bg-primary hover:text-primary-foreground text-primary text-sm font-semibold transition-all duration-200"
            >
              Take Assessment
            </a>
          </motion.div>
        </section>
      </div>
    </Layout>
  );
}
