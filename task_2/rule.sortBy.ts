import { Rule } from "./rule";

// sortBy: сортировка по одному или нескольким ключам, по возрастанию,
// в "природному порядку" (числа как числа, строки как строки).
export const sortByRule: Rule = {
  name: "sortBy",
  apply(data, params) {
    if (!Array.isArray(data)) {
      throw new Error(`sortBy: "data" must be an array, got ${typeof data}`);
    }
    if (!Array.isArray(params)) {
      throw new Error(`sortBy: "params" must be an array, got ${typeof params}`);
    }

    const keys = params as string[];

    // Копия входного массива: .sort() сортирует НА МЕСТЕ, а вход мутировать нельзя.
    return [...data].sort((a, b) => {
      const ao = a as Record<string, unknown>;
      const bo = b as Record<string, unknown>;

      // Идём по ключам по порядку: первый ключ, где значения различаются, решает.
      for (const key of keys) {
        const av = ao[key] as never;
        const bv = bo[key] as never;

        // Сравнение через < / > — "природний порядок":
        // для чисел числовое, для строк лексикографическое. НЕ дефолтный .sort()
        // (который всё приводит к строкам и ломает числа: [2,10] -> [10,2]).
        if (av < bv) return -1;
        if (av > bv) return 1;
        // равны по этому ключу — переходим к следующему (tie-break)
      }
      return 0;
    });
  },
};
