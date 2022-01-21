import { sub } from 'date-fns';
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as queryString from 'querystring';

/**
 *
 *
 * @export
 * @param {*} obj
 * @returns {boolean}
 *
 * check if object is empty
 */
export function isEmpty(obj: any): boolean {
	return (
		[Object, Array].includes((obj || {}).constructor) &&
		!Object.entries(obj || {}).length
	);
}

/**
 *
 *
 * @export
 * @param {( Record<string, any> | ArrayLike<unknown>)} obj
 * @returns
 *
 * remove empty
 *
 */
export function removeEmpty(obj: Record<string, any> | ArrayLike<unknown>) {
	return Object.entries(obj).reduce(
		(a, [k, v]) => (v === null ? a : { ...a, [k]: v }),
		{},
	);
}

/**
 *
 *
 * @export
 * @template T
 * @template K
 * @param {T} obj
 * @param {K[]} keys
 * @returns {Pick<T, K>}
 *
 *
 * Pick only specified keys from any object
 *
 *
 */
export function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
	const ret: any = {};

	keys.forEach(key => {
		ret[key] = obj[key];
	});

	return ret;
}

/**
 *
 *
 * @export
 * @param {...Array<any>} args
 * @returns {string}
 *
 * this is for lodash memoize function
 */
export function resolverArgs(...args: Array<any>): string {
	return JSON.stringify(args);
}

/**
 *
 *
 * @export
 * @param {Array<number>} arr
 * @param {number} [initialValue=0]
 * @returns {number}
 */

export function sumOfAnArray(
	arr: Array<number>,
	initialValue: number = 0,
): number {
	return arr.reduce((a, b) => a + b, initialValue);
}

/**
 *
 *
 * @export
 * @param {Iterable<unknown>} values
 * @returns {Iterable<unknown>}
 */
export function unique(values: Iterable<unknown>): Iterable<unknown> {
	return [...new Set(values)];
}

/**
 *
 *
 * @export
 * @param {{ call: (arg0: any, arg1: any) => any }} fn
 * @returns
 */
export function memoize(fn: { call: (arg0: any, arg1: any) => any }) {
	const cache = new Map();
	const cached = function (val: any) {
		return cache.has(val)
			? cache.get(val)
			: cache.set(val, fn.call(this, val)) && cache.get(val);
	};
	cached.cache = cache;
	return cached;
}

/**
 *
 * Pick all keys except explicitly mentioned from any object
 *
 * @export
 * @param {Record<string, any>} obj
 * @param {string[]} arr
 * @returns {Record<string, any>}
 */
export function omit(
	obj: Record<string, any>,
	arr: string[],
): Record<string, any> {
	return Object.keys(obj)
		.filter(k => !arr.includes(k))
		.reduce((acc, key) => ((acc[key] = obj[key]), acc), {});
}

/**
 *
 *
 * @export
 * @param {*} arr
 * @param {Array<any>} props
 * @param {{ [x: string]: string }} orders
 *
 * order by a key
 *
 */
export function orderBy(
	arr: any,
	props: Array<any>,
	orders: Record<string, string>,
) {
	[...arr].sort((a, b) =>
		props.reduce((acc, prop, i) => {
			if (acc === 0) {
				const [p1, p2] =
					orders && orders[i] === 'desc'
						? [b[prop], a[prop]]
						: [a[prop], b[prop]];
				acc = p1 > p2 ? 1 : p1 < p2 ? -1 : 0;
			}
			return acc;
		}, 0),
	);
}

/**
 *
 *
 * @export
 * @param {...Array<any>} fns
 */
export function pipeFunctions(...fns: Array<any>) {
	fns.reduce(
		(f, g) =>
			(...args: any) =>
				g(f(...args)),
	);
}

/**
 *
 *
 * @export
 * @param {Array<any>} arr
 * @param {(string | number)} key
 * @returns {Array<any>}
 */
export function pluck(arr: Array<any>, key: string | number): Array<any> {
	return arr.map(i => i[key]);
}

/**
 *
 * rename object keys
 *
 * @export
 * @param {Record<string, any>} keysMap
 * @param {Record<string, any>} obj
 */
export function renameKeys(
	keysMap: Record<string, any>,
	obj: Record<string, any>,
) {
	Object.keys(obj).reduce(
		(acc, key) => ({
			...acc,
			...{ [keysMap[key] || key]: obj[key] },
		}),
		{},
	);
}

/**
 *
 *
 * @export
 * @param {Array<unknown>} objectArray
 * @param {string} attr
 * @returns {Array<unknown>}
 */
export function objectArrayToArray(
	objectArray: Array<unknown>,
	attr: string,
): Array<unknown> {
	return objectArray.map((el: { [x: string]: any }) => {
		return el[attr];
	});
}

/**
 *
 * subtract date
 *
 * @export
 * @param {string} from
 * @param {string} unit
 * @param {number} interval
 * @returns {Date}
 */
export function subtractDate(
	from: string,
	unit: string,
	interval: number,
): Date {
	return new Date(sub(new Date(from), { [unit]: interval }));
}

/**
 *
 *
 * @export
 * @param {number} num
 * @param {number} [fixed=2]
 * @returns {number}
 *
 *  truncates a decimal number
 */
export function fixedDecimal(num: number, fixed: number = 2): number {
	const re = new RegExp('^-?\\d+(?:.\\d{0,' + (fixed || -1) + '})?');

	return parseFloat(num.toString().match(re)[0]);
}

/**
 *
 *
 * @export
 * @param {string} val
 * @returns {(string | number | boolean)}
 */
export function autoParseValues(val: string): string | number | boolean {
	//check for boolean
	if (!!JSON.parse(val) === JSON.parse(val)) {
		return JSON.parse(val.toLowerCase());
	} else if (!isNaN(Number(val))) {
		return parseFloat(val);
	}
	// for string no parsing required

	return val;
}

/**
 *
 *
 * @export
 * @param {Array<any>} arr
 * @return {*}  {Array<any>}
 */
export function flattenDeep(arr: Array<any>): Array<any> {
	return arr.flat(Infinity);
}

/**
 *
 * difference between array A and B , returns a - b
 *
 * @export
 * @param {Array<any>} a
 * @param {Array<any>} b
 * @returns {Array<any>}
 */
export function difference(a: Array<any>, b: Array<any>): Array<any> {
	return a.filter(c => !b.includes(c));
}

/**
 *
 * common between array A and B , returns a includes b
 *
 * @export
 * @param {Array<any>} a
 * @param {Array<any>} b
 * @returns {Array<any>}
 */
export function common(a: Array<any>, b: Array<any>): Array<any> {
	return a.filter(c => b.includes(c));
}

/**
 *
 *
 * @export
 * @param {string} str
 * @return {*}  {string}
 */
export function capitalize(str: string): string {
	return str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : '';
}

/**
 *
 *
 * @export
 * @param {string} str
 * @return {*}  {string}
 */
export function lowerFirst(str: string): string {
	return str ? str.charAt(0).toLowerCase() + str.slice(1) : '';
}

/**
 *
 *
 * @param {Array<unknown>} a
 * @param {Array<unknown>} b
 * @param {boolean} [duplicates=true]
 * @returns {Array<unknown>}
 */
export function union(
	a: Array<unknown>,
	b: Array<unknown>,
	duplicates: boolean = true,
): Array<unknown> {
	if (!duplicates) {
		return Array.from(new Set([...a, ...b]));
	}

	return Array.from([...a, ...b]);
}

/**
 *
 * checks if a date in a format is valid or not
 *
 * @export
 * @param {string} dateString
 * @returns {boolean}
 */
export function isDate(dateString: string): boolean {
	return new Date(dateString) instanceof Date;
}

/**
 *
 *
 * @export
 * @param {string} text
 * @param {{ key: string; iv: string }} config
 * @returns
 *
 *  ENC_KEY and IV can be generated as crypto.randomBytes(32).toString('hex');
 */
export function encrypt(text: string, config: { key: string; iv: string }) {
	const ENC_KEY = Buffer.from(config.key, 'hex'); // set random encryption key
	const IV = Buffer.from(config.iv, 'hex'); //
	let cipher = crypto.createCipheriv('aes-256-cbc', ENC_KEY, IV);
	let encrypted = cipher.update(text, 'utf8', 'base64');
	encrypted += cipher.final('base64');
	return encrypted;
}

/**
 *
 *
 * @export
 * @param {string} encrypted
 * @param {{ key: string; iv: string }} config
 * @returns
 *
 *
 */
export function decrypt(
	encrypted: string,
	config: { key: string; iv: string },
) {
	const ENC_KEY = Buffer.from(config.key, 'hex'); // set random encryption key
	const IV = Buffer.from(config.iv, 'hex'); // set random initialisation vector

	let decipher = crypto.createDecipheriv('aes-256-cbc', ENC_KEY, IV);
	let decrypted = decipher.update(encrypted, 'base64', 'utf8');
	return decrypted + decipher.final('utf8');
}

/**
 *
 *
 * @export
 * @param {string} path
 * @returns
 */
export function readFile(path: string) {
	return new Promise((resolve, reject) => {
		fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
			if (err) {
				reject(err);
			} else {
				resolve(html);
			}
		});
	});
}

/**
 *
 * Helper to generate random number of n length
 * @export
 * @param {number} n pass it to generate random numer of particular length
 * @returns {string}
 */
export function randomNumber(n: number): string {
	const add = 1;
	let max = 12 - add;

	if (n > max) {
		return randomNumber(max) + randomNumber(n - max);
	}

	max = Math.pow(10, n + add);
	const min = max / 10; // Math.pow(10, n) basically
	const num = Math.floor(Math.random() * (max - min + 1)) + min;

	return ('' + num).substring(add);
}

/**
 *
 * Helper to generate random string
 *
 * @export
 * @param {number} [length=0]
 * @returns
 */
export function randomString(length = 0): string {
	if (!length) return Math.random().toString(36).substr(2);

	let str = '';

	while (length > 0) {
		const tempStr = randomString().substring(0, length);

		length -= length >= tempStr.length ? tempStr.length : 0;
		str = str + tempStr;
	}

	return str;
}

/**
 *
 * Helper to generate random token
 * @export
 * @returns
 */
export function randomToken() {
	return randomString() + randomString();
}

/**
 *
 * Get string after a substring
 *
 * @export
 * @param {string} str
 * @param {string} substr
 * @returns
 */
export function strAfter(str: string, substr: string): string {
	return str.split(substr)[1];
}

/**
 * Get string before a substring
 * @param str
 * @param substr
 */
export function strBefore(str: string, substr: string): string {
	return str.split(substr)[0];
}

/**
 *
 * Check if value is of type object.
 * @export
 * @param {*} value
 * @returns {boolean}
 */
export function isObject(value: any): boolean {
	if (typeof value === 'object' && value !== null) {
		return true;
	}

	return false;
}

/**
 *
 * Check if value is not empty
 * @export
 * @param {*} value
 * @returns {boolean}
 */
export function isNotEmpty(value: any): boolean {
	return !isEmpty(value);
}

/**
 * Clone class instance
 *
 * @export
 * @template T
 * @param {T} instance
 * @returns {T}
 */
export function clone<T>(instance: T): T {
	const copy = new (instance.constructor as { new (): T })();

	Object.assign(copy, instance);

	return copy;
}

/**
 *
 *
 * @export
 * @param {any[]} arr
 * @param {(string | number)} fn
 * @returns
 */
export function groupBy(arr: any[], fn: string | number) {
	return arr
		.map(typeof fn === 'function' ? fn : val => val[fn])
		.reduce(
			(
				acc: { [x: string]: any },
				val: string | number,
				i: string | number,
			) => {
				acc[val] = (acc[val] || []).concat(arr[i]);
				return acc;
			},
			{},
		);
}

interface ISlugifyOptions {
	lowercase?: boolean;
	trim?: boolean;
	separator?: string;
}

/**
 *
 *
 * @export
 * @param {string} str
 * @param {ISlugifyOptions} [options={ lowercase: true, separator: '-', trim: true }]
 * @return {*}  {string}
 */
export function slugify(
	str: string,
	options: ISlugifyOptions = { lowercase: true, separator: '-', trim: true },
): string {
	const value = str
		.toString()
		.normalize('NFD') // split an accented letter in the base letter and the acent
		.replace(/[\u0300-\u036f]/g, ''); // remove all previously split accents
	if (options.lowercase) value.toLowerCase();
	if (options.trim) value.trim();

	return value
		.replace(/[^a-z0-9 -]/g, '') // remove all chars not letters, numbers and spaces (to be replaced)
		.toLowerCase()
		.trim()
		.replace(/\s+/g, options.separator);
}

/**
 *
 * Check if passed variable if a type of Function
 * @export
 * @param {unknown} value
 * @returns {Boolean}
 */
export function isFunction(value: unknown): Boolean {
	return typeof value === 'function';
}

/**
 * Run if function,
 * else return undefined
 * @param value
 */
export function runIfFunction(value: any, defaultVal: any) {
	if (isFunction(value)) return value();

	return defaultVal || null;
}

/**
 *
 *
 * @export
 * @param {Record<string, any>} obj
 * @returns {Record<string, any>}
 */
export function invertObj(obj: Record<string, any>): Record<string, any> {
	const newObj = {};

	for (const prop in obj) {
		if (obj.hasOwnProperty(prop)) {
			newObj[obj[prop]] = prop;
		}
	}

	return newObj;
}

/**
 *
 *
 * @export
 * @param {*} [params={} || '']
 * @return {*}  {string}
 */
export function stringifyQueryParams(params: any = {} || ''): string {
	return new URLSearchParams(params).toString();
}

/**
 *
 *
 * @export
 * @param {number} [length=6]
 * @return {*}  {String}
 */
export function generateRandomString(length: number = 6): String {
	return Math.random().toString(20).substr(2, length);
}

/**
 *
 *
 * @export
 * @param {*} str
 * @param {Record<string,any>} mix
 * @return {*}
 */
export function template(str: any, mix: Record<string, any>): any {
	const RGX = /{{(.*?)}}/g;

	return str.replace(RGX, (x: number, key: any, y: Record<string, any>) => {
		x = 0;
		y = mix;
		key = key.trim().split('.');
		while (y && x < key.length) {
			y = y[key[x++]];
		}
		return y != null ? y : '';
	});
}
