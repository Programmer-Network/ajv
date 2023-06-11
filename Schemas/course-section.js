export const courseSection = {
  type: "object",
  additionalProperties: false,
  required: ["title", "order"],
  properties: {
    title: { type: "string", alphanumeric: true },
    description: { type: "string", alphanumeric: true },
    order: { type: "integer" },
  },
};
