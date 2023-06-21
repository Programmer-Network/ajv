import StringUtils from "./index.js";

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

  describe("getBadWords", () => {
    test("should return a string array of a single bad word", () => {
      expect(StringUtils.getBadWords("There is a penis.")).toStrictEqual([
        "penis",
      ]);
    });

    test("should return a string array of multiple bad words", () => {
      expect(StringUtils.getBadWords("There is a penis fuck.")).toStrictEqual([
        "penis",
        "fuck",
      ]);
    });

    test("should return false for string without bad words", () => {
      expect(StringUtils.getBadWords("This is a good sentence.")).toStrictEqual(
        []
      );
    });
  });

  describe("removeSpecialCharacters", () => {
    test("should remove special characters from the string", () => {
      expect(
        StringUtils.removeSpecialCharacters("     Hello, +world!     ")
      ).toBe("Hello world");
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

    test("A string with Danish characters should be valid", () => {
      expect(StringUtils.containsDisallowedCharacters("äöå")).toBeFalsy();
    });

    test("Should pass with the given special characters", () => {
      expect(StringUtils.containsDisallowedCharacters("!/-?., '")).toBeFalsy();
    });
  });

  describe("Test isStringComposedOfWhitespace function", () => {
    test("Should return true if a value is a space", () => {
      expect(StringUtils.isStringComposedOfWhitespace(" ")).toBeTruthy();
    });

    test("Should return true if a value is a tab", () => {
      expect(StringUtils.isStringComposedOfWhitespace(" ")).toBeTruthy();
      expect(StringUtils.isStringComposedOfWhitespace("       ")).toBeTruthy();
      expect(
        StringUtils.isStringComposedOfWhitespace("         ")
      ).toBeTruthy();
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
      const result = StringUtils.isSecureString("Hello, world ++++");
      expect(result.isValid).toBe(false);
      expect(result.errorMessage).toBe(
        "The string contains characters that are not alphanumeric, a dash, an exclamation mark, a question mark, or a space"
      );
    });

    test("should return false with appropriate error message for string with disallowed special characters", () => {
      const result = StringUtils.isSecureString("Hello@world");
      expect(result.isValid).toBe(false);
      expect(result.errorMessage).toBe(
        "The string contains characters that are not alphanumeric, a dash, an exclamation mark, a question mark, or a space"
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

    test("should return true if the string has white spaces", () => {
      expect(StringUtils.isSecureString("Hello-world! ")).toEqual({
        isValid: true,
        errorMessage: null,
      });
    });

    test("should fail and return a proper message if profanity is used", () => {
      expect(StringUtils.isSecureString("Hey there penis")).toEqual({
        isValid: false,
        errorMessage:
          "Profanity is not allowed. Please remove the following words: 'penis'",
      });

      expect(StringUtils.isSecureString("Hey there penis fuck")).toEqual({
        isValid: false,
        errorMessage:
          "Profanity is not allowed. Please remove the following words: 'penis, fuck'",
      });
    });
  });
});
