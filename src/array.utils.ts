/**
 * The `castArray` const takes a value and returns it as an array, either by wrapping it in an array
 * if it is not already an array, or by returning the original array if it is already an array.
 * @param value - The `value` parameter can be of type `T` or `T[]`. It means that it can
 * either be a single value of type `T` or an array of values of type `T`.
 * @returns The const `castArray` returns an array.
 */
export const castArray = <T>(value: T | T[]) => {
  return Array.isArray(value) ? value : [value];
};

/**
 * The `chunk` const takes an array and a size, and returns a new array with subarrays of the
 * specified size.
 * @param array - The `array` parameter is an array of elements that you want to chunk into
 * smaller arrays.
 * @param size - The `size` parameter in the `chunk` const represents the desired size of
 * each chunk or subarray. It determines how many elements should be included in each chunk when
 * splitting the original array.
 * @returns an array of arrays, where each inner array contains a chunk of the original array.
 */
export const chunk = <T = unknown>(array: T[], size: number): T[][] => {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
    array.slice(index * size, index * size + size),
  );
};

/**
 * It takes two arrays and returns an array of the elements that are common to both
 * @param a - T[] - The first array to compare
 * @param b - T[]
 * @returns The common elements of the two arrays.
 */
export const common = <T = unknown>(a: T[], b: T[]): T[] => {
  return a.filter(c => b.includes(c));
};

/**
 * The `compact` const removes falsy values from an array.
 * @param array - An array of elements of type T.
 * @returns The `compact` const returns a new array that contains only the truthy values from the
 * input array.
 */
export const compact = <T>(array: T[]): T[] => {
  return array.filter(Boolean);
};

/**
 * It returns an array of all the elements in the first array that are not in the second array
 * @param a - T[] - The first array to compare
 * @param b - T[]
 * @returns The difference between two arrays.
 */
export const difference = <T = unknown>(a: T[], b: T[]): T[] => {
  return a.filter(c => !b.includes(c));
};

/**
 * Drop() returns a copy of the array with n elements removed from the left.
 * @param array - The array to query.
 * @param [n] - The number of elements to drop from the beginning of the array.
Also known as dropLeft.
 * @returns [1, 2, 3, 4, 5]
 */
export const drop = <T = unknown>(array: string | T[], n = 1) => array.slice(n);

/**
 * Drop the first element of an array while the const returns true.
 * @param array - T[] - The array to query.
 * @param const_ - : (argument: T) => boolean - The function invoked per iteration.
 * @returns The array after the first element that does not pass the test.
 */
export const dropWhile = <T>(
  array: T[],
  const_: (argument: T) => boolean,
): T[] => {
  const index = array.findIndex(item => !const_(item));
  return index === -1 ? [] : array.slice(index);
};

/**
 * It returns a new array with the last n elements removed
 * @param array - The array to query.
 * @param n - The number of elements to drop from the end of the array.
 * @returns [1, 2, 3, 4, 5]
 */
export const dropRight = <T = unknown>(array: T[], n = 1): T[] => {
  return array.slice(0, -n);
};

/**
 * The `equals` const checks if two arrays are equal by comparing their lengths and elements.
 * @param a - An array of type T.
 * @param b - The parameter `b` is an array of type `T`.
 * @returns a boolean value.
 */
export const equals = <T = unknown>(a: T[], b: T[]): boolean => {
  return a.length === b.length && a.every((v, index) => v === b[index]);
};

/**
 * The const `equalsIgnoreOrder` checks if two arrays have the same elements, regardless of their
 * order.
 * @param a - An array of elements of type T.
 * @param b - b is an array of type T.
 * @returns The const `equalsIgnoreOrder` returns a boolean value. It returns `true` if the arrays
 * `a` and `b` are equal in terms of their elements, ignoring the order of the elements. It returns
 * `false` if the arrays have different lengths or if they have different counts of any element.
 */
export const equalsIgnoreOrder = <T>(a: T[], b: T[]) => {
  if (a.length !== b.length) return false;
  const uniqueValues = new Set([...a, ...b]);
  for (const v of uniqueValues) {
    const aCount = a.filter(element => element === v).length;
    const bCount = b.filter(element => element === v).length;
    if (aCount !== bCount) return false;
  }
  return true;
};

/**
 * The const checks if an array has any duplicate elements.
 * @param a - a is an array of type T.
 * @returns a boolean value. It returns `true` if the input array `a` contains any duplicate elements,
 * and `false` otherwise.
 */
export const hasDuplicates = <T>(a: T[]): boolean => {
  return new Set(a).size !== a.length;
};

/**
 * The `fill` const takes an array, a value, a start index, and an end index, and returns a new
 * array with the specified range filled with the given value.
 * @param array - The `array` parameter is an array of elements of type `T`.
 * @param value - The `value` parameter represents the value that will be used to fill the array.
 * It can be of any type (`T`) and will be used to replace the elements in the specified range of the
 * array.
 * @param [start] - The `start` parameter is the index at which the filling should start. It is an
 * optional parameter and its default value is 0, which means the filling will start from the beginning
 * of the array if no value is provided for `start`.
 * @param end - The "end" parameter is the index at which the filling should stop. By default, it is
 * set to the length of the array, which means the filling will continue until the end of the array.
 * @returns The `fill` const returns an array of the same type as the input array `array`. The
 * elements in the returned array are the same as the elements in the input array, except for the
 * elements between the `start` and `end` indices (inclusive), which are replaced with the `value`
 * parameter.
 */
export const fill = <T = unknown>(
  array: T[],
  value: T,
  start = 0,
  end = array.length,
): T[] => {
  return array.map((item, index) =>
    index >= start && index < end ? value : item,
  );
};

/**
 * It takes an array of arrays and returns a new array with all the elements flattened
 * @param array - The array to flatten.
 * @returns [1, 2, 3, 4, 5, 6]
 */
export const flattenDeep = (array: unknown[]): unknown[] => {
  return array.flat(Number.POSITIVE_INFINITY);
};

/**
 * It returns the difference between two arrays.
 * @param a - unknown[]
 * @param b - unknown[]
 * @returns The difference between the two arrays.
 */
export const intersection = (a: unknown[], b: unknown[]): unknown[] => {
  const s = new Set(b);
  return a.filter(x => s.has(x));
};

/**
 * Move element in an Array
 * @param array - T[]
 * @param from - number
 * @param to - number
 * @returns [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 */
export const move = <T>(array: T[], from: number, to: number): T[] => {
  array.splice(to, 0, array.splice(from, 1)[0]);
  return array;
};

/**
 * Get random item(s) from an array
 * @param array - T[]
 * @param quantity - quantity of random items which will be returned
 * @returns [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 */
export const sample = <T>(array: T[], quantity: number): T[] => {
  return Array.from(
    { length: quantity },
    _ => array[Math.round(Math.random() * (array.length - 1))],
  );
};

/**
 * Shuffle the elements array and return it. (mutative)
 * @param array - T[]
 * @returns [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 */
export const shuffle = <T>(array: T[]): T[] => {
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
};

/**
 * It takes an array of numbers and an optional initial value, and returns the sum of the array
 * @param array - The array to be reduced.
 * @param initialValue - The initial value of the accumulator.
 * @returns [1, 2, 3, 4, 5]
 */
export const sumOfAnArray = (array: number[], initialValue = 0): number => {
  return array.reduce((a, b) => a + b, initialValue);
};

/**
 * Return an iterable of unique values from the given iterable.
 * @param values - Iterable<T>
 * @returns [...new Set(values)]
 */
export const unique = <T = unknown>(values: Iterable<T>): Iterable<T> => {
  return [...new Set(values)];
};

/**
 * It returns an array of unique values from two arrays.
 * @param a - T[]
 * @param b - T[]
 * @param [duplicates] - boolean
 * @returns [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 */
export const union = <T = unknown>(a: T[], b: T[], duplicates = true): T[] => {
  if (!duplicates) return [...new Set([...a, ...b])];

  return [...a, ...b];
};

/**
 * The `range` const in TypeScript returns an array of numbers from 0 to the specified length.
 * @param length - The `length` parameter is a number that represents the desired length of
 * the range.
 * @returns an array of numbers from 0 to `length - 1`.
 */
export const range = (length: number): number[] => {
  return [...Array.from({ length }).keys()];
};
