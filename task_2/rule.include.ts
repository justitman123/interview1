import { Rule } from "./rule";

// include: оставить записи, совпадающие хотя бы с одним шаблоном.
// Внутри шаблона все пары ключ:значение должны совпасть (И),
// между шаблонами достаточно одного совпадения (ИЛИ).
export const includeRule: Rule = {
  name: "include",
  apply(data, params) {
    // (1) data не массив (undefined/null/объект/строка) — .filter упал бы
    if (!Array.isArray(data)) {
      throw new Error(`include: "data" must be an array, got ${typeof data}`);
    }

    // (2) params не массив — .some ниже упал бы
    if (!Array.isArray(params)) {
      throw new Error(`include: "params" must be an array, got ${typeof params}`);
    }

    const conditions = params as Record<string, unknown>[];
    // Пустой include — это пустой whitelist: some([]) === false для всех
    // записей, поэтому естественно вернётся []. Спец-обработка не нужна.

    return data.filter((item) => {
      // (4) запись не объект (null/примитив) — item[key] небезопасен, не включаем её
      if (item === null || typeof item !== "object") {
        return false;
      }

      return conditions.some((condition) => {
        // (5) шаблон не объект (null/примитив) — Object.entries упал бы, пропускаем шаблон
        if (condition === null || typeof condition !== "object") {
          return false;
        }

        const pairs = Object.entries(condition);

        // (6) пустой шаблон {} — иначе .every дал бы true и совпал бы со всем; считаем несовпадением
        if (pairs.length === 0) {
          return false;
        }

        // основная проверка: все пары ключ:значение шаблона совпали с записью
        return pairs.every(([key, value]) => item[key] === value);
      });
    });
  },
};
