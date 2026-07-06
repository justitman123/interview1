const { filterData } = require("./index.js");

describe("task_2 — розширені кейси (JS)", () => {
  it("exclude + sortBy: другий приклад із завдання", () => {
    const data = [
      { user: "mike@mail.com", rating: 20, disabled: false },
      { user: "greg@mail.com", rating: 14, disabled: false },
      { user: "john@mail.com", rating: 25, disabled: true },
    ];
    const result = filterData(data, {
      exclude: [{ disabled: true }],
      sortBy: ["rating"],
    });
    expect(result).toStrictEqual({
      result: [
        { user: "greg@mail.com", rating: 14, disabled: false },
        { user: "mike@mail.com", rating: 20, disabled: false },
      ],
    });
  });

  it("порожній include -> нічого не залишається (порожній whitelist)", () => {
    const data = [{ a: 1 }, { a: 2 }];
    expect(filterData(data, { include: [] })).toStrictEqual({ result: [] });
  });

  it("порожній exclude -> залишається все (нічого не виключаємо)", () => {
    const data = [{ a: 1 }, { a: 2 }];
    expect(filterData(data, { exclude: [] })).toStrictEqual({
      result: [{ a: 1 }, { a: 2 }],
    });
  });

  it("sortBy сортує числа як числа, а не як рядки", () => {
    const data = [{ n: 10 }, { n: 2 }, { n: 1 }];
    const result = filterData(data, { sortBy: ["n"] });
    expect(result.result.map((x) => x.n)).toEqual([1, 2, 10]);
  });

  it("sortBy за кількома ключами (tie-break за другим ключем)", () => {
    const data = [
      { a: 1, b: "y" },
      { a: 1, b: "x" },
      { a: 0, b: "z" },
    ];
    const result = filterData(data, { sortBy: ["a", "b"] });
    expect(result.result).toEqual([
      { a: 0, b: "z" },
      { a: 1, b: "x" },
      { a: 1, b: "y" },
    ]);
  });

  it("не мутує вхідний масив", () => {
    const data = [{ n: 3 }, { n: 1 }];
    const copy = JSON.parse(JSON.stringify(data));
    filterData(data, { sortBy: ["n"] });
    expect(data).toEqual(copy);
  });

  it("невідомий ключ правила ігнорується", () => {
    const data = [{ a: 1 }];
    expect(filterData(data, { unknownRule: [{ a: 1 }] })).toStrictEqual({
      result: [{ a: 1 }],
    });
  });

  it("include з кількома шаблонами (АБО між ними)", () => {
    const data = [{ n: "a" }, { n: "b" }, { n: "c" }];
    const result = filterData(data, { include: [{ n: "a" }, { n: "c" }] });
    expect(result).toStrictEqual({ result: [{ n: "a" }, { n: "c" }] });
  });
});
