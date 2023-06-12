export const courseLecture = {
  type: "object",
  additionalProperties: false,
  required: ["title", "content"],
  properties: {
    title: { type: "string", "secure-string": true },
    videoURL: { type: "string", validYouTubeUrl: true },
    content: { type: "string", "secure-string": true },
  },
};
