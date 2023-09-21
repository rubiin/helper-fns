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
export function isError(value: unknown): value is Error {
  return value instanceof Error;
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
 * The `isDecimal` function checks if a given value is a decimal number with a specified number of
 * decimal places.
 * @param value - The `value` parameter can be either a string or a number. It
 * represents the value that you want to check if it is a decimal number.
 * @param [options] - The `options` parameter is an optional object that can contain the following
 * property:
 * @param options.decimalPlaces - The `decimalPlaces` property is an optional string that
 * @returns a boolean value.
 */
export function isDecimal(value: string | number, options?: { decimalPlaces?: string }): boolean {
  if (typeof value === "number")
    value = value.toString();

  const decimalPlaces = (options?.decimalPlaces) || "1,";
  return new RegExp(`^[-+]?([0-9]+)?(\\.[0-9]{${decimalPlaces}})$`).test(value);
}

/**
 *
 * @param value - The value to check.
 * @returns - Returns `true` if `value` is a class, else `false`.
 */
export function isFloat(value: number): value is number {
  return value !== (Math.trunc(value));
}

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
  isError,
  isSameDate,
  isRegExp,
};
