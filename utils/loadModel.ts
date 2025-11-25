import * as tmImage from "@teachablemachine/image";

const MODEL_URL = "/model/";

export const loadISLModel = async () => {
  const model = await tmImage.load(
    MODEL_URL + "model.json",
    MODEL_URL + "metadata.json"
  );
  return model;
};
