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

type CategoryItem = {
  term: string;
  videoUrl: string;
  description: string;
  completed: boolean;
};

// Function to get Google Drive embed URL
function getDriveEmbedUrl(fileId: string): string {
  return `https://drive.google.com/file/d/${fileId}/preview`;
}

// Map of actual Google Drive file IDs for Numbers 1-9
const driveVideoIds = {
  "1": "10FjarQLvfIhK5JSjIu1uKQuO6anKLQ2V",
  "2": "19-U3H6TACRrktGSIW0r1acRVueG-qdTG",
  "3": "1q_4dx4qI-QPA_v8j9ELGdkQLU4Gx96nX",
  "4": "12qFD25iTiyAvtjDNu_KzwjHUlIcHZEWA",
  "5": "1aYK3aCOIhYY7oAHb_i--tlpXaGuLjNd8",
  "6": "1B9C4HMQMD8z6dd_waZRpK4O1q-XDlUZc",
  "7": "1P0PtVFEC192NWOP-w9XNjPL_G_gRLGpO",
  "8": "11CiV2T9cPnMFLWd9h7N_3p63fQPHaQl9",
  "9": "1w98bTtY0Z3w5Q4fLTYDnoGNA1NvdWxDC",
};

// Create number items array with Google Drive video URLs
const numberItems: CategoryItem[] = Object.entries(driveVideoIds).map(
  ([number, id], index) => {
    return {
      term: number,
      videoUrl: getDriveEmbedUrl(id),
      description: `Hand sign for the number "${number}"`,
      completed: index < 2, // First few items are completed for demo
    };
  }
);

export default function NumbersTutorial() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [videoLoading, setVideoLoading] = useState(true);

  const currentItem = numberItems[currentIndex];

  // Handle video loading
  const handleVideoLoad = () => {
    setVideoLoading(false);
  };

  // Handle video error
  const handleVideoError = () => {
    console.error(`Error loading video for "${currentItem.term}"`);
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
    if (currentIndex < numberItems.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Calculate progress percentage
  const progressPercentage =
    (numberItems.filter((item) => item.completed).length / numberItems.length) *
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
          Numbers Tutorial: Learn 1-9
        </div>
      </header>

      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-white/70 mb-2">
            <span>Numbers Progress</span>
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
            {numberItems.map((item, idx) => (
              <button
                key={item.term}
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
                {item.term}
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
                    Tutorial: Number "{currentItem.term}"
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
                title={`Number ${currentItem.term} tutorial`}
                onLoad={handleVideoLoad}
                onError={handleVideoError}
              />
            </div>

            <div className="p-4">
              <p className="text-white/70">{currentItem.description}</p>
              <div className="mt-4 flex items-center space-x-2 text-sm text-white/60">
                <div className="bg-white/10 px-2 py-1 rounded">Tips</div>
                <p>
                  For numbers, note the specific finger positions and how they
                  change between values.
                </p>
              </div>

              {/* Mark as completed button */}
              <div className="mt-6">
                <button
                  onClick={() => {
                    numberItems[currentIndex].completed = true;
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
            disabled={currentIndex === numberItems.length - 1}
            className={cn(
              "flex items-center space-x-2 px-4 py-2 rounded-lg transition-all",
              currentIndex === numberItems.length - 1
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
