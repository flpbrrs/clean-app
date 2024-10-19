import { sum } from "../src";

test("Deve somar corretamente 2 + 2", () => {
    expect(sum(2, 2)).toBe(4);
});