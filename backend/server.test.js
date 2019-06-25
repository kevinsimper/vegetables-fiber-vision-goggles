const { readFileSync } = require("fs");
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

test("server to listen", done => {
  const listener = server.listen(0, async () => {
    const body = JSON.stringify({
      file: readFileSync("./apple.jpg")
    });
    const req = await fetch(
      `http://localhost:${listener.address().port}/checkfilejson`,
      {
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    const data = await req.json();
    expect(data).toStrictEqual([
      { description: "Natural foods", score: 0.9808749556541443 },
      { description: "Apple", score: 0.9772592186927795 },
      { description: "Fruit", score: 0.9751542806625366 },
      { description: "Food", score: 0.909111499786377 },
      { description: "Red", score: 0.901925265789032 },
      { description: "Mcintosh", score: 0.891269326210022 },
      { description: "Plant", score: 0.884170651435852 },
      { description: "Accessory fruit", score: 0.7950304746627808 },
      { description: "Superfood", score: 0.7756914496421814 },
      { description: "Pectin", score: 0.6706664562225342 }
    ]);
    listener.close(done);
  });
});
