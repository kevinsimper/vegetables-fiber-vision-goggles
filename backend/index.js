exports.checkFile = async (client, file) => {
  async function quickstart() {
    const [result] = await client.labelDetection(file);
    const labels = result.labelAnnotations;
    return result.labelAnnotations.map(({ description, score }) => ({
      description,
      score
    }));
  }
  return await quickstart();
};

if (require.main === module) {
  const { readFileSync } = require("fs");
  const { createVisionClient } = require("./visionClient.js");
  const client = createVisionClient();
  exports.checkFile(client, readFileSync("./apple.jpg")).then(data => {
    console.log(data);
  });
}
