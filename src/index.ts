import { sub } from 'date-fns';
import validator from 'validator'

/**
 *
 *
 * @export
 * @param {*} obj
 * @returns {boolean}
 *
 * check if object is empty
 */
export function isObjectEmpty(obj: unknown): boolean {
	return Object.keys(obj).length === 0;
}

/**
 *
 *
 * @export
 * @param {({ [s: string]: unknown } | ArrayLike<unknown>)} obj
 * @returns
 *
 * remove empty
 *
 */
export function removeEmpty(
	obj: { [s: string]: unknown } | ArrayLike<unknown>,
) {
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
 * @param {...any[]} args
 * @returns {string}
 * 
 * this is for lodash memoize function
 */
export function resolverArgs(...args: any[]): string {
	return JSON.stringify(args);
}

/**
 *
 *
 * @export
 * @param {number[]} arr
 * @param {number} [initialValue=0]
 * @returns {number}
 */
export function sumOfAnArray(arr: number[], initialValue: number = 0): number {
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
 *
 * @export
 * @param {{ [x: string]: any }} obj
 * @param {(string | string[])} arr
 *
 * omit keys from object
 *
 */
export function omit(obj: { [x: string]: any }, arr: string | string[]) {
	return Object.keys(obj)
		.filter(k => !arr.includes(k))
		.reduce((acc, key) => ((acc[key] = obj[key]), acc), {});
}

/**
 *
 *
 * @export
 * @param {*} arr
 * @param {any[]} props
 * @param {{ [x: string]: string }} orders
 *
 * order by a key
 *
 */
export function orderBy(
	arr: any,
	props: any[],
	orders: { [x: string]: string },
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
 * @param {...any[]} fns
 */
export function pipeFunctions(...fns: any[]) {
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

//

/**
 *
 *
 * @export
 * @param {{ [x: string]: any }} keysMap
 * @param {{ [x: string]: any }} obj
 *
 * rename object keys
 */
export function renameKeys(
	keysMap: { [x: string]: any },
	obj: { [x: string]: any },
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


export function autoParseValues(val: string): string | number | boolean {
	if (validator.isBoolean(val)) {
		return JSON.parse(val.toLowerCase());
	} else if (validator.isNumeric(val)) {
		return parseFloat(val);
	}
	// for string no parsing required

	return val;
}