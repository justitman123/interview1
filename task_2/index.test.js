const data = [
  { name: "John", email: "john2@mail.com" },
  { name: "John", email: "john1@mail.com" },
  { name: "Jane", email: "jane@mail.com" },
];

let functions = require("./index.js");

beforeEach(() => {
  // we need this to reset state of any additional vars and functions, that can be created in index.js
  jest.resetModules();
  jest.restoreAllMocks();
  functions = require("./index.js");
});

describe("Базові тести", () => {
  it("Вихідні дані відповідають умовам завдання і повертаються в правильному форматі", () => {
    const result = functions.filterData(data, {
      include: [{ name: "John" }],
      sortBy: ["email"],
    });

    expect(result).toHaveProperty("result");
    expect(Array.isArray(result.result)).toBe(true);

    result.result.forEach((item) => {
      expect(item).toBeInstanceOf(Object);
    });

    expect(result).toStrictEqual({
      result: [
        { name: "John", email: "john1@mail.com" },
        { name: "John", email: "john2@mail.com" },
      ],
    });
  });
});
