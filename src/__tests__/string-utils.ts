import { capitalize, reverse } from "../utils/string-utils";

describe("String utilities", () => {
  describe("capitalize", () => {
    test("capitalizes the first letter of a string", () => {
      expect(capitalize("hello")).toBe("Hello");
    });

    test("returns empty string when input is empty", () => {
      expect(capitalize("")).toBe("");
    });

    test("doesn't change already capitalized strings", () => {
      expect(capitalize("Hello")).toBe("Hello");
    });
  });

  describe("reverse", () => {
    test("reverses a string", () => {
      expect(reverse("hello")).toBe("olleh");
    });

    test("returns empty string when input is empty", () => {
      expect(reverse("")).toBe("");
    });

    test("works with palindromes", () => {
      expect(reverse("radar")).toBe("radar");
    });
  });
});