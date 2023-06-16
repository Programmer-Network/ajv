export const course = {
  type: "object",
  additionalProperties: false,
  required: ["title", "description", "type"],
  properties: {
    title: { type: "string", "secure-string": true, minLength: 5 },
    description: { type: "string", "secure-string": true, minLength: 20 },
    type: { type: "string", enum: ["free", "premium"] },
  },
};

export default { course };