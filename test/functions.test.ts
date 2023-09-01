/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable unicorn/no-null */
import {
  capitalizeEveryWord,
  chop,
  common,
  composeAsync,
  difference,
  drop,
  dropRight,
  dropWhile,
  ensurePrefix,
  enumToString, fixedDecimal,
  formatDuration,
  intersection,
  invertObject,
  isDate,
  isEmpty,
  isSameDate,
  lowerFirst,
  normalizeEmail,
  objectArrayToArray,
  omit, orderedToken, pick, pipe, pluck, randomHex, randomNumber, randomString, removeNull, removeUndefined, slash, slugify,
  stringAfter,
  stringBefore,
  stringifyQueryParameters,
  sumOfAnArray,
  unescapeHTML,
  union,
  unique,
} from "../src";

describe("Helpers", () => {
  it("should generate ordered token ", () => {
    const tokenFormat = "PY-XXXX";
    expect(orderedToken(tokenFormat)).not.toContain("X");
  });

  it("should convert enum to string ", () => {
    enum SomeEnum {
      Yes = "Yes",
      No = "No",
      Maybe = "Maybe",
    }

    expect(enumToString(SomeEnum)).toEqual("Yes,No,Maybe");
  });

  it("should be empty", () => {
    const cases = [[], "", {}];
    for (const c of cases) expect(isEmpty(c)).toBe(true);
  });

  it("should remove dots and convert to lowercase", () => {
    const email = "test.email@example.com";
    const normalizedEmail = normalizeEmail(email);
    expect(normalizedEmail).toBe("testemail@example.com");
  });

  it("should convert a string to slug format with default options", () => {
    expect(slugify("Hello World")).toBe("hello-world");
    expect(slugify("Hello World", { separator: "+" })).toBe("hello+world");
  });

  test("should remove undefined properties from an object", () => {
    const object = {
      foo: 1,
      bar: undefined,
      baz: "hello",
      qux: undefined,
    };

    const result = removeUndefined(object);

    expect(result.foo).toBeDefined();
    expect(result.bar).toBeUndefined();
    expect(result.baz).toBeDefined();
    expect(result.qux).toBeUndefined();
  });

  test("should invert an object with string values", () => {
    const object = {
      apple: "fruit",
      carrot: "vegetable",
      tomato: "fruit",
    };

    const result = invertObject(object);

    expect(result).toEqual({
      fruit: "tomato",
      vegetable: "carrot",
    });
  });

  it("should correctly stringify query parameters", () => {
    const parameters = {
      name: "John Doe",
      age: 30,
      city: "New York",
    };
    const result = stringifyQueryParameters(parameters);
    expect(result).toBe("name=John+Doe&age=30&city=New+York");
  });

  test("should return a promise that resolves to the correct value", async () => {
    const addOne = (x: number) => Promise.resolve(x + 1);
    const double = (x: number) => Promise.resolve(x * 2);
    const incrementAndDouble = composeAsync(double, addOne);

    const result = await incrementAndDouble(5);
    expect(result).toBe(12);
  });

  it("returns an array with common elements between two arrays", () => {
    const array1 = [1, 2, 3, 4];
    const array2 = [3, 4, 5, 6];
    expect(intersection(array1, array2)).toEqual([3, 4]);
  });

  it("should remove empty from array", () => {
    const cases = {
      a: 1,
      b: null,
    };
    expect(removeNull(cases)).toEqual({ a: 1 });
  });

  it("should return true when two dates are the same", () => {
    const dateA = new Date("2021-01-01");
    const dateB = new Date("2021-01-01");

    expect(isSameDate(dateA, dateB)).toBe(true);
  });

  it("should drop n elements from the array", () => {
    expect(drop([1, 2, 3], 2)).toEqual([3]);
    expect(drop(["a", "b", "c"], 1)).toEqual(["b", "c"]);
  });

  test("should return an array with all elements after the predicate returns false", () => {
    const array = [1, 2, 3, 4, 5];
    const someFunction = (n: number) => n <= 3;

    expect(dropWhile(array, someFunction)).toEqual([4, 5]);
  });

  it("should return an iterable with unique values", () => {
    const input = [1, 2, 3, 2, 4, 5, 1];
    const expected = [1, 2, 3, 4, 5];

    expect([...unique(input)]).toEqual(expected);
  });

  test("should return the correct result when all functions are applied in order", () => {
    const add5 = (x: number) => x + 5;
    const multiplyBy2 = (x: number) => x * 2;
    const subtract10 = (x: number) => x - 10;

    const result = pipe(add5, multiplyBy2, subtract10)(10);

    expect(result).toBe(20);
  });

  test("pluck returns an array with values extracted from objects", () => {
    const array = [{ name: "Alice" }, { name: "Bob" }, { name: "Charlie" }];

    expect(pluck(array, "name")).toEqual(["Alice", "Bob", "Charlie"]);
  });

  it("should return an array with values based on the provided attribute", () => {
    const objectArray = [
      { id: 1, name: "John" },
      { id: 2, name: "Jane" },
      { id: 3, name: "Bob" },
    ];

    expect(objectArrayToArray(objectArray, "name")).toEqual(["John", "Jane", "Bob"]);
    expect(objectArrayToArray(objectArray, "id")).toEqual([1, 2, 3]);
  });

  it("should return correct difference between two arrays", () => {
    const a = [1, 2, 3, 4];
    const b = [2, 3];

    const result = difference(a, b);
    expect(result).toEqual([1, 4]);
  });

  it("should return an array containing common elements between two arrays", () => {
    const array1 = [1, 2, 3, 4];
    const array2 = [3, 4, 5, 6];
    const result = common(array1, array2);
    expect(result).toEqual([3, 4]);
  });

  test('should return "1 second" for input 1000', () => {
    expect(formatDuration(1000)).toBe("1 second");
  });

  test("should convert the first character of a string to lowercase", () => {
    const input = "Hello";
    const expected = "hello";
    const result = lowerFirst(input);
    expect(result).toBe(expected);
  });

  test("should return the union of two arrays with duplicates allowed", () => {
    const a = [1, 2, 3];
    const b = [3, 4, 5];
    const expected = [1, 2, 3, 3, 4, 5];
    const result = union(a, b);
    expect(result).toEqual(expected);
  });

  it("should drop n elements from the end of the array", () => {
    expect(dropRight([1, 2, 3, 4, 5], 2)).toEqual([1, 2, 3]); // [1, 2, 3] is the result after dropping 2 elements from the right
    expect(dropRight(["a", "b", "c"], 1)).toEqual(["a", "b"]); // ['a', 'b'] is the result after dropping 1 element from the right
  });

  it("should return true for valid date strings", () => {
    expect(isDate("2022-01-01")).toBe(true);
    expect(isDate("2022-02-28")).toBe(true);
    expect(isDate("January 1, 2022")).toBe(true);
  });

  it("should return an empty string if the input is not a string", () => {
    expect(chop(null)).toBe("");
    expect(chop(123)).toBe("");
    expect(chop([])).toBe("");
    // Add more cases for different non-string inputs
  });

  it("should pick", () => {
    expect(pick({ a: 1, b: 2 }, ["a"])).toEqual({ a: 1 });
    expect(pick({ a: false, b: 2 }, ["a"])).toEqual({ a: false });
  });

  it("should generate random hex", () => {
    expect(randomHex(6)).toHaveLength(6);
  });

  it("should omit", () => {
    expect(omit({ a: 1, b: 2 }, ["a"])).toEqual({ b: 2 });
    expect(omit({ a: false, b: 2 }, ["b"])).toEqual({ a: false });
  });
  it("should omit", () => {
    expect(sumOfAnArray([1, 2, 3, 4])).toEqual(10);
    expect(sumOfAnArray([1, 2, 3, 4])).toEqual(10);
  });

  it("should return fixed decimal", () => {
    expect(fixedDecimal(3.141_525, 3).toString()).toEqual("3.141");
  });
  it("should capitalize every word", () => {
    expect(capitalizeEveryWord("hello world!")).toEqual("Hello World!");
  });

  it("should get string before a given string against a string", () => {
    expect(stringBefore("pineapple", "apple")).toEqual("pine");
  });

  it("should get string after a given string against a string", () => {
    expect(stringAfter("pineapple", "pine")).toEqual("apple");
  });

  it("should generate random number between two numbers", () => {
    expect(randomNumber(0, 6)).toBeGreaterThanOrEqual(0);
  });
  it("should generate random string of given length", () => {
    expect(randomString({ length: 9 }).length).toEqual(9);
  });

  it("should unescape html", () => {
    expect(
      unescapeHTML("&lt;a href=&quot;#&quot;&gt;Me &amp; you&lt;/a&gt;"),
    ).toEqual('<a href="#">Me & you</a>');
  });

  it("slash", () => {
    expect(slash("\\123")).toEqual("/123");
    expect(slash("\\\\")).toEqual("//");
    expect(slash("\\h\\i")).toEqual("/h/i");
  });

  it("ensurePrefix", () => {
    expect(ensurePrefix("abc", "abcdef")).toEqual("abcdef");
    expect(ensurePrefix("hi ", "jack")).toEqual("hi jack");
  });
});
