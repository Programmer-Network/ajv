import { ajv } from "../../ajv";

describe("Keywords", () => {
  describe("getBadWords", () => {
    test("should fail if getBadWords returns bad words", () => {
      const schema = {
        type: "object",
        properties: { foo: { type: "string", getBadWords: false } },
      };
      const validate = ajv.compile(schema);
      const valid = validate({ foo: "hi penis" });
      const [error] = validate.errors;
      expect(error.message).toBe(
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
    });
  });

  describe("has-text", () => {
    test("should pass if the text has at least 5 characters", () => {
      const schema = {
        type: "object",
        properties: {
          foo: {
            type: "string",
            hasText: { minLength: 5 },
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
            hasText: { minLength: 5 },
          },
        },
      };

      const validate = ajv.compile(schema);
      const valid = validate({
        foo: '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Is"}]}]}',
      });

      const [error] = validate.errors;

      expect(valid).toBe(false);
      expect(error.message).toBe(
        "The text must have a length greater than or equal to 5 characters"
      );
    });

    test("should fail if the has more then 5 characters", () => {
      const schema = {
        type: "object",
        properties: {
          foo: {
            type: "string",
            hasText: { maxLength: 5 },
          },
        },
      };

      const validate = ajv.compile(schema);
      const valid = validate({
        foo: '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Lorem Ipsum is simply dummy text of the printing and typesetting industry."}]}]}',
      });

      const [error] = validate.errors;

      expect(valid).toBe(false);
      expect(error.message).toBe(
        "The length of the text cannot exceed 5 characters"
      );
    });

    test("should fail if there's no text", () => {
      const schema = {
        type: "object",
        properties: {
          foo: {
            type: "string",
            hasText: true,
          },
        },
      };

      const validate = ajv.compile(schema);
      const valid = validate({
        foo: '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":""}]}]}',
      });

      const [error] = validate.errors;

      expect(valid).toBe(false);
      expect(error.message).toBe("The value must contain text");
    });
  });

  describe("secure-string", () => {
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
  });
});
