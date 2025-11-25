"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const Footer = () => {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.2 + i * 0.1,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  return (
    <footer className="relative bg-[#030303] text-gray-400 py-12 px-6 md:px-20 overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-500/[0.03] pointer-events-none" />

      {/* Subtle glowing orb */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-indigo-500/10 rounded-full blur-[100px] opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Subtle line with gradient */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-10" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          {/* Left Side */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            custom={0}
            className="mb-8 md:mb-0"
          >
            <div className="flex items-center gap-2">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300 font-bold text-xl">
                AnguliLekha
              </span>
            </div>
            <p className="mt-4 text-sm text-white/30">
              © 2024 AnguliLekha. All rights reserved
            </p>
          </motion.div>

          {/* Right Side */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            custom={1}
            className="flex flex-col md:items-end gap-6"
          >
            <div className="flex gap-8 text-sm">
              {["Home", "Practice", "About"].map((item, i) => (
                <Link
                  key={item}
                  href={
                    item === "Home" ? "/" : item === "About" ? "/about-us" : "#"
                  }
                  className="text-white/50 hover:text-white transition-colors duration-300 relative group"
                >
                  <span>{item}</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-indigo-500 to-rose-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
