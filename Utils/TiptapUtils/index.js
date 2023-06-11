import StringUtils from "../StringUtils";

class TiptapUtils {
  reduceTextNodesToString(value) {
    const { data } = StringUtils.safeJSONParse(value);

    if (!data || !Array.isArray(data)) {
      return "";
    }

    return data
      .reduce((acc, block) => {
        return `${acc} ${block.text}`;
      }, "")
      .trim();
  }

  countObjectText = node => {
    if (!node) {
      return 0;
    }

    if (node?.type === "text") {
      return StringUtils.removeSpecialCharacters(node.text).length;
    }

    if (Array.isArray(node)) {
      return node.reduce(
        (sum, current) => sum + this.countObjectText(current),
        0
      );
    }

    if (typeof node === "object") {
      return Object.values(node).reduce(
        (sum, current) => sum + this.countObjectText(current),
        0
      );
    }

    return 0;
  };

  hasText = obj => {
    const totalLength = this.countObjectText(obj);

    return {
      isNotEmpty: totalLength > 0,
      length: totalLength,
    };
  };
}

export default new TiptapUtils();
