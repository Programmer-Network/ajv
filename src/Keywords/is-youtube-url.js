import StringUtils from "../Utils/StringUtils/index.js";

export default {
  type: "string",
  errors: true,
  keyword: "is-youtube-url",
  compile: function compile(_, parentSchema) {
    return function validate(value) {
      validate.errors = null;

      if (!value && !parentSchema?.minLength) {
        return true;
      }

      if (!StringUtils.isValidYouTubeURL(value)) {
        validate.errors = [
          {
            keyword: "is-youtube-url",
            message: "Invalid YouTube URL",
            params: { invalidInput: value },
          },
        ];

        return false;
      }

      return true;
    };
  },
};
