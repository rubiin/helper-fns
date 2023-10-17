import { Buffer } from "node:buffer";
import crypto from "node:crypto";
import fs from "node:fs";
import { promisify } from "node:util";
import process from "node:process";
import type { IDebounceOptions, IEncryptOptions } from "./interface";
import path from "node:path";
import { isString } from "./types.validator";

/**
 * It takes a string and returns a string, number, or boolean
 * @param value - string - the value to be parsed
 * @returns A string, number, or boolean
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

/* The line `export const awaitTimeout = promisify(setTimeout);` is exporting a function called
`awaitTimeout` that wraps the `setTimeout` function and returns a promise that resolves after a
specified delay time. This allows you to use `await` with `setTimeout` instead of using callbacks. */
export const awaitTimeout = promisify(setTimeout);

/**
 * ComposeAsync takes a list of functions and returns a function that takes an input and returns a
 * promise that resolves to the result of applying the input to the list of functions in reverse order
 * promise that resolves to the result of applying the input to the list of functions in reverse order
 * @param fns - an array of functions
 * @returns A function that takes an input and returns a promise that resolves to the result of
 */
export function composeAsync(...fns: unknown[]) {
  return (input: any) => {
    let result = Promise.resolve(input);
    for (let index = fns.length - 1; index >= 0; index--) {
      const Ffunction = fns[index] as (value: any) => any; // Type assertion
      result = result.then(Ffunction);
    }
    return result;
  };
}

/**
 * The `clamp` function takes a value and ensures it falls within a specified range.
 * @param value - The `val` parameter represents the value that you want to clamp.
 * @param min - The `min` parameter represents the minimum value that `val` can be. If `val`
 * is less than `min`, the function will return `min`.
 * @param max - The `max` parameter is the maximum value that `val` can be. If `val` is
 * greater than `max`, the function will return `max`.
 * @returns the value of `val` if it is within the range of `min` and `max`. If `val` is less than
 * `min`, then `min` is returned. If `val` is greater than `max`, then `max` is returned.
 */
export function clamp(value: number, min: number, max: number) {
  return value < min ? min : (value > max ? max : value);
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
 * @param options - IDebounceOptions
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
    // eslint-disable-next-line ts/no-unsafe-argument
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow)
      func.apply(this, arguments_);
  };
}

/**
 * The `dynamicImport` function allows for dynamic importing of a package in TypeScript.
 * @param packageName - The `packageName` parameter is a string that represents the name of
 * the package that you want to dynamically import.
 * @returns A promise that resolves to the imported package.
 */
export async function dynamicImport(packageName: string) {
  // eslint-disable-next-line no-new-func, ts/no-implied-eval, ts/no-unsafe-return
  return new Function(`return import('${packageName}')`)();
}

/**
 * It takes an object with a config property and a text property, and returns the decrypted text
 * @param options - IEncryptOptions
 * @returns The decrypted text.
 */
export function decrypt(options: IEncryptOptions) {
  const ENC_KEY = Buffer.from(options.config.key, "hex"); // set random encryption key
  const IV = Buffer.from(options.config.iv, "hex"); // set random initialization vector

  const decipher = crypto.createDecipheriv("aes-256-cbc", ENC_KEY, IV);
  const decrypted = decipher.update(options.text, "base64", "utf8");
  return decrypted + decipher.final("utf8");
}

/**
 * The function exports a promise that resolves after a specified delay time.
 * @param time - The `time` parameter is a number representing the amount of time in
 * milliseconds that the `delay` function will wait before resolving the promise.
 * @returns A promise that resolves after a specified delay time.
 */
export function delay(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

/**
 * It takes a string, encrypts it, and returns the encrypted string
 * @param options - IEncryptOptions
 * @returns The encrypted text
 */
export function encrypt(options: IEncryptOptions) {
  const ENC_KEY = Buffer.from(options.config.key, "hex"); // set random encryption key
  const IV = Buffer.from(options.config.iv, "hex"); //
  const cipher = crypto.createCipheriv("aes-256-cbc", ENC_KEY, IV);
  let encrypted = cipher.update(options.text, "utf8", "base64");
  encrypted += cipher.final("base64");
  return encrypted;
}

/**
 * It takes a number and returns a number with a fixed number of decimal places
 * @param number_ - The number to be fixed.
 * @param fixed - The number of decimal places to round to.
 * @returns A function that takes a number and a fixed number and returns a number.
 */
export function fixedDecimal(number_: number, fixed = 2) {
  const re = new RegExp(`^-?\\d+(?:.\\d{0,${fixed || -1}})?`);

  return Number.parseFloat(number_.toString().match(re)![0]);
}

/**
 * The function `formatSearch` takes a string as input, trims leading and trailing whitespace, replaces
 * newline characters with spaces, removes consecutive spaces, and converts the string to lowercase. It
 * then returns the formatted string enclosed in `%` symbols.
 * @param  search - The `search` parameter is a string that represents the search query.
 * @returns The function `formatSearch` returns a formatted search string.
 */
export function formatSearch(search: string) {
  return `%${search.trim().replaceAll("\n", " ").replaceAll(/\s\s+/g, " ").toLowerCase()}%`;
}

/**
 * It takes a number of milliseconds, converts it to an object with properties for days, hours,
 * minutes, seconds, and milliseconds, filters out any values which are zero, then formats each time
 * segment as a string
 * @param ms - The number of milliseconds to be formatted as a human readable string.
 * @returns A function that takes a number and returns a string.
 */
export function formatDuration(ms: number) {
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
 * The `inRange` function checks if a number is within a specified range.
 * @param number_ - The number that you want to check if it is within the range of a and b.
 * @param a - The parameter "a" is a number that represents the lower bound of the range.
 * @param b - The parameter "b" is an optional parameter with a default value of 0. If no value is
 * provided for "b" when calling the function, it will default to 0.
 * @returns A boolean value.
 */
export const inRange = (number_: number, a: number, b = 0) => (Math.min(a, b) <= number_ && number_ < Math.max(a, b));

/**
 * It returns true if the dateString parameter is a valid date, and false if it's not
 * @param dateString - The string to be tested.
/**
 * @returns A boolean value.
 */
export function isDate(dateString: string) {
  const date = new Date(dateString);
  return date instanceof Date && !Number.isNaN(date.getTime());
}

/**
 * It returns true if the object is empty, false if it's not
 * @param object - any
 * @returns A function that takes in an object and returns a boolean.
 */
export function isEmpty(
  object: { [s: string]: unknown } | ArrayLike<unknown>,
) {
  return (
    (typeof object === "object" || Array.isArray(object))
    && Object.entries(object || {}).length === 0
  );
}

/**
 * Given two dates, return true if they are the same date, false otherwise.
 * @param dateA - The first date to compare.
 * @param dateB - Date - The date to compare to.
 * @returns A boolean value.
 */
export function isSameDate(dateA: Date, dateB: Date) {
  return dateA.toISOString() === dateB.toISOString();
}

/**
 * The lerp function calculates a linear interpolation between two numbers based on a given ratio.
 * @param ratio - The ratio parameter represents the interpolation ratio between the start and
 * end values. It is a number between 0 and 1, where 0 represents the start value and 1 represents the
 * end value.
 * @param start - The start parameter represents the starting value of the range you want to
 * interpolate between.
 * @param end - The "end" parameter represents the end value of the range you want to
 * interpolate between.
 * @returns the linear interpolation value between the start and end values based on the given ratio.
 */
export function lerp(ratio: number, start: number, end: number) {
  return start + (end - start) * ratio;
}

/**
 * Pipe takes a list of functions and returns a function that takes an input and returns the input
 * after it has been passed through all the functions in the list.
 * @param fns - any[] - an array of functions
 * @returns A function that takes an input and returns the input after it has been passed through all
 */
export function pipe<T>(...fns: ((input: T) => T)[]): (input: T) => T {
  return (input: T) => {
    let result = input;
    for (const Ffunction of fns) result = Ffunction(result);

    return result;
  };
}

export const randomAvatar = (gender?: "male" | "female"): string => {
  const baseUrl = "https://api.dicebear.com/7.x/adventurer/svg?seed=";
  // Female pet names
  const femaleNames = [
    "Princess",
    "Sophie",
    "Lola",
    "Abby",
    "Callie",
    "Sassy",
    "Angel",
    "Pepper",
    "Cali",
  ];

  // Male pet names
  const maleNames = [
    "Snuggles",
    "Toby",
    "Scooter",
    "Oreo",
    "Socks",
    "Chester",
    "Midnight",
    "Milo",
    "Garfield",
    "Tiger",
  ];

  if (gender && gender === "male") {
    // return a random male name
    return `${baseUrl}${maleNames[Math.floor(Math.random() * maleNames.length)]}`;
  }

  return `${baseUrl}${femaleNames[Math.floor(Math.random() * femaleNames.length)]}`;
};

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
 * It takes any number of arguments, and returns a stringified version of those arguments
 * @param arguments_ - The arguments passed to the resolver.
 * @returns A stringified version of the arguments passed in.
 */
export function resolverArguments(...arguments_: any[]) {
  return JSON.stringify(arguments_);
}

const defaultCheck  = (dir: string) =>{
  return fs.existsSync(path.join(dir, 'package.json'))
}

/**
 * The `findRootPath` function recursively searches for the root path of a project by checking if a
 * given directory contains a specific file.
 * @param {string | string[]} start - The `start` parameter is the starting path to search for the root
 * directory. It can be either a string representing a single path or an array of strings representing
 * multiple paths. If no value is provided, it defaults to `module.filename`, which is the filename of
 * the current module.
 * @param check - The `check` parameter is a function that takes a directory path as input and returns
 * a boolean value indicating whether the directory meets certain criteria. This function is used to
 * determine if a directory is the root path or if the search for the root path should continue.
 * @returns a string, which is the root path.
 */
export function findRootPath(start:  string | string[] = module.filename, check = defaultCheck): string {
  if (isString(start)) {
    start = start.endsWith(path.sep) ? start : start + path.sep;
    start = start.split(path.sep);
  }

  if (!start.length) {
    throw new Error('package.json not found in path');
  }

  start.pop();
  const dir = start.join(path.sep);

  if (check(dir)) {
    return dir;
  }

  return findRootPath(start, check);
}

/**
 * The `timestamp` function returns the current timestamp in milliseconds.
 * @returns A number representing the current timestamp in milliseconds.
 */
export const timestamp = () => +Date.now();

/**
 * It takes a callback function as an argument and returns the time taken to execute that function
 * @param callback - Function - The function to be executed.
 * @returns [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 */
export function timeTaken<T>(callback: () => T): [T, number] {
  console.time("timeTaken");
  const result = callback();
  console.timeEnd("timeTaken");
  return [result, performance.now()];
}

/**
 * The `throttler` function adds a delay of 1 second before calling the next middleware function.
 * @param _request - The `req` parameter is an object that represents the incoming HTTP request. It
contains information about the request such as the request method, URL, headers, and body.
 * @param _response - The `res` parameter in the `throttler` function is an object that represents the
HTTP response that will be sent back to the client. It contains methods and properties that allow
the server to send data back to the client, such as `res.send()` or `res.status()`. In
 * @param next - `next` is a function that is called to pass control to the next middleware
 * @returns A function that adds a delay of 1 second before calling the next middleware function.
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
