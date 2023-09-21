import { capitalize, capitalizeEveryWord, chop, ensurePrefix, ensureSuffix, lowerFirst, normalizeEmail, randomHex, randomNumber, slash, slugify, stringBefore, stringifyQueryParameters, template, uncapitalize, unescapeHTML } from "../src";

describe("capitalizeEveryWord", () => {
  it("should capitalize the first letter of every word in a sentence", () => {
    const result = capitalizeEveryWord("hello world");
    expect(result).toBe("Hello World");
  });

  it("should handle empty strings", () => {
    const result = capitalizeEveryWord("");
    expect(result).toBe("");
  });

  it("should not change the capitalization of already capitalized letters", () => {
    const result = capitalizeEveryWord("Hello World");
    expect(result).toBe("Hello World");
  });

  it("should handle punctuation marks correctly", () => {
    const result = capitalizeEveryWord("the quick, brown fox!");
    expect(result).toBe("The Quick, Brown Fox!");
  });
});

describe("capitalize", () => {
  it("should capitalize the first character and convert the rest to lowercase", () => {
    const result = capitalize("hello World");
    expect(result).toBe("Hello world");
  });

  it("should handle empty strings", () => {
    const result = capitalize("");
    expect(result).toBe("");
  });
});

describe("chop", () => {
  it("should remove leading and trailing special characters, punctuation, and whitespace", () => {
    const result = chop("@!#   abc123   *&^%$");
    expect(result).toBe("abc123");
  });

  it("should handle empty strings", () => {
    const result = chop("");
    expect(result).toBe("");
  });

  it("should handle non-string inputs", () => {
    const result = chop(123);
    expect(result).toBe("");
  });
});

describe("ensureSuffix", () => {
  it("should add the suffix if it is not already present", () => {
    const result = ensureSuffix(".txt", "file");
    expect(result).toBe("file.txt");
  });

  it("should not change the string if the suffix is already present", () => {
    const result = ensureSuffix(".txt", "file.txt");
    expect(result).toBe("file.txt");
  });
});

describe("ensurePrefix", () => {
  it("should add the prefix if it is not already present", () => {
    const result = ensurePrefix("https://", "example.com");
    expect(result).toBe("https://example.com");
  });

  it("should not change the string if the prefix is already present", () => {
    const result = ensurePrefix("https://", "https://example.com");
    expect(result).toBe("https://example.com");
  });
});

describe("lowerFirst", () => {
  it("should convert the first character to lowercase", () => {
    const result = lowerFirst("Hello World");
    expect(result).toBe("hello World");
  });

  it("should handle empty strings", () => {
    const result = lowerFirst("");
    expect(result).toBe("");
  });
}); // Replace <file-name> with the actual file name where the functions are defined

describe("normalizeEmail", () => {
  it("should normalize the email address by removing dots and converting to lowercase", () => {
    const result = normalizeEmail("john.doe@example.com");
    expect(result).toBe("johndoe@example.com");
  });

  it("should handle plus signs in the email address", () => {
    const result = normalizeEmail("john+test@example.com");
    expect(result).toBe("john@example.com");
  });
});

describe("randomHex", () => {
  it("should generate a random hex string of the specified size", () => {
    const result = randomHex(8);
    expect(result).toMatch(/^[\da-f]{8}$/);
  });

  it("should handle zero size", () => {
    const result = randomHex(0);
    expect(result).toBe("");
  });
}); // Replace <file-name> with the actual file name where the functions are defined

describe("randomNumber", () => {
  it("should generate a random number between the specified range", () => {
    const result = randomNumber(1, 10);
    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(10);
    expect(Number.isInteger(result)).toBe(true);
  });

  it("should handle no arguments and default to the range [1, 9]", () => {
    const result = randomNumber();
    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(9);
    expect(Number.isInteger(result)).toBe(true);
  });
});

describe("stringBefore", () => {
  it("should return the part of the string before the first occurrence of the given substring", () => {
    const result = stringBefore("Hello World", "o");
    expect(result).toBe("Hell");
  });

  it("should return the whole string if the substring is not found", () => {
    const result = stringBefore("Hello World", "x");
    expect(result).toBe("Hello World");
  });
});

describe("slugify", () => {
  it("should convert a string into a URL-friendly slug", () => {
    const result = slugify("Hello World!", { separator: "_" });
    expect(result).toBe("hello_world");
  });

  it("should handle special characters and spaces", () => {
    const result = slugify("Héllö Wörld!", { separator: "-" });
    expect(result).toBe("hello-world");
  });

  it("should handle an empty string", () => {
    const result = slugify("");
    expect(result).toBe("");
  });
});

describe("slash", () => {
  it("should replace backslashes with slashes", () => {
    const result = slash("path\\to\\file");
    expect(result).toBe("path/to/file");
  });

  it("should handle an empty string", () => {
    const result = slash("");
    expect(result).toBe("");
  });
});

describe("stringifyQueryParameters", () => {
  it("should convert an object to query parameters string", () => {
    const result = stringifyQueryParameters({ key: "value", foo: "bar" });
    expect(result).toBe("key=value&foo=bar");
  });

  it("should handle an empty object", () => {
    const result = stringifyQueryParameters({});
    expect(result).toBe("");
  });

  it("should handle a string parameter", () => {
    const result = stringifyQueryParameters("key=value");
    expect(result).toBe("key=value");
  });
});

describe("template", () => {
  it("should replace placeholders in a string with corresponding values from the provided object", () => {
    const result = template("Hello, {{name}}!", { name: "John" });
    expect(result).toBe("Hello, John!");
  });

  it("should handle nested placeholders", () => {
    const result = template("{{user.name}}, {{user.age}} years old", {
      user: { name: "Alice", age: 30 },
    });
    expect(result).toBe("Alice, 30 years old");
  });

  it("should handle missing values and replace with an empty string", () => {
    const result = template("Hello, {{name}}!", {});
    expect(result).toBe("Hello, !");
  });

  it("should handle no placeholders", () => {
    const result = template("Hello, world!", { name: "John" });
    expect(result).toBe("Hello, world!");
  });
});

describe("unescapeHTML", () => {
  it("should replace HTML entities in a string with their corresponding characters", () => {
    const result = unescapeHTML("&lt;p&gt;Hello &amp; World!&lt;/p&gt;");
    expect(result).toBe("<p>Hello & World!</p>");
  });

  it("should handle an empty string", () => {
    const result = unescapeHTML("");
    expect(result).toBe("");
  });

  it("should handle strings without any HTML entities", () => {
    const result = unescapeHTML("Hello, World!");
    expect(result).toBe("Hello, World!");
  });
});


describe("uncapitalize", () => {
  it("should uncapitalize the first letter of a string", () => {
    const input = "Hello";
    const expected = "hello";
    expect(uncapitalize(input)).toEqual(expected);
  });

  it("should handle a string with only one character", () => {
    const input = "A";
    const expected = "a";
    expect(uncapitalize(input)).toEqual(expected);
  });

  it("should uncapitalize the first letter and make the rest uppercase when upperRest is set to true", () => {
    const input = "wORLD";
    const expected = "wORLD";
    expect(uncapitalize(input, true)).toEqual(expected);
  });

  it("should keep the rest of the string as lowercase when upperRest is set to false", () => {
    const input = "hELLO WORLD";
    const expected = "hello world";
    expect(uncapitalize(input, false)).toEqual(expected);
  });
});
