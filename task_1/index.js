const defaultUnits = require("./units.json");

function convertDistanceUnits(data, units = defaultUnits) {
  if (
    !data ||
    !data.distance ||
    typeof data.distance.unit !== "string" ||
    typeof data.distance.value !== "number" ||
    typeof data.convertTo !== "string"
  ) {
    throw new Error(
      "Invalid input: expected { distance: { unit, value }, convertTo }"
    );
  }

  const { unit, value } = data.distance;
  const target = data.convertTo;

  if (!(unit in units)) {
    throw new Error(`Unknown unit: ${unit}`);
  }
  if (!(target in units)) {
    throw new Error(`Unknown unit: ${target}`);
  }

  const valueInMeters = value * units[unit];
  const converted = valueInMeters / units[target];

  return {
    unit: target,
    value: Number(converted.toFixed(2)),
  };
}

module.exports = {
  convertDistanceUnits,
};
