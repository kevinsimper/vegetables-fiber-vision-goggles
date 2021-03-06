const { readFileSync } = require("fs");
const { checkFile } = require("./index.js");

test("checkFile to be defined", () => {
  expect(checkFile).toBeDefined();
});

test("checkFile should return apple", async () => {
  const visionClient = {
    labelDetection: () => {
      return [
        {
          labelAnnotations: [
            {
              description: "Apple"
            }
          ]
        }
      ];
    }
  };
  const result = await checkFile(visionClient, readFileSync("./apple.jpg"));
  expect(result.find(i => i.description === "Apple").description).toBe("Apple");
});
