import {
  BAD_WORDS_REGEX,
  COMBINED_CHARACTERS_REGEX,
  SPECIAL_CHARACTERS_AND_WHITE_SPACE,
  UNICODE_SPACE_CHARACTERS_REGEX,
} from "../../constants.js";

class StringUtils {
  /**
   * Safely parses a JSON string. If the input is a valid JSON string, it is parsed and returned as a value property in an object.
   * If the input is not a valid JSON string, the value property in the returned object is null and an error message is provided.
   *
   * @param {string} value - The string to parse as JSON.
   * @returns {Object} - The object contains two properties: 'value' which holds the parsed JSON object or array, or null if * parsing fails, and 'error' which holds the error message if the parsing fails, or null if parsing is successful.
   */
  safeJSONParse(value) {
    try {
      return { data: JSON.parse(value), error: null };
    } catch (_) {
      return {
        data: null,
        error: "The string is not a valid JSON string",
      };
    }
  }

  /**
   * Checks if a string is empty after trimming whitespace.
   * @param {string} value - The string to check.
   * @returns {boolean} - Returns true if the string is empty or only contains whitespace, else false.
   */
  isEmpty(value) {
    if (!value) {
      return true;
    }

    return typeof value === "string" && value.trim() === "";
  }

  /**
   * Checks if a string contains any characters that are not alphanumeric, "-", "!", or "?".
   * @param {string} value - The string to check.
   * @returns {boolean} - Returns true if the string contains disallowed characters, else false.
   */
  containsDisallowedCharacters(value) {
    return /[^a-zA-Z0-9-!? ]/.test(value);
  }

  /**
   * Checks if a string contains any Unicode space characters.
   * @param {string} value - The string to check.
   * @returns {boolean} - Returns true if the string contains Unicode space characters, else false.
   */
  containsUnicodeSpaceCharacters(value) {
    return UNICODE_SPACE_CHARACTERS_REGEX.test(value);
  }

  /**
   * Checks if a string contains any combined characters.
   * @param {string} value - The string to check.
   * @returns {boolean} - Returns true if the string contains combined characters, else false.
   */
  containsCombinedCharacters(value) {
    return COMBINED_CHARACTERS_REGEX.test(value);
  }

  /**
   * Checks if a string contains any words from a list of bad words.
   * @param {string} value - The string to check.
   * @returns {boolean} - Returns true if the string contains bad words, else false.
   */
  containsBadWords(value) {
    return BAD_WORDS_REGEX.test(value);
  }

  /**
   * Removes all special characters, Unicode space characters and combined characters from a string.
   * @param {string} value - The string to clean.
   * @returns {string} - Returns the cleaned string.
   */
  removeSpecialCharacters(value) {
    return value
      .replace(UNICODE_SPACE_CHARACTERS_REGEX, "")
      .replace(COMBINED_CHARACTERS_REGEX, "")
      .replace(SPECIAL_CHARACTERS_AND_WHITE_SPACE, "");
  }

  isStringComposedOfWhitespace = value => {
    return /^\s*$/.test(value);
  };

  /**
   * Checks if a string is secure. A string is considered secure if it meets the following criteria:
   * 1. Contains no non-alphanumeric characters.
   * 2. Contains no special characters other than "-", "!" or "?".
   * 3. Contains no Unicode space characters.
   * 4. Contains no combined characters.
   * 5. Is not composed entirely of whitespace characters.
   *
   * @param {string} value - The string to check.
   * @returns {Object} - Returns an object with a `isValid` boolean indicating if the string is secure, and an `errorMessage` string describing the validation error if `isValid` is false.
   */
  isSecureString = value => {
    if (this.containsUnicodeSpaceCharacters(value)) {
      return {
        isValid: false,
        errorMessage: "The string contains Unicode space characters",
      };
    }

    if (this.containsCombinedCharacters(value)) {
      return {
        isValid: false,
        errorMessage: "The string contains combined characters",
      };
    }

    if (this.containsDisallowedCharacters(value)) {
      return {
        isValid: false,
        errorMessage:
          "The string contains characters that are not alphanumeric, a dash, an exclamation mark, a question mark, or a space",
      };
    }

    if (this.isStringComposedOfWhitespace(value)) {
      return {
        isValid: false,
        errorMessage:
          "The string is composed entirely of whitespace characters",
      };
    }

    return { isValid: true, errorMessage: null };
  };
}

export default new StringUtils();
