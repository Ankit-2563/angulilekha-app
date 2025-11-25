"use client";

import { useState } from "react";
import ISLRecognizer from "@/components/ISLRecognizer";
import AlphabetRecognizer from "@/components/AlphabetRecognizer";

export default function Home() {
  const [activeRecognizer, setActiveRecognizer] = useState<
    "numbers" | "alphabet"
  >("numbers");

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">ISL Recognition</h1>

      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setActiveRecognizer("numbers")}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            activeRecognizer === "numbers"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Numbers
        </button>
        <button
          onClick={() => setActiveRecognizer("alphabet")}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            activeRecognizer === "alphabet"
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Alphabets (A-I)
        </button>
      </div>

      {activeRecognizer === "numbers" ? (
        <ISLRecognizer />
      ) : (
        <AlphabetRecognizer />
      )}
    </main>
  );
}
