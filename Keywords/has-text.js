import StringUtils from "../Utils/StringUtils/index.js";
import TiptapUtils from "../Utils/TiptapUtils/index.js";

export default {
  type: "string",
  errors: true,
  keyword: "hasText",
  validate: function validate(schema, input) {
    const { data } = StringUtils.safeJSONParse(input);

    if (!data) {
      validate.errors = [
        {
          keyword: "hasText",
          message: "The value must contain text",
        },
      ];

      return;
    }

    const { minLength, maxLength } = schema;
    const { isNotEmpty, length } = TiptapUtils.hasText(data);

    if (!isNotEmpty) {
      validate.errors = [
        {
          keyword: "hasText",
          message: "The value must contain text",
        },
      ];

      return false;
    }

    if (length < minLength) {
      validate.errors = [
        {
          keyword: "hasText",
          message: `The text must have a length greater than or equal to ${minLength} characters`,
          params: { minLength, maxLength },
        },
      ];
      return false;
    }

    if (
      Object.prototype.hasOwnProperty.call(schema, "maxLength") &&
      length > maxLength
    ) {
      validate.errors = [
        {
          keyword: "hasText",
          message: `The length of the text cannot exceed ${maxLength} characters`,
          params: { minLength, maxLength },
        },
      ];

      return false;
    }

    return true;
  },
};
