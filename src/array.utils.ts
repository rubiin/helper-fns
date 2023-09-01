/**
 * It returns an array of unique values from two arrays.
 * @param a - T[]
 * @param b - T[]
 * @param [duplicates=true] - boolean
 * @returns [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 */
export function union<T = unknown>(a: T[], b: T[], duplicates = true): T[] {
  if (!duplicates) return [...new Set([...a, ...b])];

  return [...a, ...b];
}

/**
 * It returns an array of all the elements in the first array that are not in the second array
 * @param {T[]} a - T[] - The first array to compare
 * @param {T[]} b - T[]
 * @returns The difference between two arrays.
 */
export function difference<T = unknown>(a: T[], b: T[]): T[] {
  return a.filter(c => !b.includes(c));
}

/**
 * It takes two arrays and returns an array of the elements that are common to both
 * @param {T[]} a - T[] - The first array to compare
 * @param {T[]} b - T[]
 * @returns The common elements of the two arrays.
 */
export function common<T = unknown>(a: T[], b: T[]): T[] {
  return a.filter(c => b.includes(c));
}

/**
 * It takes an array of arrays and returns a new array with all the elements flattened
 * @param {unknown[]} array - The array to flatten.
 * @returns [1, 2, 3, 4, 5, 6]
 */
export function flattenDeep(array: unknown[]): unknown[] {
  return array.flat(Number.POSITIVE_INFINITY);
}

/**
 * Return an iterable of unique values from the given iterable.
 * @param values - Iterable<T>
 * @returns [...new Set(values)]
 */
export function unique<T = unknown>(values: Iterable<T>): Iterable<T> {
  return [...new Set(values)];
}

/**
 * It takes an array of numbers and an optional initial value, and returns the sum of the array
 * @param arr - The array to be reduced.
 * @param [initialValue=0] - The initial value of the accumulator.
 * @returns [1, 2, 3, 4, 5]
 */
export function sumOfAnArray(array: number[], initialValue = 0): number {
  return array.reduce((a, b) => a + b, initialValue);
}

/**
 * It returns a new array with the last n elements removed
 * @param arr - The array to query.
 * @param n - The number of elements to drop from the end of the array.
 * @returns [1, 2, 3, 4, 5]
 */
export function dropRight<T = unknown>(array: T[], n = 1): T[] {
  return array.slice(0, -n);
}

/**
 * It returns the difference between two arrays.
 * @param {unknown[]} a - unknown[]
 * @param {unknown[]} b - unknown[]
 * @returns The difference between the two arrays.
 */
export function intersection(a: unknown[], b: unknown[]) {
  const s = new Set(b);
  return a.filter(x => s.has(x));
}

/**
 * Drop the first element of an array while the function returns true.
 * @param {string | T[]} array - string | any[]
 * @param func - (arg0: any) => any
 * @returns The array after the first element that does not pass the test.
 */
export function dropWhile<T>(
  array: T[],
  function_: (argument: T) => boolean,
): T[] {
  const index = array.findIndex(item => !function_(item));
  return index === -1 ? [] : array.slice(index);
}

/**
 * Drop() returns a copy of the array with n elements removed from the left.
 * @param {string | T[]} arr - The array to query.
 * @param [n=1] - The number of elements to drop from the beginning of the array.
 * Also known as dropLeft.
 */
export const drop = <T = unknown>(array: string | T[], n = 1) => array.slice(n);

/**
 * Shuffle the elements array and return it. (mutative)
 *
 */
export function shuffle<T>(array: T[]): T[] {
  let m = array.length;
  // While there remain elements to shuffle…
  while (m > 0) {
    // Pick a remaining element…
    const index = Math.floor(Math.random() * m--);
    // And swap it with the current element.
    const t = array[m];
    array[m] = array[index];
    array[index] = t;
  }
  return array;
}

/**
 * Move element in an Array
 *
 * @category Array
 * @param arr
 * @param from
 * @param to
 */
export function move<T>(array: T[], from: number, to: number) {
  array.splice(to, 0, array.splice(from, 1)[0]);
  return array;
}

/**
 * Get random item(s) from an array
 *
 * @param arr
 * @param quantity - quantity of random items which will be returned
 */
export function sample<T>(array: T[], quantity: number) {
  return Array.from(
    { length: quantity },
    _ => array[Math.round(Math.random() * (array.length - 1))],
  );
}
