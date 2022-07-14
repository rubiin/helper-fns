import * as crypto from 'crypto'
import * as fs from 'fs'

interface ISlugifyOptions {
  lowercase?: boolean
  trim?: boolean
  separator?: string
}

const DOT_REG = /\./g

/**
 *
 *
 * @export
 * @param {*} obj
 * @returns {boolean}
 *
 * check if object is empty
 */
export const isEmpty = (obj: any): boolean => {
  return (
    [Object, Array].includes((obj || {}).constructor)
		&& !Object.entries(obj || {}).length
  )
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
export const removeEmpty = (obj: Record<string, any> | ArrayLike<unknown>) => {
  return Object.entries(obj).reduce(
    (a, [k, v]) => (v === null ? a : { ...a, [k]: v }),
    {},
  )
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
export const pick = <T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
  const ret: any = {}

  keys.forEach((key) => {
    ret[key] = obj[key]
  })

  return ret
}

/**
 *
 *
 * @export
 * @param {...any[]} args
 * @returns {string}
 *
 * this is for lodash memoize
 */
export const resolverArgs = (...args: any[]): string => {
  return JSON.stringify(args)
}

/**
 *
 *
 * @export
 * @param {Array<number>} arr
 * @param {number} [initialValue=0]
 * @returns {number}
 */

export const sumOfAnArray = (
  arr: Array<number>,
  initialValue = 0,
): number => {
  return arr.reduce((a, b) => a + b, initialValue)
}

/**
 *
 *
 * @export
 * @param {Iterable<unknown>} values
 * @returns {Iterable<unknown>}
 */
export const unique = (values: Iterable<unknown>): Iterable<unknown> => {
  return [...new Set(values)]
}



/**
 * It takes an object and an array of keys, and returns a new object with the keys omitted
 * @param {T} obj - T - the object to omit keys from
 * @param {K[]} keys - K[]
 * @returns A function that takes a string and returns a string.
 */
export const omit = <T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> => {
  const _ = { ...obj }
  keys.forEach(key => delete _[key])
  return _
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
export const orderBy = (
  arr: any,
  props: any[],
  orders: Record<string, string>,
) => {
  [...arr].sort((a, b) =>
    props.reduce((acc, prop, i) => {
      if (acc === 0) {
        const [p1, p2]
					= orders && orders[i] === 'desc'
					  ? [b[prop], a[prop]]
					  : [a[prop], b[prop]]
        acc = p1 > p2 ? 1 : p1 < p2 ? -1 : 0
      }
      return acc
    }, 0),
  )
}

/**
 *
 *
 * @export
 * @param {...any[]} fns
 */
export const pipes = (...fns: any[]) => {
  return fns.reduce(
    (f, g) =>
      (...args: any) =>
        g(f(...args)),
  )
}

/**
 *
 *
 * @export
 * @param {any[]} arr
 * @param {(string | number)} key
 * @returns {any[]}
 */
export const pluck = (arr: any[], key: string | number): any[] => {
  return arr.map(i => i[key])
}

/**
 *
 * rename object keys
 *
 * @export
 * @param {Record<string, any>} keysMap
 * @param {Record<string, any>} obj
 */
export const renameKeys = (
  keysMap: Record<string, any>,
  obj: Record<string, any>,
) => {
  Object.keys(obj).reduce(
    (acc, key) => ({
      ...acc,
      ...{ [keysMap[key] || key]: obj[key] },
    }),
    {},
  )
}

/**
 *
 *
 * @export
 * @param {Array<unknown>} objectArray
 * @param {string} attr
 * @returns {Array<unknown>}
 */
export const objectArrayToArray = (
  objectArray: Array<unknown>,
  attr: string,
): Array<unknown> => {
  return objectArray.map((el: any) => {
    return el[attr]
  })
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
export const fixedDecimal = (num: number, fixed = 2): number => {
  const re = new RegExp(`^-?\\d+(?:.\\d{0,${fixed || -1}})?`)

  return parseFloat(num.toString().match(re)![0])
}

/**
 *
 *
 * @export
 * @param {string} val
 * @returns {(string | number | boolean)}
 */
export const autoParseValues = (val: string): string | number | boolean => {
  // check for boolean
  if (!!JSON.parse(val) === JSON.parse(val))
    return JSON.parse(val.toLowerCase())
	 else if (!isNaN(Number(val)))
    return parseFloat(val)

  // for string no parsing required

  return val
}

/**
 *
 *
 * @export
 * @param {any[]} arr
 * @return {*}  {any[]}
 */
export const flattenDeep = (arr: any[]): any[] => {
  return arr.flat(Infinity)
}

/**
 *
 * difference between array A and B , returns a - b
 *
 * @export
 * @param {any[]} a
 * @param {any[]} b
 * @returns {any[]}
 */
export const difference = (a: any[], b: any[]): any[] => {
  return a.filter(c => !b.includes(c))
}

/**
 *
 * common between array A and B , returns a includes b
 *
 * @export
 * @param {any[]} a
 * @param {any[]} b
 * @returns {any[]}
 */
export const common = (a: any[], b: any[]): any[] => {
  return a.filter(c => b.includes(c))
}

/**
 *
 *
 * @export
 * @param {string} str
 * @return {*}  {string}
 */
export const capitalize = (str: string): string => {
  return str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : ''
}

/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing.
 *
 * @param func a function
 * @param wait time to wait
 * @param immediate should it be called immediately
 */
export const debounce = (func: Function, wait: number, immediate?: boolean) => {
  let timeout: any
  return function (this: any) {
    const context = this
    const args = arguments
    const later = function () {
      timeout = null
      if (!immediate)
        func.apply(context, args)
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow)
      func.apply(context, args)
  }
}
/**
 *
 *
 * @export
 * @param {} callback
 * @return {*}  {number}
 */
export const timeTaken = (callback: Function): number => {
  console.time('timeTaken')
  const r = callback()
  console.timeEnd('timeTaken')
  return r
}

/**
 *
 *
 * @export
 * @param {string} str
 * @return {*}  {string}
 */
export const unescapeHTML = (str: string): string => {
  return str.replace(
    /&amp;|&lt;|&gt;|&#39;|&quot;/g,
    tag =>
      ({
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&#39;': '\'',
        '&quot;': '"',
      }[tag] || tag),
  )
}

/**
 * Throttling enforces a maximum number of times a function
 * can be called over time.
 *
 * @param func a function
 * @param wait time
 */
export const throttle = (func: Function, wait: number) => {
  let timeout: NodeJS.Timer | number | null = null
  let callbackArgs: IArguments | null = null
  const context = this

  const later = () => {
    func.apply(context, callbackArgs)
    timeout = null
  }

  return function () {
    if (!timeout) {
      callbackArgs = arguments
      timeout = setTimeout(later, wait)
    }
  }
}

/**
 *
 *
 * @export
 * @param {number} ms
 * @return {*}  {string}
 */
export const formatDuration = (ms: number): string => {
  if (ms < 0)
    ms = -ms
  const time = {
    day: Math.floor(ms / 86400000),
    hour: Math.floor(ms / 3600000) % 24,
    minute: Math.floor(ms / 60000) % 60,
    second: Math.floor(ms / 1000) % 60,
    millisecond: Math.floor(ms) % 1000,
  }
  return Object.entries(time)
    .filter(val => val[1] !== 0)
    .map(([key, val]) => `${val} ${key}${val !== 1 ? 's' : ''}`)
    .join(', ')
}

/**
 *
 *
 * @export
 * @param {string} str
 * @return {*}  {string}
 */
export const capitalizeEveryWord = (str: string): string => {
  return str.replace(/\b[a-z]/g, char => char.toUpperCase())
}

/**
 *
 *
 * @export
 * @param {string} str
 * @return {*}  {string}
 */
export const lowerFirst = (str: string): string => {
  return str ? str.charAt(0).toLowerCase() + str.slice(1) : ''
}

/**
 *
 *
 * @param {Array<unknown>} a
 * @param {Array<unknown>} b
 * @param {boolean} [duplicates=true]
 * @returns {Array<unknown>}
 */
export const union = (
  a: Array<unknown>,
  b: Array<unknown>,
  duplicates = true,
): Array<unknown> => {
  if (!duplicates)
    return Array.from(new Set([...a, ...b]))

  return Array.from([...a, ...b])
}

/**
 *
 * checks if a date in a format is valid or not
 *
 * @export
 * @param {string} dateString
 * @returns {boolean}
 */
export const isDate = (dateString: string): boolean => {
  return new Date(dateString) instanceof Date
}

/**
 *
 *
 * @export
 * @param {any[]} arr
 * @param {number} [n=1]
 * @return {*}  {any[]}
 */
export const dropRight = (arr: any[], n = 1): any[] => {
  return arr.slice(0, -n)
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
export const encrypt = (text: string, config: { key: string; iv: string }) => {
  const ENC_KEY = Buffer.from(config.key, 'hex') // set random encryption key
  const IV = Buffer.from(config.iv, 'hex') //
  const cipher = crypto.createCipheriv('aes-256-cbc', ENC_KEY, IV)
  let encrypted = cipher.update(text, 'utf8', 'base64')
  encrypted += cipher.final('base64')
  return encrypted
}

/**
 *
 *  converts enum to string array
 *
 * @export
 * @param {object} _enum
 */

export const enumToString = (_enum: Record<any,any>) => {
  Object.keys(_enum)
    .map(key => _enum[key])
    .filter(value => typeof value === 'string') as string[]
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
export const decrypt = (
  encrypted: string,
  config: { key: string; iv: string },
) => {
  
  const ENC_KEY = Buffer.from(config.key, 'hex') // set random encryption key
  const IV = Buffer.from(config.iv, 'hex') // set random initialization vector

  const decipher = crypto.createDecipheriv('aes-256-cbc', ENC_KEY, IV)
  const decrypted = decipher.update(encrypted, 'base64', 'utf8')
  return decrypted + decipher.final('utf8')
}

/**
 *
 *
 * @export
 * @param {string} path
 * @returns
 */
export const readFile = (path: string) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, { encoding: 'utf-8' }, (err, html) => {
      if (err)
        reject(err)
			 else
        resolve(html)
    })
  })
}

/**
 *
 * Helper to generate random number between two numbers
 *
 * @export
 * @param {number} [a=1]
 * @param {number} [b=9]
 * @return {*}  {number}
 */
export const randomNumber = (a = 1, b = 9): number => {
	  const lower = Math.ceil(Math.min(a, b))
  const upper = Math.floor(Math.max(a, b))
  return Math.floor(lower + Math.random() * (upper - lower + 1))
}

/**
 *
 * Helper to generate random string
 *
 * @export
 * @param {number} [length=4]
 * @returns
 */

export const randomString = (length = 4): string => {
  if (!length)
    return Math.random().toString(36).substr(2)

  let str = ''

  while (length > 0) {
    const tempStr = randomString().substring(0, length)

    length -= length >= tempStr.length ? tempStr.length : 0
    str = str + tempStr
  }

  return str
}


/**
 * It returns a random string of characters, concatenated with another random string of characters
 * @returns A function that returns a string of random characters.
 */
export const randomToken = () => {
  return randomString() + randomString()
}



/**
 * It replaces all instances of the identifier with a random number.
 * @param {string} str - The string  format you want to replace the tokens in.
 * @param [identifier=X] - The identifier that will be replaced with a random number.
 * @returns A string with all instances of the identifier replaced with a random number.
 */
 export const orderedToken = (str: string,identifier="X") => {
    while (str.includes(identifier)){
      str = str.replace(identifier, String(randomNumber()))
    }
    return str
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
export const strAfter = (str: string, substr: string): string => {
  return str.split(substr)[1]
}

/**
 * Get string before a substring
 * @param str
 * @param substr
 */
export const strBefore = (str: string, substr: string): string => {
  return str.split(substr)[0]
}

/**
 *
 * Check if value is not empty
 * @export
 * @param {*} value
 * @returns {boolean}
 */
export const isNotEmpty = (value: any): boolean => {
  return !isEmpty(value)
}

/**
 * Clone class instance
 *
 * @export
 * @template T
 * @param {T} instance
 * @returns {T}
 */
export const clone = <T extends {constructor: Function}>(instance: T): T => {
  const copy = new (instance.constructor as { new (): T })()

  Object.assign(copy, instance)

  return copy
}

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
    if (!acc[curr[prop]])
      acc[curr[prop]] = []

    acc[curr[prop]].push(curr)
    return acc
  }, {})
}

/**
 * Shuffle the elements array and return it. (mutative)
 *
 */
export const shuffle = <T>(array: T[]): T[] => {
  let m = array.length
  // While there remain elements to shuffle…
  while (m > 0) {
    // Pick a remaining element…
    const i = Math.floor(Math.random() * m--)
    // And swap it with the current element.
    const t = array[m]
    array[m] = array[i]
    array[i] = t
  }
  return array
}

/**
 *
 *
 * @export
 * @param {string} email
 * @return {*}
 */
export const normalizeEmail = (email: string): any => {
  const [name, host] = email.split('@')
  let [beforePlus] = name.split('+')
  beforePlus = beforePlus.replace(DOT_REG, '')
  const result = `${beforePlus.toLowerCase()}@${host.toLowerCase()}`
  Number(result)
  return result
}

/**
 *
 *
 * @export
 * @param {string} str
 * @param {ISlugifyOptions} [options={ lowercase: true, separator: '-', trim: true }]
 * @return {*}  {string}
 */
export const slugify = (
  str: string,
  options: ISlugifyOptions = { lowercase: true, separator: '-', trim: true },
): string => {
  const value = str
    .toString()
    .normalize('NFD') // split an accented letter in the base letter and the acent
    .replace(/[\u0300-\u036F]/g, '') // remove all previously split accents
  if (options.lowercase)
    value.toLowerCase()
  if (options.trim)
    value.trim()

  return value
    .replace(/[^a-z0-9 -]/g, '') // remove all chars not letters, numbers and spaces (to be replaced)
    .replace(/\s+/g, options.separator as string)
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
export const clearUndefined = <T extends Record<string,any>>(obj: T): T => {
  Object.keys(obj).forEach((key: string) =>
    obj[key] === undefined ? delete obj[key] : {},
  )
  return obj
}

/**
 * Replace backslash to slash
 *
 * @category String
 */
export const slash = (str: string) => {
  return str.replace(/\\/g, '/')
}

/**
 * Ensure prefix of a string
 *
 * @category String
 */
export const ensurePrefix = (prefix: string, str: string) => {
  if (!str.startsWith(prefix))
    return prefix + str
  return str
}

/**
 *
 *
 * @export
 * @param {Record<string, any>} obj
 * @returns {Record<string, any>}
 */
export const invertObj = (obj: Record<string, any>): Record<string, any> => {
  const newObj: Record<string,any> = {}

  for (const prop in obj) {
    if (obj.hasOwnProperty(prop))
      newObj[obj[prop]] = prop
  }

  return newObj
}

/**
 *
 *
 * @export
 * @param {*} [params={} || '']
 * @return {*}  {string}
 */
export const stringifyQueryParams = (params: any = {} || ''): string => {
  return new URLSearchParams(params).toString()
}

/**
 *
 *
 * @export
 * @param {number} [length=6]
 * @return {*}  {String}
 */
export const generateRandomString = (length = 6): String => {
  return Math.random().toString(20).substr(2, length)
}

/**
 *
 *
 * @export
 * @param {*} str
 * @param {Record<string,any>} mix
 * @return {*}
 */
export const template = (str: any, mix: Record<string, any>): any => {
  const RGX = /{{(.*?)}}/g

  return str.replace(RGX, (x: number, key: any, y: Record<string, any>) => {
    x = 0
    y = mix
    key = key.trim().split('.')
    while (y && x < key.length)
      y = y[key[x++]]

    return y != null ? y : ''
  })
}

// export const template(str: string, ...args: any[]): string {
// 	return str.replace(/{(\d+)}/g, (match, key) => {
// 		const index = Number(key);
// 		if (Number.isNaN(index)) return match;
// 		return args[index];
// 	});
// }
