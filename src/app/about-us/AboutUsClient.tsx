"use client";

import { motion } from "framer-motion";
import { Circle } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { ElegantShape } from "@/components/ui/elegant-shape";

const AboutUsClient = () => {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#030303] text-white">
      <Navbar />

      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />

      {/* Floating shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={600}
          height={140}
          rotate={12}
          gradient="from-indigo-500/[0.15]"
          className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
        />

        <ElegantShape
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          gradient="from-rose-500/[0.15]"
          className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
        />

        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-violet-500/[0.15]"
          className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
        />

        <ElegantShape
          delay={0.6}
          width={200}
          height={60}
          rotate={20}
          gradient="from-amber-500/[0.15]"
          className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
        />
      </div>

      {/* Hero Section - With styling matching landing */}
      <div className="relative z-10 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-6"
          >
            <Circle className="h-2 w-2 fill-rose-500/80" />
            <span className="text-sm text-white/60 tracking-wide">
              AnguliLekha
            </span>
          </motion.div>

          <motion.div
            custom={1}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                About
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300">
                Our Mission
              </span>
            </h1>
          </motion.div>

          <motion.div
            custom={2}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="mb-12"
          >
            <p className="text-base sm:text-lg md:text-xl text-white/40 mb-8 leading-relaxed font-light tracking-wide max-w-xl">
              Bridging communication gaps through innovative technology and
              creating a more inclusive digital world.
            </p>
          </motion.div>
        </div>
      </div>

      {/* About Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2"
          >
            <div className="relative">
              {/* Removed gradient div */}
              <Image
                src="/images/about.png"
                alt="AnguliLekha in action"
                width={800}
                height={600}
                className="relative rounded-2xl border border-white/10"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2"
          >
            <p className="text-sm text-white/60 mb-2 tracking-wide">
              About AnguliLekha
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300">
              Bridging Communication Gaps
            </h2>
            <p className="text-white/40 mb-8 leading-relaxed">
              AnguliLekha is an innovative platform that enables real-time
              Indian Sign Language (ISL) recognition through advanced computer
              vision and machine learning. Our mission is to empower the deaf
              and hard-of-hearing community by making digital communication
              seamless, accessible, and inclusive.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-6 py-2 overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-rose-500 opacity-70"></span>
              <span className="relative text-white font-medium tracking-wide">
                Learn More
              </span>
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Capabilities Section */}
      <div className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xl font-semibold mb-4 text-white/80"
          >
            Our Capabilities
          </motion.h3>
          <p className="text-white/40 mb-12 max-w-3xl">
            Powered by AI and backed by extensive research in sign language
            processing, AnguliLekha offers:
          </p>

          <div className="space-y-8">
            {[
              { title: "Real-time ISL Gesture Recognition", value: 95 },
              { title: "Accurate Sign Translation", value: 90 },
              { title: "User-Friendly Learning Modules", value: 88 },
            ].map((skill, idx) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.2, duration: 0.6 }}
              >
                <div className="flex justify-between mb-2 text-sm text-white/60 max-w-xl">
                  <span>{skill.title}</span>
                  <span>{skill.value}%</span>
                </div>
                <div className="w-full max-w-xl bg-white/5 rounded-full h-1.5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.value}%` }}
                    transition={{ duration: 1, delay: 0.5 + idx * 0.2 }}
                    className="bg-gradient-to-r from-indigo-500 to-rose-500 h-full rounded-full"
                  ></motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center mt-20">
            {[
              { label: "Project Started", value: "2024" },
              { label: "Core Contributors", value: "4+" },
              { label: "Signs Trained", value: "1000+" },
              { label: "Potential Impact", value: "∞" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.15, duration: 0.4 }}
                className="bg-white/[0.03] backdrop-blur-[2px] border border-white/[0.1] rounded-2xl p-6"
              >
                <h4 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300">
                  {item.value}
                </h4>
                <p className="text-sm mt-2 text-white/40">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/30 to-rose-500/30 backdrop-blur-sm"></div>

            <motion.div
              className="relative z-10 text-center text-white p-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-sm mb-3 uppercase tracking-widest text-white/60">
                Get Involved
              </p>
              <h2 className="text-3xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300">
                Help Us Build a More Inclusive Future
              </h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-8 py-3 overflow-hidden group"
              >
                <span className="absolute inset-0 bg-white"></span>
                <span className="relative text-black font-medium tracking-wide">
                  Join the Movement
                </span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />

      <Footer />
    </section>
  );
};

export default AboutUsClient;
