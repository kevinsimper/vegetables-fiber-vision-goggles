const vision = require("@google-cloud/vision");

exports.checkFile = async () => {
  async function quickstart() {
    const client = new vision.ImageAnnotatorClient();
    const [result] = await client.labelDetection("./apple.jpg");
    const labels = result.labelAnnotations;
    return result.labelAnnotations.map(({ description, score }) => ({
      description,
      score
    }));
  }
  return await quickstart();
};
