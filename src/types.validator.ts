import { Buffer } from "node:buffer";
import type { Class, FunctionType, Primitive } from "./types";
import { toString } from "./base";
import { isDate, isEmpty, isSameDate } from "./function.utils";

/**
 *
 * @param value - unknown
 * @returns boolean
 */
export function isArray<T>(value: unknown): value is T[] {
  return Array.isArray(value);
}

/**
 *
 * @param value - unknown
 * @returns boolean
 */
export function isBigint(value: unknown): value is bigint {
  return typeof value === "bigint";
}

export const isBoolean = (value: any): value is boolean =>
  typeof value === "boolean";

/**
 *
 * @param value - unknown
 * @returns boolean
 */
export function isBuffer(value: unknown): value is Buffer {
  return value instanceof Buffer;
}
/**
 *
 * @param value - unknown
 * @returns boolean
 */
export function isClass(value: unknown): value is Class {
  return isFunction(value) && value.toString().startsWith("class ");
}

/**
 *
 * @param value - unknown
 * @returns boolean
 */
export function isFunction<T extends FunctionType>(value: any): value is T {
  return typeof value === "function";
}

/**
 *
 * @param value - unknown
 * @returns boolean
 */
export function isNonPrimitive(value?: unknown): value is object {
  return !isPrimitive(value);
}

/**
 *
 * @param value - unknown
 * @returns boolean
 */
export const isNumber = (value: unknown): value is number =>
  typeof value === "number";

export const isNull = (value: unknown): value is null => value === null;

/**
 *
 * @param value - unknown
 * @returns boolean
 */
export function isObject(value: unknown): value is object {
  return toString(value) === "[object Object]";
}

/**
 *
 * @param value - unknown
 * @returns boolean
 */
export function isPrimitive(value?: unknown): value is Primitive {
  return [isNull, isUndefined, isString, isNumber, isBoolean, isSymbol, isBigint].some(function_ => function_(value));
}

/**
 *
 * @param value - unknown
 * @returns boolean
 */
export function isString(value: unknown): value is string {
  return typeof value === "string";
}

/**
 *
 * @param value - unknown
 * @returns boolean
 */
export function isSymbol(value: unknown): value is symbol {
  return typeof value === "symbol";
}

/**
 *
 * @param value - unknown
 * @returns boolean
 */
export const isUndefined = (value: unknown): value is undefined => {
  return value === undefined;
};

/**
 *
 * @param value - unknown
 * @returns boolean
 */
export function isRegExp(value: unknown): value is RegExp {
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
