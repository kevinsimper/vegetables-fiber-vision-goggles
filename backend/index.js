exports.checkFile = async client => {
  async function quickstart() {
    const [result] = await client.labelDetection("./apple.jpg");
    const labels = result.labelAnnotations;
    return result.labelAnnotations.map(({ description, score }) => ({
      description,
      score
    }));
  }
  return await quickstart();
};

if (require.main === module) {
  const { createVisionClient } = require("./visionClient.js");
  const client = createVisionClient();
  exports.checkFile(client).then(data => {
    console.log(data);
  });
}
