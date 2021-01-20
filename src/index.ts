// check if object is empty

export const isObjectEmpty = (obj: any): boolean => {
	return Object.keys(obj).length === 0;
};

// remove empty

export function removeEmpty(
	obj: { [s: string]: unknown } | ArrayLike<unknown>,
) {
	return Object.entries(obj).reduce(
		(a, [k, v]) => (v === null ? a : { ...a, [k]: v }),
		{},
	);
}

// loadsh pick implementation

export function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
	const ret: any = {};

	keys.forEach(key => {
		ret[key] = obj[key];
	});

	return ret;
}

// this is for lodash memoize function

export function resolverArgs(...args: any[]): string {
	return JSON.stringify(args);
}

// sum of array

export function sumOfAnArray(arr: number[], initialValue = 0): number {
	return arr.reduce((a, b) => a + b, initialValue);
}

// unique

export function unique(values: Iterable<unknown>): Iterable<unknown> {
	return [...new Set(values)];
}

// memoize a function

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

// omit keys from object

export function omit(obj: { [x: string]: any }, arr: string | string[]) {
	Object.keys(obj)
		.filter(k => !arr.includes(k))
		.reduce((acc, key) => ((acc[key] = obj[key]), acc), {});
}

// order by a key

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

// pipe functions
export function pipeFunctions(...fns: any[]) {
	fns.reduce((f, g) => (...args: any) => g(f(...args)));
}

// pluck
export function pluck(arr: any[], key: string | number) {
	return arr.map(i => i[key]);
}

// rename object keys

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
