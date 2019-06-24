const fetch = require("node-fetch");
const { server } = require("./server.js");

test("server", () => {
  expect(server).toBeDefined();
});

test("server to listen", done => {
  const listener = server.listen(0, async () => {
    const req = await fetch("http://localhost:" + listener.address().port);
    const data = await req.text();
    expect(data).toBe("vegetables-goggles");
    listener.close(done);
  });
});
