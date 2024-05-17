import { autoParseValues, awaitTimeout, findRootPath, fixedDecimal, formatDuration, inRange, isDate, isEmpty, isSameDate, lerp, pipe, resolverArguments, timeTaken, timestamp } from "../src";

describe("awaitTimeout", () => {
  jest.useFakeTimers();

  it("should wait for the specified delay before resolving", async () => {
    const delay = 1000;
    const promise = awaitTimeout(delay);

    jest.advanceTimersByTime(delay);

    expect(await promise).toBeUndefined();
  });
});

describe("autoParseValues", () => {
  it("should return the parsed boolean value if valid", () => {
    expect(autoParseValues("true")).toBe(true);
    expect(autoParseValues("false")).toBe(false);
  });

  it("should return the parsed number value if valid", () => {
    expect(autoParseValues("10")).toBe(10);
    expect(autoParseValues("-5.7")).toBe(-5.7);
  });
});

describe("findRootPath", () => {
  it.skip("should return the root path when package.json is found in the path", () => {
    const rootPath = findRootPath();
    expect(rootPath).toBe(`${process.env.HOME}/helper-fns`);
  });

  it("should handle both string and string[] inputs correctly", () => {
    const rootPath1 = findRootPath("/path/to/package.json");
    const rootPath2 = findRootPath(["/path/to/", "package.json"]);

    expect(rootPath1).toBe(rootPath2);
  });
});

describe("fixedDecimal", () => {
  it("should return the number with the specified decimal places", () => {
    expect(fixedDecimal(3.141_59, 2)).toBe(3.14);
    expect(fixedDecimal(10.567_89, 3)).toBe(10.567);
    expect(fixedDecimal(99.9999, 4)).toBe(99.9999);
  });

  it("should return the same number if no decimal places are specified", () => {
    expect(fixedDecimal(3.141_59)).toBe(3.14);
    expect(fixedDecimal(10.567_89)).toBe(10.56);
    expect(fixedDecimal(99.9999)).toBe(99.99);
  });

  it("should handle negative numbers correctly", () => {
    expect(fixedDecimal(-3.141_59, 2)).toBe(-3.14);
    expect(fixedDecimal(-10.567_89, 3)).toBe(-10.567);
    expect(fixedDecimal(-99.9999, 4)).toBe(-99.9999);
  });
});

describe("formatDuration", () => {
  it("should format the duration into a human-readable string", () => {
    expect(formatDuration(86_400_000)).toBe("1 day");
    expect(formatDuration(3_723_000)).toBe("1 hour, 2 minutes, 3 seconds");
    expect(formatDuration(60_000)).toBe("1 minute");
    expect(formatDuration(5000)).toBe("5 seconds");
    expect(formatDuration(123)).toBe("123 milliseconds");
    // expect(formatDuration(0)).toBe("0 milliseconds")
  });
});

describe("inRange", () => {
  it("should return true if the number is within the specified range", () => {
    expect(inRange(5, 1, 10)).toBe(true);
    expect(inRange(-5, -10, 0)).toBe(true);
    expect(inRange(0, -5, 5)).toBe(true);
    expect(inRange(10, 10, 20)).toBe(true);
  });

  it("should return false if the number is outside the specified range", () => {
    expect(inRange(15, 1, 10)).toBe(false);
    expect(inRange(-15, -10, 0)).toBe(false);
    expect(inRange(6, -5, 5)).toBe(false);
    expect(inRange(5, 10, 20)).toBe(false);
  });
});

describe("isDate", () => {
  it("should return true for a valid date string", () => {
    const dateString = "2021-10-20";
    expect(isDate(dateString)).toBe(true);
  });

  it("should return false for an invalid date string", () => {
    const dateString = "Invalid Date";
    expect(isDate(dateString)).toBe(false);
  });

  it("should return false for a non-date string", () => {
    const dateString = "Hello World";
    expect(isDate(dateString)).toBe(false);
  });

  it("should return false when passed an empty string", () => {
    const dateString = "";
    expect(isDate(dateString)).toBe(false);
  });
});

describe("isEmpty", () => {
  it("should return true for empty objects or arrays", () => {
    expect(isEmpty({})).toBe(true);
    expect(isEmpty([])).toBe(true);
  });

  it("should return false for non-empty objects or arrays", () => {
    expect(isEmpty({ foo: "bar" })).toBe(false);
    expect(isEmpty([1, 2, 3])).toBe(false);
  });
});

describe("isSameDate", () => {
  it("should return true if the dates are the same", () => {
    const dateA = new Date("2022-01-01");
    const dateB = new Date("2022-01-01");
    const dateC = new Date("2022-01-02");

    expect(isSameDate(dateA, dateB)).toBe(true);
    expect(isSameDate(dateB, dateA)).toBe(true);
    expect(isSameDate(dateA, dateA)).toBe(true);

    expect(isSameDate(dateA, dateC)).toBe(false);
    expect(isSameDate(dateB, dateC)).toBe(false);
  });
});

describe("lerp", () => {
  it("should calculate the linear interpolation correctly", () => {
    expect(lerp(0.5, 0, 10)).toBe(5);
    expect(lerp(0.25, 0, 20)).toBe(5);
    expect(lerp(0.75, 0, 30)).toBe(22.5);
  });

  it("should handle negative numbers correctly", () => {
    expect(lerp(0.5, -10, 10)).toBe(0);
    expect(lerp(0.25, -20, 20)).toBe(-10);
    expect(lerp(0.75, -30, 30)).toBe(15);
  });

  it("should handle different start and end values correctly", () => {
    expect(lerp(0.5, 5, 15)).toBe(10);
    expect(lerp(0.25, 10, 30)).toBe(15);
    expect(lerp(0.75, 1, 9)).toBe(7);
  });
});

describe("pipe", () => {
  it("should return a function that applies all the given functions in sequence", () => {
    const double = (number_: number) => number_ * 2;
    const square = (number_: number) => number_ ** 2;

    const pipeline = pipe(double, square);
    expect(pipeline(2)).toBe(16); // square(double(2)) = 16

    const pipeline2 = pipe(square, double);
    expect(pipeline2(2)).toBe(8); // double(square(2)) = 8
  });

  it("should return the original input if no functions are provided", () => {
    const pipeline = pipe();
    expect(pipeline(2)).toBe(2);
    expect(pipeline("hello")).toBe("hello");
    expect(pipeline(true)).toBe(true);
  });
});

describe("resolverArgs", () => {
  it("should return a JSON string representing the arguments", () => {
    const result = resolverArguments(1, "hello", [3, 4]);
    expect(result).toEqual(JSON.stringify([1, "hello", [3, 4]]));
  });
});

describe("timestamp", () => {
  it("should return the current timestamp in milliseconds", () => {
    const result = timestamp();
    expect(typeof result).toBe("number");
  });
});

describe("timeTaken", () => {
  it("should execute the callback and measure the time taken", () => {
    const callback = () => {
      // Simulate some work being done
      let sum = 0;
      for (let index = 0; index < 1_000_000; index++)
        sum += index;

      return sum;
    };

    const [result, executionTime] = timeTaken(callback);
    expect(typeof result).toBe("number");
    expect(typeof executionTime).toBe("number");
  });
});
