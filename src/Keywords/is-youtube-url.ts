import StringUtils from "../Utils/StringUtils/index.js";
import { SchemaValidateFunction } from "ajv";
import {
  DataValidateFunction,
  KeywordDefinition
} from "ajv/dist/types/index.js";

const keyword: KeywordDefinition = {
  type: "string",
  errors: true,
  keyword: "is-youtube-url",
  compile: function compile(_, parentSchema) {
    const validate: SchemaValidateFunction | DataValidateFunction = (
      value: any
    ) => {
      validate.errors = [];

      if (!value && !parentSchema?.minLength) {
        return true;
      }

      if (!StringUtils.isValidYouTubeURL(value)) {
        validate.errors = [
          {
            keyword: "is-youtube-url",
            message: "Invalid YouTube URL",
            params: { invalidInput: value }
          }
        ];

        return false;
      }

      return true;
    };

    return validate;
  }
};

export default keyword;
