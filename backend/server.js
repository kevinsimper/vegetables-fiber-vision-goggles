const http = require("http");

const server = http.createServer((req, res) => {
  res.end("vegetables-goggles");
});

exports.server = server;

if (require.main === module)
  server.listen(process.env.PORt, () => console.log("Listening"));
