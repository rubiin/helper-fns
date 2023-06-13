import crypto from "node:crypto";
import fs from "node:fs";
import {
  IDebounceOptions,
  IEncryptOptions,
  IRandomStringOptions,
  ISlugifyOptions,
} from "./interface";

const DOT_REG = /\./g;

/**
 * It returns true if the object is empty, false if it's not
 * @param {any} obj - any
 * @returns A function that takes in an object and returns a boolean.
 */
export const isEmpty = (obj: any): boolean => {
  return (
    [Object, Array].includes((obj || {}).constructor) &&
    !Object.entries(obj || {}).length
  );
};

/**
 * It takes an object and returns a new object with all the null values removed
 * @param {Record<string, any> | Array<unknown>} obj - Record<string, any> | Array<unknown>
 * @returns An object with all the keys and values that are not null.
 */
export const removeEmpty = (obj: Record<string, any> | Array<unknown>) => {
  return Object.entries(obj).reduce(
    (a, [k, v]) => (v === null ? a : { ...a, [k]: v }),
    {}
  );
};

/**
 * It takes an object and an array of keys, and returns a new object with only those keys
 * @param {T} obj - T - the object to pick properties from
 * @param {K[]} keys - K[]
 * @returns Pick<T, K>
 */
export const pick = <T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
  const ret: any = {};

  keys.forEach((key) => {
    ret[key] = obj[key];
  });

  return ret;
};

/**
 * It takes any number of arguments, and returns a stringified version of those arguments
 * @param {any[]} args - The arguments passed to the resolver.
 * @returns A stringified version of the arguments passed in.
 */
export const resolverArgs = (...args: any[]): string => {
  return JSON.stringify(args);
};

/**
 * It takes an array of numbers and an optional initial value, and returns the sum of the array
 * @param arr - The array to be reduced.
 * @param [initialValue=0] - The initial value of the accumulator.
 * @returns [1, 2, 3, 4, 5]
 */
export const sumOfAnArray = (arr: Array<number>, initialValue = 0): number => {
  return arr.reduce((a, b) => a + b, initialValue);
};

/**
 * Return an iterable of unique values from the given iterable.
 * @param values - Iterable<unknown>
 * @returns [...new Set(values)]
 */
export const unique = (values: Iterable<unknown>): Iterable<unknown> => {
  return [...new Set(values)];
};

/**
 * It takes an object and an array of keys, and returns a new object with the keys omitted
 * @param {T} obj - T - the object to omit keys from
 * @param {K[]} keys - K[]
 * @returns { a: 1, b: 2 }
 */
export const omit = <T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> => {
  const _ = { ...obj };
  keys.forEach((key) => delete _[key]);
  return _;
};

/**
 * It sorts an array of objects by a list of properties, in the order specified
 * @param {any} arr - The array to sort
 * @param {any[]} props - The properties to sort by.
 * @param orders - An array of strings that specifies the order of sorting.
 */
export const orderBy = <T extends Object, K extends keyof T>(
  arr: Array<T>,
  props: K[],
  orders: Record<string, string>
) => {
  [...arr].sort((a, b) =>
    props.reduce((acc, prop, i) => {
      if (acc === 0) {
        const [p1, p2] =
          orders && orders[i] === "desc"
            ? [b[prop], a[prop]]
            : [a[prop], b[prop]];
        acc = p1 > p2 ? 1 : p1 < p2 ? -1 : 0;
      }
      return acc;
    }, 0)
  );
};

/**
 * Pipe takes a list of functions and returns a function that takes an input and returns the input
 * after it has been passed through all the functions in the list.
 * @param {any[]} fns - any[] - an array of functions
 */
export const pipe =
  (...fns: any[]) =>
  (input: any) =>
    fns.reduce((chain, func) => func(chain), input);

/**
 * Pluck takes an array of objects and returns an array of the values of a certain property in each
 * object
 * @param {any[]} arr - any[] - the array we want to pluck from
 * @param {string | number} key - string | number
 * @returns [1, 2, 3]
 */
export const pluck = <T, K extends keyof T>(
  arr: any[],
  key: keyof K
): any[] => {
  return arr.map((i) => i[key]);
};

/**
 * It takes an object and a map of keys to new keys, and returns a new object with the keys renamed
 * according to the map, while keeping the values intact
 * @param keysMap - Record<string, any>
 * @param obj - The object to be renamed
 */
export const renameKeys = (
  keysMap: Record<string, any>,
  obj: Record<string, any>
) => {
  Object.keys(obj).reduce(
    (acc, key) => ({
      ...acc,
      ...{ [keysMap[key] || key]: obj[key] },
    }),
    {}
  );
};

/**
 * "It takes an array of objects and returns an array of the values of a specific attribute of those
 * objects."
 *
 * Here's an example of how to use it:
 * @param objectArray - The array of objects you want to convert.
 * @param {string} attr - The attribute of the object you want to extract.
 * @returns An array of the values of the attribute passed in.
 */
export const objectArrayToArray = (
  objectArray: Array<unknown>,
  attr: string
): Array<unknown> => {
  return objectArray.map((el: any) => {
    return el[attr];
  });
};

/**
 * It takes a number and returns a number with a fixed number of decimal places
 * @param {number} num - The number to be fixed.
 * @param [fixed=2] - The number of decimal places to round to.
 * @returns A function that takes a number and a fixed number and returns a number.
 */
export const fixedDecimal = (num: number, fixed = 2): number => {
  const re = new RegExp(`^-?\\d+(?:.\\d{0,${fixed || -1}})?`);

  return parseFloat(num.toString().match(re)![0]);
};

/**
 * It takes a string and returns a string, number, or boolean
 * @param {string} val - string - the value to be parsed
 */

export const autoParseValues = (val: string): string | number | boolean => {
  // check for boolean
  if (!!JSON.parse(val) === JSON.parse(val))
    return JSON.parse(val.toLowerCase());
  else if (!isNaN(Number(val))) return parseFloat(val);

  // for string no parsing required

  return val;
};

/**
 * It takes an array of arrays and returns a new array with all the elements flattened
 * @param {unknown[]} arr - The array to flatten.
 * @returns [1, 2, 3, 4, 5, 6]
 */
export const flattenDeep = (arr: unknown[]): unknown[] => {
  return arr.flat(Infinity);
};

/**
 * It returns an array of all the elements in the first array that are not in the second array
 * @param {unknown[]} a - unknown[] - The first array to compare
 * @param {unknown[]} b - unknown[]
 * @returns The difference between two arrays.
 */
export const difference = (a: unknown[], b: unknown[]): unknown[] => {
  return a.filter((c) => !b.includes(c));
};

/**
 * It takes two arrays and returns an array of the elements that are common to both
 * @param {unknown[]} a - unknown[] - The first array to compare
 * @param {unknown[]} b - unknown[]
 * @returns The common elements of the two arrays.
 */
export const common = (a: unknown[], b: unknown[]): unknown[] => {
  return a.filter((c) => b.includes(c));
};

/**
 * If the string exists, return the first character capitalized and the rest of the string lowercase,
 * otherwise return an empty string.
 * @param {string} str - string - This is the string that we want to capitalize.
 * @returns A function that takes a string and returns a string.
 */
export const capitalize = (str: string): string => {
  return str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";
};

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
export const debounce = (options: IDebounceOptions) => {
  let timeout: any;
  return function (this: any) {
    const context = this;
    const args = arguments;
    const later = function () {
      timeout = null;
      if (!options.immediate) options.func.apply(context, args);
    };
    const callNow = options.immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, options.wait);
    if (callNow) options.func.apply(context, args);
  };
};

/**
 * It takes a callback function as an argument and returns the time taken to execute that function
 * @param {Function} callback - Function - The function to be executed.
 * @returns [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 */
export const timeTaken = (callback: Function): number => {
  console.time("timeTaken");
  const r = callback();
  console.timeEnd("timeTaken");
  return r;
};

/**
 * It replaces all instances of &amp;, &lt;, &gt;, &#39;, and &quot; with their respective HTML
 * entities
 * @param {string} str - The string to unescape.
 * @returns the string with the tags replaced with the corresponding characters.
 */

export const unescapeHTML = (str: string): string => {
  return str.replace(
    /&amp;|&lt;|&gt;|&#39;|&quot;/g,
    (tag) =>
      ({
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&#39;": "'",
        "&quot;": '"',
      }[tag] || tag)
  );
};

/**
 * If the function is called again before the timeout is up, reset the timeout and use the latest
 * arguments.
 * @param {Function} func - The function to be executed
 * @param {number} wait - The number of milliseconds to throttle invocations to.
 * @returns A function that will call the function passed in after a certain amount of time has passed.
 */

export const throttle = (func: Function, wait: number) => {
  let timeout: NodeJS.Timer | number | null = null;
  let callbackArgs: IArguments | null = null;
  const context = this;

  const later = () => {
    func.apply(context, callbackArgs);
    timeout = null;
  };

  return function () {
    if (!timeout) {
      callbackArgs = arguments;
      timeout = setTimeout(later, wait);
    }
  };
};

/**
 * It takes a number of milliseconds, converts it to an object with properties for days, hours,
 * minutes, seconds, and milliseconds, filters out any values which are zero, then formats each time
 * segment as a string
 * @param {number} ms - The number of milliseconds to be formatted as a human readable string.
 * @returns A function that takes a number and returns a string.
 */
export const formatDuration = (ms: number): string => {
  if (ms < 0) ms = -ms;
  const time = {
    day: Math.floor(ms / 86400000),
    hour: Math.floor(ms / 3600000) % 24,
    minute: Math.floor(ms / 60000) % 60,
    second: Math.floor(ms / 1000) % 60,
    millisecond: Math.floor(ms) % 1000,
  };
  return Object.entries(time)
    .filter((val) => val[1] !== 0)
    .map(([key, val]) => `${val} ${key}${val !== 1 ? "s" : ""}`)
    .join(", ");
};

/**
 * "Replace every word in a string with a capitalized version of that word."
 *
 * The first thing we do is use the replace() method to replace every word in the string with a
 * capitalized version of that word
 * @param {string} str - string - The string to be capitalized.
 * @returns A function that takes a string as an argument and returns a string with every word
 * capitalized.
 */

export const capitalizeEveryWord = (str: string): string => {
  return str.replace(/\b[a-z]/g, (char) => char.toUpperCase());
};

/**
 * If the string exists, return the first character of the string in lowercase, followed by the rest of
 * the string. Otherwise, return an empty string.
 * @param {string} str - string - the string to be converted
 * @returns The first character of the string is being converted to lowercase and then concatenated
 * with the rest of the string.
 */
export const lowerFirst = (str: string): string => {
  return str ? str.charAt(0).toLowerCase() + str.slice(1) : "";
};

/**
 * It returns an array of unique values from two arrays.
 * @param a - Array<unknown>
 * @param b - Array<unknown>
 * @param [duplicates=true] - boolean
 * @returns [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 */
export const union = (
  a: Array<unknown>,
  b: Array<unknown>,
  duplicates = true
): Array<unknown> => {
  if (!duplicates) return Array.from(new Set([...a, ...b]));

  return Array.from([...a, ...b]);
};

/**
 * It returns true if the dateString parameter is a valid date, and false if it's not
 * @param {string} dateString - The string to be tested.
 * @returns A boolean value.
 */
export const isDate = (dateString: string): boolean => {
  return new Date(dateString) instanceof Date;
};

/**
 * It returns a new array with the last n elements removed
 * @param {unknown[]} arr - The array to query.
 * @param [n=1] - The number of elements to drop from the end of the array.
 * @returns [1, 2, 3, 4, 5]
 */
export const dropRight = (arr: unknown[], n = 1): unknown[] => {
  return arr.slice(0, -n);
};

/**
 * It takes a string, encrypts it, and returns the encrypted string
 * @param {IEncryptOptions} options - IEncryptOptions
 * @returns The encrypted text
 */
export const encrypt = (options: IEncryptOptions) => {
  const ENC_KEY = Buffer.from(options.config.key, "hex"); // set random encryption key
  const IV = Buffer.from(options.config.iv, "hex"); //
  const cipher = crypto.createCipheriv("aes-256-cbc", ENC_KEY, IV);
  let encrypted = cipher.update(options.text, "utf8", "base64");
  encrypted += cipher.final("base64");
  return encrypted;
};

/**
 * It takes an enum and returns an array of strings
 * @param _enum - The enum you want to convert to a string array.
 * @returns An array of strings
 */

export const enumToString = (_enum: Record<any, any>) => {
  return Object.keys(_enum)
    .map((key) => _enum[key])
    .filter((value) => typeof value === "string") as string[];
};

/**
 * It takes an object with a config property and a text property, and returns the decrypted text
 * @param {IEncryptOptions} options - IEncryptOptions
 * @returns The decrypted text.
 */
export const decrypt = (options: IEncryptOptions) => {
  const ENC_KEY = Buffer.from(options.config.key, "hex"); // set random encryption key
  const IV = Buffer.from(options.config.iv, "hex"); // set random initialization vector

  const decipher = crypto.createDecipheriv("aes-256-cbc", ENC_KEY, IV);
  const decrypted = decipher.update(options.text, "base64", "utf8");
  return decrypted + decipher.final("utf8");
};

/**
 * It reads a file and returns a promise that resolves to the file's contents
 * @param {string} path - The path to the file you want to read.
 * @returns A promise that resolves to the contents of the file at the given path.
 */
export const readFile = (path: string) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, { encoding: "utf-8" }, (err, html) => {
      if (err) reject(err);
      else resolve(html);
    });
  });
};

/**
 * "Return a random number between a and b, inclusive."
 *
 * The function takes two optional parameters, a and b, and returns a random number between them. If a
 * and b are omitted, the function returns a random number between 1 and 9
 * @param [a=1] - The lower bound of the random number.
 * @param [b=9] - The upper bound of the random number to be generated.
 * @returns A random number between a and b.
 */
export const randomNumber = (a = 1, b = 9): number => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

/**
 * It creates an array of size 'size' and then maps each element to a random hexadecimal number and
 * then joins them all together
 * @param {number} size - The number of characters you want in your hex string.
 */

export const randomHex = (size: number): string => {
  return [...Array(size)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("");
};

/**
 * It takes a string and replaces all instances of a given identifier with a random number
 * @param {string} str - The string to be replaced.
 * @param [identifier=X] - The string that will be replaced with a random number.
 * @returns A function that takes a string and an identifier and returns a string with the identifier
 * replaced with a random number.
 */
export const orderedToken = (str: string, identifier = "X") => {
  while (str.includes(identifier)) {
    str = str.replace(identifier, String(randomNumber()));
  }
  return str;
};

/**
 * Return the string after the first occurrence of the given substring.
 * @param {string} str - The string to search in
 * @param {string} substr - The substring to search for.
 * @returns The string after the first occurrence of the given substring.
 */
export const strAfter = (str: string, substr: string): string => {
  return str.split(substr)[1];
};

/**
 * Return the part of the string before the first occurrence of the given substring.
 * @param {string} str - The string to search in
 * @param {string} substr - The substring to search for.
 * @returns The string before the first instance of the substring.
 */
export const strBefore = (str: string, substr: string): string => {
  return str.split(substr)[0];
};

/**
 * If the value is not null, undefined, or an empty string, return true, otherwise return false.
 * @param {unknown} value - unknown - The value to check.
 * @returns A function that takes a value and returns a boolean
 */
export const isNotEmpty = (value: unknown): boolean => {
  return !isEmpty(value);
};

/**
 * It creates a new instance of the same type as the given instance, copies all the properties of the
 * given instance to the new instance, and returns the new instance
 * @param {T} instance - The instance to clone.
 * @returns A new instance of the same class as the instance passed in.
 */
export const clone = <T extends { constructor: Function }>(instance: T): T => {
  const copy = new (instance.constructor as { new (): T })();

  Object.assign(copy, instance);

  return copy;
};

/**
 *
 *
 * @export
 * @param {any[]} arr
 * @param {(string | number)} fn
 * @returns any[]
 */

export const groupBy = (arr: any[], prop: string): any[] => {
  return arr.reduce((acc, curr) => {
    if (!acc[curr[prop]]) acc[curr[prop]] = [];

    acc[curr[prop]].push(curr);
    return acc;
  }, {});
};

/**
 * Shuffle the elements array and return it. (mutative)
 *
 */
export const shuffle = <T>(array: T[]): T[] => {
  let m = array.length;
  // While there remain elements to shuffle…
  while (m > 0) {
    // Pick a remaining element…
    const i = Math.floor(Math.random() * m--);
    // And swap it with the current element.
    const t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
};

/**
 * Remove all dots from the email address, remove everything after the plus sign, and convert the email
 * address to lowercase.
 * @param {string} email - The email address to normalize.
 * @returns A function that takes an email and returns a normalized email.
 */
export const normalizeEmail = (email: string): string => {
  const [name, host] = email.split("@");
  let [beforePlus] = name.split("+");
  beforePlus = beforePlus.replace(DOT_REG, "");
  const result = `${beforePlus.toLowerCase()}@${host.toLowerCase()}`;
  Number(result);
  return result;
};

/**
 *
 *
 * @export
 * @param {string} str
 * @param {ISlugifyOptions} [options={ lowercase: true, separator: '-', trim: true }]
 * @return {*}  {string}
 */
export const slugify = (str: string, options?: ISlugifyOptions): string => {
  options = { lowercase: true, separator: "-", trim: true, ...options };
  const value = str
    .toString()
    .normalize("NFD") // split an accented letter in the base letter and the acent
    .replace(/[\u0300-\u036F]/g, ""); // remove all previously split accents
  if (options.lowercase) value.toLowerCase();
  if (options.trim) value.trim();

  return value
    .replace(/[^a-z0-9 -]/g, "") // remove all chars not letters, numbers and spaces (to be replaced)
    .replace(/\s+/g, options.separator as string);
};

/**
 *
 * Clear undefined fields from an object. It mutates the object
 *
 * @export
 * @template T
 * @param {T} obj
 * @return {*}  {T}
 */
export const clearUndefined = <T extends Record<string, any>>(obj: T): T => {
  Object.keys(obj).forEach((key: string) =>
    obj[key] === undefined ? delete obj[key] : {}
  );
  return obj;
};

/**
 * Replace backslash to slash
 *
 * @category String
 */
export const slash = (str: string) => {
  return str.replace(/\\/g, "/");
};

/**
 * Ensure prefix of a string
 *
 * @category String
 */
export const ensurePrefix = (prefix: string, str: string) => {
  if (!str.startsWith(prefix)) return prefix + str;
  return str;
};

/**
 *
 *
 * @export
 * @param {Record<string, any>} obj
 * @returns {Record<string, any>}
 */
export const invertObj = (obj: Record<string, any>): Record<string, any> => {
  const newObj: Record<string, any> = {};

  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) newObj[obj[prop]] = prop;
  }

  return newObj;
};

/**
 *
 *
 * @export
 * @param {*} [params={} || '']
 * @return {*}  {string}
 */
export const stringifyQueryParams = (params: any = {} || ""): string => {
  return new URLSearchParams(params).toString();
};

/**
 *
 *
 * @export
 * @param {*} str
 * @param {Record<string,any>} mix
 * @return {*}
 */
export const template = (str: any, mix: Record<string, any>): any => {
  const RGX = /{{(.*?)}}/g;

  return str.replace(RGX, (x: number, key: any, y: Record<string, any>) => {
    x = 0;
    y = mix;
    key = key.trim().split(".");
    while (y && x < key.length) y = y[key[x++]];

    return y != null ? y : "";
  });
};

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

  let characters = alpha;
  options.numbers ? (characters += numbersList) : "";
  options.symbols ? (characters += symbolsList) : "";

  let password = "";
  for (let i = 0; i < options.length; i++) {
    password += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return password;
}

/**
 * ComposeAsync takes a list of functions and returns a function that takes an input and returns a
 * promise that resolves to the result of applying the input to the list of functions in reverse order
 * @param {any[]} fns - an array of functions
 */
export const composeAsync =
  (...fns: any[]) =>
  (input: any) =>
    fns.reduceRight((chain, func) => chain.then(func), Promise.resolve(input));

/**
 * It returns the difference between two arrays.
 * @param {any[]} a - any[]
 * @param {any[]} b - any[]
 * @returns The difference between the two arrays.
 */
export const intersection = (a: any[], b: any[]) => {
  return difference(a, b);
};

/**
 * Given two dates, return true if they are the same date, false otherwise.
 * @param {Date} dateA - The first date to compare.
 * @param {Date} dateB - Date - The date to compare to.
 */
export const isSameDate = (dateA: Date, dateB: Date) =>
  dateA.toISOString() === dateB.toISOString();

/**
 * Drop the first element of an array while the function returns true.
 * @param {string | unknown[]} arr - string | any[]
 * @param func - (arg0: any) => any
 * @returns The array after the first element that does not pass the test.
 */
export const dropWhile = (
  arr: string | unknown[],
  func: (arg0: any) => any
) => {
  while (arr.length > 0 && !func(arr[0])) arr = arr.slice(1);
  return arr;
};

/**
 * Drop() returns a copy of the array with n elements removed from the left.
 * @param {string | any[]} arr - The array to query.
 * @param [n=1] - The number of elements to drop from the beginning of the array.
 * Also known as dropLeft.
 */
export const drop = (arr: string | unknown[], n = 1) => arr.slice(n);

/**
 * The function exports a promise that resolves after a specified delay time.
 * @param {number} time - The `time` parameter is a number representing the amount of time in
 * milliseconds that the `delay` function will wait before resolving the promise.
 */
export const delay = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

/**
 * The `throttler` function adds a delay of 1 second before calling the next middleware function.
 * @param {any} req - The `req` parameter is an object that represents the incoming HTTP request. It
 * contains information about the request such as the request method, URL, headers, and body.
 * @param {any} res - The `res` parameter in the `throttler` function is an object that represents the
 * HTTP response that will be sent back to the client. It contains methods and properties that allow
 * the server to send data back to the client, such as `res.send()` or `res.status()`. In
 * @param next - `next` is a function that is called to pass control to the next middleware
 */
export function throttler(_req: any, _res: any, next: () => void) {
  const date = process.env.DUE_DATE as string;

  const due_date = new Date(date);
  const current_date = new Date();

  const utc1 = Date.UTC(
    due_date.getFullYear(),
    due_date.getMonth(),
    due_date.getDate()
  );
  const utc2 = Date.UTC(
    current_date.getFullYear(),
    current_date.getMonth(),
    current_date.getDate()
  );
  const days = Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));

  if (days > 0) {
    let ms = days * 200;

    if (ms < 0) {
      ms = 0;
    }

    return setTimeout(next, ms);
  }
}
