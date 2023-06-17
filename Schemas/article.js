const titleMinLength = 25;
const titleMaxLength = 130;

const summaryMinLength = 45;
const summaryMaxLength = 250;
const contentMinLength = 250;

const article = {
  type: "object",
  additionalProperties: false,
  required: ["title", "summary", "tags", "content", "isDraft"],
  properties: {
    title: {
      type: "string",
      "secure-string": true,
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
      "secure-string": true,
      minLength: summaryMinLength,
      maxLength: summaryMaxLength,
    },
    tags: {
      type: "array",
      items: {
        type: "object",
        properties: {
          label: {
            type: "string"
          },
          value: {
            type: "integer"
          }
        }
      },
      minItems: 1,
      maxItems: 5,
      uniqueItems: true
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

export default { article }