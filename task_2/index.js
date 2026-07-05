const { includeRule } = require("./rule.include.js");
const { excludeRule } = require("./rule.exclude.js");
const { sortByRule } = require("./rule.sortBy.js");

// Реестр правил по name. Новое правило = новый файл + строка сюда.
const rules = [includeRule, excludeRule, sortByRule];
const registry = Object.fromEntries(rules.map((r) => [r.name, r]));

function filterData(data, condition) {
  let result = Array.isArray(data) ? [...data] : [];
  if (condition && typeof condition === "object") {
    for (const [name, params] of Object.entries(condition)) {
      const rule = registry[name];
      if (rule) {
        result = rule.apply(result, params);
      }
    }
  }
  return { result };
}

module.exports = { filterData };
