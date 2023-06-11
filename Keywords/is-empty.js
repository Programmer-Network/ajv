import StringUtils from "../Utils/StringUtils/index.js";

export default {
  type: "string",
  errors: false,
  keyword: "is-empty",
  validate: (_, data) => {
    return StringUtils.isEmpty(data);
  },
};
