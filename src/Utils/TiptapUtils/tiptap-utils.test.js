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

    test("should return 0 count for a whitespace only text", () => {
      expect(
        TiptapUtils.countObjectText({
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "                                                                ",
                },
              ],
            },
          ],
        })
      ).toBe(0);
    });

    test("should return 0 count for a zero-width space only text", () => {
      expect(
        TiptapUtils.countObjectText({
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: " ​",
                },
              ],
            },
          ],
        })
      ).toBe(0);
    });
  });

  describe("containsYouTubeVideo", () => {
    test("should return false if an argument is not an object or an array", () => {
      expect(TiptapUtils.containsYouTubeVideo()).toEqual(false);
      expect(TiptapUtils.containsYouTubeVideo("")).toEqual(false);
      expect(TiptapUtils.containsYouTubeVideo("Test Test")).toEqual(false);
    });

    test("should return false if an argument is an empty object or an array", () => {
      expect(TiptapUtils.containsYouTubeVideo({})).toEqual(false);
      expect(TiptapUtils.containsYouTubeVideo([])).toEqual(false);
    });

    test("should return true if an argument is valid and contains a valid YouTube src", () => {
      const data = {
        type: "doc",
        content: [
          {
            type: "youtube",
            attrs: {
              src: "https://www.youtube.com/watch?v=uxQxd_z_uqc",
              start: 0,
              width: 640,
              height: 480,
            },
          },
        ],
      };

      expect(TiptapUtils.containsYouTubeVideo(data.content)).toEqual(true);
    });

    test("should return false if an argument is valid but contains an invalid YouTube src", () => {
      const data = {
        type: "doc",
        content: [
          {
            type: "youtube",
            attrs: {
              src: "https://google.com",
              start: 0,
              width: 640,
              height: 480,
            },
          },
        ],
      };

      expect(TiptapUtils.containsYouTubeVideo(data.content)).toEqual(false);
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
