// sortBy: сортировка по ключам, по возрастанию, в природному порядку.
const sortByRule = {
  name: "sortBy",
  apply(data, params) {
    if (!Array.isArray(data)) {
      throw new Error(`sortBy: "data" must be an array, got ${typeof data}`);
    }
    if (!Array.isArray(params)) {
      throw new Error(`sortBy: "params" must be an array, got ${typeof params}`);
    }
    const keys = params;
    // копия: .sort() мутирует массив на месте
    return [...data].sort((a, b) => {
      for (const key of keys) {
        const av = a[key];
        const bv = b[key];
        // < / > дают природний порядок: числа как числа, строки как строки
        if (av < bv) return -1;
        if (av > bv) return 1;
      }
      return 0;
    });
  },
};

module.exports = { sortByRule };
