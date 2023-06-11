import StringUtils from "../Utils/StringUtils";
import TiptapUtils from "../Utils/TiptapUtils";

export default {
  type: "string",
  errors: true,
  keyword: "containsBadWords",
  validate: (_, value) => {
    /**
     * TODO: Remove this from here once I start using this
     * in isomorphic way. This couples the validator
     * to tiptap only, while this validator should be
     * used anywhere.
     */
    const text = TiptapUtils.reduceTextNodesToString(value);

    if (StringUtils.containsBadWords(text)) {
      return false;
    }

    return true;
  },
};
