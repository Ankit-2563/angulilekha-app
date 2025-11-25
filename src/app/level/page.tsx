"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Circle, ChevronRight, Award, Book, MessageSquare } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { div } from "@tensorflow/tfjs";
import AuthLayout from "@/components/authLayout/authLayout";

type Level = {
  id: string;
  name: string;
  description: string;
  color: string;
  gradient: string;
  route: string;
  icon: JSX.Element;
  features: string[];
  progress?: number;
};

const levels: Level[] = [
  {
    id: "beginner",
    name: "Beginner",
    description: "Learn ISL alphabets (A-Z) and basic hand positions",
    color: "from-indigo-500 to-indigo-600",
    gradient: "from-indigo-500/[0.15]",
    route: "/alphabets",
    icon: <Book className="h-6 w-6" />,
    features: [
      "Alphabet recognition",
      "Basic hand positions",
      "Simple greetings",
    ],
    progress: 15,
  },
  {
    id: "intermediate",
    name: "Intermediate",
    description: "Common words, everyday phrases, and essential expressions",
    color: "from-rose-400 to-rose-600",
    gradient: "from-rose-500/[0.15]",
    route: "/words",
    icon: <MessageSquare className="h-6 w-6" />,
    features: ["Common vocabulary", "Daily expressions", "Short conversations"],
    progress: 0,
  },
  {
    id: "advanced",
    name: "Advanced",
    description: "Full sentences, complex conversations, and fluid signing",
    color: "from-amber-400 to-amber-600",
    gradient: "from-amber-500/[0.15]",
    route: "/phrases",
    icon: <Award className="h-6 w-6" />,
    features: ["Complex sentences", "Fluid conversation", "Cultural context"],
    progress: 0,
  },
];

// Reusing your elegant shape component for visual consistency
function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          width,
          height,
        }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border-2 border-white/[0.15]",
            "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"
          )}
        />
      </motion.div>
    </motion.div>
  );
}

export default function TutorialLevels() {
  const router = useRouter();
  const [hoveredLevel, setHoveredLevel] = useState<string | null>(null);

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.3 + i * 0.15,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  return (
    <div> 
      <AuthLayout> 
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#030303]">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />

      {/* Decorative shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {levels.map((level, index) => (
          <ElegantShape
            key={level.id}
            delay={0.3 + index * 0.15}
            width={450 - index * 75}
            height={120 - index * 20}
            rotate={(index % 2 === 0 ? 1 : -1) * (12 - index * 4)}
            gradient={level.gradient}
            className={`${
              index === 0
                ? "left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
                : index === 1
                ? "right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
                : "left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
            }`}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8"
          >
            <Circle className="h-2 w-2 fill-rose-500/80" />
            <span className="text-sm text-white/60 tracking-wide">
              AnguliLekha Learning Path
            </span>
          </motion.div>

          <motion.div
            custom={1}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                Choose Your
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300">
                Learning Level
              </span>
            </h1>
          </motion.div>

          <motion.div
            custom={2}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <p className="text-base sm:text-lg text-white/40 mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4">
              Begin your journey into Indian Sign Language with our AI-powered
              learning platform. Select the level that matches your experience.
            </p>
          </motion.div>
        </div>

        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto">
          {levels.map((level, index) => (
            <motion.div
              key={level.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover={{
                scale: 1.03,
                boxShadow: "0 20px 30px rgba(0, 0, 0, 0.2)",
              }}
              whileTap={{ scale: 0.98 }}
              onMouseEnter={() => setHoveredLevel(level.id)}
              onMouseLeave={() => setHoveredLevel(null)}
              onClick={() => router.push(level.route)}
              className={`cursor-pointer relative backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 transition-all duration-300`}
            >
              {/* Gradient background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${level.color} opacity-10`}
              />

              {/* Content container */}
              <div className="relative z-10 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`bg-gradient-to-br ${level.color} p-2 rounded-lg`}
                    >
                      {level.icon}
                    </div>
                    <h2 className="text-2xl font-semibold text-white">
                      {level.name}
                    </h2>
                  </div>

                  <motion.div
                    animate={{ x: hoveredLevel === level.id ? 5 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-white/70 hover:text-white"
                  >
                    <ChevronRight />
                  </motion.div>
                </div>

                <p className="text-white/70 mb-4">{level.description}</p>

                {/* Progress bar for completed levels */}
                {level.progress !== undefined && level.progress > 0 && (
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-white/60 mb-1">
                      <span>Progress</span>
                      <span>{level.progress}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full bg-gradient-to-r ${level.color}`}
                        style={{ width: `${level.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Features */}
                <div className="space-y-2 mt-4">
                  {level.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <Circle className="h-1.5 w-1.5 fill-white/60" />
                      <span className="text-sm text-white/60">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
    </div>
    </AuthLayout>
    </div>
  );
}
