"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePrediction } from "@/hooks/usePrediction";

const MODEL_PATH = "/model/level-1/alphabets";

const AlphabetRecognizer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { model, accuracy, loading, predict } = usePrediction(MODEL_PATH);
  const [letter, setLetter] = useState<string | null>(null);
  const frameRequest = useRef<number | null>(null);
  const lastPredictionTime = useRef<number>(0);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Access and start the camera stream
  useEffect(() => {
    let stream: MediaStream | null = null;
    let mounted = true;

    const startCamera = async () => {
      try {
        // Clear any previous errors
        setCameraError(null);

        // Stop any existing streams
        if (videoRef.current && videoRef.current.srcObject) {
          const tracks = (
            videoRef.current.srcObject as MediaStream
          ).getTracks();
          tracks.forEach((track) => track.stop());
          videoRef.current.srcObject = null;
        }

        // Short delay to ensure previous camera stream is fully released
        await new Promise((resolve) => setTimeout(resolve, 300));

        // Request camera access with more flexible constraints
        stream = await navigator.mediaDevices.getUserMedia({
          video: true, // Use default settings first
          audio: false,
        });

        if (!mounted) return;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;

          // Add an event listener for when video starts playing
          videoRef.current.onplaying = () => {
            if (mounted) setIsVideoPlaying(true);
          };

          try {
            await videoRef.current.play();
          } catch (err) {
            console.error("Error playing video:", err);
            if (mounted) {
              setCameraError(
                "Could not play video stream. Please reload the page."
              );
            }
          }
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        if (mounted) {
          if (err instanceof DOMException && err.name === "NotAllowedError") {
            setCameraError(
              "Camera access denied. Please allow camera access in your browser settings."
            );
          } else if (
            err instanceof DOMException &&
            err.name === "NotFoundError"
          ) {
            setCameraError(
              "No camera found. Please connect a camera and try again."
            );
          } else {
            setCameraError(
              "Could not access camera. Please check permissions and try again."
            );
          }
        }
      }
    };

    startCamera();

    // Cleanup
    return () => {
      mounted = false;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
      if (frameRequest.current) {
        cancelAnimationFrame(frameRequest.current);
      }
    };
  }, []);

  // Try to automatically restart camera if we encounter errors
  useEffect(() => {
    if (cameraError && !isVideoPlaying) {
      const timer = setTimeout(() => {
        // Only try to restart if we're still mounted and still have an error
        if (videoRef.current) {
          setCameraError(null);

          // Force a camera restart by simulating a component remount
          if (videoRef.current.srcObject) {
            const tracks = (
              videoRef.current.srcObject as MediaStream
            ).getTracks();
            tracks.forEach((track) => track.stop());
            videoRef.current.srcObject = null;
          }

          // Try a different camera configuration
          navigator.mediaDevices
            .getUserMedia({
              video: {
                facingMode: "user",
                width: { ideal: 224 },
                height: { ideal: 224 },
              },
              audio: false,
            })
            .then((stream) => {
              if (videoRef.current) {
                videoRef.current.srcObject = stream;
                return videoRef.current.play();
              }
            })
            .catch((err) => {
              console.error("Error in camera retry:", err);
              setCameraError("Camera restart failed. Please reload the page.");
            });
        }
      }, 2000); // Wait 2 seconds before retrying

      return () => clearTimeout(timer);
    }
  }, [cameraError, isVideoPlaying]);

  // Loop to keep predicting based on the video frame
  useEffect(() => {
    if (!model || !videoRef.current || !isVideoPlaying) return;

    const loop = async () => {
      const now = Date.now();
      if (videoRef.current && now - lastPredictionTime.current > 150) {
        try {
          const result = await predict(videoRef.current);

          // Update the state if probability is above threshold and filter only A-I
          if (result && result.probability > 0.5) {
            // Check if it's in A-I range
            const letterValue = result.className;
            if (letterValue >= "A" && letterValue <= "I") {
              setLetter(letterValue);
            } else {
              setLetter(null); // Outside the A-I range
            }
          } else {
            setLetter(null); // No confident prediction
          }

          lastPredictionTime.current = now;
        } catch (err) {
          console.error("Prediction error:", err);
        }
      }

      frameRequest.current = requestAnimationFrame(loop);
    };

    // Start prediction loop once the model is loaded
    frameRequest.current = requestAnimationFrame(loop);

    return () => {
      if (frameRequest.current) cancelAnimationFrame(frameRequest.current);
    };
  }, [model, predict, isVideoPlaying]);

  return (
    <div className="flex flex-col items-center justify-center p-6 gap-4">
      {loading ? (
        <p className="text-gray-500">Loading alphabet model...</p>
      ) : (
        <>
          <div className="relative">
            <video
              ref={videoRef}
              width={224}
              height={224}
              className="rounded-lg border-2 border-green-300"
              autoPlay
              playsInline
              muted
            />
            {cameraError && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-90 rounded-lg">
                <p className="text-red-500 text-center p-4">{cameraError}</p>
              </div>
            )}
          </div>
          <div className="text-center mt-4">
            {letter ? (
              <>
                <h2 className="text-2xl font-bold text-green-600">
                  Detected: {letter}
                </h2>
                <p className="text-gray-700">Confidence: {accuracy}%</p>
              </>
            ) : (
              <p className="text-gray-500">Show hand sign for A-I...</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AlphabetRecognizer;
