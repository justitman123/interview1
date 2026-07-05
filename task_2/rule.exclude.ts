import { Rule } from "./rule";

// exclude: выбросить записи, совпадающие хотя бы с одним шаблоном.
// Это инверсия include: где include оставлял совпавших, exclude их убирает.
export const excludeRule: Rule = {
  name: "exclude",
  apply(data, params) {
    // data не массив — .filter упал бы
    if (!Array.isArray(data)) {
      throw new Error(`exclude: "data" must be an array, got ${typeof data}`);
    }
    // params не массив — .some упал бы
    if (!Array.isArray(params)) {
      throw new Error(`exclude: "params" must be an array, got ${typeof params}`);
    }

    const conditions = params as Record<string, unknown>[];

    return data.filter((item) => {
      // запись не объект — под критерий исключения не попадает, оставляем
      if (item === null || typeof item !== "object") {
        return true;
      }

      // оставляем запись, если она НЕ совпала ни с одним шаблоном (инверсия include)
      return !conditions.some((condition) => {
        if (condition === null || typeof condition !== "object") {
          return false;
        }
        const pairs = Object.entries(condition);
        if (pairs.length === 0) {
          return false;
        }
        return pairs.every(([key, value]) => item[key] === value);
      });
    });
  },
};
