import { ajv } from "..";

describe("Keywords", () => {
  describe("getBadWords", () => {
    test("should fail if getBadWords returns bad words", () => {
      const schema = {
        type: "object",
        properties: { foo: { type: "string", getBadWords: false } },
      };
      const validate = ajv.compile(schema);
      validate({ foo: "hi penis" });
      expect(validate?.errors?.[0].message).toBe(
        "Profanity is not allowed. Please remove the following words: 'penis'"
      );
    });
  });

  describe("is-youtube-url", () => {
    test("should pass if url is valid", () => {
      const schema = {
        type: "object",
        properties: { foo: { type: "string", "is-youtube-url": true } },
      };

      const validate = ajv.compile(schema);
      const valid = validate({
        foo: "https://www.youtube.com/watch?v=uxQxd_z_uqc&t=24sd",
      });

      expect(valid).toBe(true);
    });

    test("should fail if url is invalid", () => {
      const schema = {
        type: "object",
        properties: { foo: { type: "string", "is-youtube-url": true } },
      };

      const validate = ajv.compile(schema);
      const valid = validate({ foo: "https://example.com" });

      expect(valid).toBe(false);
      expect(validate?.errors?.[0].message).toBe("Invalid YouTube URL");
    });

    test("should pass if url is falsy but the minLength is 0 or not present", () => {
      const schema = {
        type: "object",
        properties: {
          foo: { type: "string", "is-youtube-url": true },
        },
      };

      const validate = ajv.compile(schema);
      const valid = validate({ foo: "" });

      expect(valid).toBe(true);
    });

    test("should fail if url is falsy value but the minLength equal or greater then 1", () => {
      const schema = {
        type: "object",
        properties: {
          foo: { type: "string", minLength: 2, "is-youtube-url": true },
        },
      };

      const validate = ajv.compile(schema);
      const valid = validate({ foo: "dsadsadasdsa" });

      expect(valid).toBe(false);
    });
  });

  describe("has-text", () => {
    test("should pass if the text has at least 5 characters", () => {
      const schema = {
        type: "object",
        properties: {
          foo: {
            type: "string",
            "has-text": { minLength: 5 },
          },
        },
      };

      const validate = ajv.compile(schema);
      const valid = validate({
        foo: '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Is it common for people that are transitions career towards becoming a decent developer, to hire other developer as mentors and have some kind of support routine? "},{"type":"hardBreak"},{"type":"hardBreak"},{"type":"text","text":"IF yes, is there any platform that you know, that intermediates that? "},{"type":"hardBreak"}]}]}',
      });

      expect(valid).toBe(true);
    });

    test("should fail if the text doesn't have at least 5 characters", () => {
      const schema = {
        type: "object",
        properties: {
          foo: {
            type: "string",
            "has-text": { minLength: 5 },
          },
        },
      };

      const validate = ajv.compile(schema);
      const valid = validate({
        foo: '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Is"}]}]}',
      });

      expect(valid).toBe(false);
      expect(validate?.errors?.[0].message).toBe(
        "The text must have a length greater than or equal to 5 characters"
      );
    });

    test("should fail if the has more then 5 characters", () => {
      const schema = {
        type: "object",
        properties: {
          foo: {
            type: "string",
            "has-text": { maxLength: 5 },
          },
        },
      };

      const validate = ajv.compile(schema);
      const valid = validate({
        foo: '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Lorem Ipsum is simply dummy text of the printing and typesetting industry."}]}]}',
      });

      expect(valid).toBe(false);
      expect(validate?.errors?.[0].message).toBe(
        "The length of the text cannot exceed 5 characters"
      );
    });

    test("should fail if there's no text", () => {
      const schema = {
        type: "object",
        properties: {
          foo: {
            type: "string",
            "has-text": true,
          },
        },
      };

      const validate = ajv.compile(schema);
      const valid = validate({
        foo: '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":""}]}]}',
      });

      expect(valid).toBe(false);
      expect(validate?.errors?.[0].message).toBe("The value must contain text");
    });

    test("should pass if the text contains a valid YouTube URL", () => {
      const schema = {
        type: "object",
        properties: {
          foo: {
            type: "string",
            "has-text": { minLength: 5, max: 300 },
          },
        },
      };

      const data = JSON.stringify({
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
      });

      const validate = ajv.compile(schema);
      const valid = validate({
        foo: data,
      });

      expect(valid).toBe(true);
    });
  });

  describe("secure-string", () => {
    test("should pass if the string is empty", () => {
      const schema = {
        type: "object",
        properties: {
          foo: {
            type: "string",
            "secure-string": true,
          },
        },
      };

      const validate = ajv.compile(schema);
      const valid = validate({
        foo: "",
      });

      expect(valid).toBe(true);
    });

    test("should pass if the string is secure", () => {
      const schema = {
        type: "object",
        properties: {
          foo: {
            type: "string",
            "secure-string": true,
          },
        },
      };

      const validate = ajv.compile(schema);
      const valid = validate({
        foo: "This is some text",
      });

      expect(valid).toBe(true);
    });

    test("should fail if the string contains dissallowed characters", () => {
      const schema = {
        type: "object",
        properties: {
          foo: {
            type: "string",
            "secure-string": true,
          },
        },
      };

      const validate = ajv.compile(schema);
      const valid = validate({
        foo: "This is some text ####",
      });

      expect(valid).toBe(false);
      expect(validate?.errors?.[0].message).toBe(
        "The string contains characters that are not alphanumeric, a dash, an exclamation mark, a question mark, an underscore, or a space"
      );
    });

    test("should fail if the string contains dissallowed characters", () => {
      const schema = {
        type: "object",
        properties: {
          foo: {
            type: "string",
            "secure-string": true,
          },
        },
      };

      const validate = ajv.compile(schema);
      const valid = validate({
        foo: "This is some text ###",
      });

      expect(valid).toBe(false);
      expect(validate?.errors?.[0].message).toBe(
        "The string contains characters that are not alphanumeric, a dash, an exclamation mark, a question mark, an underscore, or a space"
      );
    });

    test("should fail if the string contains profanity", () => {
      const schema = {
        type: "object",
        properties: {
          foo: {
            type: "string",
            "secure-string": true,
          },
        },
      };

      const validate = ajv.compile(schema);
      const valid = validate({
        foo: "This is some text penis",
      });

      expect(valid).toBe(false);
      expect(validate?.errors?.[0].message).toBe(
        "Profanity is not allowed. Please remove the following words: 'penis'"
      );
    });

    test("should fail if the string only contains space characters", () => {
      const schema = {
        type: "object",
        properties: {
          foo: {
            type: "string",
            "secure-string": true,
          },
        },
      };

      const validate = ajv.compile(schema);
      const valid = validate({
        foo: "            ",
      });

      expect(valid).toBe(false);
      expect(validate?.errors?.[0].message).toBe(
        "The string is composed entirely of whitespace characters"
      );
    });

    test("should fail if the string only contains space characters", () => {
      const schema = {
        type: "object",
        properties: {
          foo: {
            type: "string",
            "secure-string": true,
          },
        },
      };

      const validate = ajv.compile(schema);
      const valid = validate({
        foo: "            ",
      });

      expect(valid).toBe(false);
      expect(validate?.errors?.[0].message).toBe(
        "The string is composed entirely of whitespace characters"
      );
    });

    test("should fail if the string contains unicode characters", () => {
      const schema = {
        type: "object",
        properties: {
          foo: {
            type: "string",
            "secure-string": true,
          },
        },
      };

      const validate = ajv.compile(schema);
      const valid = validate({
        foo: "This string contains unicode character ​",
      });

      expect(valid).toBe(false);
      expect(validate?.errors?.[0].message).toBe(
        "The string contains Unicode space characters"
      );
    });

    test("should fail if the string contains combined characters", () => {
      const schema = {
        type: "object",
        properties: {
          foo: {
            type: "string",
            "secure-string": true,
          },
        },
      };

      const validate = ajv.compile(schema);
      const valid = validate({
        foo: "Hello\u034Fworld",
      });

      expect(valid).toBe(false);
      expect(validate?.errors?.[0].message).toBe(
        "The string contains combined characters"
      );
    });

    test("should fail in the correct order", () => {
      const schema = {
        type: "object",
        properties: {
          foo: {
            type: "string",
            "secure-string": true,
          },
        },
      };

      const validate = ajv.compile(schema);
      const valid = validate({
        foo: "  Hello\u034Fworld penis ​",
      });

      expect(valid).toBe(false);
      expect(validate?.errors?.[0].message).toBe(
        "The string contains Unicode space characters"
      );
    });
  });
});
