let functions = require("./index.js");

beforeEach(() => {
  // we need this to reset state of any additional vars and functions, that can be created in index.js
  jest.resetModules();
  jest.restoreAllMocks();
  functions = require("./index.js");
});

function expectVec3(obj) {
  expect(obj).toEqual(
    expect.objectContaining({
      x: expect.any(Number),
      y: expect.any(Number),
      z: expect.any(Number),
    })
  );
}

function expectVec3InRange(obj, min = 0, max = 100) {
  expect(obj.x).toBeGreaterThanOrEqual(min);
  expect(obj.x).toBeLessThanOrEqual(max);
  expect(obj.y).toBeGreaterThanOrEqual(min);
  expect(obj.y).toBeLessThanOrEqual(max);
  expect(obj.z).toBeGreaterThanOrEqual(min);
  expect(obj.z).toBeLessThanOrEqual(max);
}

function expectProbes(probes) {
  expect(probes).toEqual(
    expect.objectContaining({
      count: expect.any(Number),
      coordinates: expect.any(Array),
    })
  );

  probes.coordinates.forEach((coord) => {
    expectVec3(coord);
    expectVec3InRange(coord);
  });
}

describe("Базові тести", () => {
  it("Вихідні дані відповідають умовам завдання і повертаються в правильному форматі", () => {
    const result = functions.findAsteroidLocation();

    expect(result).toHaveProperty("result");

    const payload = result.result;
    expect(payload).toHaveProperty("location");
    expect(payload).toHaveProperty("probes");

    expectVec3(payload.location);
    expectVec3InRange(payload.location);
    expectProbes(payload.probes);
  });
});
