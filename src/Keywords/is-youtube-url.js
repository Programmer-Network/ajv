import StringUtils from "../Utils/StringUtils";

export default {
  type: "string",
  errors: true,
  keyword: "is-youtube-url",
  validate: (_, value) => {
    return StringUtils.isValidYouTubeURL(value);
  },
};
