import { copyObject, enumToString, groupBy, invertObject, isKeyOf, objectArrayToArray, omit, pick, pluck, removeNull, removeUndefined, renameKeys } from "../src"

describe("copyObject", () => {
  it("should return a copy of the input object", () => {
    const object = { foo: "bar" }
    const result = copyObject(object)

    expect(result).toEqual(object) // Check if the returned object is equal to the input object
    expect(result).not.toBe(object) // Check if the returned object is not the same reference as the input object
  })
})

describe("enumToString", () => {
  enum MyEnum {
    Value1 = "Value 1",
    Value2 = "Value 2",
    Value3 = "Value 3",
  }

  it("should return an array of strings representing the enum values", () => {
    const result = enumToString(MyEnum)
    const expected = ["Value 1", "Value 2", "Value 3"].toString()

    expect(result).toEqual(expected) // Check if the returned array matches the expected array
  })
})

describe("groupBy", () => {
  it("should group an array by the specified property", () => {
    const array = [
      { id: 1, category: "A" },
      { id: 2, category: "B" },
      { id: 3, category: "A" },
      { id: 4, category: "C" }
    ]

    const result = groupBy(array, "category")
    const expected = {
      A: [
        { id: 1, category: "A" },
        { id: 3, category: "A" }
      ],
      B: [
        { id: 2, category: "B" }
      ],
      C: [
        { id: 4, category: "C" }
      ]
    }

    expect(result).toEqual(expected) // Check if the returned groups match the expected groups
  })
})

describe("invertObject", () => {
  it("should return an inverted object with keys and values swapped", () => {
    const object = {
      key1: "value1",
      key2: "value2"
    }

    const result = invertObject(object)
    const expected = {
      value1: "key1",
      value2: "key2"
    }

    expect(result).toEqual(expected) // Check if the returned inverted object matches the expected inverted object
  })
})

describe("isKeyOf", () => {
  interface TestInterface {
    key1: string;
    key2: number;
  }

  it("should return true if the specified key exists in the object", () => {
    const object: TestInterface = { key1: "value1", key2: 2 }
    const result = isKeyOf(object, "key1")

    expect(result).toBe(true) // Check if the returned value is true
  })

  it("should return false if the specified key does not exist in the object", () => {
    const object: TestInterface = { key1: "value1", key2: 2 }
    const result = isKeyOf(object, "key3")

    expect(result).toBe(false) // Check if the returned value is false
  })
})

describe("objectArrayToArray", () => {
  interface TestInterface {
    id: number;
    name: string;
  }

  it("should extract values of a specific attribute from an array of objects", () => {
    const objectArray: TestInterface[] = [
      { id: 1, name: "John" },
      { id: 2, name: "Jane" }
    ]

    const result = objectArrayToArray(objectArray, "name")
    const expected = ["John", "Jane"]

    expect(result).toEqual(expected) // Check if the returned array matches the expected array
  })
})

describe("omit", () => {
  it("should return a new object without the specified keys", () => {
    const object = {
      key1: "value1",
      key2: "value2",
      key3: "value3"
    }

    const result = omit(object, ["key1", "key3"])
    const expected = {
      key2: "value2"
    }

    expect(result).toEqual(expected) // Check if the returned object matches the expected object
  })
})

describe("pick", () => {
  it("should return a new object with only the specified keys", () => {
    const object = {
      key1: "value1",
      key2: "value2",
      key3: "value3"
    }

    const result = pick(object, ["key1", "key3"])
    const expected = {
      key1: "value1",
      key3: "value3"
    }

    expect(result).toEqual(expected) // Check if the returned object matches the expected object
  })
})

describe("pluck", () => {
  it("should return an array of values of the specified property from each object in the array", () => {
    const array = [
      { id: 1, name: "John" },
      { id: 2, name: "Jane" }
    ]

    const result = pluck(array, "name")
    const expected = ["John", "Jane"]

    expect(result).toEqual(expected) // Check if the returned array matches the expected array
  })
})

describe("removeNull", () => {
  it("should return a new object without null values", () => {
    const object = {
      key1: "value1",
      // eslint-disable-next-line unicorn/no-null
      key2: null,
      key3: "value3"
    }

    const result = removeNull(object)
    const expected = {
      key1: "value1",
      key3: "value3"
    }

    expect(result).toEqual(expected) // Check if the returned object matches the expected object
  })
})

describe("removeUndefined", () => {
  it("should mutate the object and remove undefined fields", () => {
    const object = {
      key1: "value1",
      key2: undefined,
      key3: "value3"
    }

    const result = removeUndefined(object)
    const expected = {
      key1: "value1",
      key3: "value3"
    }

    expect(result).toEqual(expected) // Check if the mutated object matches the expected object
  })
})

describe("renameKeys", () => {
  it("should return a new object with keys renamed according to the keysMap", () => {
    const keysMap = {
      key1: "newKey1",
      key3: "newKey3"
    }

    const object = {
      key1: "value1",
      key2: "value2",
      key3: "value3"
    }

    const result = renameKeys(keysMap, object)
    const expected = {
      newKey1: "value1",
      key2: "value2",
      newKey3: "value3"
    }

    expect(result).toEqual(expected) // Check if the returned object matches the expected object
  })
})
