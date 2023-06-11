export const courseLecture = {
  type: "object",
  additionalProperties: false,
  required: ["title", "content"],
  properties: {
    title: { type: "string", alphanumeric: true },
    videoURL: { type: "string", validYouTubeUrl: true },
    content: { type: "string", alphanumeric: true },
  },
};
