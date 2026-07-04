import { Rule } from "./rule";

// include: оставить записи, совпадающие хотя бы с одним шаблоном.
// Внутри шаблона все пары ключ:значение должны совпасть (И),
// между шаблонами — достаточно одного совпадения (ИЛИ).
export const includeRule: Rule = {
  name: "include",
  apply(data, params) {
    const conditions = params as Record<string, unknown>[];
    return data.filter((item) =>
      conditions.some((condition) =>
        Object.entries(condition).every(([key, value]) => item[key] === value)
      )
    );
  },
};
