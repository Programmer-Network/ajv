import { TiptapTypes } from "../../types/index.js";
import StringUtils from "../StringUtils/index.js";

class TiptapUtils {
  reduceTextNodesToString(value: string): string {
    const { data } = StringUtils.safeJSONParse(
      value
    ) as TiptapTypes.SafeJSONParseResult;

    if (!data || !Array.isArray(data)) {
      return "";
    }

    return data
      .reduce((acc, block) => {
        return `${acc} ${block.text}`;
      }, "")
      .trim();
  }

  countObjectText(node: TiptapTypes.Node | TiptapTypes.Node[]): number {
    if (!node) {
      return 0;
    }

    if (Array.isArray(node)) {
      return node.reduce(
        (sum, current) => sum + this.countObjectText(current),
        0
      );
    }

    if (node?.type === "text") {
      return StringUtils.removeSpecialCharacters(node.text).length;
    }

    if (typeof node === "object") {
      return Object.values(node).reduce(
        (sum, current) => sum + this.countObjectText(current),
        0
      );
    }

    return 0;
  }

  containsYouTubeVideo(content: TiptapTypes.Node[]): boolean {
    if (!content || !Array.isArray(content)) {
      return false;
    }

    const YTNode = content.find(
      (node): node is TiptapTypes.YouTubeNode => node.type === "youtube"
    );

    return YTNode ? StringUtils.isValidYouTubeURL(YTNode.attrs.src) : false;
  }

  hasText = (
    obj: TiptapTypes.Node
  ): { isNotEmpty: boolean; length: number } => {
    const totalLength = this.countObjectText(obj);

    return {
      isNotEmpty: totalLength > 0,
      length: totalLength,
    };
  };
}

export default new TiptapUtils();
