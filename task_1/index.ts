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

type Units = Record<string, number>;

// Чистое ядро: единицы приходят параметром, файл не читается здесь —
// модуль грузится в любой среде (Node, браузер). В браузере demo.html
// подгружает units.json через fetch и передаёт сюда.
export function convertDistanceUnits(data: ConvertData, units: Units): Result {
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
