import type { Rule } from "./rule";
import { includeRule } from "./rule.include";
import { excludeRule } from "./rule.exclude";
import { sortByRule } from "./rule.sortBy";

// Реестр правил по их name. Добавить новое правило = добавить файл-модуль
// и вписать его сюда — filterData менять не нужно (единый интерфейс apply).
const rules: Rule[] = [includeRule, excludeRule, sortByRule];
const registry: Record<string, Rule> = Object.fromEntries(
  rules.map((r) => [r.name, r])
);

export function filterData(
  data: Record<string, unknown>[],
  condition: Record<string, unknown>
): { result: Record<string, unknown>[] } {
  // копия входа, чтобы не мутировать; не-массив -> пусто
  let result: Record<string, unknown>[] = Array.isArray(data) ? [...data] : [];

  if (condition && typeof condition === "object") {
    // проходим по ключам condition (include / exclude / sortBy) и применяем
    // соответствующее правило единообразно через apply(data, params)
    for (const [name, params] of Object.entries(condition)) {
      const rule = registry[name];
      if (rule) {
        result = rule.apply(result, params);
      }
      // неизвестный ключ правила — молча пропускаем
    }
  }

  return { result };
}
