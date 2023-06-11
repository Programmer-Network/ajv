export const comment = {
  type: "object",
  additionalProperties: false,
  required: ["content"],
  properties: {
    content: {
      hasText: { minLength: 10, maxLength: 750 },
      type: "string",
    },
  },
};
