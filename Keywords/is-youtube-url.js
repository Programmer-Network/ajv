export default {
  type: "string",
  errors: false,
  keyword: "is-youtube-url",
  validate: (_, value) => {
    if (!value) {
      return false;
    }

    return /^https?:\/\/(?:www\.)?youtube.com\/watch\?(?=.*v=\w+)(?:\S+)?$/.test(
      value
    );
  },
};
