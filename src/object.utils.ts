/**
 * It creates a new instance of the same type as the given instance, copies all the properties of the
 * given instance to the new instance, and returns the new instance
 * @param instance - The instance to clone.
 * @returns A new instance of the same class as the instance passed in.
 */
export function copyObject(instance: object): object {
  const copy = {};

  Object.assign(copy, instance);

  return copy;
}
/**
 * It takes an enum and returns an array of strings
 * @param _enum - The enum you want to convert to a string array.
 * @returns An array of strings
 */

export function enumToString<T extends Record<string, string>>(_enum: T): string {
  return Object.keys(_enum)
    .map(key => _enum[key])
    .join(",");
}

/**
 * @param array - The array to query.
 * @param property - The property to group by.
 * @returns any[] - An array of objects grouped by the property.
 */
export function groupBy(array: any[], property: string): Record<string, any[]> {
  const groups: Record<string, any[]> = {};

  for (const item of array) {
    // eslint-disable-next-line ts/no-unsafe-assignment
    const propertyValue = item[property];

    if (!groups[propertyValue])
      groups[propertyValue] = [];

    groups[propertyValue].push(item);
  }

  return groups;
}

/**
 * @param object - The object to query.
 * @returns string[] - An array of the keys of the object.
 */
export function invertObject(object: Record<string, any>): Record<string, any> {
  const newObject: Record<string, any> = {};

  for (const property in object) {
    if (Object.prototype.hasOwnProperty.call(object, property))
      newObject[object[property]] = property;
  }

  return newObject;
}

/**
 * Type guard for any key, `k`.
 * Marks `k` as a key of `T` if `k` is in `obj`.
 * @param object object to query for key `k`
 * @param k key to check existence in `obj`
 * @returns `k` is a key of `T`
 */
export function isKeyOf<T extends object>(object: T, k: keyof any): k is keyof T {
  return k in object;
}

/**
 * "It takes an array of objects and returns an array of the values of a specific attribute of those
 * objects."
 *
 * Here's an example of how to use it:
 * @param objectArray - The array of objects you want to convert.
 * @param attribute - The attribute of the object you want to extract.
 * @returns An array of the values of the attribute passed in.
 */
export function objectArrayToArray<T>(objectArray: T[], attribute: keyof T): T[keyof T][] {
  return objectArray.map(element => element[attribute]);
}

/**
 * It takes an object and an array of keys, and returns a new object with the keys omitted
 * @param object - T - the object to omit keys from
 * @param keys - K[]
 * @returns : 1, b: 2 }
 */
export function omit<T extends object, K extends keyof T>(object: T, keys: K[]): Omit<T, K> {
  const omitted = { ...object };
  for (const key of keys) delete omitted[key];
  return omitted;
}

/**
 * It takes an object and an array of keys, and returns a new object with only those keys
 * @param object - T - the object to pick properties from
 * @param keys - K[]
 * @returns Pick<T, K>
 */
export function pick<T, K extends keyof T>(object: T, keys: K[]): Pick<T, K> {
  const returnValue: Pick<T, K> = {} as Pick<T, K>; // Initialize with an empty object

  for (const key of keys) returnValue[key] = object[key];

  return returnValue;
}
/**
 * Pluck takes an array of objects and returns an array of the values of a certain property in each
 * object
 * @param array - any[] - the array we want to pluck from
 * @param key - string | number
 * @returns [1, 2, 3]
 */
export function pluck<T, K extends keyof T>(array: T[], key: K): T[K][] {
  return array.map(item => item[key]);
}

/**
 * It sorts an array of objects by a list of properties, in the order specified
 * @param array - The array to sort
 * @param properties - The properties to sort by.
 * @param orders - An array of strings that specifies the order of sorting.
 */
export function orderBy<T extends object, K extends keyof T>(array: T[], properties: K[], orders: "asc" | "desc") {
  array.sort((a, b) => {
    for (const [index, property] of properties.entries()) {
      const order = orders[index] || "asc";

      const p1 = a[property];
      const p2 = b[property];

      if (p1 !== p2)
        return order === "asc" ? (p1 > p2 ? 1 : -1) : (p1 < p2 ? 1 : -1);
    }
    return 0;
  });
}

/**
 * It takes an object and returns a new object with all the null values removed
 * @param object - Record<string, any>
 * @returns An object with all the keys and values that are not null.
 */
export function removeNull(object: Record<string, any>) {
  const newObject: Record<string, unknown> = {};

  for (const [k, v] of Object.entries(object)) {
    if (v !== null)
      newObject[k] = v;
  }

  return newObject;
}

/**
 *
 * remove undefined fields from an object. It mutates the object
 * @param object - T - the object to remove undefined fields from
 * @returns the object with all the undefined fields removed
 */
export function removeUndefined<T extends Record<string, any>>(object: T): T {
  for (const key in object) {
    if (object[key] === undefined)
      delete object[key];
  }

  return object;
}

/**
 * It takes an object and a map of keys to new keys, and returns a new object with the keys renamed
 * according to the map, while keeping the values intact
 * @param keysMap - Record<string, any>
 * @param object - The object to be renamed
 * @returns A new object with the keys renamed according to the map, while keeping the values intact
 */
export function renameKeys(keysMap: Record<string, any>, object: Record<string, any>): Record<string, any> {
  const renamedObject: Record<string, unknown> = {};

  for (const key in object) {
    // eslint-disable-next-line ts/no-unsafe-assignment
    const newKey = keysMap[key] ?? key;
    renamedObject[newKey] = object[key];
  }

  return renamedObject;
}
