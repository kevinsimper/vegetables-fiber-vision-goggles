exports.checkFile = async (client, file) => {
  async function quickstart() {
    try {
      const all = await client.labelDetection(file);
      console.log(all[0].error);
      const labels = all[0].labelAnnotations;
      return all[0].labelAnnotations.map(({ description, score }) => ({
        description,
        score
      }));
    } catch (e) {
      console.log(e);
    }
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
