import {
	isEmpty,
	isDate,
	pick,
	omit,
	sumOfAnArray,
	pipes as pipeFunctions,
	fixedDecimal,
	generateRandomString,
	slugify,
	capitalizeEveryWord,
	unescapeHTML,
	strBefore,
	strAfter,
	randomNumber,
} from '../src/';

describe('isEmpty', () => {
	it('should be empty', () => {
		const cases = [[], '', {}];
		for (const c of cases) {
			expect(isEmpty(c)).toBe(true);
		}
	});

	it('should not be empty', () => {
		const cases = [[1, 2], { a: 1, b: 2 }, 123, true];
		for (const c of cases) {
			expect(isEmpty(c)).toBe(false);
		}
	});
});

describe('pick', () => {
	it('should pick', () => {
		expect(pick({ a: 1, b: 2 }, ['a'])).toEqual({ a: 1 });
		expect(pick({ a: false, b: 2 }, ['a'])).toEqual({ a: false });
	});
});

describe('omit', () => {
	it('should omit', () => {
		expect(omit({ a: 1, b: 2 }, ['a'])).toEqual({ b: 2 });
		expect(omit({ a: false, b: 2 }, ['b'])).toEqual({ a: false });
	});
});

// describe('isDate', () => {
// 	it('check if string is date', () => {
// 		expect(isDate('2020-01-01')).toBe(true);
// 		expect(isDate('some string')).toBe(false);
// 	});
// });

describe('sumOfArray', () => {
	it('should omit', () => {
		expect(sumOfAnArray([1, 2, 3, 4])).toEqual(10);
		expect(sumOfAnArray([1, 2, 3, 4])).toEqual(10);
	});
});

describe('pipeFunctions', () => {
	it('should pipe functions', () => {
		const add5 = x => x + 5;
		const multiply = (x, y) => x * y;
		const multiplyAndAdd5 = pipeFunctions(multiply, add5);
		expect(multiplyAndAdd5(5, 2)).toEqual(15);
	});
});

describe('fixedDecimal', () => {
	it('should return fixed decimal', () => {
		expect(fixedDecimal(3.141525, 3).toString()).toEqual('3.141');
	});
});

// describe('generateRandomString', () => {
// 	it('should generate random string of given length', () => {
// 		expect(generateRandomString(5).length).toEqual(5);
// 	});
// });



describe('capitalizeEveryWord', () => {
	it('should capitalize every word', () => {
		expect(capitalizeEveryWord('hello world!')).toEqual('Hello World!');
	});
});

describe('strBefore', () => {
	it('should get string before a given string against a string', () => {
		expect(strBefore('pineapple', 'apple')).toEqual('pine');
	});
});

describe('strAfter', () => {
	it('should get string after a given string against a string', () => {
		expect(strAfter('pineapple', 'pine')).toEqual('apple');
	});
});

// describe('randomNumber', () => {
// 	it('should generate random number', () => {
// 		expect(randomNumber(6).toString().length).toEqual(6);
// 	});
// });

describe('unescapeHTML', () => {
	it('should unescape html', () => {
		expect(
			unescapeHTML('&lt;a href=&quot;#&quot;&gt;Me &amp; you&lt;/a&gt;'),
		).toEqual('<a href="#">Me & you</a>');
	});
});
