import Ajv from "ajv";
import addCustomMessages from "ajv-errors";
import addFormats from "ajv-formats";

import { keywords } from "./src/Keywords";

export const ajv = addFormats(
  addCustomMessages(
    new Ajv({ allErrors: true, $data: true, removeAdditional: true })
  )
);

keywords.map((keyword) => ajv.addKeyword(keyword));
