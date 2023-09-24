import {
  isArray,
  isBigint,
  isBoolean,
  isFunction,
  isNonPrimitive,
  isNull,
  isNumber,
  isObject,
  isPrimitive,
  isString,
  isSymbol,
  isUndefined,
} from "../src";

describe("isDefined", () => {
  it("should return false for other values", () => {
    expect(isUndefined(null)).toBe(false);
    expect(isUndefined(0)).toBe(false);
    expect(isUndefined("")).toBe(false);
    expect(isUndefined(false)).toBe(false);
    expect(isUndefined({})).toBe(false);
    // Add more test cases for different types/values that are not undefined
  });
});

describe("isBoolean", () => {
  test("should return true if value is a boolean", () => {
    expect(isBoolean(true)).toBe(true);
    expect(isBoolean(false)).toBe(true);
    expect(isBoolean(0)).toBe(false);
    expect(isBoolean("true")).toBe(false);
  });
});

describe("isFunction", () => {
  test("should return true if value is a function", () => {
    expect(isFunction(() => {})).toBe(true);
    expect(isFunction({})).toBe(false);
  });
});

describe("isNumber", () => {
  test("should return true if value is a number", () => {
    expect(isNumber(1)).toBe(true);
    expect(isNumber(0)).toBe(true);
    expect(isNumber(-1)).toBe(true);
    expect(isNumber("1")).toBe(false);
    expect(isNumber(null)).toBe(false);
    expect(isNumber({})).toBe(false);
  });
});

describe("isString", () => {
  test("should return true if value is a string", () => {
    expect(isString("abc")).toBe(true);
    expect(isString("")).toBe(true);
    expect(isString(123)).toBe(false);
    expect(isString(null)).toBe(false);
    expect(isString({})).toBe(false);
  });
});

describe("isObject", () => {
  test("should return true if value is an object", () => {
    expect(isObject({})).toBe(true);
    expect(isObject({ key: "value" })).toBe(true);
    expect(isObject([])).toBe(false);
    expect(isObject(null)).toBe(false);
    expect(isObject("")).toBe(false);
  });
});

describe("isNull", () => {
  test("should return true if value is null", () => {
    expect(isNull(null)).toBe(true);
    expect(isNull("null")).toBe(false);
    expect(isNull({})).toBe(false);
    expect(isNull(0)).toBe(false);
  });
});

describe("isSymbol", () => {
  it("should return true if value is a symbol", () => {
    expect(isSymbol(Symbol("test"))).toBe(true);
  });

  it("should return false for other values", () => {
    expect(isSymbol(null)).toBe(false);
    expect(isSymbol(0)).toBe(false);
    expect(isSymbol("")).toBe(false);
    expect(isSymbol(false)).toBe(false);
    expect(isSymbol({})).toBe(false);
  });
});

describe("isArray", () => {
  test("should return true if value is an array", () => {
    expect(isArray([])).toBe(true);
    expect(isArray([1, 2, 3])).toBe(true);
    expect(isArray([])).toBe(true); // Array constructor
    expect(isArray({})).toBe(false);
    expect(isArray(null)).toBe(false);
    expect(isArray("")).toBe(false);
    expect(isArray(123)).toBe(false);
  });

  test("should return true if value is an array of specific type", () => {
    expect(isArray<number>([1, 2, 3])).toBe(true);
    expect(isArray<string>(["a", "b", "c"])).toBe(true);
    expect(isArray<boolean>([true, false])).toBe(true);
    expect(isArray<number>("")).toBe(false);
    expect(isArray<string>([])).toBe(true);
  });
});

describe("isBigint", () => {
  test("should return true if value is a bigint", () => {
    expect(isBigint(BigInt(123))).toBe(true);
    expect(isBigint(BigInt(0))).toBe(true);
    expect(isBigint(BigInt(-123))).toBe(true);
    expect(isBigint(123)).toBe(false);
    expect(isBigint("123")).toBe(false);
    expect(isBigint(null)).toBe(false);
    expect(isBigint({})).toBe(false);
  });
}); // Import the module that contains the functions

describe("isPrimitive", () => {
  it("should return true for primitive values", () => {
    expect(isPrimitive(null)).toBe(true);
    expect(isPrimitive()).toBe(true);
    expect(isPrimitive("hello")).toBe(true);
    expect(isPrimitive(123)).toBe(true);
    expect(isPrimitive(false)).toBe(true);
    expect(isPrimitive(Symbol(""))).toBe(true);
    expect(isPrimitive(BigInt(123))).toBe(true);
  });

  it("should return false for non-primitive values", () => {
    expect(isPrimitive({})).toBe(false);
    expect(isPrimitive([])).toBe(false);
    expect(isPrimitive(new Date())).toBe(false);
    // Add more test cases for non-primitive values
  });
});

describe("isNonPrimitive", () => {
  it("should return true for non-primitive values", () => {
    expect(isNonPrimitive({})).toBe(true);
    expect(isNonPrimitive([])).toBe(true);
    expect(isNonPrimitive(new Date())).toBe(true);
    // Add more test cases for non-primitive values
  });

  it("should return false for primitive values", () => {
    expect(isNonPrimitive(null)).toBe(false);
    expect(isNonPrimitive()).toBe(false);
    expect(isNonPrimitive("hello")).toBe(false);
    expect(isNonPrimitive(123)).toBe(false);
    expect(isNonPrimitive(false)).toBe(false);
    expect(isNonPrimitive(Symbol(""))).toBe(false);
    expect(isNonPrimitive(BigInt(123))).toBe(false);
  });
});
