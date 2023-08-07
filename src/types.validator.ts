import { toString } from "./base";

export const isDefined = <T = any>(val?: T): val is T => typeof val !== "undefined";
export const isBoolean = (val: any): val is boolean => typeof val === "boolean";
export const isFunction = <T extends Function>(val: any): val is T =>
  typeof val === "function";
export const isNumber = (val: any): val is number => typeof val === "number";
export const isString = (val: unknown): val is string =>
  typeof val === "string";
export const isObject = (val: any): val is object =>
  toString(val) === "[object Object]";

export const isNull = (value: unknown): value is null => value === null;

export const isArray = <T>(value: unknown): value is T[] => Array.isArray(value)
