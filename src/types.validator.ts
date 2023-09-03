import { Buffer } from "node:buffer";
import type { Class, FunctionType, Primitive } from "./types";
import { toString } from "./base";
import { isDate, isEmpty, isSameDate } from "./function.utils";

export function isArray<T>(value: unknown): value is T[] {
  return Array.isArray(value);
}

export function isBigint(value: unknown): value is bigint {
  return typeof value === "bigint";
}

export const isBoolean = (value: any): value is boolean =>
  typeof value === "boolean";

export function isBuffer(value: unknown): value is Buffer {
  return value instanceof Buffer;
}
export function isClass(value: unknown): value is Class {
  return isFunction(value) && value.toString().startsWith("class ");
}

export function isFunction<T extends FunctionType>(value: any): value is T {
  return typeof value === "function";
}

export function isNonPrimitive(x?: unknown): x is object {
  return !isPrimitive(x);
}

export const isNumber = (value: any): value is number =>
  typeof value === "number";

export const isNull = (value: unknown): value is null => value === null;

export function isObject(value: any): value is object {
  return toString(value) === "[object Object]";
}

export function isPrimitive(value?: unknown): value is Primitive {
  return [isNull, isUndefined, isString, isNumber, isBoolean, isSymbol, isBigint].some(function_ => function_(value));
}

export function isString(value: unknown): value is string {
  return typeof value === "string";
}

export function isSymbol(value: unknown): value is symbol {
  return typeof value === "symbol";
}

export const isUndefined = (value: unknown): value is undefined => {
  return value === undefined;
};

export function isRegExp(value: any): value is RegExp {
  return toString(value) === "[object RegExp]";
}

export const is = {
  isArray,
  isBoolean,
  isFunction,
  isNull,
  isNumber,
  isUndefined,
  isObject,
  isSymbol,
  isString,
  isBigint,
  isBuffer,
  isClass,
  isPrimitive,
  isNonPrimitive,
  isDate,
  isEmpty,
  isSameDate,
  isRegExp,
};
