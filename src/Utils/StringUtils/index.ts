import {
  BAD_WORDS_REGEX,
  COMBINED_CHARACTERS_REGEX,
  SPECIAL_CHARACTERS_AND_WHITE_SPACE,
  UNICODE_SPACE_CHARACTERS_REGEX,
} from "../../constants.js";

interface ParseResult {
  data: any | null;
  error: string | null;
}

interface SecurityValidationResult {
  isValid: boolean;
  errorMessage: string | null;
}

class StringUtils {
  /**
   * Safely parses a JSON string. If the input is a valid JSON string, it is parsed and returned as a value property in an object.
   * If the input is not a valid JSON string, the value property in the returned object is null and an error message is provided.
   *
   * @param {string} value - The string to parse as JSON.
   * @returns {ParseResult} - The object contains two properties: 'data' which holds the parsed JSON object or array, or null if parsing fails, and 'error' which holds the error message if the parsing fails, or null if parsing is successful.
   */
  safeJSONParse(value: string): ParseResult {
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
   * Checks if a string contains any characters that are not alphanumeric, "-", "!", "?", ",", ".", "/", "'", double quote, underscore or a space.
   * @param {string} value - The string to check.
   * @returns {boolean} - Returns true if the string contains disallowed characters, else false.
   */
  containsDisallowedCharacters(value: string): boolean {
    return /[^a-zA-Z0-9-!'"?.,\-/_ \u00C0-\u02AF]/.test(value);
  }

  /**
   * Checks if a string contains any Unicode space characters.
   * @param {string} value - The string to check.
   * @returns {boolean} - Returns true if the string contains Unicode space characters, else false.
   */
  containsUnicodeSpaceCharacters(value: string): boolean {
    return UNICODE_SPACE_CHARACTERS_REGEX.test(value);
  }

  /**
   * Checks if a string contains any combined characters.
   * @param {string} value - The string to check.
   * @returns {boolean} - Returns true if the string contains combined characters, else false.
   */
  containsCombinedCharacters(value: string): boolean {
    return COMBINED_CHARACTERS_REGEX.some((regex: RegExp) => regex.test(value));
  }

  /**
   * Checks if a string contains any words from a list of bad words.
   * @param {string} value - The string to check.
   * @returns {Array<string>} - Returns an array of bad words if found, else an empty array.
   */
  getBadWords(value: string): string[] {
    return [...value.matchAll(BAD_WORDS_REGEX)].map((match) => match[0]);
  }

  /**
   * Removes all special characters, Unicode space characters, and combined characters from a string.
   * @param {string} value - The string to clean.
   * @returns {string} - Returns the cleaned string.
   */
  removeSpecialCharacters(value: string): string {
    return value
      .trim()
      .replace(UNICODE_SPACE_CHARACTERS_REGEX, "")
      .replace(COMBINED_CHARACTERS_REGEX.join("|"), "")
      .replace(SPECIAL_CHARACTERS_AND_WHITE_SPACE, "");
  }

  /**
   * Checks if a given string is composed entirely of whitespace characters.
   *
   * @param {string} value - The string to check.
   * @returns {boolean} - Returns `true` if the string is entirely whitespace, otherwise `false`.
   */
  isStringComposedOfWhitespace = (value: string): boolean => {
    return /^\s*$/.test(value);
  };

  /**
   * Checks if the given string is a valid YouTube URL.
   *
   * @param {string} value - The string to be checked.
   * @returns {boolean} Returns `true` if the string is a valid YouTube URL, otherwise returns `false`.
   */
  isValidYouTubeURL(value: string): boolean {
    const regex =
      /^https?:\/\/(?:www\.)?youtube.com\/watch\?(?=.*v=[\w-]+)(?:\S+)?$|^https?:\/\/youtu.be\/[\w-]+$/;
    return regex.test(value);
  }

  /**
   * Checks if a string is secure. A string is considered secure if it meets the following criteria:
   * 1. Contains no non-alphanumeric characters.
   * 2. Contains no special characters other than "-", "!" or "?".
   * 3. Contains no Unicode space characters.
   * 4. Contains no combined characters.
   * 5. Is not composed entirely of whitespace characters.
   *
   * @param {string} value - The string to check.
   * @returns {SecurityValidationResult} - Returns an object with a `isValid` boolean indicating if the string is secure, and an `errorMessage` string describing the validation error if `isValid` is false.
   */
  isSecureString = (value: string): SecurityValidationResult => {
    if (value === "") {
      return {
        isValid: true,
        errorMessage: null,
      };
    }

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
          "The string contains characters that are not alphanumeric, a dash, an exclamation mark, a question mark, an underscore, or a space",
      };
    }

    if (this.isStringComposedOfWhitespace(value)) {
      return {
        isValid: false,
        errorMessage:
          "The string is composed entirely of whitespace characters",
      };
    }

    const badWords = this.getBadWords(value);
    if (badWords.length) {
      return {
        isValid: false,
        errorMessage: `Profanity is not allowed. Please remove the following words: '${badWords.join(
          ", "
        )}'`,
      };
    }

    return { isValid: true, errorMessage: null };
  };
}

export default new StringUtils();
