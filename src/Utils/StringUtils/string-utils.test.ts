import StringUtils from "./index.js";

describe("StringUtils", () => {
  describe("safeJSONParse", () => {
    it("should parse valid JSON string", () => {
      expect(StringUtils.safeJSONParse('{"name":"John","age":30}')).toEqual({
        data: {
          name: "John",
          age: 30,
        },
        error: null,
      });
    });

    it("should return original value for invalid JSON string", () => {
      expect(StringUtils.safeJSONParse('{"name":"John",age:30}')).toEqual({
        data: null,
        error: "The string is not a valid JSON string",
      });
    });
  });

  describe("containsUnicodeSpaceCharacters", () => {
    it("should return true for string with Unicode space characters", () => {
      expect(
        StringUtils.containsUnicodeSpaceCharacters("Hello\u2003world")
      ).toBe(true);
    });

    it("should return false for string without Unicode space characters", () => {
      expect(StringUtils.containsUnicodeSpaceCharacters("Hello world")).toBe(
        false
      );
    });
  });

  describe("containsCombinedCharacters", () => {
    it("should return true for string with combined characters", () => {
      expect(StringUtils.containsCombinedCharacters("Hello\u034Fworld")).toBe(
        true
      );
    });

    it("should return false for string without combined characters", () => {
      expect(StringUtils.containsCombinedCharacters("Hello world")).toBe(false);
    });
  });

  describe("getBadWords", () => {
    it("should return a string array of a single bad word", () => {
      expect(StringUtils.getBadWords("There is a penis.")).toStrictEqual([
        "penis",
      ]);
    });

    it("should return a string array of multiple bad words", () => {
      expect(StringUtils.getBadWords("There is a penis fuck.")).toStrictEqual([
        "penis",
        "fuck",
      ]);
    });

    it("should return false for string without bad words", () => {
      expect(StringUtils.getBadWords("This is a good sentence.")).toStrictEqual(
        []
      );
    });
  });

  describe("removeSpecialCharacters", () => {
    it("should remove special characters from the string", () => {
      expect(
        StringUtils.removeSpecialCharacters("     Hello, +world!     ")
      ).toBe("Hello world");
    });
  });

  describe("Test containsDisallowedCharacters function", () => {
    it("Check string with only alphanumeric characters", () => {
      expect(StringUtils.containsDisallowedCharacters("Test123")).toBeFalsy();
    });

    it("Check string with alphanumeric and allowed special characters", () => {
      expect(
        StringUtils.containsDisallowedCharacters("Test123-!?")
      ).toBeFalsy();
    });

    it("Check string with disallowed special characters", () => {
      expect(StringUtils.containsDisallowedCharacters("Test123@")).toBeTruthy();
    });

    it("Check string with alphanumeric, allowed and disallowed special characters", () => {
      expect(
        StringUtils.containsDisallowedCharacters("Test123-!?@")
      ).toBeTruthy();
    });

    it("Check empty string", () => {
      expect(StringUtils.containsDisallowedCharacters("")).toBeFalsy();
    });

    it("A string with Danish characters should be valid", () => {
      expect(StringUtils.containsDisallowedCharacters("äöå")).toBeFalsy();
    });

    it("Should pass with the given special characters", () => {
      expect(StringUtils.containsDisallowedCharacters("!/-?., '")).toBeFalsy();
    });
  });

  describe("Test isStringComposedOfWhitespace function", () => {
    it("Should return true if a value is a space", () => {
      expect(StringUtils.isStringComposedOfWhitespace(" ")).toBeTruthy();
    });

    it("Should return true if a value is a tab", () => {
      expect(StringUtils.isStringComposedOfWhitespace(" ")).toBeTruthy();
      expect(StringUtils.isStringComposedOfWhitespace("       ")).toBeTruthy();
      expect(
        StringUtils.isStringComposedOfWhitespace("         ")
      ).toBeTruthy();
    });
  });

  describe("isSecureString", () => {
    it("should return true for secure string", () => {
      expect(StringUtils.isSecureString("Hello-world!")).toEqual({
        isValid: true,
        errorMessage: null,
      });
    });

    it("should return false with appropriate error message for string with non-alphanumeric characters", () => {
      const result = StringUtils.isSecureString("Hello, world ++++");
      expect(result.isValid).toBe(false);
      expect(result.errorMessage).toBe(
        "The string contains characters that are not alphanumeric, a dash, an exclamation mark, a question mark, an underscore, or a space"
      );
    });

    it("should return false with appropriate error message for string with disallowed special characters", () => {
      const result = StringUtils.isSecureString("Hello@world");
      expect(result.isValid).toBe(false);
      expect(result.errorMessage).toBe(
        "The string contains characters that are not alphanumeric, a dash, an exclamation mark, a question mark, an underscore, or a space"
      );
    });

    it("should return false with appropriate error message for string with Unicode space characters", () => {
      const result = StringUtils.isSecureString("Hello\u2003world");
      expect(result.isValid).toBe(false);
      expect(result.errorMessage).toBe(
        "The string contains Unicode space characters"
      );
    });

    it("should return false with appropriate error message for string with combined characters", () => {
      const result = StringUtils.isSecureString("Hello\u034Fworld");
      expect(result.isValid).toBe(false);
      expect(result.errorMessage).toBe(
        "The string contains combined characters"
      );
    });

    it("should return true if the string has white spaces", () => {
      expect(StringUtils.isSecureString("Hello-world! ")).toEqual({
        isValid: true,
        errorMessage: null,
      });
    });

    it("should fail and return a proper message if profanity is used", () => {
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

  describe("isValidYouTubeURL", () => {
    it("should return true for standard YouTube watch URL", () => {
      expect(
        StringUtils.isValidYouTubeURL(
          "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        )
      ).toBe(true);
    });

    it("should return true for HTTPS standard YouTube watch URL without www", () => {
      expect(
        StringUtils.isValidYouTubeURL("https://youtube.com/watch?v=dQw4w9WgXcQ")
      ).toBe(true);
    });

    it("should return true for HTTP standard YouTube watch URL", () => {
      expect(
        StringUtils.isValidYouTubeURL(
          "http://www.youtube.com/watch?v=dQw4w9WgXcQ"
        )
      ).toBe(true);
    });

    it("should return true for shortened YouTube URL", () => {
      expect(
        StringUtils.isValidYouTubeURL("https://youtu.be/dQw4w9WgXcQ")
      ).toBe(true);
    });

    it("should return false for invalid YouTube URL with missing video ID", () => {
      expect(
        StringUtils.isValidYouTubeURL("https://www.youtube.com/watch?v=")
      ).toBe(false);
    });

    it("should return false for invalid YouTube URL with incorrect domain", () => {
      expect(
        StringUtils.isValidYouTubeURL(
          "https://www.youtu.com/watch?v=dQw4w9WgXcQ"
        )
      ).toBe(false);
    });

    it("should return false for invalid shortened YouTube URL with missing video ID", () => {
      expect(StringUtils.isValidYouTubeURL("https://youtu.be/")).toBe(false);
    });

    it("should return false for non-YouTube URL", () => {
      expect(StringUtils.isValidYouTubeURL("https://www.google.com")).toBe(
        false
      );
    });

    it("should return true for standard YouTube watch URL with dash in video ID", () => {
      expect(
        StringUtils.isValidYouTubeURL(
          "https://www.youtube.com/watch?v=dQw-4w9WgXcQ"
        )
      ).toBe(true);
    });

    it("should return true for shortened YouTube URL with dash in video ID", () => {
      expect(
        StringUtils.isValidYouTubeURL("https://youtu.be/dQw-4w9WgXcQ")
      ).toBe(true);
    });
  });
});
