const { checkFile } = require("./index.js");

test("checkFile to be defined", () => {
  expect(checkFile).toBeDefined();
});

test("checkFile should return apple", async () => {
  const result = await checkFile();
  expect(result.find(i => i.description === "Apple").description).toBe("Apple");
});
