"use client"
import React, { useEffect, useRef } from 'react';

const Feed = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const getVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing webcam:", err);
      }
    };

    getVideo();


    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="absolute w-screen h-screen top-0 left-0 flex items-center justify-center bg-black">
      <video
        ref={videoRef}
        autoPlay
        className="w-full h-auto max-w-screen-md rounded-lg shadow-lg"
      />
    </div>
  );
};

export default Feed;
