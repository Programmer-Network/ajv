export const article = {
  type: "object",
  additionalProperties: false,
  required: ["title", "summary", "tags", "content", "isDraft"],
  properties: {
    title: {
      type: "string",
      containsBadWords: false,
      minLength: 25,
      maxLength: 130,
      errorMessage: {
        containsBadWords:
          "Profanity is not allowed. Please update your content.",
      },
    },
    summary: {
      type: "string",
      minLength: 45,
      maxLength: 250,
    },
    tags: {
      type: "array",
      items: {
        type: "number",
      },
      minItems: 1,
      maxItems: 5,
      uniqueItems: true,
    },
    content: {
      type: "string",
      containsBadWords: false,
      hasText: { minLength: 250 },
      errorMessage: {
        containsBadWords:
          "Profanity is not allowed. Please update your content.",
      },
    },
    isDraft: {
      type: "boolean",
    },
  },
};
