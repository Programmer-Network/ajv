export const courseSection = {
  type: "object",
  additionalProperties: false,
  required: ["title", "order"],
  properties: {
    title: { type: "string", "secure-string": true },
    description: { type: "string", "secure-string": true },
    order: { type: "integer" },
  },
};

export default { courseSection };
