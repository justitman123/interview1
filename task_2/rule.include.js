// include: оставить записи, совпадающие хотя бы с одним шаблоном.
const includeRule = {
  name: "include",
  apply(data, params) {
    if (!Array.isArray(data)) {
      throw new Error(`include: "data" must be an array, got ${typeof data}`);
    }
    if (!Array.isArray(params)) {
      throw new Error(`include: "params" must be an array, got ${typeof params}`);
    }
    const conditions = params;
    return data.filter((item) => {
      if (item === null || typeof item !== "object") {
        return false;
      }
      return conditions.some((condition) => {
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

module.exports = { includeRule };
