exports.createVisionClient = () => {
  const vision = require("@google-cloud/vision");
  const client = new vision.ImageAnnotatorClient();
  return client;
};
