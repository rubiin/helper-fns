/* eslint-disable no-console */
/* eslint-disable unicorn/prevent-abbreviations */
import crypto from "node:crypto";
import fs from "node:fs";
import { Buffer } from "node:buffer";
import type {
  IDebounceOptions,
  IEncryptOptions,
  IRandomStringOptions,
  ISlugifyOptions,
} from "./interface";
import { isString } from "./types.validator";

const DOT_REG = /\./g;

/**
 * It returns true if the object is empty, false if it's not
 * @param {any} obj - any
 * @returns A function that takes in an object and returns a boolean.
 */
export function isEmpty(object: { [s: string]: unknown } | ArrayLike<unknown>): boolean {
  return (
    (typeof object === "object" || Array.isArray(object))
    && Object.entries(object || {}).length === 0
  );
}

/**
 * It takes an object and returns a new object with all the null values removed
 * @param {Record<string, any>} obj - Record<string, any>
 * @returns An object with all the keys and values that are not null.
 */
export function removeNull(object: Record<string, any>) {
  const newObject: Record<string, any> = {};

  for (const [k, v] of Object.entries(object)) {
    if (v !== null)
      newObject[k] = v;
  }

  return newObject;
}

/**
 * It takes an object and an array of keys, and returns a new object with only those keys
 * @param {T} obj - T - the object to pick properties from
 * @param {K[]} keys - K[]
 * @returns Pick<T, K>
 */
export function pick<T, K extends keyof T>(object: T, keys: K[]): Pick<T, K> {
  const returnValue: Pick<T, K> = {} as Pick<T, K>; // Initialize with an empty object

  for (const key of keys)
    returnValue[key] = object[key];

  return returnValue;
}

/**
 * It takes any number of arguments, and returns a stringified version of those arguments
 * @param {any[]} args - The arguments passed to the resolver.
 * @returns A stringified version of the arguments passed in.
 */
export function resolverArgs(...arguments_: any[]): string {
  return JSON.stringify(arguments_);
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
 * Return an iterable of unique values from the given iterable.
 * @param values - Iterable<T>
 * @returns [...new Set(values)]
 */
export function unique<T = unknown>(values: Iterable<T>): Iterable<T> {
  return [...new Set(values)];
}

/**
 * It takes an object and an array of keys, and returns a new object with the keys omitted
 * @param {T} obj - T - the object to omit keys from
 * @param {K[]} keys - K[]
 * @returns { a: 1, b: 2 }
 */
export function omit<T extends object, K extends keyof T>(
  object: T,
  keys: K[],
): Omit<T, K> {
  const omitted = { ...object };
  for (const key of keys) delete omitted[key];
  return omitted;
}

/**
 * It sorts an array of objects by a list of properties, in the order specified
 * @param {any} arr - The array to sort
 * @param {any[]} props - The properties to sort by.
 * @param orders - An array of strings that specifies the order of sorting.
 */
export function orderBy<T extends object, K extends keyof T>(
  array: T[],
  properties: K[],
  orders: Map<number, "asc" | "desc">,
) {
  array.sort((a, b) => {
    for (const [i, property] of properties.entries()) {
      const order = orders.get(i) || "asc";

      const p1 = a[property];
      const p2 = b[property];

      if (p1 !== p2)
        return order === "asc" ? (p1 > p2 ? 1 : -1) : (p1 < p2 ? 1 : -1);
    }
    return 0;
  });
}

/**
 * Pipe takes a list of functions and returns a function that takes an input and returns the input
 * after it has been passed through all the functions in the list.
 * @param {any[]} fns - any[] - an array of functions
 */
export function pipe<T>(...fns: ((input: T) => T)[]): (input: T) => T {
  return (input: T) => {
    let result = input;
    for (const fn of fns)
      result = fn(result);

    return result;
  };
}

/**
 * Pluck takes an array of objects and returns an array of the values of a certain property in each
 * object
 * @param {any[]} arr - any[] - the array we want to pluck from
 * @param {string | number} key - string | number
 * @returns [1, 2, 3]
 */
export function pluck<T, K extends keyof T>(array: T[], key: K): T[K][] {
  return array.map(item => item[key]);
}

/**
 * It takes an object and a map of keys to new keys, and returns a new object with the keys renamed
 * according to the map, while keeping the values intact
 * @param keysMap - Record<string, any>
 * @param obj - The object to be renamed
 */
export function renameKeys(
  keysMap: Record<string, any>,
  object: Record<string, any>,
) {
  Object.fromEntries(Object.keys(object).map(
    key => [keysMap[key] || key, object[key]],
  ));
}

/**
 * "It takes an array of objects and returns an array of the values of a specific attribute of those
 * objects."
 *
 * Here's an example of how to use it:
 * @param objectArray - The array of objects you want to convert.
 * @param {string} attr - The attribute of the object you want to extract.
 * @returns An array of the values of the attribute passed in.
 */

export function objectArrayToArray<T>(objectArray: T[], attribute: keyof T): T[keyof T][] {
  return objectArray.map(element => element[attribute]);
}

/**
 * It takes a number and returns a number with a fixed number of decimal places
 * @param {number} num - The number to be fixed.
 * @param [fixed=2] - The number of decimal places to round to.
 * @returns A function that takes a number and a fixed number and returns a number.
 */
export function fixedDecimal(number_: number, fixed = 2): number {
  const re = new RegExp(`^-?\\d+(?:.\\d{0,${fixed || -1}})?`);

  return Number.parseFloat(number_.toString().match(re)![0]);
}

/**
 * It takes a string and returns a string, number, or boolean
 * @param {string} val - string - the value to be parsed
 */
export function autoParseValues(value: string): any {
  // check for boolean
  if (!!JSON.parse(value) === JSON.parse(value))
    return JSON.parse(value);
  else if (!Number.isNaN(Number(value)))
    return Number.parseFloat(value);

  // Return a default value when no conditions are met
  return value;
}
/**
 * The function "chop" removes leading and trailing special characters, punctuation, and whitespace
 * from a string.
 * @param {unknown} str - The parameter `str` is of type `unknown`, which means it can be any type.
 * @returns a string.
 */

export function chop(string_: unknown) {
  if (!isString(string_))
    return "";
  const re = /^[\W_]+|[\W_]+$/g;
  return string_.trim().replaceAll(re, "");
}

/**
 * It takes an array of arrays and returns a new array with all the elements flattened
 * @param {unknown[]} arr - The array to flatten.
 * @returns [1, 2, 3, 4, 5, 6]
 */
export function flattenDeep(array: unknown[]): unknown[] {
  return array.flat(Number.POSITIVE_INFINITY);
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
 * If the string exists, return the first character capitalized and the rest of the string lowercase,
 * otherwise return an empty string.
 * @param {string} string_ - string - This is the string that we want to capitalize.
 * @returns A function that takes a string and returns a string.
 */
export function capitalize(string_: string): string {
  return string_ ? string_.charAt(0).toUpperCase() + string_.slice(1).toLowerCase() : "";
}

/**
 * "If the function is called again before the timeout is up, reset the timeout and return. Otherwise,
 * call the function."
 *
 * The function takes an options object with two properties:
 *
 * func: The function to be called
 * wait: The number of milliseconds to wait before calling the function
 * The function returns a function that can be called at any time. If the function is called again
 * before the timeout is up, the timeout is reset. If the timeout is up, the function is called
 * @param {IDebounceOptions} options - IDebounceOptions
 * @returns A function that will be called later.
 */
export function debounce(options: IDebounceOptions) {
  let timeout: any;

  return function (this: any, ...arguments_: any[]) {
    const { immediate, func, wait } = options;

    const later = () => {
      timeout = undefined;
      if (!immediate)
        func.apply(this, arguments_);
    };

    const callNow = immediate && !timeout;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow)
      func.apply(this, arguments_);
  };
}

/**
 * It takes a callback function as an argument and returns the time taken to execute that function
 * @param {Function} callback - Function - The function to be executed.
 * @returns [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 */
export function timeTaken<T>(callback: () => T): [T, number] {
  console.time("timeTaken");
  const result = callback();
  console.timeEnd("timeTaken");
  return [result, performance.now()];
}

/**
 * It replaces all instances of &amp;, &lt;, &gt;, &#39;, and &quot; with their respective HTML
 * entities
 * @param {string} str - The string to unescape.
 * @returns the string with the tags replaced with the corresponding characters.
 */

export function unescapeHTML(string_: string): string {
  return string_.replaceAll(
    /&amp;|&lt;|&gt;|&#39;|&quot;/g,
    tag =>
      ({
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&#39;": "'",
        "&quot;": '"',
      }[tag] || tag),
  );
}

/**
 * It takes a number of milliseconds, converts it to an object with properties for days, hours,
 * minutes, seconds, and milliseconds, filters out any values which are zero, then formats each time
 * segment as a string
 * @param {number} ms - The number of milliseconds to be formatted as a human readable string.
 * @returns A function that takes a number and returns a string.
 */
export function formatDuration(ms: number): string {
  if (ms < 0)
    ms = -ms;
  const time = {
    day: Math.floor(ms / 86_400_000),
    hour: Math.floor(ms / 3_600_000) % 24,
    minute: Math.floor(ms / 60_000) % 60,
    second: Math.floor(ms / 1000) % 60,
    millisecond: Math.floor(ms) % 1000,
  };
  return Object.entries(time)
    .filter(value => value[1] !== 0)
    .map(([key, value]) => `${value} ${key}${value === 1 ? "" : "s"}`)
    .join(", ");
}

/**
 * "Replace every word in a string with a capitalized version of that word."
 *
 * The first thing we do is use the replace() method to replace every word in the string with a
 * capitalized version of that word
 * @param {string} str - string - The string to be capitalized.
 * @returns A function that takes a string as an argument and returns a string with every word
 * capitalized.
 */

export function capitalizeEveryWord(string_: string): string {
  return string_.replaceAll(/\b[a-z]/g, char => char.toUpperCase());
}

/**
 * If the string exists, return the first character of the string in lowercase, followed by the rest of
 * the string. Otherwise, return an empty string.
 * @param {string} str - string - the string to be converted
 * @returns The first character of the string is being converted to lowercase and then concatenated
 * with the rest of the string.
 */
export function lowerFirst(string_: string): string {
  return string_ ? string_.charAt(0).toLowerCase() + string_.slice(1) : "";
}

/**
 * It returns an array of unique values from two arrays.
 * @param a - T[]
 * @param b - T[]
 * @param [duplicates=true] - boolean
 * @returns [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 */
export function union<T = unknown>(a: T[], b: T[], duplicates = true): T[] {
  if (!duplicates)
    return [...new Set([...a, ...b])];

  return [...a, ...b];
}

/**
 * It returns true if the dateString parameter is a valid date, and false if it's not
 * @param {string} dateString - The string to be tested.
import crypto from 'crypto'
import fs from 'fs'

interface IEncryptOptions {
  config: {
    key: string
    iv: string
  }
  text: string
}

/**
 * @returns A boolean value.
 */
export function isDate(dateString: string): boolean {
  return new Date(dateString) instanceof Date;
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
 * It takes a string, encrypts it, and returns the encrypted string
 * @param options - IEncryptOptions
 * @returns The encrypted text
 */
export function encrypt(options: IEncryptOptions): string {
  const ENC_KEY = Buffer.from(options.config.key, "hex"); // set random encryption key
  const IV = Buffer.from(options.config.iv, "hex"); //
  const cipher = crypto.createCipheriv("aes-256-cbc", ENC_KEY, IV);
  let encrypted = cipher.update(options.text, "utf8", "base64");
  encrypted += cipher.final("base64");
  return encrypted;
}

/**
 * It takes an enum and returns an array of strings
 * @param _enum - The enum you want to convert to a string array.
 * @returns An array of strings
 */

export function enumToString<T extends Record<string, string>>(_enum: T): string {
  return Object.keys(_enum)
    .map(key => _enum[key])
    .join(",");
}

/**
 * It takes an object with a config property and a text property, and returns the decrypted text
 * @param options - IEncryptOptions
 * @returns The decrypted text.
 */
export function decrypt(options: IEncryptOptions): string {
  const ENC_KEY = Buffer.from(options.config.key, "hex"); // set random encryption key
  const IV = Buffer.from(options.config.iv, "hex"); // set random initialization vector

  const decipher = crypto.createDecipheriv("aes-256-cbc", ENC_KEY, IV);
  const decrypted = decipher.update(options.text, "base64", "utf8");
  return decrypted + decipher.final("utf8");
}

/**
 * It reads a file and returns a promise that resolves to the file's contents
 * @param path - The path to the file you want to read.
 * @returns A promise that resolves to the contents of the file at the given path.
 */
export function readFile(path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(path, { encoding: "utf8" }, (error, html) => {
      if (error)
        reject(error);
      else resolve(html);
    });
  });
}

/**
 * "Return a random number between a and b, inclusive."
 *
 * The function takes two optional parameters, a and b, and returns a random number between them. If a
 * and b are omitted, the function returns a random number between 1 and 9
 * @param a - The lower bound of the random number.
 * @param b - The upper bound of the random number to be generated.
 * @returns A random number between a and b.
 */
export function randomNumber(a = 1, b = 9): number {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
}

/**
 * It creates an array of size 'size' and then maps each element to a random hexadecimal number and
 * then joins them all together
 * @param size - The number of characters you want in your hex string.
 */

export function randomHex(size: number): string {
  return Array.from({ length: size })
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("");
}

/**
 * It takes a string and replaces all instances of a given identifier with a random number
 * @param str - The string to be replaced.
 * @param identifier - The string that will be replaced with a random number.
 * @returns A function that takes a string and an identifier and returns a string with the identifier
 * replaced with a random number.
 */
export function orderedToken(identifier = "X") {
  return function (string_: string): string {
    while (string_.includes(identifier))
      string_ = string_.replace(identifier, String(randomNumber()));

    return string_;
  };
}

/**
 * Return the string after the first occurrence of the given substring.
 * @param str - The string to search in
 * @param substr - The substring to search for.
 * @returns The string after the first occurrence of the given substring.
 */
export function strAfter(string_: string, substr: string): string {
  return string_.split(substr)[1];
}

/**
 * Return the part of the string before the first occurrence of the given substring.
 * @param str - The string to search in
 * @param substr - The substring to search for.
 * @returns The string before the first instance of the substring.
 */
export function strBefore(string_: string, substr: string): string {
  return string_.split(substr)[0];
}
/**
 * It creates a new instance of the same type as the given instance, copies all the properties of the
 * given instance to the new instance, and returns the new instance
 * @param instance - The instance to clone.
 * @returns A new instance of the same class as the instance passed in.
 */
export function copyObject(instance: object): object {
  const copy = {};

  Object.assign(copy, instance);

  return copy;
}

/**
 *
 *
 * @export
 * @param {any[]} arr
 * @param {(string | number)} fn
 * @returns any[]
 */

export function groupBy(array: any[], property: string): Record<string, any[]> {
  const groups: Record<string, any[]> = {};

  for (const item of array) {
    const propValue = item[property];

    if (!groups[propValue])
      groups[propValue] = [];

    groups[propValue].push(item);
  }

  return groups;
}

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
 * Remove all dots from the email address, remove everything after the plus sign, and convert the email
 * address to lowercase.
 * @param {string} email - The email address to normalize.
 * @returns A function that takes an email and returns a normalized email.
 */
export function normalizeEmail(email: string): string {
  const [name, host] = email.split("@");
  let [beforePlus] = name.split("+");
  beforePlus = beforePlus.replaceAll(DOT_REG, "");
  const result = `${beforePlus.toLowerCase()}@${host.toLowerCase()}`;
  Number(result);
  return result;
}

/**
 *
 *
 * @export
 * @param {string} str
 * @param {ISlugifyOptions} [options={ lowercase: true, separator: '-', trim: true }]
 * @return {*}  {string}
 */

export function slugify(string_: string, options?: ISlugifyOptions): string {
  const { separator = "-" } = options || {};

  return string_
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replaceAll(/[\u0300-\u036F]/g, "")
    .replaceAll(/[^\d a-z-]/g, "")
    .replaceAll(/\s+/g, separator);
}

/**
 *
 * Clear undefined fields from an object. It mutates the object
 *
 * @export
 * @template T
 * @param {T} obj
 * @return {*}  {T}
 */
export function clearUndefined<T extends Record<string, any>>(object: T): T {
  for (const key in object) {
    if (object[key] === undefined)
      delete object[key];
  }

  return object;
}

/**
 * Replace backslash to slash
 *
 * @category String
 */
export function slash(string_: string) {
  return string_.replaceAll("\\", "/");
}

/**
 * Ensure prefix of a string
 *
 * @category String
 */
export function ensurePrefix(prefix: string, string_: string) {
  if (!string_.startsWith(prefix))
    return prefix + string_;
  return string_;
}

/**
 *
 *
 * @export
 * @param {Record<string, any>} obj
 * @returns {Record<string, any>}
 */
export function invertObj(object: Record<string, any>): Record<string, any> {
  const newObject: Record<string, any> = {};

  for (const property in object) {
    if (Object.prototype.hasOwnProperty.call(object, property))
      newObject[object[property]] = property;
  }

  return newObject;
}

/**
 *
 *
 * @export
 * @param {*} [params={} || '']
 * @return {*}  {string}
 */
export function stringifyQueryParams(parameters: Record<string, any> | string = {}): string {
  return new URLSearchParams(parameters).toString();
}

/**
 *
 *
 * @export
 * @param {*} str
 * @param {Record<string,any>} mix
 * @return {*}
 */
export function template(string_: string, mix: Record<string, any>): string {
  const RGX = /{{(.*?)}}/g;

  return string_.replaceAll(RGX, (_match, key: string) => {
    const trimmedKey = key.trim();
    const keys = trimmedKey.split(".");
    let value: any = mix; // Explicitly define the type of 'value'

    for (const k of keys) {
      if (value && k in value) {
        value = value[k];
      }
      else {
        value = undefined;
        break;
      }
    }

    return value === undefined ? "" : String(value);
  });
}

/**
 * It takes an object with three properties (length, numbers, and symbols) and returns a string of
 * random characters
 * @param {IRandomStringOptions} options - IRandomStringOptions
 * @returns A random string of characters
 */
export function randomString(options: IRandomStringOptions): string {
  const alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbersList = "0123456789";
  const symbolsList = "!@#$%^&*_-+=";

  const characters: string[] = [alpha];

  if (options.numbers)
    characters.push(numbersList);

  if (options.symbols)
    characters.push(symbolsList);

  const password: string[] = [];

  for (let index = 0; index < options.length; index++) {
    const selectedCharacterIndex = Math.trunc(Math.random() * characters.length);
    const selectedCharacter = characters[selectedCharacterIndex];
    const randomIndex = Math.trunc(Math.random() * selectedCharacter.length);

    password.push(selectedCharacter.charAt(randomIndex));
  }

  return password.join("");
}

/**
 * ComposeAsync takes a list of functions and returns a function that takes an input and returns a
 * promise that resolves to the result of applying the input to the list of functions in reverse order
 * @param {any[]} fns - an array of functions
 */
export function composeAsync(...fns: unknown[]) {
  return (input: any) => {
    let result = Promise.resolve(input);
    for (let i = fns.length - 1; i >= 0; i--) {
      const fn = fns[i] as (value: any) => any; // Type assertion
      result = result.then(fn);
    }
    return result;
  };
}

/**
 * It returns the difference between two arrays.
 * @param {any[]} a - unknown[]
 * @param {any[]} b - unknown[]
 * @returns The difference between the two arrays.
 */
export function intersection(a: unknown[], b: unknown[]) {
  const s = new Set(b);
  return a.filter(x => s.has(x));
}

/**
 * Given two dates, return true if they are the same date, false otherwise.
 * @param {Date} dateA - The first date to compare.
 * @param {Date} dateB - Date - The date to compare to.
 */
export function isSameDate(dateA: Date, dateB: Date) {
  return dateA.toISOString() === dateB.toISOString();
}

/**
 * Drop the first element of an array while the function returns true.
 * @param {string | T[]} arr - string | any[]
 * @param func - (arg0: any) => any
 * @returns The array after the first element that does not pass the test.
 */
export function dropWhile<T>(array: T[], function_: (argument: T) => boolean): T[] {
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
 * The function exports a promise that resolves after a specified delay time.
 * @param {number} time - The `time` parameter is a number representing the amount of time in
 * milliseconds that the `delay` function will wait before resolving the promise.
 */
export function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time));
}

/**
 * The `throttler` function adds a delay of 1 second before calling the next middleware function.
 * @param {any} req - The `req` parameter is an object that represents the incoming HTTP request. It
 * contains information about the request such as the request method, URL, headers, and body.
 * @param {any} res - The `res` parameter in the `throttler` function is an object that represents the
 * HTTP response that will be sent back to the client. It contains methods and properties that allow
 * the server to send data back to the client, such as `res.send()` or `res.status()`. In
 * @param next - `next` is a function that is called to pass control to the next middleware
 */
export function throttler(_request: any, _response: any, next: () => void) {
  const date = process.env.DUE_DATE as string;

  const dueDate = new Date(date);
  const currentDate = new Date();

  const utc1 = Date.UTC(
    dueDate.getFullYear(),
    dueDate.getMonth(),
    dueDate.getDate(),
  );
  const utc2 = Date.UTC(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
  );
  const days = Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));

  if (days > 0) {
    let ms = days * 200;

    if (ms < 0)
      ms = 0;

    return setTimeout(next, ms);
  }
}
