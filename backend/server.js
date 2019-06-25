const http = require("http");
const { readFileSync } = require("fs");
const { checkFile } = require("./index.js");
const { createVisionClient } = require("./visionClient.js");

const server = http.createServer(async (req, res) => {
  console.log("New request", req.url);
  if (req.url === "/checkfile") {
    const visionClient = createVisionClient();
    const result = await checkFile(visionClient, readFileSync("./apple.jpg"));
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(result));
  } else {
    res.end("vegetables-goggles");
  }
});

exports.server = server;

if (require.main === module)
  server.listen(process.env.PORT || 9000, () =>
    console.log("Listening on localhost:" + server.address().port)
  );
