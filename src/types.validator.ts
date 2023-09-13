import { Buffer } from "node:buffer";
import type { Class, FunctionType, Primitive } from "./types";
import { toString } from "./base";
import { isDate, isEmpty, isSameDate } from "./function.utils";

/**
 *
 * @param value - The value to check.
 * @returns - Returns `true` if `value` is a class, else `false`.
 */
export function isArray<T>(value: unknown): value is T[] {
  return Array.isArray(value);
}

/**
 *
 * @param value - The value to check.
 * @returns - Returns `true` if `value` is a class, else `false`.
 */
export function isBigint(value: unknown): value is bigint {
  return typeof value === "bigint";
}
/**
 *
 * @param value - The value to check.
 * @returns - Returns `true` if `value` is a class, else `false`.
 */
export const isBoolean = (value: unknown): value is boolean =>
  typeof value === "boolean";

/**
 *
 * @param value - The value to check.
 * @returns - Returns `true` if `value` is a class, else `false`.
 */
export function isBuffer(value: unknown): value is Buffer {
  return value instanceof Buffer;
}
/**
 *
 * @param value - The value to check.
 * @returns - Returns `true` if `value` is a class, else `false`.
 */
export function isClass(value: unknown): value is Class {
  return isFunction(value) && value.toString().startsWith("class ");
}

/**
 *
 * @param value - The value to check.
 * @returns - Returns `true` if `value` is a class, else `false`.
 */
export function isFunction<T extends FunctionType>(value: unknown): value is T {
  return typeof value === "function";
}

/**
 *
 * @param value - The value to check.
 * @returns - Returns `true` if `value` is a class, else `false`.
 */
export function isNonPrimitive(value?: unknown): value is object {
  return !isPrimitive(value);
}

/**
 *
 * @param value - The value to check.
 * @returns - Returns `true` if `value` is a class, else `false`.
 */
export const isNumber = (value: unknown): value is number =>
  typeof value === "number";

/**
 *
 * @param value - The value to check.
 * @returns - Returns `true` if `value` is a class, else `false`.
 */
export const isNull = (value: unknown): value is null => value === null;

/**
 *
 * @param value - The value to check.
 * @returns - Returns `true` if `value` is a class, else `false`.
 */
export function isObject(value: unknown): value is object {
  return toString(value) === "[object Object]";
}

/**
 *
 * @param value - The value to check.
 * @returns - Returns `true` if `value` is a class, else `false`.
 */
export function isPrimitive(value?: unknown): value is Primitive {
  return [
    isNull,
    isUndefined,
    isString,
    isNumber,
    isBoolean,
    isSymbol,
    isBigint,
  ].some(function_ => function_(value));
}

/**
 *
 * @param value - The value to check.
 * @returns - Returns `true` if `value` is a class, else `false`.
 */
export function isString(value: unknown): value is string {
  return typeof value === "string";
}

/**
 *
 * @param value - The value to check.
 * @returns - Returns `true` if `value` is a class, else `false`.
 */
export function isSymbol(value: unknown): value is symbol {
  return typeof value === "symbol";
}

/**
 *
 * @param value - The value to check.
 * @returns - Returns `true` if `value` is a class, else `false`.
 */
export const isUndefined = (value: unknown): value is undefined => {
  return value === undefined;
};

/**
 *
 * @param value - The value to check.
 * @returns - Returns `true` if `value` is a class, else `false`.
 */
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
