import type { Buffer } from 'node:buffer'
import { toString } from './base'
import { isDate, isEmpty, isNotEmpty, isSameDate } from './function.utils'
import { Class } from "./types"

export function isDefined<T = any>(val?: T): val is T {
  return typeof val !== 'undefined'
}
export const isBoolean = (val: any): val is boolean => typeof val === 'boolean'
export function isFunction<T extends Function>(val: any): val is T {
  return typeof val === 'function'
}
export const isNumber = (val: any): val is number => typeof val === 'number'
export function isString(val: unknown): val is string {
  return typeof val === 'string'
}
export function isObject(val: any): val is object {
  return toString(val) === '[object Object]'
}

export const isNull = (value: unknown): value is null => value === null

export function isArray<T>(value: unknown): value is T[] {
  return Array.isArray(value)
}
export function isBigint(value: unknown): value is bigint {
  return typeof value === 'bigint'
}

export function isBuffer(value: unknown): value is Buffer {
  return (value as any)?.constructor?.isBuffer?.(value) ?? false
}
export function isClass(value: unknown): value is Class {
  return isFunction(value) && value.toString().startsWith('class ')
}

export const is = {
  isArray,
  isBoolean,
  isDefined,
  isFunction,
  isNull,
  isNumber,
  isObject,
  isString,
  isBigint,
  isBuffer,
  isClass,
  isDate,
  isEmpty,
  isNotEmpty,
  isSameDate,
}
