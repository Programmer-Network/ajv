export namespace TiptapTypes {
  export type Block = {
    text: string;
  };

  export interface BaseNode {
    type: string;
  }

  export type TextNode = BaseNode & {
    type: "text";
    text: string;
  };

  export type DocNode = BaseNode & {
    type: "doc";
    content: Node[];
  };

  export type ParagraphNode = BaseNode & {
    type: "paragraph";
    content: Node[];
  };

  export type NestedNode = BaseNode & {
    type: "nested";
    children: Node[];
  };

  export interface YouTubeNode extends BaseNode {
    type: "youtube";
    attrs: {
      src: string;
      start: number;
      width: number;
      height: number;
    };
  }

  export type Node =
    | TextNode
    | YouTubeNode
    | ParagraphNode
    | DocNode
    | NestedNode;

  export interface SafeJSONParseResult {
    data: Block[];
  }
}
