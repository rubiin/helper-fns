import {
  isArray,
  isBigint,
  isBoolean,
  isDefined,
  isFunction,
  isNull,
  isNumber,
  isObject,
  isString,
} from '../src'

describe('isDefined', () => {
  test('should return true if value is defined', () => {
    expect(isDefined(1)).toBe(true)
    expect(isDefined('abc')).toBe(true)
    expect(isDefined()).toBe(false)
    expect(isDefined(undefined)).toBe(false)
  })
})

describe('isBoolean', () => {
  test('should return true if value is a boolean', () => {
    expect(isBoolean(true)).toBe(true)
    expect(isBoolean(false)).toBe(true)
    expect(isBoolean(0)).toBe(false)
    expect(isBoolean('true')).toBe(false)
  })
})

describe('isFunction', () => {
  test('should return true if value is a function', () => {
    expect(isFunction(() => {})).toBe(true)
    expect(isFunction(() => {})).toBe(true)
    expect(isFunction({})).toBe(false)
  })
})

describe('isNumber', () => {
  test('should return true if value is a number', () => {
    expect(isNumber(1)).toBe(true)
    expect(isNumber(0)).toBe(true)
    expect(isNumber(-1)).toBe(true)
    expect(isNumber('1')).toBe(false)
    expect(isNumber(null)).toBe(false)
    expect(isNumber(undefined)).toBe(false)
    expect(isNumber({})).toBe(false)
  })
})

describe('isString', () => {
  test('should return true if value is a string', () => {
    expect(isString('abc')).toBe(true)
    expect(isString('')).toBe(true)
    expect(isString(123)).toBe(false)
    expect(isString(null)).toBe(false)
    expect(isString(undefined)).toBe(false)
    expect(isString({})).toBe(false)
  })
})

describe('isObject', () => {
  test('should return true if value is an object', () => {
    expect(isObject({})).toBe(true)
    expect(isObject({ key: 'value' })).toBe(true)
    expect(isObject([])).toBe(false)
    expect(isObject(null)).toBe(false)
    expect(isObject(undefined)).toBe(false)
    expect(isObject('')).toBe(false)
  })
})

describe('isNull', () => {
  test('should return true if value is null', () => {
    expect(isNull(null)).toBe(true)
    expect(isNull(undefined)).toBe(false)
    expect(isNull('null')).toBe(false)
    expect(isNull({})).toBe(false)
    expect(isNull(0)).toBe(false)
  })
})

describe('isArray', () => {
  test('should return true if value is an array', () => {
    expect(isArray([])).toBe(true)
    expect(isArray([1, 2, 3])).toBe(true)
    // eslint-disable-next-line @typescript-eslint/no-array-constructor
    expect(isArray(new Array())).toBe(true) // Array constructor
    expect(isArray({})).toBe(false)
    expect(isArray(null)).toBe(false)
    expect(isArray(undefined)).toBe(false)
    expect(isArray('')).toBe(false)
    expect(isArray(123)).toBe(false)
  })

  test('should return true if value is an array of specific type', () => {
    expect(isArray<number>([1, 2, 3])).toBe(true)
    expect(isArray<string>(['a', 'b', 'c'])).toBe(true)
    expect(isArray<boolean>([true, false])).toBe(true)
    expect(isArray<number>('')).toBe(false)
    expect(isArray<string>([])).toBe(true)
  })
})

describe('isBigint', () => {
  test('should return true if value is a bigint', () => {
    expect(isBigint(BigInt(123))).toBe(true)
    expect(isBigint(BigInt(0))).toBe(true)
    expect(isBigint(BigInt(-123))).toBe(true)
    expect(isBigint(123)).toBe(false)
    expect(isBigint('123')).toBe(false)
    expect(isBigint(null)).toBe(false)
    expect(isBigint(undefined)).toBe(false)
    expect(isBigint({})).toBe(false)
  })
})
