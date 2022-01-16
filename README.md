# js-utils

> JavaScript Utilities

# INSTALLAION

```
npm i @rubiin/js-utils
yarn add @rubiin/js-utils

```

Common JavaScript packages and utilities used across my projects.

# isEmpty

Checks if the a value is an empty object/collection, has no enumerable properties or is any type that is not considered a collection.

```js
isEmpty([]); // true
isEmpty({}); // true
isEmpty(''); // true
isEmpty([1, 2]); // false
isEmpty({ a: 1, b: 2 }); // false
isEmpty('text'); // false
isEmpty(123); // true - type is not considered a collection
isEmpty(true); // true - type is not considered a collection
```

# pick

Picks the key-value pairs corresponding to the given keys from an object.

```js
pick({ a: 1, b: '2', c: 3 }, ['a', 'c']); // { 'a': 1, 'c': 3 }
```

# omit

Omits the key-value pairs corresponding to the given keys from an object.

```js
omit({ a: 1, b: '2', c: 3 }, ['b']); // { 'a': 1, 'c': 3 }
```

# sumOfAnArray

Calculates the sum of two or more numbers/arrays.

```js
sumOfAnArray(1, 2, 3, 4); // 10
sumOfAnArray(...[1, 2, 3, 4]); // 10
```

# memoize

Returns the memoized (cached) function.

```js
// See the `anagrams` snippet.
const anagramsCached = memoize(anagrams);
anagramsCached('javascript'); // takes a long time
anagramsCached('javascript'); // returns virtually instantly since it's cached
console.log(anagramsCached.cache); // The cached anagrams map
```

# pipeFunctions

Performs left-to-right function composition.

```js
const add5 = x => x + 5;
const multiply = (x, y) => x * y;
const multiplyAndAdd5 = pipeFunctions(multiply, add5);
multiplyAndAdd5(5, 2); // 15
```

# renameKeys

Replaces the names of multiple object keys with the values provided.

```js
const obj = { name: 'Bobo', job: 'Front-End Master', shoeSize: 100 };
renameKeys({ name: 'firstName', job: 'passion' }, obj);
// { firstName: 'Bobo', passion: 'Front-End Master', shoeSize: 100 }
```

# objectArrayToArray

Creates an array of key-value pair arrays from an object.

```js
objectToEntries({ a: 1, b: 2 }); // [ ['a', 1], ['b', 2] ]
```

# clone

Creates a shallow clone of value.

```js
var objects = [{ a: 1 }, { b: 2 }];

var shallow = clone(objects);
console.log(shallow[0] === objects[0]);
```

# subtractDate

Subtract the following duration from 15 June 2017 15:29:20

```js
const result = subtractDate(new Date('2017-01-01),'years',2)
// Mon Sep 1 2015 10:19:50

```

# difference

Calculates the difference between two arrays, without filtering duplicate values.

```js
difference([1, 2, 3, 3], [1, 2, 4]); // [3, 3]
```

# union

Returns every element that exists in any of the two arrays at least once.

```js
union([1, 2, 3], [4, 3, 2]); // [1, 2, 3, 4]
```

# isDate

Checks if gicen string is date

```js
console.log(isDate('not-date'));
// false

console.log(isDate('2019-01-10'));
// true
```

# groupBy

Groups the elements of an array based on the given function.

```js
groupBy([6.1, 4.2, 6.3], Math.floor); // {4: [4.2], 6: [6.1, 6.3]}
groupBy(['one', 'two', 'three'], 'length'); // {3: ['one', 'two'], 5: ['three']}
```

# orderBy

Sorts an array of objects, ordered by properties and orders.

```js
const users = [
	{ name: 'fred', age: 48 },
	{ name: 'barney', age: 36 },
	{ name: 'fred', age: 40 },
];
orderBy(users, ['name', 'age'], ['asc', 'desc']);
// [{name: 'barney', age: 36}, {name: 'fred', age: 48}, {name: 'fred', age: 40}]
orderBy(users, ['name', 'age']);
// [{name: 'barney', age: 36}, {name: 'fred', age: 40}, {name: 'fred', age: 48}]
```

# randomNumber

Generates random mnumber of giben length

```js
console.log(randomNumber(6));
// 195315
```

# randomString

Generates random string of giben length

```js
console.log(randomString(6));
// a1t4ry
```

# randomToken

# strAfter

Get string after a substring

```js
strAfter('pineapple', 'pine'); // apple
```

# strBefore

Get string before a substring

```js
strBefore('pineapple', 'apple'); // pine
```

# isNotEmpty

Checks if the a value is not an empty object/collectiom

```js
isNotEmpty([]); // false
isNotEmpty({}); // false
isNotEmpty(''); // false
isNotEmpty([1, 2]); // true
isNotEmpty({ a: 1, b: 2 }); // true
isNotEmpty('text'); // true
```

# isObject

Checks if the passed value is an object or not.

```js
isObject([1, 2, 3, 4]); // true
isObject([]); // true
isObject(['Hello!']); // true
isObject({ a: 1 }); // true
isObject({}); // true
isObject(true); // false
```

# fixedDecimal

Get a number after truncating it from the decimal point. No round off is done

```js
fixedDecimal(3.141525, 3); // 3.141
```

# generateRandomString

Get a random string of defined length

```js
generateRandomString(6); // fd84bg
```

# slugify

Generate a slug from a string

```js
slugify('i love javascript'); // i-love

```

# template

```js
template('Hello, {{name}}!', { name: 'world' });
//=> Hello, world!

template('Howdy, {{0}}! {{1}}', ['partner', '🤠']);
//=> Howdy, partner! 🤠

template('foo: "{{foo}}"; bar: "{{bar}}";', { foo: 123 });
//=> foo: "123"; bar: "";

template(
	`
  Name: {{name.last}}, {{name.first}}
  Location: {{address.city}} ({{address.country}})
  Hobbies: {{hobbies.0}}, {{hobbies.1}}, {{hobbies.2}}
`,
	{
		name: {
			first: 'Luke',
			last: 'Edwards',
		},
		address: {
			city: 'Los Angeles',
			country: 'USA',
		},
		hobbies: ['eat', 'sleep', 'repeat'],
	},
);
```

# encrypt and decrypt

```
  console.log(encrypt('hello','32 bytes hex key','16 bytes hex iv'))
  // p5HX3eMlroLYJPhXr2zARg==

 console.log(decrypt('p5HX3eMlroLYJPhXr2zARg==','32 bytes hex key','16 bytes hex iv'))
// hello

```

## Contributing

Any types of contributions are welcome. Feel free to send pull requests or create issues.

## License

Licensed under [The MIT License](LICENSE).
