import { filterData } from "./index";

const data = [
  { name: "John", email: "john2@mail.com" },
  { name: "John", email: "john1@mail.com" },
  { name: "Jane", email: "jane@mail.com" },
];

describe("Базові тести (TS)", () => {
  it("include + sortBy повертають правильний результат", () => {
    const result = filterData(data, {
      include: [{ name: "John" }],
      sortBy: ["email"],
    });

    expect(result).toStrictEqual({
      result: [
        { name: "John", email: "john1@mail.com" },
        { name: "John", email: "john2@mail.com" },
      ],
    });
  });
});
