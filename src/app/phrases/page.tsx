"use client";

import { useState, useEffect, useRef } from "react";
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

type WordItem = {
  word: string;
  videoUrl: string;
  description: string;
  completed: boolean;
};

// Function to get Google Drive embed URL
function getDriveEmbedUrl(fileId: string): string {
  return `https://drive.google.com/file/d/${fileId}/preview`;
}

// Google Drive file IDs for each word
// Replace these with your actual Google Drive file IDs
const wordVideoIds = {
  Again: "1-LuMrPjbShbGWAnJMvPXuo_UqIRRWR-z",
  "Bye bye": "1ZOyE_Mtw442ipM85T1CQDZ754QB__RLc",
  Deaf: "1eYsf7XqvZdQVIhtfi5vl1z_4IoauWCVd",
  He: "1NvV2GUTecR3VJBLQzNv3X3TXpPPsLB5O",
  Hearing: "1GaVW_zV7-2NRz4AeX1TgA2et5p9KML4R",
  Hello: "1WYPehBWL4TEEyGox8U5pUpHjUpKIuuJp",
  "How are you": "1cz_KElO56KLE7ZLpt0TnADrCfBhjU9nr",
  I: "1KVlv-B1Yvul5BrFRVfhMfQpRjWAHCtUp",
  "I am fine": "1Tj51w5M5Js3J_xbh3b9FiiqBXCHrogp4",
  Man: "15_Tjzol_bJHFopL-jqxNCRzeA36U0_UU",
  "My name is": "1zNx2zgANwCd5tt3NHwP6yGXB769U3y7d",
  Namaste: "11_mpFfeaJpCA4lSSnKZtnY-lAjAUXsA1",
  Please: "1H2R2X_6_WFu5RQcmWi6u46xEAsjgRlRY",
  She: "1BVb80NURfU1LWi9z0Y6fUJI9-YqGBGRL",
  Sorry: "1t8tAND3J-4Y8pU2hy9Ci7VI1gNkAPBKr",
  "Thank you": "1Q7OYG6RrBkAVZOy-wcX0Ns_dGukSi8UL",
  "Thank you very much": "1efP7qVYw6swe6QXe26z03j5gPWqtbqub",
  Welcome: "1CCLM3s3cT2BuMYVswnVIOSEXZPPCRJBl",
  Woman: "178T6gtWdWy4NMHwiVrbzTKJcUrGm1fmO",
  You: "11477_RXCREX5B27MC8yc9ZYVkB9ITyJO",
};

// Create word items array with Google Drive video URLs
const wordItems: WordItem[] = Object.entries(wordVideoIds).map(
  ([word, id], index) => {
    return {
      word,
      videoUrl: getDriveEmbedUrl(id),
      description: `Hand sign for "${word}"`,
      completed: index < 3, // First few are completed for demo purposes
    };
  }
);

export default function WordTutorial() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [videoLoading, setVideoLoading] = useState(true);

  const currentItem = wordItems[currentIndex];

  // Handle video loading
  const handleVideoLoad = () => {
    setVideoLoading(false);
  };

  // Handle video error
  const handleVideoError = () => {
    console.error(`Error loading video for word "${currentItem.word}"`);
    setVideoLoading(false);
  };

  // Reset video loading state when changing words
  useEffect(() => {
    setVideoLoading(true);
  }, [currentIndex]);

  const goToPreviousItem = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToNextItem = () => {
    if (currentIndex < wordItems.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Mark current word as completed when navigating to next word
  const completeAndGoNext = () => {
    if (currentIndex < wordItems.length - 1) {
      wordItems[currentIndex].completed = true;
      goToNextItem();
    } else {
      // Complete the level if all items are done
      wordItems[currentIndex].completed = true;
      // Here you would update progress in database
      router.push("/tutorial/levels");
    }
  };

  // Calculate progress percentage
  const progressPercentage =
    (wordItems.filter((item) => item.completed).length / wordItems.length) *
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
          Intermediate Level: Common Words
        </div>
      </header>

      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-white/70 mb-2">
            <span>Overall Progress</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-rose-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Word navigation */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-2 min-w-max pb-2">
            {wordItems.map((item, idx) => (
              <button
                key={item.word}
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
                {item.word}
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
                    Tutorial: "{currentItem.word}"
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
                title={`Word "${currentItem.word}" tutorial`}
                onLoad={handleVideoLoad}
                onError={handleVideoError}
              />
            </div>

            <div className="p-4">
              <p className="text-white/70">{currentItem.description}</p>
              <div className="mt-4 flex items-center space-x-2 text-sm text-white/60">
                <div className="bg-white/10 px-2 py-1 rounded">Tips</div>
                <p>
                  {currentItem.word.split(" ").length > 1
                    ? "This is a multi-sign phrase. Practice each movement in sequence."
                    : "Focus on the hand position and facial expression for clearer communication."}
                </p>
              </div>

              {/* Mark as completed button */}
              <div className="mt-6">
                <button
                  onClick={() => {
                    wordItems[currentIndex].completed = true;
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
            disabled={currentIndex === wordItems.length - 1}
            className={cn(
              "flex items-center space-x-2 px-4 py-2 rounded-lg transition-all",
              currentIndex === wordItems.length - 1
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
