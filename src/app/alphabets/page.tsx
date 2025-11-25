"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Video,
  Loader2,
  ArrowLeft,
  Volume2,
} from "lucide-react";
import { cn } from "@/lib/utils";

type AlphabetItem = {
  letter: string;
  videoUrl: string;
  description: string;
  completed: boolean;
};

// Function to get Google Drive embed URL
function getDriveEmbedUrl(fileId: string): string {
  return `https://drive.google.com/file/d/${fileId}/preview`;
}

// Google Drive file IDs for each alphabet letter (A-Z)
const alphabetVideoIds = {
  A: "1oWoalUPRYmgT2S9fyXZii_nrPkMD5mVW",
  B: "13ARAoi33_YlOIHYSwYJgQWMVLM49LsQz",
  C: "1BD9tBugQz51nzTE49Q0iObAezA_WSpgE",
  D: "1VSN2VpbO2YAG4inyCk8nNx7rqzIfZWmG",
  E: "1CKUkqEGuAUxohXGYX_FWcy_ALA-lJn1e",
  F: "1sfyRschvDa1YpI9hRokFZ-hbMpccHCYH",
  G: "1Ct_pqH9OjHutx8mPICWfYYxk-mXauQyD",
  H: "1AJApTPb-7qrKd2QaRfH7yboU_oD8aEbY",
  I: "1p_XHTzMBeoGffeMgdapHqmDza8mnSL2Y",
  J: "1JyDdGaKKUeHXDajAyurBOwyrZkjs1CHN",
  K: "1NkQrq_iw3oZcp5sEnfu6oeWbjJsPdsSU",
  L: "1-h0A15vVnNmdowJz-oiFDYHiDEy_i-Lj",
  M: "1l5xeKr5ER6iHbR766vn8OVrEWELdYGBv",
  N: "1yTf2UArVKCmS1dqG1_l7QU6trTVVO9uY",
  O: "189Tw5hYeXyU4swOH2OlS5mF5vNC6frI-",
  P: "1vveGR3kl-5XWPH3HepDKAW29l1JuVnQw",
  Q: "17RnN-k4vsqEznggsnd3_M8NVgbOF0cSm",
  R: "1oyxjH6g-YMiuEuw2fDjMHVyMNOV4WU6p",
  S: "1viFPbnhfy_Olij5shLZSAWuC_TKp3veh",
  T: "1XqjCnSgOVOwc6-qzf0w2kxl1A73PKyaX",
  U: "1gxrBtiZ1i4o_YdvtY-AhAm2JNBHBiuoA",
  V: "19ER68MnS568D0NAISLGPhAp4xRqXqi56",
  W: "18I2HDgcmmnmQojqirZ4y4QH0uxLo0byn",
  X: "1wrvWnNMlc6nDCp1NazLu0fDxZX9yCkyM",
  Y: "15CgDLm89vWi53hbm8DM_jdJ8O0_BaaLA",
  Z: "1cmuMh8E8zUywBHYeXjddE1G91uyg6wWx",
};

// Create alphabet items array with Google Drive video URLs
const alphabetItems: AlphabetItem[] = Object.entries(alphabetVideoIds).map(
  ([letter, id], index) => {
    return {
      letter,
      videoUrl: getDriveEmbedUrl(id),
      description: `Hand sign for the letter "${letter}"`,
      completed: index < 3, // First few items are completed for demo
    };
  }
);

export default function AlphabetTutorial() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [videoLoading, setVideoLoading] = useState(true);

  const currentItem = alphabetItems[currentIndex];

  // Handle video loading
  const handleVideoLoad = () => {
    setVideoLoading(false);
  };

  // Handle video error
  const handleVideoError = () => {
    console.error(`Error loading video for "${currentItem.letter}"`);
    setVideoLoading(false);
  };

  // Reset video loading state when changing items
  useEffect(() => {
    setVideoLoading(true);
  }, [currentIndex]);

  const goToPreviousItem = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToNextItem = () => {
    if (currentIndex < alphabetItems.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Calculate progress percentage
  const progressPercentage =
    (alphabetItems.filter((item) => item.completed).length /
      alphabetItems.length) *
    100;

  return (
    <div className="min-h-screen bg-[#030303] text-white">
      {/* Header with back button */}
      <header className="p-4 flex items-center justify-between border-b border-white/10">
        <button
          onClick={() => router.push("/level")}
          className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Levels</span>
        </button>
        <div className="text-sm font-medium text-white/70">
          Alphabet Tutorial: Learn A-Z
        </div>
      </header>

      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-white/70 mb-2">
            <span>Alphabet Progress</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-rose-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Item navigation */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex flex-wrap gap-2 pb-2">
            {alphabetItems.map((item, idx) => (
              <button
                key={item.letter}
                onClick={() => {
                  setCurrentIndex(idx);
                }}
                className={cn(
                  "px-3 py-2 rounded-lg flex items-center justify-center font-medium transition-all",
                  currentIndex === idx
                    ? "bg-white text-[#030303]"
                    : item.completed
                    ? "bg-green-500/20 text-green-500"
                    : "bg-white/10 text-white/70 hover:bg-white/20"
                )}
              >
                {item.letter}
              </button>
            ))}
          </div>
        </div>

        {/* Tutorial video section - centered */}
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 w-full max-w-2xl"
          >
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Video className="h-5 w-5 text-indigo-400" />
                  <h2 className="text-xl font-semibold">
                    Tutorial: Letter "{currentItem.letter}"
                  </h2>
                </div>
                <button className="flex items-center space-x-1 text-sm text-white/70 hover:text-white">
                  <Volume2 className="h-4 w-4" />
                  <span>Audio</span>
                </button>
              </div>
            </div>

            <div className="aspect-video bg-black/40 relative flex items-center justify-center">
              {videoLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <Loader2 className="h-8 w-8 text-white/70 animate-spin" />
                </div>
              )}

              {/* Google Drive embedded iframe for video */}
              <iframe
                src={currentItem.videoUrl}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={`Letter ${currentItem.letter} tutorial`}
                onLoad={handleVideoLoad}
                onError={handleVideoError}
              />
            </div>

            <div className="p-4">
              <p className="text-white/70">{currentItem.description}</p>
              <div className="mt-4 flex items-center space-x-2 text-sm text-white/60">
                <div className="bg-white/10 px-2 py-1 rounded">Tips</div>
                <p>
                  For letters, pay attention to hand shape and finger
                  positioning for clear communication.
                </p>
              </div>

              {/* Mark as completed button */}
              <div className="mt-6">
                <button
                  onClick={() => {
                    alphabetItems[currentIndex].completed = true;
                    setCurrentIndex((prevIndex) => prevIndex); // Force re-render
                  }}
                  className={cn(
                    "w-full py-2 rounded-lg font-medium transition-colors",
                    currentItem.completed
                      ? "bg-green-500/20 text-green-500 cursor-default"
                      : "bg-indigo-500 hover:bg-indigo-600 text-white"
                  )}
                  disabled={currentItem.completed}
                >
                  {currentItem.completed ? "Completed" : "Mark as Completed"}
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Navigation controls */}
        <div className="mt-8 flex justify-between max-w-2xl mx-auto">
          <button
            onClick={goToPreviousItem}
            disabled={currentIndex === 0}
            className={cn(
              "flex items-center space-x-2 px-4 py-2 rounded-lg transition-all",
              currentIndex === 0
                ? "bg-white/5 text-white/30 cursor-not-allowed"
                : "bg-white/10 text-white hover:bg-white/20"
            )}
          >
            <ChevronLeft className="h-5 w-5" />
            <span>Previous</span>
          </button>

          <button
            onClick={goToNextItem}
            disabled={currentIndex === alphabetItems.length - 1}
            className={cn(
              "flex items-center space-x-2 px-4 py-2 rounded-lg transition-all",
              currentIndex === alphabetItems.length - 1
                ? "bg-white/5 text-white/30 cursor-not-allowed"
                : "bg-white/10 text-white hover:bg-white/20"
            )}
          >
            <span>Next</span>
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
