/**
 * The `assert` const in TypeScript throws an error with a given message if a given condition is not
 * true.
 * @param condition - A boolean value that represents the condition that needs to be checked.
 * If the condition is false, an error will be thrown.
 * @param message - The `message` parameter is a string that represents the error message that
 * will be thrown if the `condition` is not met.
 */
export function assert(condition: boolean, message: string): asserts condition {
  if (!condition)
    throw new Error(message);
}

/**
 * The const `noop` does nothing and serves as a placeholder.
 */

export function noop() {}

/**
 * The const "toString" returns the string representation of the type of the input value.
 * @param v - The parameter "v" is of type "any", which means it can accept any type of value.
 * @returns - The return value is a string that represents the type of the input value.
 */
export const toString = (v: any) => Object.prototype.toString.call(v);
