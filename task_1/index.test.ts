import { convertDistanceUnits } from "./index";

const data = {
  distance: {
    unit: "m",
    value: 0.5,
  },
  convertTo: "ft",
};

describe("Базові тести (TS)", () => {
  it("Вихідні дані відповідають умовам завдання і повертаються в правильному форматі", () => {
    const result = convertDistanceUnits(data);

    expect(result).toHaveProperty("unit");
    expect(typeof result.unit).toBe("string");

    expect(result).toHaveProperty("value");
    expect(result.value).toEqual(expect.any(Number));

    expect(result).toStrictEqual({ unit: "ft", value: 1.64 });
  });
});
