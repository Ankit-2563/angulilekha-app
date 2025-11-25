import { useState, useEffect } from "react";
import * as tmImage from "@teachablemachine/image";

export const usePrediction = (modelPath: string) => {
  const [model, setModel] = useState<tmImage.CustomMobileNet | null>(null);
  const [accuracy, setAccuracy] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadModel = async () => {
      const modelURL = `${modelPath}/model.json`;
      const metadataURL = `${modelPath}/metadata.json`;
      const loadedModel = await tmImage.load(modelURL, metadataURL);
      setModel(loadedModel);
      setLoading(false);
    };

    loadModel();
  }, [modelPath]);

  const predict = async (video: HTMLVideoElement) => {
    if (!model || !video) return;
    const prediction = await model.predict(video);
    const best = prediction.reduce(
      (a, b) => (b.probability > a.probability ? b : a),
      prediction[0]
    );
    setAccuracy(Math.round(best.probability * 100));
    return best;
  };

  return { model, accuracy, loading, predict };
};
