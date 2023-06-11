import StringUtils from "../Utils/StringUtils/index.js";

/**
 * The 'compile' method is a function that AJV calls during the schema compilation.
 * It should return a validation function that will be used by AJV for data validation.
 * In our case, the validation function uses the StringUtils.isSecureString method
 * to check if the string is secure, and if not, throws an error with an appropriate
 * message and parameters.
 *
 * @property {string} keyword - The name of the keyword.
 * @property {string} type - The type of data the keyword applies to.
 * @property {boolean} errors - Indicates that the keyword returns errors.
 * @property {function} compile - A function that AJV calls during schema compilation.
 */
export default {
  keyword: "secure-string",
  type: "string",
  errors: true,
  compile: function compile() {
    return function validate(data) {
      const { isValid, errorMessage } = StringUtils.isSecureString(data);

      if (!isValid) {
        throw new this.ValidationError([
          {
            keyword: "secure-string",
            message: errorMessage,
            params: { invalidInput: data },
          },
        ]);
      }

      return true;
    };
  },
};
