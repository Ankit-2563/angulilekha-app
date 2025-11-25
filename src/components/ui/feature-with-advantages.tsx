"use client";

import { Circle } from "lucide-react";
import { motion } from "framer-motion";

function FeatureItem({
  title,
  desc,
  icon,
}: {
  title: string;
  desc: string;
  icon?: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 md:p-8 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-4">
        {icon || <Circle className="h-3 w-3 fill-rose-400/80" />}
        <h3 className="text-xl font-semibold text-white tracking-tight">
          {title}
        </h3>
      </div>
      <p className="text-sm text-white/50 leading-relaxed">{desc}</p>
    </motion.div>
  );
}

export function Feature() {
  return (
    <section className="w-full py-24 lg:py-40 bg-[#030303] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-20 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-6">
            <Circle className="h-2 w-2 fill-indigo-400/80" />
            <span className="text-sm text-white/60 tracking-wide">
              Key Features
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-4">
            What Makes AnguliLekha Powerful
          </h2>
          <p className="text-white/40 text-base md:text-lg max-w-2xl mx-auto">
            Explore the capabilities that empower seamless communication across
            hearing and non-hearing communities.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureItem
            title="Real-Time Recognition"
            desc="Instantly converts ISL gestures into readable text and speech."
          />
          <FeatureItem
            title="Bi-Directional Chat"
            desc="Enables two-way communication between hearing and non-hearing users."
          />
          <FeatureItem
            title="Cross-Platform Access"
            desc="Available on both mobile and web with a responsive UI."
          />
          <FeatureItem
            title="Multilingual Support"
            desc="Translates ISL to English, Hindi, and regional languages."
          />
          <FeatureItem
            title="AI-Powered Accuracy"
            desc="Continually improves gesture recognition using ML models."
          />
          <FeatureItem
            title="Intuitive Interface"
            desc="Minimal, accessible UI for users of all skill levels."
          />
        </div>
      </div>

      {/* Optional floating gradient blur shapes for depth */}
      <div className="absolute -top-20 -left-32 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-40 w-[28rem] h-[28rem] bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}
