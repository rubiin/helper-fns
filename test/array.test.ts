/* eslint-disable unicorn/consistent-function-scoping */
import { common, difference, drop, dropWhile, dropRight, flattenDeep, intersection, move, sample, sumOfAnArray, unique, compact, range, chunk, fill, equals, equalsIgnoreOrder, hasDuplicates, castArray } from "../src"

describe("castArray", () => {
  test("should return an array with a single value when a non-array value is passed", () => {
    expect(castArray(5)).toEqual([5])
    expect(castArray("test")).toEqual(["test"])
    expect(castArray({ key: "value" })).toEqual([{ key: "value" }])
  })

  test("should return the same array when an array value is passed", () => {
    const array = [1, 2, 3]
    expect(castArray(array)).toBe(array)
  })
})

describe("chunk", () => {
  it("should split an array into chunks of the specified size", () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]])
    expect(chunk(["a", "b", "c", "d"], 3)).toEqual([["a", "b", "c"], ["d"]])
    expect(chunk([true, false, true, false, true], 1)).toEqual([[true], [false], [true], [false], [true]])
  })

  it("should return an empty array if the input array is empty", () => {
    expect(chunk([], 3)).toEqual([])
  })

  it("should return an array with a single chunk if the chunk size is greater than or equal to the array length", () => {
    expect(chunk([1, 2, 3], 3)).toEqual([[1, 2, 3]])
    expect(chunk(["a", "b"], 2)).toEqual([["a", "b"]])
    expect(chunk([true], 1)).toEqual([[true]])
  })
})

describe("compact", () => {
  it("should remove falsy values from the array", () => {
    // eslint-disable-next-line unicorn/no-null
    const input = [0, 1, false, true, "", "hello", null, undefined]
    const result = compact(input)

    expect(result).toEqual([1, true, "hello"])
  })

  it("should preserve truthy values in the array", () => {
    const input = [1, true, "hello", {}, [], 42]
    const result = compact(input)

    expect(result).toEqual([1, true, "hello", {}, [], 42])
  })

  it("should return an empty array if all values are falsy", () => {
    // eslint-disable-next-line unicorn/no-null
    const input = [0, false, "", null, undefined]
    const result = compact(input)

    expect(result).toEqual([])
  })

  it("should return a new array and not modify the original array", () => {
    const input = [1, 2, 3]
    const result = compact(input)

    expect(result).toEqual([1, 2, 3])
    expect(result).not.toBe(input)
  })
})

describe("common", () => {
  it("returns an array of common elements between two arrays", () => {
    const array1 = [1, 2, 3, 4, 5]
    const array2 = [4, 5, 6, 7, 8]
    expect(common(array1, array2)).toEqual([4, 5])
  })

  it("returns an empty array if there are no common elements", () => {
    const array1 = [1, 2, 3]
    const array2 = [4, 5, 6]
    expect(common(array1, array2)).toEqual([])
  })
})

describe("difference", () => {
  it("returns an array of elements in the first array but not in the second array", () => {
    const array1 = [1, 2, 3, 4, 5]
    const array2 = [4, 5, 6, 7, 8]
    expect(difference(array1, array2)).toEqual([1, 2, 3])
  })

  it("returns the original array if there are no elements in the second array", () => {
    const array1 = [1, 2, 3, 4, 5]
    const array2: number[] = []
    expect(difference(array1, array2)).toEqual([1, 2, 3, 4, 5])
  })
})

describe("drop", () => {
  it("drops n elements from the beginning of the array", () => {
    const array = [1, 2, 3, 4, 5]
    expect(drop(array, 2)).toEqual([3, 4, 5])
  })

  it("returns the original array if n is greater than or equal to the array length", () => {
    const array = [1, 2, 3]
    expect(drop(array, 5)).toEqual([])
    expect(drop(array, 3)).toEqual([])
  })
})

describe("dropWhile", () => {
  it("drops the elements from the beginning until the function returns false", () => {
    const array = [1, 2, 3, 4, 5]
    const function_ = (x: number) => x <= 3
    expect(dropWhile(array, function_)).toEqual([4, 5])
  })

  it("returns an empty array if the function returns true for all elements", () => {
    const array = [1, 2, 3, 4, 5]
    const function_ = (x: number) => x <= 10
    expect(dropWhile(array, function_)).toEqual([])
  })
})

describe("dropRight", () => {
  it("drops n elements from the end of the array", () => {
    const array = [1, 2, 3, 4, 5]
    expect(dropRight(array, 2)).toEqual([1, 2, 3])
  })

  it("returns the original array if n is greater than or equal to the array length", () => {
    const array = [1, 2, 3]
    expect(dropRight(array, 5)).toEqual([])
    expect(dropRight(array, 3)).toEqual([])
  })
})

describe("equals", () => {
  it("should return true when two arrays are equal", () => {
    const a = [1, 2, 3]
    const b = [1, 2, 3]

    expect(equals(a, b)).toBe(true)
  })

  it("should return false when two arrays are not equal", () => {
    const a = [1, 2, 3]
    const b = [4, 5, 6]

    expect(equals(a, b)).toBe(false)
  })

  it("should return false when two arrays have different lengths", () => {
    const a = [1, 2, 3]
    const b = [1, 2]

    expect(equals(a, b)).toBe(false)
  })
})

describe("equalsIgnoreOrder", () => {
  it("should return true when two arrays are equal regardless of order", () => {
    const a = [1, 2, 3]
    const b = [3, 2, 1]

    expect(equalsIgnoreOrder(a, b)).toBe(true)
  })

  it("should return false when two arrays are not equal", () => {
    const a = [1, 2, 3]
    const b = [4, 5, 6]

    expect(equalsIgnoreOrder(a, b)).toBe(false)
  })

  it("should return false when two arrays have different lengths", () => {
    const a = [1, 2, 3]
    const b = [1, 2]

    expect(equalsIgnoreOrder(a, b)).toBe(false)
  })
})

describe("hasDuplicates", () => {
  it("should return true if the array contains duplicates", () => {
    const array = [1, 2, 3, 4, 5, 1]
    expect(hasDuplicates(array)).toBe(true)
  })

  it("should return false if the array does not contain duplicates", () => {
    const array = [1, 2, 3, 4, 5]
    expect(hasDuplicates(array)).toBe(false)
  })

  it("should return false for an empty array", () => {
    const array: number[] = []
    expect(hasDuplicates(array)).toBe(false)
  })
})

describe("flattenDeep", () => {
  it("flattens an array of arrays into a single array", () => {
    const array = [[1, 2, 3], [4, 5, 6]]
    expect(flattenDeep(array)).toEqual([1, 2, 3, 4, 5, 6])
  })

  it("returns an empty array if the input array is empty", () => {
    const array: unknown[] = []
    expect(flattenDeep(array)).toEqual([])
  })
})

describe("fill", () => {
  it("should fill the specified range of the array with the given value", () => {
    expect(fill([1, 2, 3, 4, 5], 8, 1, 4)).toEqual([1, 8, 8, 8, 5])
  })
})

describe("intersection", () => {
  it("returns an array of common elements between two arrays", () => {
    const array1 = [1, 2, 3, 4, 5]
    const array2 = [4, 5, 6, 7, 8]
    expect(intersection(array1, array2)).toEqual([4, 5])
  })

  it("returns an empty array if there are no common elements", () => {
    const array1 = [1, 2, 3]
    const array2 = [4, 5, 6]
    expect(intersection(array1, array2)).toEqual([])
  })
})

describe("move", () => {
  it("moves an element from one position to another in the array", () => {
    const array = [1, 2, 3, 4, 5]
    expect(move(array, 1, 3)).toEqual([1, 3, 4, 2, 5])
  })

  it("returns the original array if from and to positions are the same", () => {
    const array = [1, 2, 3, 4, 5]
    expect(move(array, 2, 2)).toEqual([1, 2, 3, 4, 5])
  })
})

describe("sample", () => {
  it("returns random item(s) from the array", () => {
    const array = [1, 2, 3, 4, 5]
    const result = sample(array, 2)
    expect(result).toHaveLength(2)
    expect(array).toContain(result[0])
    expect(array).toContain(result[1])
  })

  it("returns an empty array if quantity is 0", () => {
    const array = [1, 2, 3, 4, 5]
    expect(sample(array, 0)).toEqual([])
  })
})

describe("sumOfAnArray", () => {
  it("returns the sum of an array of numbers", () => {
    const array = [1, 2, 3, 4, 5]
    expect(sumOfAnArray(array)).toBe(15)
  })

  it("returns the sum of an array of numbers with an initial value", () => {
    const array = [1, 2, 3, 4, 5]
    expect(sumOfAnArray(array, 10)).toBe(25)
  })

  it("returns the initial value if the array is empty", () => {
    const array: number[] = []
    expect(sumOfAnArray(array, 10)).toBe(10)
  })
})

describe("unique", () => {
  it("returns an iterable of unique values from the given iterable", () => {
    const values = [1, 2, 2, 3, 4, 4, 5]
    const uniqueValues = unique(values)
    expect([...uniqueValues]).toEqual([1, 2, 3, 4, 5])
  })

  it("returns an empty array if the input iterable is empty", () => {
    const values: number[] = []
    const uniqueValues = unique(values)
    expect([...uniqueValues]).toEqual([])
  })
})

describe("range", () => {
  it("should return an array with numbers up to the specified length", () => {
    const result = range(5)

    expect(result).toEqual([0, 1, 2, 3, 4])
  })

  it("should handle zero as the length parameter", () => {
    const result = range(0)

    expect(result).toEqual([])
  })

  it("should handle negative length parameter by returning an empty array", () => {
    const result = range(-5)

    expect(result).toEqual([])
  })

  it("should return an empty array if NaN is passed as the length", () => {
    const result = range(Number.NaN)

    expect(result).toEqual([])
  })
})
