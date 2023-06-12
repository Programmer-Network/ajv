const titleMinLength = 25;
const titleMaxLength = 130;

const summaryMinLength = 45;
const summaryMaxLength = 250;
const contentMinLength = 250;

export const article = {
  type: "object",
  additionalProperties: false,
  required: ["title", "summary", "tags", "content", "isDraft"],
  properties: {
    title: {
      type: "string",
      containsBadWords: false,
      minLength: titleMinLength,
      maxLength: titleMaxLength,
      errorMessage: {
        containsBadWords:
          "Profanity is not allowed. Please update your content.",
      },
    },
    summary: {
      type: "string",
      minLength: summaryMinLength,
      maxLength: summaryMaxLength,
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
      hasText: { minLength: contentMinLength },
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
