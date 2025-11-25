"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePrediction } from "@/hooks/usePrediction";

const MODEL_PATH = "/model/level-3/WORDS";

const ISLRecognizer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { model, accuracy, loading, predict } = usePrediction(MODEL_PATH);
  const [word, setWord] = useState<string | null>(null);
  const frameRequest = useRef<number | null>(null);
  const lastPredictionTime = useRef<number>(0);
  const [history, setHistory] = useState<string[]>([]);

  // Access and start the camera stream
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: 224,
            height: 224,
            facingMode: "user",
          },
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    };

    startCamera();

    return () => {
      // Clean up camera stream when component unmounts
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  // Loop to keep predicting based on the video frame
  useEffect(() => {
    const loop = async () => {
      const now = Date.now();
      if (model && videoRef.current && now - lastPredictionTime.current > 200) {
        const result = await predict(videoRef.current);

        // Update the state if probability is above threshold
        if (result && result.probability > 0.7) {
          setWord(result.className);

          // Add to history if the word is different from the last one
          if (
            history.length === 0 ||
            history[history.length - 1] !== result.className
          ) {
            setHistory((prev) => {
              const newHistory = [...prev, result.className];
              // Keep only the last 5 words
              return newHistory.slice(-5);
            });
          }
        } else {
          setWord(null); // No confident prediction
        }

        lastPredictionTime.current = now;
      }

      frameRequest.current = requestAnimationFrame(loop);
    };

    // Start prediction loop once the model is loaded
    if (model && videoRef.current) {
      frameRequest.current = requestAnimationFrame(loop);
    }

    return () => {
      if (frameRequest.current) cancelAnimationFrame(frameRequest.current);
    };
  }, [model, predict, history]);

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 gap-4">
      <h1 className="text-2xl font-bold mb-4">ISL Word Recognition</h1>

      {loading ? (
        <div className="flex items-center justify-center h-40">
          <p className="text-gray-500">Loading model...</p>
        </div>
      ) : (
        <>
          <video
            ref={videoRef}
            width={224}
            height={224}
            className="rounded-lg border-2 border-gray-300"
            autoPlay
            muted
          />

          <div className="text-center mt-4 w-full">
            {word ? (
              <>
                <h2 className="text-2xl font-bold text-blue-600">
                  Detected: {word}
                </h2>
                <p className="text-gray-700">Confidence: {accuracy}%</p>
              </>
            ) : (
              <p className="text-gray-500">
                Waiting for sign language gesture...
              </p>
            )}
          </div>

          <div className="mt-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">Recognition History</h3>
              <button
                onClick={clearHistory}
                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm"
              >
                Clear
              </button>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg min-h-16">
              {history.length > 0 ? (
                <p className="text-lg">{history.join(" ")}</p>
              ) : (
                <p className="text-gray-500 text-center">
                  No words detected yet
                </p>
              )}
            </div>

            <div className="mt-4 p-3 bg-blue-50 rounded-md border border-blue-200">
              <p className="text-sm text-gray-700">
                Supported words: "thank you", "welcome", "hello", "I", "you"
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ISLRecognizer;