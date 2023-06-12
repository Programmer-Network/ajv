import TiptapUtils from "./index.js";

describe("TiptapUtils", () => {
  describe("reduceTextNodesToString", () => {
    test("should reduce text nodes to a single string", () => {
      expect(
        TiptapUtils.reduceTextNodesToString(
          '[{"type":"text","text":"Hello"},{"type":"text","text":"world!"}]'
        )
      ).toBe("Hello world!");
    });

    test("should return empty string for invalid JSON value", () => {
      expect(TiptapUtils.reduceTextNodesToString("invalid-json")).toBe("");
    });
  });

  describe("countObjectText", () => {
    test("should return 0 for empty object", () => {
      expect(TiptapUtils.countObjectText({})).toBe(0);
    });

    test("should return length of text property for text node", () => {
      expect(
        TiptapUtils.countObjectText({ type: "text", text: "Hello world!" })
      ).toBe(11);
    });

    test("should return sum of text lengths for array of nodes", () => {
      expect(
        TiptapUtils.countObjectText([
          { type: "text", text: "Hello" },
          { type: "text", text: "world!" },
        ])
      ).toBe(10);
    });

    test("should return sum of text lengths for nested objects", () => {
      expect(
        TiptapUtils.countObjectText({
          type: "nested",
          children: [
            { type: "text", text: "Hello" },
            { type: "text", text: "world!" },
          ],
        })
      ).toBe(10);
    });

    test("should return 0 for undefined node", () => {
      expect(TiptapUtils.countObjectText()).toBe(0);
    });
  });

  describe("hasText", () => {
    test("should return isNotEmpty true and length for object with text", () => {
      expect(
        TiptapUtils.hasText({ type: "text", text: "Hello world!" })
      ).toEqual({ isNotEmpty: true, length: 11 });
    });

    test("should return isNotEmpty false and 0 length for object without text", () => {
      expect(
        TiptapUtils.hasText({ type: "other", content: "Some content" })
      ).toEqual({ isNotEmpty: false, length: 0 });
    });
  });
});
