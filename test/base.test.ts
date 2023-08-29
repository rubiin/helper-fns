import { assert, noop, toString } from "../src";

test("assert should not throw an error if condition is true", () => {
  expect(() => {
    assert(true, "This should not throw an error");
  }).not.toThrow();
});

test("assert should throw an error if condition is false", () => {
  expect(() => {
    assert(false, "This should throw an error");
  }).toThrowError("This should throw an error");
});

test("toString should return correct type string", () => {
  expect(toString(123)).toBe("[object Number]");
  expect(toString("test")).toBe("[object String]");
  expect(toString({})).toBe("[object Object]");
  // add more test cases for different types if needed
});

test("noop should do nothing", () => {
  expect(noop()).toBeUndefined();
  // call and test any side effects if applicable
});
