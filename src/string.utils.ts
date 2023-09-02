import type { IRandomStringOptions, ISlugifyOptions } from "./interface";
import { isString } from "./types.validator";

/**
 * "Replace every word in a string with a capitalized version of that word."
 *
 * The first thing we do is use the replace() method to replace every word in the string with a
 * capitalized version of that word
 * @param {string} string_ - string - The string to be capitalized.
 * @returns A function that takes a string as an argument and returns a string with every word
capitalized.
 */
export function capitalizeEveryWord(string_: string): string {
  return string_.replaceAll(/\b[a-z]/g, char => char.toUpperCase());
}

/**
 * If the string exists, return the first character capitalized and the rest of the string lowercase,
 * otherwise return an empty string.
 * @param {string} string_ - string - This is the string that we want to capitalize.
 * @returns A function that takes a string and returns a string.
 */
export function capitalize(string_: string): string {
  return string_
    ? string_.charAt(0).toUpperCase() + string_.slice(1).toLowerCase()
    : "";
}

/**
 * The function "chop" removes leading and trailing special characters, punctuation, and whitespace
 * from a string.
 * @param {unknown} string_ - The parameter `str` is of type `unknown`, which means it can be any type.
 * @returns a string.
 */
export function chop(string_: unknown) {
  if (!isString(string_)) return "";
  const re = /^[\W_]+|[\W_]+$/g;
  return string_.trim().replaceAll(re, "");
}

/**
 * Ensure suffix of a string
 *
 * @category String
 */
export function ensureSuffix(suffix: string, string_: string) {
  if (!string_.endsWith(suffix)) return string_ + suffix;
  return string_;
}
/**
 * Ensure prefix of a string
 *
 * @category String
 */
export function ensurePrefix(prefix: string, string_: string) {
  if (!string_.startsWith(prefix)) return prefix + string_;
  return string_;
}

/**
 * If the string exists, return the first character of the string in lowercase, followed by the rest of
 * the string. Otherwise, return an empty string.
 * @param {string} string_ - string - the string to be converted
 * @returns The first character of the string is being converted to lowercase and then concatenated
with the rest of the string.
 */
export function lowerFirst(string_: string): string {
  return string_ ? string_.charAt(0).toLowerCase() + string_.slice(1) : "";
}

/**
 * Remove all dots from the email address, remove everything after the plus sign, and convert the email
 * address to lowercase.
 * @param {string} email - The email address to normalize.
 * @returns A function that takes an email and returns a normalized email.
 */
export function normalizeEmail(email: string): string {
  const DOT_REG = /\./g;
  const [name, host] = email.split("@");
  let [beforePlus] = name.split("+");
  beforePlus = beforePlus.replaceAll(DOT_REG, "");
  const result = `${beforePlus.toLowerCase()}@${host.toLowerCase()}`;
  Number(result);
  return result;
}

/**
 * It takes a string and replaces all instances of a given identifier with a random number
 * @param str - The string to be replaced.
 * @param identifier - The string that will be replaced with a random number.
 * @returns A function that takes a string and an identifier and returns a string with the identifier
 * replaced with a random number.
 */
export function orderedToken(string_: string, identifier = "X") {
  while (string_.includes(identifier))
    string_ = string_.replace(identifier, String(randomNumber()));

  return string_;
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

  if (options.numbers) characters.push(numbersList);

  if (options.symbols) characters.push(symbolsList);

  const password: string[] = [];

  for (let index = 0; index < options.length; index++) {
    const selectedCharacterIndex = Math.trunc(
      Math.random() * characters.length,
    );
    const selectedCharacter = characters[selectedCharacterIndex];
    const randomIndex = Math.trunc(Math.random() * selectedCharacter.length);

    password.push(selectedCharacter.charAt(randomIndex));
  }

  return password.join("");
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
 * Return the string after the first occurrence of the given substring.
 * @param str - The string to search in
 * @param substr - The substring to search for.
 * @returns The string after the first occurrence of the given substring.
 */
export function stringAfter(string_: string, substr: string): string {
  return string_.split(substr)[1];
}

/**
 * Return the part of the string before the first occurrence of the given substring.
 * @param str - The string to search in
 * @param substr - The substring to search for.
 * @returns The string before the first instance of the substring.
 */
export function stringBefore(string_: string, substr: string): string {
  return string_.split(substr)[0];
}

/**
 * The `slugify` function converts a string into a URL-friendly slug by removing special characters,
 * converting to lowercase, and replacing spaces with a specified separator.
 * @param {string} string_ - The `string_` parameter is the input string that you want to slugify. It
 * can be any string value.
 * @param {ISlugifyOptions} [options] - The `options` parameter is an optional object that allows you
 * to customize the behavior of the `slugify` function. It has the following properties:
 * @returns a slugified version of the input string.
 */
export function slugify(string_: string, options?: ISlugifyOptions): string {
  const { separator = "-" } = options ?? {};

  return string_
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replaceAll(/[\u0300-\u036F]/g, "")
    .replaceAll(/[^\d a-z-]/g, "")
    .replaceAll(/\s+/g, separator);
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
 * @export
 * @param {*} [parameters]
 * @return {*} {string}
 */
export function stringifyQueryParameters(
  parameters: Record<string, any> | string = {},
): string {
  return new URLSearchParams(parameters).toString();
}

/**
 * @export
 * @param {*} string_
 * @param {Record<string, any>} mix
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
 * Replaces all instances of HTML entities in a string with their corresponding characters.
 *
 * @param {string} string_ - The string to unescape.
 * @returns {string} - The modified string with HTML entities replaced.
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
      })[tag] || tag,
  );
}

/**
 * The `uncapitalize` function takes a string and returns the same string with the first letter in
 * lowercase and the rest of the letters in either lowercase or uppercase based on the `upperRest`
 * parameter.
 * @param {string[]}  - The `uncapitalize` function takes in two parameters:
 * @param [upperRest=false] - The `upperRest` parameter is a boolean value that determines whether the
 * rest of the string should be converted to uppercase or lowercase. If `upperRest` is `true`, the rest
 * of the string will be converted to uppercase. If `upperRest` is `false` or not provided, the
 * @returns a string.
 */
export const uncapitalize = ([first, ...rest]: string[], upperRest = false): string => {
  return `${first.toLowerCase()}${upperRest ? rest.join("").toUpperCase() : rest.join("").toLowerCase()}`;
};
