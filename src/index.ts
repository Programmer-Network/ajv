import { keywords } from "./Keywords/index.js";
import Ajv from "ajv";
import addCustomMessages from "ajv-errors";
import addFormats from "ajv-formats";

export const ajv = addFormats(
  addCustomMessages(
    new Ajv({ allErrors: true, $data: true, removeAdditional: true })
  )
);

keywords.map(keyword => ajv.addKeyword(keyword));

export default {
  keywords
};
