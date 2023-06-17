import StringUtils from "../Utils/StringUtils/index.js";

export default {
  type: "string",
  errors: true,
  keyword: "containsBadWords",
  validate: (_, value) => {
    if (StringUtils.containsBadWords(value)) {
      return false;
    }

    return true;
  },
};
