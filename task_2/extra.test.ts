import { filterData } from "./index";

type Row = Record<string, unknown>;

describe("task_2 — розширені кейси (TS)", () => {
  it("exclude + sortBy: другий приклад із завдання", () => {
    const data: Row[] = [
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

  it("порожній include -> нічого не залишається", () => {
    const data: Row[] = [{ a: 1 }, { a: 2 }];
    expect(filterData(data, { include: [] })).toStrictEqual({ result: [] });
  });

  it("порожній exclude -> залишається все", () => {
    const data: Row[] = [{ a: 1 }, { a: 2 }];
    expect(filterData(data, { exclude: [] })).toStrictEqual({
      result: [{ a: 1 }, { a: 2 }],
    });
  });

  it("sortBy сортує числа як числа, а не як рядки", () => {
    const data: Row[] = [{ n: 10 }, { n: 2 }, { n: 1 }];
    const result = filterData(data, { sortBy: ["n"] });
    expect(result.result.map((x) => x.n)).toEqual([1, 2, 10]);
  });

  it("sortBy за кількома ключами (tie-break)", () => {
    const data: Row[] = [
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
    const data: Row[] = [{ n: 3 }, { n: 1 }];
    const copy = JSON.parse(JSON.stringify(data));
    filterData(data, { sortBy: ["n"] });
    expect(data).toEqual(copy);
  });

  it("невідомий ключ правила ігнорується", () => {
    const data: Row[] = [{ a: 1 }];
    expect(filterData(data, { unknownRule: [{ a: 1 }] })).toStrictEqual({
      result: [{ a: 1 }],
    });
  });

  it("include з кількома шаблонами (АБО між ними)", () => {
    const data: Row[] = [{ n: "a" }, { n: "b" }, { n: "c" }];
    const result = filterData(data, { include: [{ n: "a" }, { n: "c" }] });
    expect(result).toStrictEqual({ result: [{ n: "a" }, { n: "c" }] });
  });
});
