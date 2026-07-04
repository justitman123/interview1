import unitsJson from "./units.json";

interface Distance {
  unit: string;
  value: number;
}

interface ConvertData {
  distance: Distance;
  convertTo: string;
}

interface Result {
  unit: string;
  value: number;
}

// JSON выводит литеральные типы ({ m: 1, ... }) и не даёт индексировать
// произвольной строкой — приводим один раз к словарю "единица -> метры".
const units = unitsJson as Record<string, number>;

export function convertDistanceUnits(data: ConvertData): Result {
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
