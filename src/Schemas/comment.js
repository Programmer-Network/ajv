const comment = {
  type: "object",
  additionalProperties: false,
  required: ["content"],
  properties: {
    content: {
      "has-text": { minLength: 10, maxLength: 750 },
      type: "string",
    },
  },
};

export default { comment };
