export const rating = {
  type: "object",
  additionalProperties: false,
  properties: {
    rateableType: {
      type: "string",
      enum: ["course", "lecture"],
    },
    rateableId: { type: "integer" },
    stars: { type: "integer", minimum: 1, maximum: 5 },
    comment: { type: "string" },
  },
  required: ["rateableType", "rateableId", "stars"],
};

export default { rating };
