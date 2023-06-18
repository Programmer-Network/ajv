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
      getBadWords: false,
      minLength: titleMinLength,
      maxLength: titleMaxLength,
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
            type: "string",
          },
          value: {
            type: "integer",
          },
        },
      },
      minItems: 1,
      maxItems: 5,
      uniqueItems: true,
    },
    content: {
      type: "string",
      getBadWords: false,
      hasText: { minLength: contentMinLength },
    },
    isDraft: {
      type: "boolean",
    },
  },
};

export default { article };
