import StringUtils from "../Utils/StringUtils/index.js";
import TiptapUtils from "../Utils/TiptapUtils/index.js";

export default {
  type: "string",
  errors: true,
  keyword: "has-text",
  validate: function validate(schema, input) {
    const { data } = StringUtils.safeJSONParse(input);

    if (!data) {
      validate.errors = [
        {
          keyword: "has-text",
          message: "The value must contain text",
        },
      ];

      return;
    }

    if (TiptapUtils.containsYouTubeVideo(data.content)) {
      return true;
    }

    const { isNotEmpty, length } = TiptapUtils.hasText(data);

    if (!isNotEmpty) {
      validate.errors = [
        {
          keyword: "has-text",
          message: "The value must contain text",
        },
      ];

      return false;
    }

    if (schema.minLength && length < schema.minLength) {
      validate.errors = [
        {
          keyword: "has-text",
          message: `The text must have a length greater than or equal to ${schema.minLength} characters`,
          params: { minLength: schema.minLength },
        },
      ];
      return false;
    }

    if (schema.maxLength && length > schema.maxLength) {
      validate.errors = [
        {
          keyword: "has-text",
          message: `The length of the text cannot exceed ${schema.maxLength} characters`,
          params: { maxLength: schema.maxLength },
        },
      ];

      return false;
    }

    return true;
  },
};
