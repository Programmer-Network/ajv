import StringUtils from ".";

describe("StringUtils", () => {
  describe("safeJSONParse", () => {
    test("should parse valid JSON string", () => {
      expect(StringUtils.safeJSONParse('{"name":"John","age":30}')).toEqual({
        data: {
          name: "John",
          age: 30,
        },
        error: null,
      });
    });

    test("should return original value for invalid JSON string", () => {
      expect(StringUtils.safeJSONParse('{"name":"John",age:30}')).toEqual({
        data: null,
        error: "The string is not a valid JSON string",
      });
    });
  });

  describe("isEmpty", () => {
    test("should return true for empty string", () => {
      expect(StringUtils.isEmpty("")).toBe(true);
    });

    test("should return true for whitespace string", () => {
      expect(StringUtils.isEmpty("    ")).toBe(true);
    });

    test("should return false for non-empty string", () => {
      expect(StringUtils.isEmpty("Hello, world!")).toBe(false);
    });
  });

  describe("containsUnicodeSpaceCharacters", () => {
    test("should return true for string with Unicode space characters", () => {
      expect(
        StringUtils.containsUnicodeSpaceCharacters("Hello\u2003world")
      ).toBe(true);
    });

    test("should return false for string without Unicode space characters", () => {
      expect(StringUtils.containsUnicodeSpaceCharacters("Hello world")).toBe(
        false
      );
    });
  });

  describe("containsCombinedCharacters", () => {
    test("should return true for string with combined characters", () => {
      expect(StringUtils.containsCombinedCharacters("Hello\u034Fworld")).toBe(
        true
      );
    });

    test("should return false for string without combined characters", () => {
      expect(StringUtils.containsCombinedCharacters("Hello world")).toBe(false);
    });
  });

  describe("containsBadWords", () => {
    test("should return true for string containing bad words", () => {
      expect(StringUtils.containsBadWords("There is a penis.")).toBe(true);
    });

    test("should return false for string without bad words", () => {
      expect(StringUtils.containsBadWords("This is a good sentence.")).toBe(
        false
      );
    });
  });

  describe("removeSpecialCharacters", () => {
    test("should remove special characters from the string", () => {
      expect(StringUtils.removeSpecialCharacters("Hello, +world!")).toBe(
        "Helloworld"
      );
    });
  });

  describe("Test containsDisallowedCharacters function", () => {
    test("Check string with only alphanumeric characters", () => {
      expect(StringUtils.containsDisallowedCharacters("Test123")).toBeFalsy();
    });

    test("Check string with alphanumeric and allowed special characters", () => {
      expect(
        StringUtils.containsDisallowedCharacters("Test123-!?")
      ).toBeFalsy();
    });

    test("Check string with disallowed special characters", () => {
      expect(StringUtils.containsDisallowedCharacters("Test123@")).toBeTruthy();
    });

    test("Check string with alphanumeric, allowed and disallowed special characters", () => {
      expect(
        StringUtils.containsDisallowedCharacters("Test123-!?@")
      ).toBeTruthy();
    });

    test("Check empty string", () => {
      expect(StringUtils.containsDisallowedCharacters("")).toBeFalsy();
    });
  });

  describe("isSecureString", () => {
    test("should return true for secure string", () => {
      expect(StringUtils.isSecureString("Hello-world!")).toEqual({
        isValid: true,
        errorMessage: null,
      });
    });
    test("should return false with appropriate error message for string with non-alphanumeric characters", () => {
      const result = StringUtils.isSecureString("Hello, world!");
      expect(result.isValid).toBe(false);
      expect(result.errorMessage).toBe(
        "The string contains Unicode space characters"
      );
    });
    test("should return false with appropriate error message for string with disallowed special characters", () => {
      const result = StringUtils.isSecureString("Hello@world");
      expect(result.isValid).toBe(false);
      expect(result.errorMessage).toBe(
        "The string contains characters that are not alphanumeric, a dash, an exclamation mark, or a question mark"
      );
    });
    test("should return false with appropriate error message for string with Unicode space characters", () => {
      const result = StringUtils.isSecureString("Hello\u2003world");
      expect(result.isValid).toBe(false);
      expect(result.errorMessage).toBe(
        "The string contains Unicode space characters"
      );
    });
    test("should return false with appropriate error message for string with combined characters", () => {
      const result = StringUtils.isSecureString("Hello\u034Fworld");
      expect(result.isValid).toBe(false);
      expect(result.errorMessage).toBe(
        "The string contains combined characters"
      );
    });
  });
});
