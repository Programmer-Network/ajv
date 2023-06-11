export const course = {
  type: "object",
  additionalProperties: false,
  required: ["title", "description", "type"],
  properties: {
    title: { type: "string", alphanumeric: true, minLength: 5 },
    description: { type: "string", alphanumeric: true, minLength: 20 },
    type: { type: "string", enum: ["free", "premium"] },
  },
};
