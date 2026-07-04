const data = {
  distance: {
    unit: "m",
    value: 0.5,
  },
  convertTo: "ft",
};

let functions = require("./index.js");

beforeEach(() => {
  // we need this to reset state of any additional vars and functions, that can be created in index.js
  jest.resetModules();
  jest.restoreAllMocks();
  functions = require("./index.js");
});

describe("Базові тести", () => {
  it("Вихідні дані відповідають умовам завдання і повертаються в правильному форматі", () => {
    const result = functions.convertDistanceUnits(data);

    expect(result).toHaveProperty("unit");
    expect(typeof result.unit).toBe("string");

    expect(result).toHaveProperty("value");
    expect(result.value).toEqual(expect.any(Number));

    expect(result).toStrictEqual({ unit: "ft", value: 1.64 });
  });
});
