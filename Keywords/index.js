import getBadWords from "./contains-bad-words.js";
import hasText from "./has-text.js";
import isEmpty from "./is-empty.js";
import secureString from "./is-secure-string.js";
import validYouTubeUrl from "./is-youtube-url.js";

export const keywords = [
  hasText,
  getBadWords,
  isEmpty,
  validYouTubeUrl,
  secureString,
];
