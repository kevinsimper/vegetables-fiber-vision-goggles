const http = require("http");

const server = http.createServer((req, res) => {
  res.end("vegetables-goggles");
});

exports.server = server;

if (require.main === module)
  server.listen(process.env.PORT || 9000, () =>
    console.log("Listening on localhost:" + server.address().port)
  );
