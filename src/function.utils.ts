import { sub } from 'date-fns';
import validator from 'validator';
import * as crypto from 'crypto';
import * as fs from 'fs';

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
 * loadsh pick implementation
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
 * omit keys from object
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
	fns.reduce((f, g) => (...args: any) => g(f(...args)));
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
	if (validator.isBoolean(val)) {
		return JSON.parse(val.toLowerCase());
	} else if (validator.isNumeric(val)) {
		return parseFloat(val);
	}
	// for string no parsing required

	return val;
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
 */
export function encrypt(text: string, config: { key: string; iv: string }) {
	let cipher = crypto.createCipheriv('aes-256-cbc', config.key, config.iv);
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
 */
export function decrypt(
	encrypted: string,
	config: { key: string; iv: string },
) {
	let decipher = crypto.createDecipheriv(
		'aes-256-cbc',
		config.key,
		config.iv,
	);
	let decrypted = decipher.update(encrypted, 'base64', 'utf8');
	return decrypted + decipher.final('utf8');
}

export const readFile = function (path: string) {
	return new Promise((resolve, reject) => {
		fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
			if (err) {
				reject(err);
			} else {
				resolve(html);
			}
		});
	});
};
