import StringUtils from "../StringUtils/index.js";

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

  countObjectText = (node) => {
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

  containsYouTubeVideo = (content) => {
    if (!content || !Array.isArray(content) || content.length === 0) {
      return false;
    }

    const YTNode = Array.isArray(content)
      ? content.find((node) => node.type === "youtube")
      : content;

    return (
      YTNode?.attrs?.src && StringUtils.isValidYouTubeURL(YTNode.attrs.src)
    );
  };

  hasText = (obj) => {
    if (this.containsYouTubeVideo(obj.content)) {
      return {
        isNotEmpty: true,
        length: 0,
      };
    }

    const totalLength = this.countObjectText(obj);

    return {
      isNotEmpty: totalLength > 0,
      length: totalLength,
    };
  };
}

export default new TiptapUtils();
