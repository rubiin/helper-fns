
import { isEmpty } from '../src/';

describe("isEmpty", () => {
  it("should be empty", () => {
    const cases = [[], "", {}]
    for (const c of cases) {
      expect(isEmpty(c)).toBe(true);
    }

  })


  it("should not be empty", () => {
    const cases = [[1, 2], { a: 1, b: 2 }, 123, true]
    for (const c of cases) {
      expect(isEmpty(c)).toBe(false);
    }

  })
});