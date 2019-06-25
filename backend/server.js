const http = require("http");
const { readFileSync } = require("fs");
const { checkFile } = require("./index.js");
const { createVisionClient } = require("./visionClient.js");

async function checkfile(req, res) {
  const visionClient = createVisionClient();
  const result = await checkFile(visionClient, readFileSync("./apple.jpg"));
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(result));
}

exports.checkfilejson = checkfilejson
function checkfilejson(visionClient, req, res) {
  let payload = "";
  req.on("data", data => {
    payload += data.toString();
  });
  req.on("end", async () => {
    const data = JSON.parse(payload);
    const image = Buffer.from(data.file.data);
    const result = await checkFile(visionClient, image);
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(result));
  });
};

const server = http.createServer(async (req, res) => {
  console.log("New request", req.url);
  if (req.url === "/checkfile") {
    checkfile(req, res);
  } else if (req.url === "/checkfilejson") {
    const visionClient = createVisionClient();
    checkfilejson(visionClient, req, res);
  } else {
    res.end("vegetables-goggles");
  }
});

exports.server = server;

if (require.main === module)
  server.listen(process.env.PORT || 9000, () =>
    console.log("Listening on localhost:" + server.address().port)
  );
