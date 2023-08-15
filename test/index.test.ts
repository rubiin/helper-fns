import {
  capitalizeEveryWord,
  enumToString, fixedDecimal,
  isEmpty,
  omit, orderedToken, pick, randomHex, randomNumber, randomString, strAfter,
  strBefore,
  sumOfAnArray,
  unescapeHTML,
} from '../src/'

describe('orderedToken', () => {
  it('should generate ordered token ', () => {
    const tokenFormat = 'PY-XXXX'
    expect(orderedToken(tokenFormat)).not.toContain('X')
  })
})

describe('enumToString', () => {
  it('should convert enum to string ', () => {
    enum SomeEnum {
      Yes,
      No,
      Maybe,
    }

    expect(enumToString(SomeEnum)).toEqual(['Yes', 'No', 'Maybe'])
  })
})

describe('isEmpty', () => {
  it('should be empty', () => {
    const cases = [[], '', {}]
    for (const c of cases) expect(isEmpty(c)).toBe(true)
  })

  it('should not be empty', () => {
    const cases = [[1, 2], { a: 1, b: 2 }, 123, true]
    for (const c of cases) expect(isEmpty(c)).toBe(false)
  })
})

describe('pick', () => {
  it('should pick', () => {
    expect(pick({ a: 1, b: 2 }, ['a'])).toEqual({ a: 1 })
    expect(pick({ a: false, b: 2 }, ['a'])).toEqual({ a: false })
  })
})

describe('randomHex', () => {
  it('should generate random hex', () => {
    expect(randomHex(6)).toHaveLength(6)
  })
})

describe('omit', () => {
  it('should omit', () => {
    expect(omit({ a: 1, b: 2 }, ['a'])).toEqual({ b: 2 })
    expect(omit({ a: false, b: 2 }, ['b'])).toEqual({ a: false })
  })
})

describe('sumOfArray', () => {
  it('should omit', () => {
    expect(sumOfAnArray([1, 2, 3, 4])).toEqual(10)
    expect(sumOfAnArray([1, 2, 3, 4])).toEqual(10)
  })
})

describe('fixedDecimal', () => {
  it('should return fixed decimal', () => {
    expect(fixedDecimal(3.141525, 3).toString()).toEqual('3.141')
  })
})

describe('capitalizeEveryWord', () => {
  it('should capitalize every word', () => {
    expect(capitalizeEveryWord('hello world!')).toEqual('Hello World!')
  })
})

describe('strBefore', () => {
  it('should get string before a given string against a string', () => {
    expect(strBefore('pineapple', 'apple')).toEqual('pine')
  })
})

describe('strAfter', () => {
  it('should get string after a given string against a string', () => {
    expect(strAfter('pineapple', 'pine')).toEqual('apple')
  })
})

describe('randomNumber', () => {
  it('should generate random number between two numbers', () => {
    expect(randomNumber(0, 6)).toBeGreaterThanOrEqual(0)
  })
})

describe('randomString', () => {
  it('should generate random string of given length', () => {
    expect(randomString({ length: 9 }).length).toEqual(9)
  })
})

describe('unescapeHTML', () => {
  it('should unescape html', () => {
    expect(
      unescapeHTML('&lt;a href=&quot;#&quot;&gt;Me &amp; you&lt;/a&gt;'),
    ).toEqual('<a href="#">Me & you</a>')
  })
})
