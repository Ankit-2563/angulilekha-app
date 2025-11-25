"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePrediction } from "@/hooks/usePrediction";

const MODEL_PATH = "/model/level-2/NUMBERS";

const ISLRecognizer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { model, accuracy, loading, predict } = usePrediction(MODEL_PATH);
  const [letter, setLetter] = useState<string | null>(null);
  const frameRequest = useRef<number | null>(null);
  const lastPredictionTime = useRef<number>(0);

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
  }, []);

  // Loop to keep predicting based on the video frame
  useEffect(() => {
    const loop = async () => {
      const now = Date.now();
      if (model && videoRef.current && now - lastPredictionTime.current > 150) {
        const result = await predict(videoRef.current);

        // Update the state if probability is above threshold
        if (result && result.probability > 0.5) {
          setLetter(result.className);
        } else {
          setLetter(null); // No confident prediction
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
  }, [model]);

  return (
    <div className="flex flex-col items-center justify-center p-6 gap-4">
      {loading ? (
        <p className="text-gray-500">Loading model...</p>
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
          <div className="text-center mt-4">
            {letter ? (
              <>
                <h2 className="text-2xl font-bold text-blue-600">
                  Detected: {letter}
                </h2>
                <p className="text-gray-700">Confidence: {accuracy}%</p>
              </>
            ) : (
              <p className="text-gray-500">Waiting for gesture...</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ISLRecognizer;
