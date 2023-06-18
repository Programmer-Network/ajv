import StringUtils from "../Utils/StringUtils/index.js";

const keyword = "getBadWords";

export default {
  type: "string",
  errors: true,
  keyword,
  compile: function compile() {
    return function validate(value) {
      validate.errors = null;

      const badWords = StringUtils.getBadWords(value);

      if (badWords.length) {
        validate.errors = [
          {
            keyword,
            message: `Profanity is not allowed. Please remove the following words: '${badWords.join(
              ", "
            )}'`,
            params: { invalidInput: value },
          },
        ];
        return false;
      }

      return true;
    };
  },
};
